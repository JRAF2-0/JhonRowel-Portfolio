import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import gsap from 'gsap'
import { X, ExternalLink, Calendar, ZoomIn } from 'lucide-react'
import { FaGithub } from 'react-icons/fa'
import { tagLabels } from '../../data/projects'
import { useScrollLock } from '../../hooks/useScrollLock'
import ProjectThumbnail from './ProjectThumbnail'
import Lightbox from './Lightbox'

const tagStyles = {
  capstone: 'border-amber-400/40 text-amber-200 bg-amber-400/10',
  web: 'border-blue-500/30 text-blue-300 bg-blue-500/5',
  automation: 'border-violet-500/30 text-violet-300 bg-violet-500/5',
  freelance: 'border-amber-500/30 text-amber-300 bg-amber-500/5',
  internship: 'border-pink-500/30 text-pink-300 bg-pink-500/5',
}

export default function CaseStudyModal({ project, onClose }) {
  const backdropRef = useRef(null)
  const panelRef = useRef(null)
  const open = Boolean(project)
  const [lightboxIndex, setLightboxIndex] = useState(null)

  useScrollLock(open)

  // ESC to close
  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  // GSAP enter animation
  useEffect(() => {
    if (!open) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        backdropRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.25, ease: 'power2.out' }
      )
      gsap.fromTo(
        panelRef.current,
        { y: 40, opacity: 0, scale: 0.98 },
        { y: 0, opacity: 1, scale: 1, duration: 0.45, ease: 'power3.out' }
      )
    })
    return () => ctx.revert()
  }, [open])

  if (!open) return null

  const cs = project.caseStudy ?? {}
  const gallery = cs.gallery ?? []

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-study-title"
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto"
    >
      {/* backdrop */}
      <button
        ref={backdropRef}
        type="button"
        aria-label="Close case study"
        onClick={onClose}
        className="fixed inset-0 cursor-default bg-black/70 backdrop-blur-sm"
      />

      {/* panel */}
      <div
        ref={panelRef}
        className="relative my-10 w-full max-w-4xl rounded-2xl border border-border bg-bg-soft shadow-card"
      >
        {/* cover */}
        <div className="relative aspect-[16/8] w-full overflow-hidden rounded-t-2xl">
          <ProjectThumbnail
            image={project.image}
            alt={project.title}
            tag={project.tag}
            title={project.title}
            className="h-full w-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-soft via-bg-soft/30 to-transparent" />

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-bg/70 text-white backdrop-blur transition-colors hover:bg-bg/90"
          >
            <X size={18} />
          </button>
        </div>

        <div className="space-y-10 p-6 md:p-10">
          {/* header */}
          <header>
            <div className="flex flex-wrap items-center gap-2 text-xs text-text-muted">
              <span
                className={`inline-block rounded-full border px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider ${
                  tagStyles[project.tag] ?? ''
                }`}
              >
                {tagLabels[project.tag]}
              </span>
              {cs.period && (
                <span className="inline-flex items-center gap-1.5">
                  <Calendar size={12} />
                  {cs.period}
                </span>
              )}
              <span className="text-text-faint">·</span>
              <span>{project.client}</span>
            </div>
            <h2
              id="case-study-title"
              className="mt-3 font-display text-3xl font-bold tracking-tight md:text-4xl"
            >
              {project.title}
            </h2>
            <p className="mt-3 max-w-2xl text-text-muted">
              {project.description}
            </p>
          </header>

          {/* problem / approach / outcome */}
          <div className="grid gap-6 md:grid-cols-3">
            {cs.problem && (
              <Block label="The problem" body={cs.problem} />
            )}
            {cs.approach && (
              <Block label="My approach" body={cs.approach} />
            )}
            {cs.outcome && (
              <Block label="Outcome" body={cs.outcome} />
            )}
          </div>

          {/* gallery */}
          {gallery.length > 0 && (
            <section>
              <SectionLabel>Gallery</SectionLabel>
              <p className="mt-2 text-xs text-text-faint">
                Click any image to enlarge.
              </p>
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {gallery.map((src, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setLightboxIndex(i)}
                    aria-label={`Open image ${i + 1} of ${gallery.length}`}
                    className="group relative aspect-video w-full overflow-hidden rounded-lg border border-border transition-colors hover:border-border-strong focus:outline-none focus:ring-2 focus:ring-accent"
                  >
                    <img
                      src={src}
                      alt={`${project.title} screenshot ${i + 1}`}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="pointer-events-none absolute inset-0 grid place-items-center bg-black/0 transition-colors group-hover:bg-black/30">
                      <span className="grid h-10 w-10 place-items-center rounded-full bg-white/10 opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
                        <ZoomIn size={18} className="text-white" />
                      </span>
                    </span>
                  </button>
                ))}
              </div>
            </section>
          )}

          {/* detailed features */}
          {cs.detailedFeatures?.length > 0 && (
            <section>
              <SectionLabel>Key features</SectionLabel>
              <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
                {cs.detailedFeatures.map((f) => (
                  <div
                    key={f.title}
                    className="rounded-xl border border-border bg-card p-4"
                  >
                    <p className="font-display text-sm font-semibold">
                      {f.title}
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-text-muted">
                      {f.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* tech */}
          <section>
            <SectionLabel>Tech stack</SectionLabel>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-border bg-card px-3 py-1 text-xs text-text"
                >
                  {t}
                </span>
              ))}
            </div>
          </section>

          {/* links */}
          {(project.liveUrl || project.repoUrl) && (
            <section className="flex flex-wrap gap-3 border-t border-border pt-6">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-gradient-brand px-5 py-2.5 text-sm font-semibold text-white shadow-glow transition-transform hover:-translate-y-0.5"
                >
                  <ExternalLink size={16} />
                  Live demo
                </a>
              )}
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-5 py-2.5 text-sm font-semibold text-text transition-colors hover:border-border-strong"
                >
                  <FaGithub size={16} />
                  View code
                </a>
              )}
            </section>
          )}
        </div>
      </div>

      <Lightbox
        images={gallery}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onPrev={() =>
          setLightboxIndex((i) =>
            i === null ? null : (i - 1 + gallery.length) % gallery.length
          )
        }
        onNext={() =>
          setLightboxIndex((i) =>
            i === null ? null : (i + 1) % gallery.length
          )
        }
        alt={project.title}
      />
    </div>,
    document.body
  )
}

function SectionLabel({ children }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
      {children}
    </p>
  )
}

function Block({ label, body }) {
  return (
    <div>
      <SectionLabel>{label}</SectionLabel>
      <p className="mt-3 text-sm leading-relaxed text-text-muted">{body}</p>
    </div>
  )
}
