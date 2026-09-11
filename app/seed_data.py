import json
from app.database import get_db, init_db
from app.auth import hash_password

INITIAL_ARTISTS = [
    {
        "name": "Marcus 'Vex' Cole",
        "role": "Senior Resident Artist",
        "specialties": "Black & Grey Realism • Dark Surrealism • Portraits",
        "bio": "Over 12 years perfecting smooth gradients, high-contrast shadows, and cinematic skin realism. Dedicated to large-scale custom pieces.",
        "instagram": "marcus_vex_tattoos",
        "avatar_url": "https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?auto=format&fit=crop&w=600&q=80",
        "sort_order": 1
    },
    {
        "name": "Elena 'Ink' Cruz",
        "role": "Resident Tattooer",
        "specialties": "American Traditional • Bold Color • Neo-Traditional",
        "bio": "Specializes in saturated colors, crisp bold lines, and timeless flash with a modern edge. Passionate about folk and nautical classics.",
        "instagram": "elena_cruz_ink",
        "avatar_url": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
        "sort_order": 2
    },
    {
        "name": "Kai Soren",
        "role": "Resident Tattooer",
        "specialties": "Fine Line • Micro-Realism • Botanical • Geometry",
        "bio": "Known for single-needle precision, delicate floral cuffs, architectural geometry, and minimalist illustrative work.",
        "instagram": "kaisoren_fineline",
        "avatar_url": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
        "sort_order": 3
    },
    {
        "name": "Samira Dawn",
        "role": "Master Piercer & Body Stylist",
        "specialties": "Advanced Body Piercing • Ear Curation • Solid Gold & Titanium",
        "bio": "Certified with Texas Dept of Health and APP standards. Exclusively uses sterile single-use blades and implant-grade titanium/14k gold jewelry.",
        "instagram": "samira_piercings_gtx",
        "avatar_url": "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80",
        "sort_order": 4
    }
]

