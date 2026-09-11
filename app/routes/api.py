import uuid
import shutil
from pathlib import Path
from typing import Optional, List
from fastapi import APIRouter, Depends, HTTPException, Query, UploadFile, File, Form, Request, Response, status
from pydantic import BaseModel, EmailStr
from app.database import get_db
from app.config import UPLOAD_DIR, ADMIN_SESSION_COOKIE
from app.auth import require_admin, get_current_admin, verify_password, create_admin_session, hash_password

router = APIRouter(prefix="/api", tags=["API"])

# ==========================================
# Pydantic Schemas
# ==========================================

class LoginRequest(BaseModel):
    username: str
    password: str

class PhotoCreate(BaseModel):
    title: str
    description: Optional[str] = ""
    image_url: str
    thumbnail_url: Optional[str] = ""
    artist_name: Optional[str] = "Resident Artist"
    category: Optional[str] = "Custom"
    tags: Optional[str] = ""
    is_featured: Optional[int] = 0
    sort_order: Optional[int] = 0

class PhotoUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    image_url: Optional[str] = None
    thumbnail_url: Optional[str] = None
    artist_name: Optional[str] = None
    category: Optional[str] = None
    tags: Optional[str] = None
    is_featured: Optional[int] = None
    sort_order: Optional[int] = None

class ArtistCreate(BaseModel):
    name: str
    role: Optional[str] = "Tattoo Artist"
    specialties: Optional[str] = ""
    bio: Optional[str] = ""
    instagram: Optional[str] = ""
    avatar_url: Optional[str] = ""
    sort_order: Optional[int] = 0

class ArtistUpdate(BaseModel):
    name: Optional[str] = None
    role: Optional[str] = None
    specialties: Optional[str] = None
    bio: Optional[str] = None
    instagram: Optional[str] = None
    avatar_url: Optional[str] = None
    sort_order: Optional[int] = None
    is_active: Optional[int] = None

class InquiryCreate(BaseModel):
    client_name: str
    client_email: str
    client_phone: Optional[str] = ""
    preferred_artist: Optional[str] = "Any Available"
    tattoo_style: Optional[str] = "Custom"
    placement: Optional[str] = "Unspecified"
    estimated_size: Optional[str] = "Medium"
    budget: Optional[str] = "Not Specified"
    description: str
    reference_image_url: Optional[str] = ""

class InquiryStatusUpdate(BaseModel):
    status: str

class InquiryNotesUpdate(BaseModel):
    notes: str

class SettingsUpdate(BaseModel):
    settings: dict

# ==========================================
# Public Endpoints
# ==========================================

@router.get("/settings")
def get_public_settings():
    """Retrieve public studio settings (phone, email, hours, address, announcement)."""
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT key, value FROM settings")
        settings = {r["key"]: r["value"] for r in cursor.fetchall()}
    return {"settings": settings}

@router.get("/photos")
def get_photos(
    category: Optional[str] = None,
    artist: Optional[str] = None,
    featured: Optional[bool] = None,
    search: Optional[str] = None,
    limit: int = 50,
    offset: int = 0
):
    """Retrieve gallery photos with filtering, search, and pagination."""
    query = "SELECT * FROM photos WHERE 1=1"
    params = []

    if category and category.lower() != "all":
        query += " AND LOWER(category) = LOWER(?)"
        params.append(category)

    if artist and artist.lower() != "all":
        query += " AND LOWER(artist_name) = LOWER(?)"
        params.append(artist)

    if featured is not None:
        query += " AND is_featured = ?"
        params.append(1 if featured else 0)

    if search:
        query += " AND (title LIKE ? OR description LIKE ? OR tags LIKE ? OR artist_name LIKE ?)"
        term = f"%{search}%"
        params.extend([term, term, term, term])

    query += " ORDER BY is_featured DESC, sort_order ASC, created_at DESC LIMIT ? OFFSET ?"
    params.extend([limit, offset])

    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute(query, params)
        rows = [dict(r) for r in cursor.fetchall()]

        # Get total count matching same filters
        count_query = "SELECT COUNT(*) as total FROM photos WHERE 1=1"
        count_params = params[:-2]  # strip limit and offset
        if count_params:
            # Reconstruct WHERE clause for count
            where_clause = query.split("WHERE 1=1")[1].split("ORDER BY")[0]
            count_query = f"SELECT COUNT(*) as total FROM photos WHERE 1=1 {where_clause}"
        cursor.execute(count_query, count_params)
        total = cursor.fetchone()["total"]

    return {"photos": rows, "total": total, "limit": limit, "offset": offset}

