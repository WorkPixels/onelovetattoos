import os
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
APP_DIR = BASE_DIR / "app"
STATIC_DIR = APP_DIR / "static"
UPLOAD_DIR = STATIC_DIR / "uploads"
TEMPLATES_DIR = APP_DIR / "templates"
DB_PATH = BASE_DIR / "onelove.db"

# Ensure upload directory exists
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

# Security
SECRET_KEY = os.getenv("SECRET_KEY", "one-love-tattoos-georgetown-tx-secret-key-2026")
ADMIN_SESSION_COOKIE = "onelove_admin_session"

# Studio Defaults
STUDIO_NAME = "One Love Tattoos"
STUDIO_TAGLINE = "Custom Ink • Precision Piercings • Art & Smoke Shop"
STUDIO_PHONE = "(512) 868-1588"
STUDIO_EMAIL = "onelovetattoos@gmail.com"
STUDIO_ADDRESS = "1202 Williams Drive, Suite A/B, Georgetown, TX 78628"
STUDIO_HOURS = "Monday - Sunday: 12:00 PM - 8:00 PM"
STUDIO_INSTAGRAM = "https://instagram.com"
STUDIO_FACEBOOK = "https://facebook.com"
