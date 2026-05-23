# SSU Command — Secure Access Dashboard

> **Version 9.0** · Created by Bradley Louw

A full-featured, offline-capable security camera command dashboard built as a Progressive Web App (PWA). Manage cameras, monitor status, visualise on a live map, import XLSX data, and save/export sessions — all from a single browser tab.

---

## 🚀 Quick Deploy (GitHub Pages)

1. **Fork or upload** this folder to a GitHub repository.
2. Go to **Settings → Pages** in your repo.
3. Set the source to **Deploy from a branch → `main` → `/ (root)`**.
4. GitHub will publish the site at `https://<your-username>.github.io/<repo-name>/`.
5. Open the URL on any device and click **"Add to Home Screen"** to install as an app.

---

## 📁 Folder Structure

```
ssu-command/
├── index.html            ← Main dashboard (the entire app)
├── manifest.json         ← PWA install manifest
├── sw.js                 ← Service worker (offline caching)
├── 404.html              ← GitHub Pages 404 fallback
├── .nojekyll             ← Disables Jekyll on GitHub Pages
├── _config.yml           ← GitHub Pages config
├── icon-192.png          ← App icon (root, for <link> tags)
├── icon-512.png          ← App icon (root, for <link> tags)
├── icons/
│   ├── icon-192.png      ← App icon 192×192
│   └── icon-512.png      ← App icon 512×512
├── data/
│   ├── config.json       ← App configuration reference
│   ├── cameras.schema.json ← Camera data schema & sample template
│   └── zones.json        ← Zone definitions
├── docs/
│   └── DEPLOY.md         ← Extended deployment guide
└── generate_icons.py     ← Icon generator script (run once, optional)
```

---

## 🖥️ Running Locally

**Option A — VS Code Live Server**
1. Open the `ssu-command/` folder in VS Code.
2. Install the **Live Server** extension.
3. Right-click `index.html` → **Open with Live Server**.

**Option B — Python HTTP server**
```bash
cd ssu-command
python3 -m http.server 8080
# Open http://localhost:8080
```

**Option C — Node.js**
```bash
cd ssu-command
npx serve .
# Open the URL shown in the terminal
```

> ⚠️ **Do not** open `index.html` directly with `file://` — the Service Worker and PWA features require HTTP/HTTPS.

---

## 📱 Install as App (PWA)

| Platform | How to install |
|----------|---------------|
| **Chrome / Edge (Desktop)** | Click the install icon (⊕) in the address bar |
| **Android** | Tap the browser menu → "Add to Home Screen" |
| **iOS Safari** | Tap Share → "Add to Home Screen" |
| **Samsung Internet** | Tap the menu → "Add page to" → "Home screen" |

---

## 📂 Data Import

Use the **Import** button in the dashboard to load cameras from an Excel (`.xlsx`) file.

Your spreadsheet columns should match (case-insensitive):

| ID | Name | Location | Zone | Latitude | Longitude | IP Address | Status | Type | Resolution | Installed | Notes |

A template schema is in `data/cameras.schema.json`.

---

## 💾 Saving Data

The dashboard supports two save methods:

- **Save to Disk (FSA)** — Uses the browser's File System Access API to write directly to a `.ssu` file. Available in Chrome, Edge, and Opera.
- **Export Backup** — Downloads a dated `.ssu` backup file (works in all browsers including Firefox and Safari).

Press **Ctrl+S / Cmd+S** anywhere in the dashboard to save.

---

## 🔑 Credentials

Default credentials are set inside the app via the **Admin panel** (accessed from the login screen). There are no hardcoded default passwords in the source — the admin sets up users on first run.

---

## 🌐 External Dependencies (CDN)

The app loads these libraries from CDNs — an internet connection is required on first load:

| Library | Version | Purpose |
|---------|---------|---------|
| [Leaflet.js](https://leafletjs.com) | 1.9.4 | Interactive map |
| [SheetJS (xlsx)](https://sheetjs.com) | 0.18.5 | Excel import |
| [Google Fonts](https://fonts.google.com) | — | JetBrains Mono, Syne, DM Sans, Barlow |

After the first load, the Service Worker caches everything for offline use.

---

## 📄 License

Private project — all rights reserved · Bradley Louw
