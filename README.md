# Milan Mohan — Personal Website

A single-page personal academic website for Milan Mohan, AI/ML researcher at Algoverse AI Research.

## Features

- Single-page design with smooth section navigation
- Dark/light mode toggle (persisted in localStorage)
- Fully responsive (mobile, tablet, desktop)
- Scroll-reveal animations using Intersection Observer
- Glassmorphism navigation with active link highlighting
- Expandable abstract for research paper
- No frameworks — pure HTML/CSS/JS

## Deployment to Cloudflare Pages from GitHub

### Step 1: Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit: Milan Mohan personal website"
git branch -M main
git remote add origin https://github.com/MT25MB/milan-mohan.git
git push -u origin main
```

### Step 2: Deploy on Cloudflare Pages

1. Go to https://pages.cloudflare.com and sign in
2. Click "Create a project" → "Connect to Git"
3. Authorize Cloudflare and select your GitHub repo
4. Configure build settings:
   - Framework preset: **None**
   - Build command: *(leave blank)*
   - Build output directory: `/` (root)
5. Click "Save and Deploy"
6. Your site will be live at `https://your-project.pages.dev`

### Step 3: Custom Domain (Optional)

1. In Cloudflare Pages → your project → Custom domains
2. Add your domain and follow DNS configuration steps

## Before Deploying

- [ ] Replace the profile photo placeholder (search for `PROFILE PHOTO` in `index.html`)
- [ ] Add your email address (search for `ADD YOUR EMAIL HERE` in `index.html`)

## File Structure

```
/
├── index.html        ← Main page (all content lives here)
├── style.css         ← All styles
├── script.js         ← Smooth scroll, theme toggle, animations
├── README.md         ← This file
└── assets/
    └── (profile photo goes here)
```

## Local Development

Simply open `index.html` in a browser — no build step required.

```bash
# Or use a local server
npx serve .
# or
python -m http.server 8000
```

## License

Personal website — not open source.
