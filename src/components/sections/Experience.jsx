import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  GraduationCap,
  Briefcase,
  Award,
  Sparkles,
} from 'lucide-react'
import { experience } from '../../data/experience'
import SectionHeading from '../ui/SectionHeading'

gsap.registerPlugin(ScrollTrigger)

const kindMeta = {
  now: {
    Icon: Sparkles,
    label: 'Currently',
    ring: 'from-accent to-accent-2',
    dot: 'bg-accent',
  },
  capstone: {
    Icon: Award,
    label: 'Capstone',
    ring: 'from-amber-400 to-pink-500',
    dot: 'bg-amber-400',
  },
  internship: {
    Icon: Briefcase,
    label: 'Internship',
    ring: 'from-violet-400 to-fuchsia-500',
    dot: 'bg-violet-400',
  },
  education: {
    Icon: GraduationCap,
    label: 'Education',
    ring: 'from-blue-400 to-cyan-400',
    dot: 'bg-blue-400',
  },
}

export default function Experience() {
  const ref = useRef(null)
  const lineRef = useRef(null)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      // Staggered card reveals
      gsap.utils.toArray('.timeline-item').forEach((target) => {
        gsap.to(target, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: target,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        })
      })

      if (reduce) return

      // Vertical progress line fills as you scroll
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          transformOrigin: 'top center',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 70%',
            end: 'bottom 70%',
            scrub: true,
          },
        }
      )
    }, ref)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} id="experience" className="relative py-28">
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeading kicker="Journey" title="Experience & Education" />

        <div className="relative">
          {/* base rail */}
          <div className="absolute left-4 top-0 bottom-0 w-px bg-border md:left-1/2 md:-translate-x-1/2" />
          {/* animated progress rail */}
          <div
            ref={lineRef}
            className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-accent via-accent-2 to-pink-500 md:left-1/2 md:-translate-x-1/2"
            style={{ transformOrigin: 'top center' }}
          />

          <ol className="relative space-y-12 md:space-y-16">
            {experience.map((item, i) => {
              const meta = kindMeta[item.kind] ?? kindMeta.education
              const onLeft = i % 2 === 0
              const Icon = meta.Icon

              return (
                <li
                  key={item.title + item.period}
                  className="timeline-item reveal-up relative md:grid md:grid-cols-2 md:gap-12"
                >
                  {/* dot on rail */}
                  <span
                    className={`absolute left-4 top-2 z-10 -translate-x-1/2 rounded-full p-[3px] md:left-1/2`}
                    aria-hidden="true"
                  >
                    <span
                      className={`block h-4 w-4 rounded-full bg-gradient-to-br ${meta.ring} ring-4 ring-bg`}
                    />
                  </span>

                  {/* card — alternates sides on md+ */}
                  <div
                    className={`ml-12 md:ml-0 ${
                      onLeft ? 'md:col-start-1 md:pr-10 md:text-right' : 'md:col-start-2 md:pl-10'
                    }`}
                  >
                    <div className="group rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-border-strong">
                      <div
                        className={`mb-3 flex items-center gap-2 ${
                          onLeft ? 'md:flex-row-reverse md:justify-start' : ''
                        }`}
                      >
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-bg-soft px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-widest text-text-muted">
                          <Icon size={11} />
                          {meta.label}
                        </span>
                        <span className="text-xs text-text-faint">
                          {item.period}
                        </span>
                      </div>

                      <h3 className="font-display text-lg font-semibold leading-snug tracking-tight">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-sm text-text-muted">{item.org}</p>
                      {item.location && (
                        <p className="mt-0.5 text-xs text-text-faint">
                          {item.location}
                        </p>
                      )}

                      <ul
                        className={`mt-4 space-y-1.5 ${
                          onLeft ? 'md:text-right' : ''
                        }`}
                      >
                        {item.highlights.map((h) => (
                          <li
                            key={h}
                            className="text-xs leading-relaxed text-text-muted"
                          >
                            <span
                              className={`text-accent ${
                                onLeft ? 'md:hidden' : 'mr-1.5'
                              }`}
                            >
                              –
                            </span>
                            {h}
                            <span
                              className={`text-accent ${
                                onLeft ? 'ml-1.5 hidden md:inline' : 'hidden'
                              }`}
                            >
                              –
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}
