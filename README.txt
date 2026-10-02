DK WORLD + DK LEARNING (fixed)
Entry point: index.html (login/register) -> DK.html (home) -> learning / coding / services / contact.
Mouse effects: fx.js (cursor glow, trail, click burst, 3D card tilt). Username can be anything.
Hosting: upload ALL files to the site root over HTTPS (Netlify, Cloudflare Pages: _headers | Vercel: vercel.json | Apache: .htaccess).
Needs https:// or localhost for password hashing (Web Crypto). Do not open via file:// for login.
SECURITY NOTE: login is client-side (demo level). For real accounts use a backend (e.g. Firebase Auth / Supabase).
