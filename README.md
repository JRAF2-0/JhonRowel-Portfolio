# Jhon Rowel Abines — Portfolio

A personal portfolio site showcasing AI automation work, n8n workflows, full-stack web apps, and embedded systems projects. Built with React + Vite + Tailwind v4 + GSAP, deployed on Vercel.

## Stack

- **Framework:** React 19 + Vite 8
- **Styling:** Tailwind CSS v4 (via `@tailwindcss/vite`)
- **Animation:** GSAP with ScrollTrigger
- **Icons:** lucide-react + react-icons
- **Image processing:** sharp (build-time only)

## Local development

```bash
npm install
npm run dev          # http://localhost:5173
npm run build        # production build to dist/
npm run preview      # preview the production build
npm run lint         # eslint
```

## Project structure

```
src/
├── App.jsx                      composition root
├── main.jsx                     React entry
├── index.css                    Tailwind theme + design tokens
├── assets/
│   └── images/
│       ├── profile.jpg          portrait source (used by build script)
│       ├── profile.webp         optimized portrait (used by app)
│       └── projects/            project covers (WebP)
├── components/
│   ├── layout/                  Navbar, Footer
│   ├── sections/                Hero, About, Skills, Projects, Experience, Contact
│   └── ui/                      ProjectCard, ProjectThumbnail, CaseStudyModal, Lightbox, SectionHeading
├── data/                        profile, skills, projects, experience  ← edit content here
└── hooks/
    ├── useScrollLock.js         locks body scroll while modal is open
    └── useScrollReveal.js       reusable scroll-triggered fade-in

scripts/
└── build-images.mjs             one-off image optimizer (run after adding new screenshots)

public/
├── favicon.svg                  "JR" mark, brand gradient
├── og-image.png                 1200×630 social card
├── robots.txt
├── sitemap.xml
└── JhonResume.pdf
```

## Editing content

All copy lives in `src/data/*.js` — no need to touch components for content changes:

- **Profile / About / contact info:** `src/data/profile.js`
- **Projects + case studies:** `src/data/projects.js`
- **Skills:** `src/data/skills.js`
- **Experience timeline:** `src/data/experience.js`

## Adding a new project screenshot

1. Save the screenshot as PNG to `src/assets/images/projects/`, e.g. `helpdesk-shot-2.png`
2. Run `node scripts/build-images.mjs` to generate the optimized WebP
3. Delete the source PNG (the WebP is what the app uses)
4. Import the WebP in `src/data/projects.js` and reference it on the project's `image` or `caseStudy.gallery` field

## Deploy

This is a static Vite build — deploys cleanly to Vercel, Netlify, or GitHub Pages.

**Vercel (recommended):**

1. Push to GitHub
2. Import the repo at [vercel.com/new](https://vercel.com/new)
3. Vercel auto-detects Vite — no config needed
4. Build command: `npm run build` · Output directory: `dist`

## License

Personal portfolio code. Content (text, images, resume) © Jhon Rowel Abines.
