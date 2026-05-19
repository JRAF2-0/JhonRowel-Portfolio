import sharp from 'sharp'
import { readdirSync, statSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve, extname, basename } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')

const PROFILE_JPG = resolve(root, 'src/assets/images/profile.jpg')
const PROFILE_WEBP = resolve(root, 'src/assets/images/profile.webp')
const PROJECTS_DIR = resolve(root, 'src/assets/images/projects')
const OG_OUT = resolve(root, 'public/og-image.png')

const fmtKB = (n) => `${Math.round(n / 1024)} KB`

// ── 1. Compress profile.jpg → profile.webp ─────────────────────────────
console.log('\n── Profile portrait ──')
await sharp(PROFILE_JPG)
  .resize({ width: 800, withoutEnlargement: true })
  .webp({ quality: 82 })
  .toFile(PROFILE_WEBP)

console.log(
  `profile.jpg (${fmtKB(statSync(PROFILE_JPG).size)}) → profile.webp (${fmtKB(
    statSync(PROFILE_WEBP).size
  )})`
)

// ── 2. Compress every project cover PNG → WebP ────────────────────────
console.log('\n── Project covers ──')
const pngFiles = readdirSync(PROJECTS_DIR).filter(
  (f) => extname(f).toLowerCase() === '.png'
)

let totalBefore = 0
let totalAfter = 0

for (const file of pngFiles) {
  const inPath = resolve(PROJECTS_DIR, file)
  const outPath = resolve(PROJECTS_DIR, `${basename(file, extname(file))}.webp`)

  const beforeSize = statSync(inPath).size
  totalBefore += beforeSize

  await sharp(inPath)
    .resize({ width: 1600, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(outPath)

  const afterSize = statSync(outPath).size
  totalAfter += afterSize

  console.log(
    `  ${file.padEnd(38)} ${fmtKB(beforeSize).padStart(8)} → ${fmtKB(afterSize).padStart(8)}`
  )
}

console.log(
  `\n  Total: ${fmtKB(totalBefore)} → ${fmtKB(totalAfter)} (saved ${fmtKB(
    totalBefore - totalAfter
  )})`
)

// ── 3. Build 1200×630 Open Graph image ─────────────────────────────────
console.log('\n── OG image ──')
const OG_W = 1200
const OG_H = 630

const portrait = await sharp(PROFILE_JPG)
  .resize(360, 360, { fit: 'cover', position: 'top' })
  .composite([
    {
      input: Buffer.from(
        '<svg width="360" height="360"><circle cx="180" cy="180" r="180" fill="white"/></svg>'
      ),
      blend: 'dest-in',
    },
  ])
  .png()
  .toBuffer()

const bg = Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="${OG_W}" height="${OG_H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#07070a"/>
      <stop offset="100%" stop-color="#16161b"/>
    </linearGradient>
    <linearGradient id="brand" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#3b82f6"/>
      <stop offset="100%" stop-color="#8b5cf6"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.3" cy="0.4" r="0.5">
      <stop offset="0%" stop-color="#3b82f6" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="#3b82f6" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="${OG_W}" height="${OG_H}" fill="url(#bg)"/>
  <rect width="${OG_W}" height="${OG_H}" fill="url(#glow)"/>

  <g opacity="0.04" stroke="#ffffff" stroke-width="1">
    ${Array.from({ length: 25 }, (_, i) => `<line x1="${i * 60}" y1="0" x2="${i * 60}" y2="${OG_H}"/>`).join('')}
    ${Array.from({ length: 12 }, (_, i) => `<line x1="0" y1="${i * 60}" x2="${OG_W}" y2="${i * 60}"/>`).join('')}
  </g>

  <g transform="translate(72, 110)">
    <rect width="160" height="32" rx="16" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.15)"/>
    <text x="80" y="21" font-family="Inter, system-ui, sans-serif" font-size="13" font-weight="600" letter-spacing="2" text-anchor="middle" fill="#a3a3a8">PORTFOLIO</text>
  </g>

  <text x="72" y="220" font-family="'Space Grotesk', Inter, system-ui, sans-serif" font-size="68" font-weight="800" letter-spacing="-2" fill="#fafafa">
    Jhon Rowel Abines
  </text>

  <text x="72" y="290" font-family="'Space Grotesk', Inter, system-ui, sans-serif" font-size="38" font-weight="700" letter-spacing="-1" fill="url(#brand)">
    AI Automation Specialist
  </text>
  <text x="72" y="338" font-family="'Space Grotesk', Inter, system-ui, sans-serif" font-size="38" font-weight="700" letter-spacing="-1" fill="url(#brand)">
    &amp; Web Developer
  </text>

  <text x="72" y="410" font-family="Inter, system-ui, sans-serif" font-size="22" font-weight="400" fill="#a3a3a8">
    Production n8n workflows. React + Supabase apps. Embedded systems.
  </text>

  <g transform="translate(72, 510)">
    <text x="0" y="20" font-family="Inter, system-ui, sans-serif" font-size="16" font-weight="500" fill="#8a8a93">
      Recent BIT graduate · Open to full-time roles
    </text>
    <text x="0" y="50" font-family="Inter, system-ui, sans-serif" font-size="14" font-weight="400" fill="#5b5b63">
      jraf2003@gmail.com   ·   github.com/JRAF2-0   ·   linkedin.com/in/jhonrowel20
    </text>
  </g>

  <rect x="72" y="240" width="80" height="4" rx="2" fill="url(#brand)"/>
</svg>
`)

await sharp(bg)
  .composite([{ input: portrait, top: 135, left: OG_W - 360 - 90 }])
  .png()
  .toFile(OG_OUT)

console.log(`og-image.png written (${fmtKB(statSync(OG_OUT).size)})`)
console.log('\n✓ Done\n')
