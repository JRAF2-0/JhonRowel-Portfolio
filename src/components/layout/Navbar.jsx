import { useEffect, useState } from 'react'
import { Menu, X, Download } from 'lucide-react'
import { profile } from '../../data/profile'

const links = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'backdrop-blur-xl bg-bg/70 border-b border-border'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="#hero" className="font-display text-lg font-bold tracking-tight">
          <span className="text-gradient">{profile.shortName}</span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-text-muted transition-colors hover:text-text"
            >
              {l.label}
            </a>
          ))}
          <a
            href={profile.resumeUrl}
            download
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-brand px-4 py-2 text-sm font-semibold text-white shadow-glow transition-transform hover:-translate-y-0.5"
          >
            <Download size={14} />
            Resume
          </a>
        </div>

        <button
          className="md:hidden text-text"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-bg/95 backdrop-blur-xl">
          <div className="flex flex-col gap-4 px-6 py-5">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-text-muted hover:text-text"
              >
                {l.label}
              </a>
            ))}
            <a
              href={profile.resumeUrl}
              download
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-brand px-4 py-2 text-sm font-semibold text-white"
            >
              <Download size={14} />
              Download Resume
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
