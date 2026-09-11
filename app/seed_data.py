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
        "title": "Japanese Dragon & Peony Shoulder Piece",
        "description": "Custom black & grey composition featuring traditional Japanese dragon scales interwoven with delicate blooming peonies.",
        "image_url": "static/uploads/demo/tattoo_bg_lion.jpg",
        "artist_name": "Marcus 'Vex' Cole",
        "category": "Japanese",
        "tags": "Dragon, Peony, Japanese, Shoulder, Irezumi",
        "is_featured": 1,
        "sort_order": 1
    },
    {
        "title": "American Traditional Lady Head & Rose",
        "description": "Iconic Americana bold lines, saturated shading, and classic rose hair ornament honoring golden-era flash traditions.",
        "image_url": "static/uploads/demo/tattoo_trad_eagle.jpg",
        "artist_name": "Elena 'Ink' Cruz",
        "category": "Traditional",
        "tags": "Traditional, Lady Head, Rose, Americana, Flash",
        "is_featured": 1,
        "sort_order": 2
    },
    {
        "title": "Botanical Peony Fine Line Forearm",
        "description": "Single-needle botanical flora with stippled leaf shading and soft grey wash gradients wrapping the forearm.",
        "image_url": "static/uploads/demo/tattoo_trad_dagger.jpg",
        "artist_name": "Kai Soren",
        "category": "Fine Line",
        "tags": "Floral, Peony, Forearm, Botanical, Fine Line",
        "is_featured": 1,
        "sort_order": 3
    },
    {
        "title": "Curated Ear Project - Daith & Snake Helix",
        "description": "Full curated ear project showcasing implant-grade titanium daith ring, solid gold snake helix stud, and matching lobe stack.",
        "image_url": "static/uploads/demo/piercing_ear_curation.jpg",
        "artist_name": "Samira Dawn",
        "category": "Piercings",
        "tags": "Ear Curation, Daith, Helix, Snake, Gold, Titanium",
        "is_featured": 1,
        "sort_order": 4
    },
    {
        "title": "Masterwork Japanese Bodysuit Irezumi",
        "description": "Traditional full body Japanese suit with warrior composition, turbulent wind bars, and vibrant cherry blossoms.",
        "image_url": "static/uploads/demo/tattoo_japanese_koi.jpg",
        "artist_name": "Elena 'Ink' Cruz",
        "category": "Japanese",
        "tags": "Irezumi, Bodysuit, Japanese, Full Back, Warrior",
        "is_featured": 1,
        "sort_order": 5
    },
    {
        "title": "Dark Surrealism Arm Sleeve in Progress",
        "description": "Hyper-smooth grey wash gradients, high contrast shadow work, and intricate Roman numerals hand-crafted in session.",
        "image_url": "static/uploads/demo/tattoo_bg_skull.jpg",
        "artist_name": "Marcus 'Vex' Cole",
        "category": "Black & Grey",
        "tags": "Sleeve, Black & Grey, Surrealism, Arm, Studio",
        "is_featured": 1,
        "sort_order": 6
    },
    {
        "title": "Samurai Cat & Waves Full Back Irezumi",
        "description": "Custom full-back backpiece featuring a feline samurai ronin surrounded by crashing stormy waves and lotus accents.",
        "image_url": "static/uploads/demo/tattoo_bg_mandala.jpg",
        "artist_name": "Elena 'Ink' Cruz",
        "category": "Japanese",
        "tags": "Samurai, Cat, Backpiece, Irezumi, Japanese",
        "is_featured": 1,
        "sort_order": 7
    },
    {
        "title": "Snarling Mountain Wolf & Pine Forest",
        "description": "Intense photo-realism wolf portrait with lifelike fur texturing set against a deep pine forest landscape on upper arm.",
        "image_url": "static/uploads/demo/tattoo_bg_floral.jpg",
        "artist_name": "Marcus 'Vex' Cole",
        "category": "Black & Grey",
        "tags": "Wolf, Forest, Realism, Bicep, Wildlife",
        "is_featured": 1,
        "sort_order": 8
    },
    {
        "title": "Hyper-Realistic Blue Tiger Eyes",
        "description": "High-contrast cinematic wildlife realism capturing piercing blue eyes, realistic fur striations, and optical depth.",
        "image_url": "static/uploads/demo/tattoo_realism_eye.jpg",
        "artist_name": "Marcus 'Vex' Cole",
        "category": "Realism",
        "tags": "Tiger, Eyes, Realism, Blue, Forearm, Wildlife",
        "is_featured": 1,
        "sort_order": 9
    },
    {
        "title": "Circular Barbell Titanium Septum Piercing",
        "description": "Precision aseptic sweet-spot placement healed with a hand-polished black circular barbell septum clicker.",
        "image_url": "static/uploads/demo/piercing_septum_gold.jpg",
        "artist_name": "Samira Dawn",
        "category": "Piercings",
        "tags": "Septum, Piercing, Titanium, Horseshoe, Facial",
        "is_featured": 0,
        "sort_order": 10
    },
    {
        "title": "Solid Gold Floral Cluster Nostril Stud",
        "description": "Handcrafted 14k solid yellow gold floral cluster bezel stud with mirror polish finish.",
        "image_url": "static/uploads/demo/piercing_nostril_stud.jpg",
        "artist_name": "Samira Dawn",
        "category": "Piercings",
        "tags": "Nostril, Gold, Flower, Stud, Piercing",
        "is_featured": 0,
        "sort_order": 11
    },
    {
        "title": "Single-Needle Rotary Inking Session",
        "description": "Macro shot of resident artist Kai Soren crafting clean lines with a precision balanced pen rotary machine.",
        "image_url": "static/uploads/demo/tattoo_fineline_stars.jpg",
        "artist_name": "Kai Soren",
        "category": "Fine Line",
        "tags": "Fine Line, Inking, Machine, Hand, Studio",
        "is_featured": 0,
        "sort_order": 12
    },
    {
        "title": "Wildlife Fox & Cub Realism Forearm",
        "description": "Intricate micro-fur detail and tender narrative depicting a mother fox and cub nestled in wild forest grass.",
        "image_url": "static/uploads/demo/tattoo_fineline_botanical.jpg",
        "artist_name": "Marcus 'Vex' Cole",
        "category": "Realism",
        "tags": "Fox, Wildlife, Forearm, Realism, Black & Grey",
        "is_featured": 0,
        "sort_order": 13
    },
    {
        "title": "Sterile Georgetown Workstation & Color Palette",
        "description": "Texas Health Department certified medical-grade sterile tray set-up with organic color pigment caps and protective barriers.",
        "image_url": "static/uploads/demo/studio_ink_workstation.jpg",
        "artist_name": "One Love Studio",
        "category": "Flash & Studio",
        "tags": "Workstation, Sterile, Georgetown, Palette, Inks",
        "is_featured": 1,
        "sort_order": 14
    },
    {
        "title": "Custom Rotary Pen Machine & Ink Reservoir",
        "description": "High-torque rotary pen tattoo machine with disposable safety needle cartridge and vibrant ink well.",
        "image_url": "static/uploads/demo/studio_rotary_machine.jpg",
        "artist_name": "One Love Studio",
        "category": "Flash & Studio",
        "tags": "Machine, Rotary, Needle, Sterile, Equipment",
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
        "artist_notes": "Spoke on phone 9/10. Client wants smoke wrapping around forearm into outer wrist. $100 deposit paid. Consultation scheduled for Oct 12th at 2PM.",
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
        "artist_notes": "Emailed 3 custom stencil drafts on 9/11. Maya loves draft #2 with single-needle petal shading. Tentatively booking Oct 18th.",
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
    "tiktok": "https://tiktok.com/@onelovetattoos",
    "logo_url": "",
    "theme": "dark-gold"
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
                    INSERT INTO inquiries (client_name, client_email, client_phone, preferred_artist, tattoo_style, placement, estimated_size, budget, description, reference_image_url, artist_notes, status)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                """, (
                    inq["client_name"], inq["client_email"], inq["client_phone"],
                    inq["preferred_artist"], inq["tattoo_style"], inq["placement"],
                    inq["estimated_size"], inq["budget"], inq["description"],
                    inq["reference_image_url"], inq.get("artist_notes", ""), inq["status"]
                ))
            print(f"[OK] Seeded {len(INITIAL_INQUIRIES)} sample consultation inquiries")

if __name__ == "__main__":
    seed_database(force=True)
