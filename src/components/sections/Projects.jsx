import { useRef, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { featuredProjects, allProjects } from '../../data/projects'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import SectionHeading from '../ui/SectionHeading'
import ProjectCard from '../ui/ProjectCard'
import CaseStudyModal from '../ui/CaseStudyModal'

export default function Projects() {
  const ref = useRef(null)
  const [showAll, setShowAll] = useState(false)
  const [activeProject, setActiveProject] = useState(null)
  const projects = showAll ? allProjects : featuredProjects

  useScrollReveal(ref, '.reveal-up', [showAll])

  return (
    <section ref={ref} id="projects" className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          kicker="Featured Projects"
          title="Selected Work"
          action={
            <button
              onClick={() => setShowAll((s) => !s)}
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-xs font-medium text-text-muted transition-colors hover:border-border-strong hover:text-text"
            >
              {showAll ? 'show featured' : 'see all projects'}
              <ArrowRight size={12} />
            </button>
          }
        />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <ProjectCard
              key={p.title}
              project={p}
              onOpenCaseStudy={setActiveProject}
            />
          ))}
        </div>
      </div>

      <CaseStudyModal
        key={activeProject?.title}
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </section>
  )
}
