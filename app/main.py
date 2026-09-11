from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from app.config import STATIC_DIR, TEMPLATES_DIR
from app.database import init_db, get_db
from app.seed_data import seed_database
from app.routes import api, admin

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Initialize DB & seed data on startup
    init_db()
    seed_database(force=False)
    yield

app = FastAPI(
    title="One Love Tattoos & Piercings",
    description="Custom Ink, Precision Piercings & Art Gallery in Georgetown, TX",
    lifespan=lifespan
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount static files
app.mount("/static", StaticFiles(directory=str(STATIC_DIR)), name="static")

# Templates
templates = Jinja2Templates(directory=str(TEMPLATES_DIR))

# Register Routers
app.include_router(api.router)
app.include_router(admin.router)

@app.get("/")
def index(request: Request):
    """Serve public homepage."""
    with get_db() as conn:
        cursor = conn.cursor()
        
        # Featured photos
        cursor.execute("SELECT * FROM photos WHERE is_featured = 1 ORDER BY sort_order ASC, created_at DESC LIMIT 8")
        featured_photos = [dict(r) for r in cursor.fetchall()]

        # All categories
        cursor.execute("SELECT category, COUNT(*) as count FROM photos GROUP BY category ORDER BY count DESC")
        categories = [dict(r) for r in cursor.fetchall()]

        # Active artists
        cursor.execute("SELECT * FROM artists WHERE is_active = 1 ORDER BY sort_order ASC")
        artists = [dict(r) for r in cursor.fetchall()]

        # Studio settings
        cursor.execute("SELECT key, value FROM settings")
        settings = {r["key"]: r["value"] for r in cursor.fetchall()}

    return templates.TemplateResponse(
        request=request,
        name="index.html",
        context={
            "featured_photos": featured_photos,
            "categories": categories,
            "artists": artists,
            "settings": settings
        }
    )
