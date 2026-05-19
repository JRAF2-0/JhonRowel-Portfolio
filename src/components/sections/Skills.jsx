import { useRef } from 'react'
import { skillGroups } from '../../data/skills'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import SectionHeading from '../ui/SectionHeading'

export default function Skills() {
  const ref = useRef(null)
  useScrollReveal(ref)

  return (
    <section ref={ref} id="skills" className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading kicker="Tech Stack" title="Skills & Tools" />

        <div className="space-y-10">
          {skillGroups.map((group) => (
            <div key={group.title} className="reveal-up">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-text-faint">
                {group.title}
              </p>
              <div className="flex flex-wrap gap-3">
                {group.skills.map(({ name, Icon }) => (
                  <div
                    key={name}
                    className="group inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium text-text transition-all hover:-translate-y-0.5 hover:border-accent hover:bg-card-hover"
                  >
                    <Icon className="h-4 w-4 text-text-muted transition-colors group-hover:text-accent" />
                    {name}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
