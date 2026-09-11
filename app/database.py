import sqlite3
from contextlib import contextmanager
from typing import List, Dict, Any, Optional
from app.config import DB_PATH

@contextmanager
def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA foreign_keys = ON")
    try:
        yield conn
        conn.commit()
    except Exception:
        conn.rollback()
        raise
    finally:
        conn.close()

def init_db():
    with get_db() as conn:
        cursor = conn.cursor()
        
        # Photos Table
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS photos (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                description TEXT,
                image_url TEXT NOT NULL,
                thumbnail_url TEXT,
                artist_name TEXT NOT NULL DEFAULT 'Resident Artist',
                category TEXT NOT NULL DEFAULT 'Custom',
                tags TEXT,
                is_featured INTEGER DEFAULT 0,
                sort_order INTEGER DEFAULT 0,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)

        # Artists Table
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS artists (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                role TEXT DEFAULT 'Tattoo Artist',
                specialties TEXT,
                bio TEXT,
                instagram TEXT,
                avatar_url TEXT,
                sort_order INTEGER DEFAULT 0,
                is_active INTEGER DEFAULT 1
            )
        """)

        # Inquiries / Bookings Table
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS inquiries (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                client_name TEXT NOT NULL,
                client_email TEXT NOT NULL,
                client_phone TEXT,
                preferred_artist TEXT,
                tattoo_style TEXT,
                placement TEXT,
                estimated_size TEXT,
                budget TEXT,
                description TEXT NOT NULL,
                reference_image_url TEXT,
                artist_notes TEXT DEFAULT '',
                status TEXT DEFAULT 'New',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)

        # Safe migration if table exists without artist_notes column
        try:
            cursor.execute("ALTER TABLE inquiries ADD COLUMN artist_notes TEXT DEFAULT ''")
        except Exception:
            pass

        # Studio Settings Table
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS settings (
                key TEXT PRIMARY KEY,
                value TEXT
            )
        """)

        # Admin Users Table
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS admin_users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT UNIQUE NOT NULL,
                password_hash TEXT NOT NULL,
                session_token TEXT,
                session_expiry TIMESTAMP
            )
        """)
        
        # Performance indexes
        cursor.execute("CREATE INDEX IF NOT EXISTS idx_photos_category ON photos(category)")
        cursor.execute("CREATE INDEX IF NOT EXISTS idx_photos_featured ON photos(is_featured)")
        cursor.execute("CREATE INDEX IF NOT EXISTS idx_inquiries_status ON inquiries(status)")
