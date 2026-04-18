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

## 🗂️ Structure

```
.
├── index.html           # Landing page
├── docs.html            # Docs / about
├── 404.html             # Custom 404
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