INITIAL_PHOTOS = [
    {
        "title": "Hyper-Realistic Wolf & Forest Sleeve",
        "description": "Full forearm black and grey piece featuring realistic fur texture, deep shadows, and pine silhouette composition.",
        "image_url": "https://images.unsplash.com/photo-1568515045052-f9a854d70bfd?auto=format&fit=crop&w=1200&q=80",
        "artist_name": "Marcus 'Vex' Cole",
        "category": "Black & Grey",
        "tags": "Wolf, Realism, Sleeve, Nature, Forearm",
        "is_featured": 1,
        "sort_order": 1
    },
    {
        "title": "Traditional Roaring Panther & Snake",
        "description": "Classic bold American traditional clash piece with heavyweight outlines and rich crimson and emerald fills.",
        "image_url": "https://images.unsplash.com/photo-1590246814883-57833641368f?auto=format&fit=crop&w=1200&q=80",
        "artist_name": "Elena 'Ink' Cruz",
        "category": "Traditional",
        "tags": "Panther, Snake, Traditional, Color, Bold",
        "is_featured": 1,
        "sort_order": 2
    },
    {
        "title": "Micro Botanical Wildflower Wrap",
        "description": "Single-needle delicate floral bouquet with Texas bluebonnets, fern leaves, and micro-shading wrapping the wrist.",
        "image_url": "https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?auto=format&fit=crop&w=1200&q=80",
        "artist_name": "Kai Soren",
        "category": "Fine Line",
        "tags": "Floral, Botanical, Wrist, Fine Line, Minimal",
        "is_featured": 1,
        "sort_order": 3
    },
    {
        "title": "Curated Ear Project - Gold & Opal Cluster",
        "description": "Triple helix piercing paired with daith ring in ASTM F-136 titanium and genuine synthetic opal clusters.",
        "image_url": "https://images.unsplash.com/photo-1606830733744-0ad778449672?auto=format&fit=crop&w=1200&q=80",
        "artist_name": "Samira Dawn",
        "category": "Piercings",
        "tags": "Helix, Daith, Piercing, Titanium, Ear Curation",
        "is_featured": 1,
        "sort_order": 4
    },
    {
        "title": "Japanese Ryu Dragon & Peony Chest Plate",
        "description": "Dynamic oriental scale work with wind bars, stormy clouds, and vibrant peony accents across upper chest and collarbone.",
        "image_url": "https://images.unsplash.com/photo-1550537687-c91072c4792d?auto=format&fit=crop&w=1200&q=80",
        "artist_name": "Elena 'Ink' Cruz",
        "category": "Japanese",
        "tags": "Dragon, Japanese, Irezumi, Chest, Color",
        "is_featured": 1,
        "sort_order": 5
    },
    {
        "title": "Chicano Lettering & Filigree Script",
        "description": "Hand-drawn custom calligraphic lettering across upper back with flourishes, drop shadows, and soft ambient grey washes.",
        "image_url": "https://images.unsplash.com/photo-1560707303-4e980ce876ad?auto=format&fit=crop&w=1200&q=80",
        "artist_name": "Marcus 'Vex' Cole",
        "category": "Black & Grey",
        "tags": "Lettering, Script, Back, Chicano, Custom",
        "is_featured": 0,
        "sort_order": 6
    },
    {
        "title": "Sacred Geometry Mandala & Dotwork",
        "description": "Intricate stippling and sacred geometry concentric patterns wrapping the elbow and upper forearm.",
        "image_url": "https://images.unsplash.com/photo-1597852074816-d933c7d2b988?auto=format&fit=crop&w=1200&q=80",
        "artist_name": "Kai Soren",
        "category": "Fine Line",
        "tags": "Mandala, Dotwork, Sacred Geometry, Elbow",
        "is_featured": 1,
        "sort_order": 7
    },
    {
        "title": "Custom Skull & Dagger Traditional Flash",
        "description": "Traditional skull impaled with ornamental dagger, weeping drops, and gold-hilted scrollwork.",
        "image_url": "https://images.unsplash.com/photo-1612459284970-e8f027596582?auto=format&fit=crop&w=1200&q=80",
        "artist_name": "Elena 'Ink' Cruz",
        "category": "Traditional",
        "tags": "Skull, Dagger, Flash, Flash Art, Thigh",
        "is_featured": 0,
        "sort_order": 8
    },
    {
        "title": "Renaissance Angel Statue & Marble Texture",
        "description": "Dramatic chiaroscuro realism depicting marble sculpture drapery and weathered stone wing highlights.",
        "image_url": "https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?auto=format&fit=crop&w=1200&q=80",
        "artist_name": "Marcus 'Vex' Cole",
        "category": "Realism",
        "tags": "Angel, Statue, Realism, Black & Grey, Bicep",
        "is_featured": 1,
        "sort_order": 9
    },
    {
        "title": "Precision Septum with Seamless Gold Clicker",
        "description": "Flawless sweet-spot placement healed with a hand-polished 14-karat solid yellow gold clicker ring.",
        "image_url": "https://images.unsplash.com/photo-1535295972055-1c762f4483e5?auto=format&fit=crop&w=1200&q=80",
        "artist_name": "Samira Dawn",
        "category": "Piercings",
        "tags": "Septum, Gold, Nose, Piercing, Facial",
        "is_featured": 0,
        "sort_order": 10
    },
    {
        "title": "One Love Studio & Smoke Shop Lounge",
        "description": "Front gallery displaying rotating Central Texas local artists, custom flash wall, and boutique smoke shop accessories.",
        "image_url": "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=80",
        "artist_name": "One Love Studio",
        "category": "Flash & Studio",
        "tags": "Studio, Georgetown, Gallery, Art, Shop",
        "is_featured": 1,
        "sort_order": 11
    },
    {
        "title": "Neo-Traditional Tiger & Lotus",
        "description": "Fierce tiger head surrounded by glowing lotus blossoms, accented with electric teal and warm amber gouache-style shading.",
        "image_url": "https://images.unsplash.com/photo-1562962230-16e4623d36e6?auto=format&fit=crop&w=1200&q=80",
        "artist_name": "Elena 'Ink' Cruz",
        "category": "Traditional",
        "tags": "Tiger, Lotus, Neo-Traditional, Color, Calf",
        "is_featured": 0,
        "sort_order": 12
    }
]

