import { ExternalLink, ArrowUpRight } from 'lucide-react'
import { FaGithub } from 'react-icons/fa'
import { tagLabels } from '../../data/projects'
import ProjectThumbnail from './ProjectThumbnail'

const tagStyles = {
  capstone: 'border-amber-400/40 text-amber-200 bg-amber-400/10',
  web: 'border-blue-500/30 text-blue-300 bg-blue-500/5',
  automation: 'border-violet-500/30 text-violet-300 bg-violet-500/5',
  freelance: 'border-amber-500/30 text-amber-300 bg-amber-500/5',
  internship: 'border-pink-500/30 text-pink-300 bg-pink-500/5',
}

export default function ProjectCard({ project, onOpenCaseStudy }) {
  const hasCaseStudy = Boolean(project.caseStudy)
  const hasLinks = Boolean(project.liveUrl || project.repoUrl)

  return (
    <article className="reveal-up group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-1 hover:border-border-strong hover:bg-card-hover">
      {/* thumbnail — clickable if there's a case study */}
      {hasCaseStudy ? (
        <button
          type="button"
          onClick={() => onOpenCaseStudy?.(project)}
          className="relative block aspect-[16/10] w-full overflow-hidden focus:outline-none focus:ring-2 focus:ring-accent"
          aria-label={`Open case study for ${project.title}`}
        >
          <ProjectThumbnail
            image={project.image}
            alt={project.title}
            tag={project.tag}
            title={project.title}
            className="h-full w-full"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-card/80 via-card/0 to-card/0" />
          <span className="pointer-events-none absolute right-3 top-3 inline-flex items-center gap-1 rounded-full border border-white/15 bg-bg/70 px-2.5 py-1 text-[10px] font-medium uppercase tracking-widest text-white/90 backdrop-blur transition-all group-hover:bg-bg/90">
            Case study
            <ArrowUpRight size={11} />
          </span>
        </button>
      ) : (
        <div className="relative aspect-[16/10] w-full">
          <ProjectThumbnail
            image={project.image}
            alt={project.title}
            tag={project.tag}
            title={project.title}
            className="h-full w-full"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-card/80 via-card/0 to-card/0" />
        </div>
      )}

      <div className="flex flex-1 flex-col p-6">
        <header className="mb-2 flex items-start justify-between gap-3">
          <h3 className="font-display text-lg font-semibold leading-snug tracking-tight">
            {project.title}
          </h3>
          <span
            className={`inline-block whitespace-nowrap rounded-full border px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider ${
              tagStyles[project.tag] ?? ''
            }`}
          >
            {tagLabels[project.tag]}
          </span>
        </header>

        <p className="text-sm leading-relaxed text-text-muted">
          {project.description}
        </p>

        <ul className="mt-4 flex-1 space-y-1.5">
          {project.features.map((f) => (
            <li key={f} className="text-xs text-text-muted">
              <span className="mr-1.5 text-accent">–</span>
              {f}
            </li>
          ))}
        </ul>

        <footer className="mt-6 space-y-3 border-t border-border pt-4">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            {project.tech.map((t, i) => (
              <span key={t} className="text-[11px] text-text-muted">
                {t}
                {i < project.tech.length - 1 && (
                  <span className="ml-2 text-text-faint">·</span>
                )}
              </span>
            ))}
          </div>

          {(hasLinks || hasCaseStudy) && (
            <div className="flex flex-wrap items-center gap-2">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-md border border-border bg-bg-soft px-2.5 py-1 text-[11px] font-medium text-text-muted transition-colors hover:border-border-strong hover:text-text"
                >
                  <ExternalLink size={11} />
                  Live demo
                </a>
              )}
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-md border border-border bg-bg-soft px-2.5 py-1 text-[11px] font-medium text-text-muted transition-colors hover:border-border-strong hover:text-text"
                >
                  <FaGithub size={11} />
                  Code
                </a>
              )}
              {hasCaseStudy && (
                <button
                  type="button"
                  onClick={() => onOpenCaseStudy?.(project)}
                  className="ml-auto inline-flex items-center gap-1 text-[11px] font-medium text-accent transition-colors hover:text-accent-2"
                >
                  Read case study
                  <ArrowUpRight size={11} />
                </button>
              )}
            </div>
          )}

          <p className="text-[10px] uppercase tracking-widest text-text-faint">
            {project.client}
          </p>
        </footer>
      </div>
    </article>
  )
}
