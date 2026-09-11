# 🖤 One Love Tattoos - Modern Studio & Photo Gallery

Modern tattoo parlor website, filterable photo gallery with lightbox, consultation booking engine, and administrative dashboard built for **One Love Tattoos** (Georgetown, Texas).

---

## 🚀 Instant Local Run

1. Double-click `start.bat` on Windows  
   *or* run:
   ```bash
   pip install -r requirements.txt
   python run.py
   ```
2. Open your browser:
   - **Public Site**: [http://127.0.0.1:8000](http://127.0.0.1:8000)
   - **Admin Dashboard**: [http://127.0.0.1:8000/admin](http://127.0.0.1:8000/admin)
   - **Default Admin Login**: `admin` / `onelove2026`

---

## 🌐 Hosting on GitHub Pages (Free Static Hosting)

This repository includes a pre-built static distribution inside the `/docs` folder that works directly with GitHub Pages!

### Steps to activate GitHub Pages:
1. Push this repository to your GitHub account (see Git steps below).
2. Go to your repository on GitHub.
3. Click **Settings** ➔ **Pages** (in the left sidebar).
4. Under **Build and deployment**:
   - **Source**: `Deploy from a branch`
   - **Branch**: Select `main` (or `master`) and folder `/docs`.
   - Click **Save**.
5. Within 1-2 minutes, your website will be live at:
   ```
   https://<your-github-username>.github.io/<repo-name>/
   ```

---

## ☁️ Full-Stack Hosting (With Live Admin Dashboard & Database)

Because GitHub Pages only serves static files, the full-stack Python FastAPI backend (with live database and photo upload features) can be deployed for free on cloud platforms:

### Option A: 1-Click Deploy on Render
1. Connect your GitHub repository on [render.com](https://render.com).
2. Select **Web Service** and choose this repository (or use the included `render.yaml`).
3. Build command: `pip install -r requirements.txt`
4. Start command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`

### Option B: Docker / Railway / Fly.io
Use the included `Dockerfile`:
```bash
docker build -t onelove-tattoos .
docker run -p 8000:8000 onelove-tattoos
```

---

## 📁 Repository Structure

```
├── app/
│   ├── config.py           # Configuration and studio details
│   ├── database.py         # SQLite connection & schema
│   ├── auth.py             # Session authentication & hashing
│   ├── seed_data.py        # Seed photos, artists, and studio settings
│   ├── main.py             # FastAPI entrypoint
│   ├── routes/             # REST API & Admin views
│   ├── static/             # CSS, JS, favicon, uploads
│   └── templates/          # HTML templates (Public, Admin, Login)
├── docs/                   # GitHub Pages static deploy folder
├── Dockerfile              # Container deployment
├── render.yaml             # Render deployment config
├── requirements.txt        # Dependencies
├── run.py                  # Local runner
└── start.bat               # Windows launcher
```

© 2026 One Love Tattoos. All Rights Reserved.
