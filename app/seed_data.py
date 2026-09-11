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
        "title": "Hyper-Realistic Lion & Crown Sleeve",
        "description": "Full forearm black and grey piece featuring realistic fur texture, deep shadows, and imperial crown composition.",
        "image_url": "/static/uploads/demo/tattoo_bg_lion.jpg",
        "artist_name": "Marcus 'Vex' Cole",
        "category": "Black & Grey",
        "tags": "Lion, Crown, Realism, Sleeve, Forearm",
        "is_featured": 1,
        "sort_order": 1
    },
    {
        "title": "Classic American Traditional Dagger & Heart",
        "description": "Bold American traditional clash piece with heavyweight outlines, rich crimson fills, and timeless flash aesthetic.",
        "image_url": "/static/uploads/demo/tattoo_trad_dagger.jpg",
        "artist_name": "Elena 'Ink' Cruz",
        "category": "Traditional",
        "tags": "Dagger, Heart, Traditional, Color, Bold",
        "is_featured": 1,
        "sort_order": 2
    },
    {
        "title": "Micro Botanical Wildflower Wrap",
        "description": "Single-needle delicate floral bouquet with Texas bluebonnets, fern leaves, and micro-shading wrapping the wrist.",
        "image_url": "/static/uploads/demo/tattoo_fineline_botanical.jpg",
        "artist_name": "Kai Soren",
        "category": "Fine Line",
        "tags": "Floral, Botanical, Wrist, Fine Line, Minimal",
        "is_featured": 1,
        "sort_order": 3
    },
    {
        "title": "Curated Ear Project - Titanium & Opal Rings",
        "description": "Triple helix piercing paired with daith ring in ASTM F-136 titanium and genuine synthetic opal clusters.",
        "image_url": "/static/uploads/demo/piercing_ear_curation.jpg",
        "artist_name": "Samira Dawn",
        "category": "Piercings",
        "tags": "Helix, Daith, Piercing, Titanium, Ear Curation",
        "is_featured": 1,
        "sort_order": 4
    },
    {
        "title": "Japanese Irezumi Koi & Lotus Wave",
        "description": "Dynamic oriental scale work with wind bars, stormy waves, and vibrant lotus accents across forearm.",
        "image_url": "/static/uploads/demo/tattoo_japanese_koi.jpg",
        "artist_name": "Elena 'Ink' Cruz",
        "category": "Japanese",
        "tags": "Koi, Lotus, Japanese, Irezumi, Sleeve",
        "is_featured": 1,
        "sort_order": 5
    },
    {
        "title": "Dark Chicano Skull & Hourglass Roses",
        "description": "Hand-rendered smooth gradients, high-contrast dark surrealism, and hyper-detailed bone texture.",
        "image_url": "/static/uploads/demo/tattoo_bg_skull.jpg",
        "artist_name": "Marcus 'Vex' Cole",
        "category": "Black & Grey",
        "tags": "Skull, Roses, Black & Grey, Surrealism, Arm",
        "is_featured": 1,
        "sort_order": 6
    },
    {
        "title": "Geometric Dotwork Forearm Tattoo",
        "description": "Intricate stippling and sacred geometry concentric patterns wrapping the forearm and wrist.",
        "image_url": "/static/uploads/demo/tattoo_bg_mandala.jpg",
        "artist_name": "Kai Soren",
        "category": "Fine Line",
        "tags": "Mandala, Dotwork, Sacred Geometry, Forearm",
        "is_featured": 1,
        "sort_order": 7
    },
    {
        "title": "Bold Sailor Jerry Style Eagle & Banner",
        "description": "Iconic traditional swooping bald eagle clutching banner with saturated red, gold, and green tones.",
        "image_url": "/static/uploads/demo/tattoo_trad_eagle.jpg",
        "artist_name": "Elena 'Ink' Cruz",
        "category": "Traditional",
        "tags": "Eagle, Americana, Traditional, Color, Chest",
        "is_featured": 0,
        "sort_order": 8
    },
    {
        "title": "Cinematic Realism Eye & Pocketwatch",
        "description": "Dramatic chiaroscuro realism depicting reflective iris, tear highlight, and Roman numeral mechanical gear detail.",
        "image_url": "/static/uploads/demo/tattoo_realism_eye.jpg",
        "artist_name": "Marcus 'Vex' Cole",
        "category": "Realism",
        "tags": "Eye, Clock, Realism, Black & Grey, Bicep",
        "is_featured": 1,
        "sort_order": 9
    },
    {
        "title": "Precision Solid Gold Septum Clicker",
        "description": "Flawless sweet-spot placement healed with a hand-polished 14-karat solid yellow gold clicker ring.",
        "image_url": "/static/uploads/demo/piercing_septum_gold.jpg",
        "artist_name": "Samira Dawn",
        "category": "Piercings",
        "tags": "Septum, Gold, Nose, Piercing, Facial",
        "is_featured": 0,
        "sort_order": 10
    },
    {
        "title": "Double Nostril & Piercing Studs",
        "description": "Symmetrical nostril piercings styled with high-polish titanium bezel-set cubic zirconia studs.",
        "image_url": "/static/uploads/demo/piercing_nostril_stud.jpg",
        "artist_name": "Samira Dawn",
        "category": "Piercings",
        "tags": "Nostril, Stud, Piercing, Titanium, Facial",
        "is_featured": 0,
        "sort_order": 11
    },
    {
        "title": "Delicate Minimalist Constellation & Moon",
        "description": "Micro single-needle celestial astronomy piece with crescent moon, orbit rings, and stippled star dust.",
        "image_url": "/static/uploads/demo/tattoo_fineline_stars.jpg",
        "artist_name": "Kai Soren",
        "category": "Fine Line",
        "tags": "Moon, Stars, Celestial, Fine Line, Ankle",
        "is_featured": 0,
        "sort_order": 12
    },
    {
        "title": "Intricate Floral Mandala Arm Cuff",
        "description": "Precision symmetrical lotus mandala with delicate hanging bead accents wrapping around the arm.",
        "image_url": "/static/uploads/demo/tattoo_bg_floral.jpg",
        "artist_name": "Kai Soren",
        "category": "Black & Grey",
        "tags": "Mandala, Floral, Cuff, Arm, Geometry",
        "is_featured": 0,
        "sort_order": 13
    },
    {
        "title": "One Love Georgetown Studio & Flash Wall",
        "description": "Our custom Georgetown shop station featuring framed flash art, sterile barriers, and welcoming atmosphere.",
        "image_url": "/static/uploads/demo/studio_ink_workstation.jpg",
        "artist_name": "One Love Studio",
        "category": "Flash & Studio",
        "tags": "Studio, Georgetown, Shop, Station, Texas",
        "is_featured": 1,
        "sort_order": 14
    },
    {
        "title": "Custom Rotary Machine & Sterile Workstation",
        "description": "Hospital-grade sterile set-up with disposable grips, single-use needle cartridges, and premium organic inks.",
        "image_url": "/static/uploads/demo/studio_rotary_machine.jpg",
        "artist_name": "One Love Studio",
        "category": "Flash & Studio",
        "tags": "Equipment, Sterile, Machine, Ink, Studio",
        "is_featured": 0,
        "sort_order": 15
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