INITIAL_INQUIRIES = [
    {
        "client_name": "Travis Hernandez",
        "client_email": "travis.h@example.com",
        "client_phone": "(512) 555-0192",
        "preferred_artist": "Marcus 'Vex' Cole",
        "tattoo_style": "Black & Grey",
        "placement": "Right Forearm",
        "estimated_size": "Medium (4x6 in)",
        "budget": "$400 - $600",
        "description": "Looking for a realism piece with an hourglass surrounded by smoke and broken Roman numerals.",
        "reference_image_url": "https://images.unsplash.com/photo-1568515045052-f9a854d70bfd?auto=format&fit=crop&w=600&q=80",
        "status": "New"
    },
    {
        "client_name": "Maya Reynolds",
        "client_email": "maya.reynolds@example.com",
        "client_phone": "(512) 555-8834",
        "preferred_artist": "Kai Soren",
        "tattoo_style": "Fine Line",
        "placement": "Ribcage / Ribs",
        "estimated_size": "Small (2x3 in)",
        "budget": "$200 - $300",
        "description": "Delicate fine line hummingbird feeding from a Texas bluebonnet stem.",
        "reference_image_url": "https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?auto=format&fit=crop&w=600&q=80",
        "status": "Contacted"
    }
]

INITIAL_SETTINGS = {
    "announcement": "🔥 Walk-ins welcome daily 12-8 PM! Deposits ($50-$250) required for custom appointments.",
    "studio_name": "One Love Tattoos",
    "phone": "(512) 868-1588",
    "email": "onelovetattoos@gmail.com",
    "address": "1202 Williams Drive, Suite A/B, Georgetown, TX 78628",
    "hours": "Daily: 12:00 PM – 8:00 PM",
    "instagram": "https://instagram.com/onelovetattoos",
    "facebook": "https://facebook.com/onelovetattoos",
    "tiktok": "https://tiktok.com/@onelovetattoos"
}

def seed_database(force: bool = False):
    """Seed initial records if tables are empty."""
    init_db()
    with get_db() as conn:
        cursor = conn.cursor()

        # Seed Admin User if not exists
        cursor.execute("SELECT id FROM admin_users WHERE username = 'admin'")
        if not cursor.fetchone() or force:
            cursor.execute("DELETE FROM admin_users WHERE username = 'admin'")
            default_pwd_hash = hash_password("onelove2026")
            cursor.execute(
                "INSERT INTO admin_users (username, password_hash) VALUES (?, ?)",
                ("admin", default_pwd_hash)
            )
            print("[OK] Default admin created: admin / onelove2026")

        # Seed Settings
        for k, v in INITIAL_SETTINGS.items():
            cursor.execute("INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)", (k, v))
        print("[OK] Studio settings initialized")

        # Seed Artists if empty
        cursor.execute("SELECT COUNT(*) as count FROM artists")
        if cursor.fetchone()["count"] == 0 or force:
            if force:
                cursor.execute("DELETE FROM artists")
            for a in INITIAL_ARTISTS:
                cursor.execute("""
                    INSERT INTO artists (name, role, specialties, bio, instagram, avatar_url, sort_order)
                    VALUES (?, ?, ?, ?, ?, ?, ?)
                """, (a["name"], a["role"], a["specialties"], a["bio"], a["instagram"], a["avatar_url"], a["sort_order"]))
            print(f"[OK] Seeded {len(INITIAL_ARTISTS)} artists")

        # Seed Photos if empty
        cursor.execute("SELECT COUNT(*) as count FROM photos")
        if cursor.fetchone()["count"] == 0 or force:
            if force:
                cursor.execute("DELETE FROM photos")
            for p in INITIAL_PHOTOS:
                cursor.execute("""
                    INSERT INTO photos (title, description, image_url, artist_name, category, tags, is_featured, sort_order)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                """, (p["title"], p["description"], p["image_url"], p["artist_name"], p["category"], p["tags"], p["is_featured"], p["sort_order"]))
            print(f"[OK] Seeded {len(INITIAL_PHOTOS)} gallery photos")

        # Seed Inquiries if empty
        cursor.execute("SELECT COUNT(*) as count FROM inquiries")
        if cursor.fetchone()["count"] == 0 or force:
            if force:
                cursor.execute("DELETE FROM inquiries")
            for inq in INITIAL_INQUIRIES:
                cursor.execute("""
                    INSERT INTO inquiries (client_name, client_email, client_phone, preferred_artist, tattoo_style, placement, estimated_size, budget, description, reference_image_url, status)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                """, (
                    inq["client_name"], inq["client_email"], inq["client_phone"],
                    inq["preferred_artist"], inq["tattoo_style"], inq["placement"],
                    inq["estimated_size"], inq["budget"], inq["description"],
                    inq["reference_image_url"], inq["status"]
                ))
            print(f"[OK] Seeded {len(INITIAL_INQUIRIES)} sample consultation inquiries")

if __name__ == "__main__":
    seed_database(force=True)