@router.get("/categories")
def get_categories():
    """Retrieve list of distinct categories with photo count."""
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("""
            SELECT category, COUNT(*) as count 
            FROM photos 
            GROUP BY category 
            ORDER BY count DESC
        """)
        categories = [dict(r) for r in cursor.fetchall()]
    return {"categories": categories}

@router.get("/artists")
def get_artists():
    """Retrieve active studio artists."""
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM artists WHERE is_active = 1 ORDER BY sort_order ASC, name ASC")
        artists = [dict(r) for r in cursor.fetchall()]
    return {"artists": artists}

@router.get("/settings")
def get_settings():
    """Retrieve public studio information and settings."""
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT key, value FROM settings")
        rows = cursor.fetchall()
        settings = {r["key"]: r["value"] for r in rows}
    return settings

@router.post("/inquiries")
def create_inquiry(inquiry: InquiryCreate):
    """Submit a consultation booking inquiry from the public website."""
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("""
            INSERT INTO inquiries (
                client_name, client_email, client_phone, preferred_artist,
                tattoo_style, placement, estimated_size, budget, description,
                reference_image_url, status
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'New')
        """, (
            inquiry.client_name, inquiry.client_email, inquiry.client_phone,
            inquiry.preferred_artist, inquiry.tattoo_style, inquiry.placement,
            inquiry.estimated_size, inquiry.budget, inquiry.description,
            inquiry.reference_image_url
        ))
        inquiry_id = cursor.lastrowid

    return {
        "success": True,
        "message": "Consultation request received! Our team will contact you within 24-48 hours.",
        "inquiry_id": inquiry_id
    }

