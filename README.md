# marvax.fun

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Pages](https://img.shields.io/badge/deployed-pages-blue)](https://marvax.fun)

> Personal landing page — marvax.fun

🌐 **Live:** https://marvax.fun

## 📦 Stack

- Pure HTML / CSS / JS
- Static hosting (GitHub Pages / Cloudflare Pages)

## 🚀 Local preview

```bash
# Any static server works
python3 -m http.server 8000
# or
npx serve .
```

Open http://localhost:8000

## 🌍 Public routes shipped in this repo

The site publishes a small public surface. GitHub Pages serves extensionless routes such as `/docs`, while the repository keeps the source files as `docs.html`, `status.html`, `user.html`, and `privacy.html`.

| Public URL | Source file | Purpose |
| --- | --- | --- |
| `https://marvax.fun/` | `index.html` | Landing page / main public entry point |
| `https://marvax.fun/docs` | `docs.html` | Public resources index |
| `https://marvax.fun/status` | `status.html` | Browser-visible status page |
| `https://marvax.fun/user` | `user.html` | Public user-access entry point |
| `https://marvax.fun/privacy` | `privacy.html` | Public-surface and privacy perimeter |

`sitemap.xml` and `robots.txt` reflect the same route set.

## 🔎 Public-surface model

This repo intentionally documents only the public-facing surface:

- `docs.html` is the compact index of public destinations.
- `status.html` separates browser-checkable status from manual/application checks.
- `user.html` points to the public user portal and health endpoint without pretending to proxy them.
- `privacy.html` explains the boundary between the public site and non-public/internal surfaces.

That boundary is deliberate: the site avoids listing internal/admin routes or claiming health signals it cannot verify honestly from the browser.

## 🗂️ Structure

```
.
├── index.html           # Landing page
├── docs.html            # Public resources index
├── status.html          # Public status page
├── user.html            # Public user-access entry
├── privacy.html         # Public-surface / privacy perimeter
├── 404.html             # Custom 404
├── sitemap.xml          # Canonical public route list
├── robots.txt           # Search engine directives + sitemap hint
├── assets/              # CSS / JS
├── kimi/                # Sub-section
├── CNAME                # Custom domain (marvax.fun)
└── *.jpg / *.svg        # Images & graphics
```

## 🖼️ Image optimization

Source images are currently JPG. To keep pages snappy:
- Prefer WebP for photos: `cwebp -q 80 input.jpg -o output.webp`
- Add `loading="lazy"` on non-hero `<img>` tags
- Keep hero background < 300 KB

## 📄 License

[MIT](LICENSE) © [marvax](https://github.com/m4rv4x)
