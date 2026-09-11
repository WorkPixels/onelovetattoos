import hashlib
import secrets
from datetime import datetime, timedelta
from typing import Optional
from fastapi import Request, HTTPException, status, Depends
from app.database import get_db
from app.config import ADMIN_SESSION_COOKIE

def hash_password(password: str, salt: Optional[str] = None) -> str:
    """Hash a password using PBKDF2 HMAC SHA-256."""
    if not salt:
        salt = secrets.token_hex(16)
    # PBKDF2 with 100,000 iterations
    key = hashlib.pbkdf2_hmac('sha256', password.encode('utf-8'), salt.encode('utf-8'), 100000)
    return f"{salt}${key.hex()}"

def verify_password(stored_password_hash: str, provided_password: str) -> bool:
    """Verify a plain password against the stored salt$hash string."""
    try:
        salt, key = stored_password_hash.split('$')
        recomputed = hashlib.pbkdf2_hmac('sha256', provided_password.encode('utf-8'), salt.encode('utf-8'), 100000)
        return secrets.compare_digest(key, recomputed.hex())
    except Exception:
        return False

def create_admin_session(username: str) -> str:
    """Generate a secure session token valid for 7 days."""
    token = secrets.token_urlsafe(32)
    expiry = datetime.now() + timedelta(days=7)
    with get_db() as conn:
        conn.execute(
            "UPDATE admin_users SET session_token = ?, session_expiry = ? WHERE username = ?",
            (token, expiry.isoformat(), username)
        )
    return token

def get_current_admin(request: Request) -> Optional[dict]:
    """Retrieve the current admin user if a valid session cookie exists."""
    token = request.cookies.get(ADMIN_SESSION_COOKIE)
    if not token:
        # Also check Authorization header Bearer token if present
        auth_header = request.headers.get("Authorization")
        if auth_header and auth_header.startswith("Bearer "):
            token = auth_header.split(" ", 1)[1].strip()

    if not token:
        return None

    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute(
            "SELECT id, username, session_expiry FROM admin_users WHERE session_token = ?",
            (token,)
        )
        row = cursor.fetchone()
        if not row:
            return None

        # Check expiry
        if row["session_expiry"]:
            expiry = datetime.fromisoformat(row["session_expiry"])
            if datetime.now() > expiry:
                return None

        return {"id": row["id"], "username": row["username"]}

def require_admin(request: Request) -> dict:
    """FastAPI dependency to require admin login."""
    admin = get_current_admin(request)
    if not admin:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Admin authentication required"
        )
    return admin