@router.post("/upload/public-reference")
async def upload_public_reference(file: UploadFile = File(...)):
    """Allow clients to upload a tattoo reference image for their consultation form."""
    ext = Path(file.filename or "reference.jpg").suffix.lower()
    if ext not in [".jpg", ".jpeg", ".png", ".webp", ".gif"]:
        ext = ".jpg"
    unique_filename = f"ref_{uuid.uuid4().hex}{ext}"
    dest_path = UPLOAD_DIR / unique_filename

    with open(dest_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    return {"url": f"/static/uploads/{unique_filename}", "filename": unique_filename}

# ==========================================
# Admin Authentication Endpoints
# ==========================================

@router.post("/admin/login")
def admin_login(payload: LoginRequest, response: Response):
    """Admin login endpoint setting session cookie."""
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT username, password_hash FROM admin_users WHERE username = ?", (payload.username,))
        user = cursor.fetchone()

        if not user or not verify_password(user["password_hash"], payload.password):
            raise HTTPException(status_code=401, detail="Invalid username or password")

        token = create_admin_session(payload.username)

        # Set secure HTTP-only cookie
        response.set_cookie(
            key=ADMIN_SESSION_COOKIE,
            value=token,
            max_age=7 * 24 * 3600,
            httponly=True,
            samesite="lax"
        )

        return {"success": True, "token": token, "username": payload.username}

@router.post("/admin/logout")
def admin_logout(response: Response, admin: dict = Depends(require_admin)):
    """Admin logout clearing session cookie."""
    response.delete_cookie(key=ADMIN_SESSION_COOKIE)
    return {"success": True, "message": "Logged out successfully"}

@router.get("/admin/me")
def admin_me(admin: dict = Depends(require_admin)):
    """Check current admin profile."""
    return {"admin": admin}

@router.get("/admin/stats")
def admin_stats(admin: dict = Depends(require_admin)):
    """Get dashboard metrics and counts."""
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT COUNT(*) as count FROM photos")
        total_photos = cursor.fetchone()["count"]

        cursor.execute("SELECT COUNT(*) as count FROM photos WHERE is_featured = 1")
        featured_photos = cursor.fetchone()["count"]

        cursor.execute("SELECT COUNT(*) as count FROM inquiries")
        total_inquiries = cursor.fetchone()["count"]

        cursor.execute("SELECT COUNT(*) as count FROM inquiries WHERE status = 'New'")
        new_inquiries = cursor.fetchone()["count"]

        cursor.execute("SELECT COUNT(*) as count FROM artists WHERE is_active = 1")
        total_artists = cursor.fetchone()["count"]

    return {
        "total_photos": total_photos,
        "featured_photos": featured_photos,
        "total_inquiries": total_inquiries,
        "new_inquiries": new_inquiries,
        "total_artists": total_artists
    }

# ==========================================
# Admin Photos Management
# ==========================================

@router.post("/admin/photos/upload")
async def admin_upload_photo(
    file: UploadFile = File(...),
    admin: dict = Depends(require_admin)
):
    """Direct file upload for photo gallery."""
    ext = Path(file.filename or "image.jpg").suffix.lower()
    if ext not in [".jpg", ".jpeg", ".png", ".webp", ".gif"]:
        ext = ".jpg"
    filename = f"tattoo_{uuid.uuid4().hex}{ext}"
    dest = UPLOAD_DIR / filename

    with open(dest, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    return {
        "success": True,
        "url": f"/static/uploads/{filename}",
        "filename": filename
    }

@router.post("/admin/photos")
def admin_create_photo(photo: PhotoCreate, admin: dict = Depends(require_admin)):
    """Add a new photo to the gallery database."""
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("""
            INSERT INTO photos (
                title, description, image_url, thumbnail_url,
                artist_name, category, tags, is_featured, sort_order
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            photo.title, photo.description, photo.image_url, photo.thumbnail_url or photo.image_url,
            photo.artist_name, photo.category, photo.tags, photo.is_featured, photo.sort_order
        ))
        new_id = cursor.lastrowid
        cursor.execute("SELECT * FROM photos WHERE id = ?", (new_id,))
        created = dict(cursor.fetchone())

    return {"success": True, "photo": created}

@router.put("/admin/photos/{photo_id}")
def admin_update_photo(photo_id: int, updates: PhotoUpdate, admin: dict = Depends(require_admin)):
    """Update metadata for an existing gallery photo."""
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM photos WHERE id = ?", (photo_id,))
        existing = cursor.fetchone()
        if not existing:
            raise HTTPException(status_code=404, detail="Photo not found")

        fields = []
        values = []
        for k, v in updates.dict(exclude_unset=True).items():
            fields.append(f"{k} = ?")
            values.append(v)

        if fields:
            values.append(photo_id)
            query = f"UPDATE photos SET {', '.join(fields)} WHERE id = ?"
            cursor.execute(query, values)

        cursor.execute("SELECT * FROM photos WHERE id = ?", (photo_id,))
        updated = dict(cursor.fetchone())

    return {"success": True, "photo": updated}

@router.delete("/admin/photos/{photo_id}")
def admin_delete_photo(photo_id: int, admin: dict = Depends(require_admin)):
    """Remove a photo from the gallery."""
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM photos WHERE id = ?", (photo_id,))
        photo = cursor.fetchone()
        if not photo:
            raise HTTPException(status_code=404, detail="Photo not found")

        # If it's a locally stored file in uploads, clean it up
        img_url = photo["image_url"]
        if img_url.startswith("/static/uploads/"):
            local_filename = img_url.replace("/static/uploads/", "")
            target_path = UPLOAD_DIR / local_filename
            if target_path.exists():
                try:
                    target_path.unlink()
                except Exception:
                    pass

        cursor.execute("DELETE FROM photos WHERE id = ?", (photo_id,))

    return {"success": True, "message": f"Photo {photo_id} removed"}

# ==========================================
# Admin Inquiries Management
# ==========================================

@router.get("/admin/inquiries")
def admin_get_inquiries(
    status: Optional[str] = None,
    admin: dict = Depends(require_admin)
):
    """List consultation bookings with optional status filter."""
    query = "SELECT * FROM inquiries WHERE 1=1"
    params = []
    if status and status.lower() != "all":
        query += " AND LOWER(status) = LOWER(?)"
        params.append(status)
    query += " ORDER BY created_at DESC"

    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute(query, params)
        rows = [dict(r) for r in cursor.fetchall()]

    return {"inquiries": rows}

@router.patch("/admin/inquiries/{inquiry_id}/status")
def admin_update_inquiry_status(
    inquiry_id: int,
    payload: InquiryStatusUpdate,
    admin: dict = Depends(require_admin)
):
    """Change inquiry status (New, Contacted, Booked, Completed, Archived)."""
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("UPDATE inquiries SET status = ? WHERE id = ?", (payload.status, inquiry_id))
        if cursor.rowcount == 0:
            raise HTTPException(status_code=404, detail="Inquiry not found")
    return {"success": True, "status": payload.status}

@router.patch("/admin/inquiries/{inquiry_id}/notes")
def admin_update_inquiry_notes(
    inquiry_id: int,
    payload: InquiryNotesUpdate,
    admin: dict = Depends(require_admin)
):
    """Update artist consultation notes for an inquiry."""
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("UPDATE inquiries SET artist_notes = ? WHERE id = ?", (payload.notes, inquiry_id))
        if cursor.rowcount == 0:
            raise HTTPException(status_code=404, detail="Inquiry not found")
    return {"success": True, "notes": payload.notes}

@router.delete("/admin/inquiries/{inquiry_id}")
def admin_delete_inquiry(inquiry_id: int, admin: dict = Depends(require_admin)):
    """Delete an inquiry record."""
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("DELETE FROM inquiries WHERE id = ?", (inquiry_id,))
        if cursor.rowcount == 0:
            raise HTTPException(status_code=404, detail="Inquiry not found")
    return {"success": True, "message": f"Inquiry {inquiry_id} deleted"}

# ==========================================
# Admin Artists Management
# ==========================================

@router.post("/admin/artists")
def admin_create_artist(artist: ArtistCreate, admin: dict = Depends(require_admin)):
    """Add a new artist profile."""
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("""
            INSERT INTO artists (name, role, specialties, bio, instagram, avatar_url, sort_order)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        """, (artist.name, artist.role, artist.specialties, artist.bio, artist.instagram, artist.avatar_url, artist.sort_order))
        new_id = cursor.lastrowid
        cursor.execute("SELECT * FROM artists WHERE id = ?", (new_id,))
        created = dict(cursor.fetchone())
    return {"success": True, "artist": created}

@router.put("/admin/artists/{artist_id}")
def admin_update_artist(artist_id: int, updates: ArtistUpdate, admin: dict = Depends(require_admin)):
    """Update artist profile details."""
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM artists WHERE id = ?", (artist_id,))
        if not cursor.fetchone():
            raise HTTPException(status_code=404, detail="Artist not found")

        fields = []
        values = []
        for k, v in updates.dict(exclude_unset=True).items():
            fields.append(f"{k} = ?")
            values.append(v)

        if fields:
            values.append(artist_id)
            cursor.execute(f"UPDATE artists SET {', '.join(fields)} WHERE id = ?", values)

        cursor.execute("SELECT * FROM artists WHERE id = ?", (artist_id,))
        updated = dict(cursor.fetchone())

    return {"success": True, "artist": updated}

@router.delete("/admin/artists/{artist_id}")
def admin_delete_artist(artist_id: int, admin: dict = Depends(require_admin)):
    """Delete an artist profile."""
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("DELETE FROM artists WHERE id = ?", (artist_id,))
        if cursor.rowcount == 0:
            raise HTTPException(status_code=404, detail="Artist not found")
    return {"success": True, "message": f"Artist {artist_id} deleted"}

# ==========================================
# Admin Settings & Password Management
# ==========================================

@router.post("/admin/settings")
def admin_update_settings(payload: SettingsUpdate, admin: dict = Depends(require_admin)):
    """Update studio settings key-values."""
    with get_db() as conn:
        cursor = conn.cursor()
        for k, v in payload.settings.items():
            cursor.execute("INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)", (k, str(v)))
    return {"success": True, "message": "Settings updated"}

@router.post("/admin/change-password")
def admin_change_password(
    old_password: str = Form(...),
    new_password: str = Form(...),
    admin: dict = Depends(require_admin)
):
    """Update admin account password."""
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT password_hash FROM admin_users WHERE username = ?", (admin["username"],))
        row = cursor.fetchone()
        if not row or not verify_password(row["password_hash"], old_password):
            raise HTTPException(status_code=400, detail="Current password incorrect")

        new_hash = hash_password(new_password)
        cursor.execute("UPDATE admin_users SET password_hash = ? WHERE username = ?", (new_hash, admin["username"]))

    return {"success": True, "message": "Password updated successfully"}
