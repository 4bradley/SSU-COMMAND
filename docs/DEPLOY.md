# SSU Command — Extended Deployment Guide

## Deploying to Different Platforms

### GitHub Pages (Recommended — Free)

1. Create a new repo on GitHub (e.g. `ssu-command`)
2. Upload all files in this folder to the repo root
3. Go to **Settings → Pages → Source → Deploy from branch → main → / (root)**
4. Site will be live at `https://USERNAME.github.io/ssu-command/`

**Custom domain:** In Settings → Pages → Custom domain, enter your domain, then add a `CNAME` DNS record pointing to `USERNAME.github.io`.

---

### Netlify (Free tier available)

1. Drag and drop the entire `ssu-command/` folder onto [netlify.com/drop](https://app.netlify.com/drop)
2. Your site is instantly live at a random `*.netlify.app` URL
3. Optionally connect a GitHub repo for auto-deploy on push

---

### Vercel (Free tier available)

```bash
npm i -g vercel
cd ssu-command
vercel
```

Follow the prompts. No build step required — it's a static site.

---

### Cloudflare Pages (Free)

1. Push this folder to a GitHub repo
2. In Cloudflare dashboard → Pages → Create a project → Connect to Git
3. Build command: *(leave blank)*  Output directory: `/`
4. Deploy

---

### Any Web Server / VPS / NAS

Copy the entire `ssu-command/` folder to any directory served over HTTP/HTTPS:

```bash
# Example: Apache / Nginx document root
cp -r ssu-command/ /var/www/html/ssu/

# Or using rsync to a remote server
rsync -avz ssu-command/ user@yourserver.com:/var/www/html/ssu/
```

Ensure the server serves `index.html` for the root path.

---

### Copying to Another PC (Local / LAN use)

1. Copy the entire `ssu-command/` folder to the target PC
2. Start a local server (no internet needed after first cache):
   ```bash
   # Python (built-in, no install needed)
   cd ssu-command
   python3 -m http.server 8080

   # Or on Windows (Python 3)
   python -m http.server 8080
   ```
3. Open `http://localhost:8080` in Chrome or Edge
4. Install as PWA via the address bar icon

---

## Icon Generation

If the icons are missing or you want to regenerate them:

```bash
cd ssu-command
pip install Pillow        # (or pip3 install Pillow)
python3 generate_icons.py
```

This creates `icons/icon-192.png` and `icons/icon-512.png`.
The script also copies them to the root (required by `index.html`).

---

## Updating the App

To update the dashboard after changes to `index.html`:

1. Increment the `CACHE_NAME` in `sw.js` (e.g. `ssu-command-v2`)
2. Push the updated files to GitHub
3. The dashboard will show a toast notification: *"Dashboard update ready — reload to apply"*

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Blank page / 404 | Make sure you're serving over HTTP, not `file://` |
| Map not loading | Check internet connection (Leaflet loads from CDN on first use) |
| Can't install as PWA | Must be served over HTTPS (GitHub Pages, Netlify, Vercel all provide this) |
| Service Worker not registering | Open DevTools → Application → Service Workers to debug |
| Icons not showing | Run `generate_icons.py` and ensure `icons/` folder is present |
| Save to disk not working | Use Chrome or Edge — Firefox/Safari use the download fallback |
