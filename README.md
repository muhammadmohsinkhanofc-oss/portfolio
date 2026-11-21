# MOHSIN KHAN® × MAD DESIGNS™

Cinematic, interactive 3D creative portfolio and monochrome digital art exhibition for **Muhammad Mohsin Khan** — Graphic Designer & Visual Artist based in Karachi, Pakistan.

---

## Architecture & Directory Structure

```text
public/
  branding/                   # Custom MAD DESIGNS™ SVG & PNG logos + favicon
  images/
    portrait/                 # Drop your custom portrait at portrait.jpg
    projects/
      verge-schooling/        # cover.jpg, 01.jpg, 02.jpg, 03.jpg
      professionals-core/     # cover.jpg, 01.jpg, 02.jpg
      az-academy/             # cover.jpg, 01.jpg, 02.jpg
      easykidme/              # cover.jpg, 01.jpg, 02.jpg, 03.jpg
      mad-designs/            # Custom studio assets
  models/                     # Optional GLB/GLTF 3D models
  fonts/                      # Optional local webfont files

src/
  animations/                 # GSAP ScrollTrigger choreography
  components/                 # Navbar, MobileMenu, BrandLogo, ExhibitionImage, Modal, Toolkit
  config/siteConfig.ts        # Personal info, social links, private WhatsApp configuration
  data/                       # Editable projects & MAD LAB experiments
  sections/                   # HeroSection, AboutSection, SelectedWorkSection, MadLabSection, ContactSection
  styles/theme.css            # Luxury monochrome palette & typography variables
  three/                      # Three.js / React Three Fiber 3D chrome sculpture & lighting
```

---

## Replacing Your Portrait & Project Artwork

1. **Portrait**: Save your photo as `public/images/portrait/portrait.jpg`. The website automatically prioritizes that file over the default studio portrait.
2. **Client Projects**: Drop your real `.jpg` or `.png` design exports into the matching folder inside `public/images/projects/<project-slug>/` (`cover.jpg`, `01.jpg`, `02.jpg`, `03.jpg`).
3. **Live Browser Preview**: You can also click any project on the site and press **PREVIEW FILE / LOAD / REPLACE** to test your artwork directly in the browser before committing files.
4. **Updating Text & Links**: Edit `src/config/siteConfig.ts` and `src/data/projects.ts`.
   - **Privacy**: Your WhatsApp number (`03282243432`) is stored in `src/config/siteConfig.ts` with `publishWhatsapp: false`. Set `publishWhatsapp: true` only when you are ready to display the direct WhatsApp link publicly.

---

## Local Installation & Running

```bash
# 1. Install dependencies
npm install

# 2. Start the development server (port 3000)
npm run dev

# 3. Type-check & create production build
npm run lint
npm run build
```

---

## Publishing to GitHub

```bash
git init
git add .
git commit -m "Initial commit: MOHSIN KHAN x MAD DESIGNS 3D Portfolio"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

---

## Deployment (Vercel / Netlify / Cloudflare Pages)

1. Push your repository to GitHub.
2. Connect the repository to **Vercel**, **Netlify**, or **Cloudflare Pages**.
3. Use the following build settings:
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Deploy — all static assets in `public/branding` and `public/images` are bundled automatically.
