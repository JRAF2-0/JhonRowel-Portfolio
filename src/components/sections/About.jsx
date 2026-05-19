import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import profileImg from '../../assets/images/profile.webp'
import { profile } from '../../data/profile'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const ref = useRef(null)
  const imgRef = useRef(null)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      gsap.utils.toArray('.about-reveal').forEach((target) => {
        gsap.to(target, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: target,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        })
      })

      if (reduce) return

      // Image scale-on-scroll for cinematic depth
      gsap.fromTo(
        imgRef.current,
        { scale: 1.15, yPercent: -8 },
        {
          scale: 1,
          yPercent: 8,
          ease: 'none',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      )
    }, ref)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} id="about" className="relative py-28">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 px-6 md:grid-cols-2">
        {/* image */}
        <div className="relative">
          <div className="about-reveal reveal-up relative overflow-hidden rounded-3xl border border-border shadow-card">
            <div className="aspect-[4/5] w-full">
              <img
                ref={imgRef}
                src={profileImg}
                alt={profile.name}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-bg/40 via-transparent to-transparent" />
          </div>

          {/* stats */}
          <div className="about-reveal reveal-up mt-6 grid grid-cols-3 gap-3">
            {profile.stats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-border bg-card/60 px-4 py-4 backdrop-blur"
              >
                <p className="font-display text-2xl font-bold text-gradient">
                  {s.value}
                </p>
                <p className="mt-1 text-xs text-text-muted">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* text */}
        <div>
          <p className="about-reveal reveal-up text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            About me
          </p>
          <h2 className="about-reveal reveal-up mt-3 font-display text-4xl font-bold leading-tight tracking-tight md:text-5xl">
            A developer who likes <span className="text-gradient">finishing</span> things.
          </h2>

          {profile.about.map((p, i) => (
            <p
              key={i}
              className="about-reveal reveal-up mt-5 max-w-xl text-base leading-relaxed text-text-muted"
            >
              {p}
            </p>
          ))}

          <div className="about-reveal reveal-up mt-8 flex flex-wrap gap-3">
            <span className="rounded-full border border-border bg-card px-4 py-1.5 text-xs text-text-muted">
              📍 {profile.location}
            </span>
            <span className="rounded-full border border-border bg-card px-4 py-1.5 text-xs text-text-muted">
              🎓 BIT · CTU Moalboal
            </span>
            <span className="rounded-full border border-border bg-card px-4 py-1.5 text-xs text-text-muted">
              ⚡ Replies within 24h
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
