from fastapi import APIRouter, Request, Depends, responses
from fastapi.templating import Jinja2Templates
from app.config import TEMPLATES_DIR, ADMIN_SESSION_COOKIE
from app.auth import get_current_admin
from app.database import get_db

router = APIRouter(tags=["Admin UI"])
templates = Jinja2Templates(directory=str(TEMPLATES_DIR))

@router.get("/admin/login")
def admin_login_page(request: Request):
    admin = get_current_admin(request)
    if admin:
        return responses.RedirectResponse(url="/admin", status_code=303)
    return templates.TemplateResponse(request=request, name="admin_login.html", context={})

@router.get("/admin")
def admin_dashboard_page(request: Request):
    admin = get_current_admin(request)
    if not admin:
        return responses.RedirectResponse(url="/admin/login", status_code=303)

    # Fetch initial data to pass directly to template
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM photos ORDER BY created_at DESC")
        photos = [dict(r) for r in cursor.fetchall()]

        cursor.execute("SELECT * FROM artists ORDER BY sort_order ASC")
        artists = [dict(r) for r in cursor.fetchall()]

        cursor.execute("SELECT * FROM inquiries ORDER BY created_at DESC")
        inquiries = [dict(r) for r in cursor.fetchall()]

        cursor.execute("SELECT key, value FROM settings")
        settings = {r["key"]: r["value"] for r in cursor.fetchall()}

    return templates.TemplateResponse(
        request=request,
        name="admin.html",
        context={
            "admin": admin,
            "photos": photos,
            "artists": artists,
            "inquiries": inquiries,
            "settings": settings
        }
    )

@router.get("/admin/logout")
def admin_logout_view(request: Request):
    resp = responses.RedirectResponse(url="/admin/login", status_code=303)
    resp.delete_cookie(key=ADMIN_SESSION_COOKIE)
    return resp
