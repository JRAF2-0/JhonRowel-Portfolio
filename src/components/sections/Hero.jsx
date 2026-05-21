import { useRef, useEffect } from 'react'
import { ArrowRight, Sparkles, Download } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import profileImg from '../../assets/images/profile.webp'
import { profile } from '../../data/profile'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const sectionRef = useRef(null)
  const portraitRef = useRef(null)
  const glowRef = useRef(null)
  const titleRef = useRef(null)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      // Intro: stagger lines + portrait
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.from('.hero-line', {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
      })
        .from('.hero-side', { opacity: 0, duration: 0.8 }, '-=0.6')
        .from(
          '.hero-portrait',
          { scale: 1.15, opacity: 0, duration: 1.2, ease: 'power4.out' },
          '-=0.9'
        )

      if (reduce) return

      // Scroll parallax — portrait moves up, glow drifts down
      gsap.to(portraitRef.current, {
        yPercent: -18,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })

      gsap.to(glowRef.current, {
        yPercent: 25,
        scale: 1.1,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })

      // Subtle fade out of headline content as you scroll past
      gsap.to('.hero-fade', {
        opacity: 0,
        y: -40,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '60% top',
          scrub: true,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative isolate min-h-screen overflow-hidden pt-28 pb-20"
    >
      {/* Background glow */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden="true"
      >
        <div className="absolute left-1/2 top-1/3 h-[60vh] w-[60vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/20 blur-[120px]" />
        <div className="absolute right-1/4 top-1/2 h-[40vh] w-[40vh] rounded-full bg-accent-2/20 blur-[120px]" />
      </div>

      {/* Grid texture */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
        aria-hidden="true"
      />

      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 md:grid-cols-[1.1fr_0.9fr]">
        {/* Text column */}
        <div className="hero-fade">
          <div className="hero-line inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-3 py-1 text-xs uppercase tracking-widest text-text-muted backdrop-blur">
            <Sparkles size={12} className="text-accent" />
            Open to opportunities
          </div>

          <h1
            ref={titleRef}
            className="mt-6 font-display text-5xl font-bold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl"
          >
            <span className="hero-line block">I build things</span>
            <span className="hero-line block">
              for the <span className="text-gradient">web</span>
            </span>
            <span className="hero-line mt-3 block text-3xl font-medium text-text-muted md:text-4xl lg:text-5xl">
              &amp; automations that ship.
            </span>
          </h1>

          <p className="hero-line mt-7 max-w-lg text-base leading-relaxed text-text-muted md:text-lg">
            Hi, I'm <span className="text-text">{profile.shortName}</span> — an{' '}
            {profile.role.toLowerCase()} {profile.tagline}.
          </p>

          <div className="hero-line mt-9 flex flex-wrap items-center gap-4">
            <a
              href={profile.resumeUrl}
              download
              className="group inline-flex items-center gap-2 rounded-lg bg-gradient-brand px-6 py-3 text-sm font-semibold text-white shadow-glow transition-transform hover:-translate-y-0.5"
            >
              <Download
                size={16}
                className="transition-transform group-hover:translate-y-0.5"
              />
              Download Resume
            </a>
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-lg border border-border px-6 py-3 text-sm font-semibold text-text-muted transition-colors hover:border-border-strong hover:text-text"
            >
              See my work
              <ArrowRight
                size={14}
                className="transition-transform group-hover:translate-x-1"
              />
            </a>
          </div>
        </div>

        {/* Portrait column */}
        <div className="hero-side relative mx-auto w-full max-w-sm md:max-w-none">
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl ring-gradient shadow-card">
            <img
              ref={portraitRef}
              src={profileImg}
              alt={profile.name}
              className="hero-portrait absolute inset-0 h-[115%] w-full object-cover object-top"
              loading="eager"
              draggable="false"
            />
            {/* gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-bg/90 via-bg/0 to-bg/0" />
            {/* corner caption */}
            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
              <div>
                <p className="text-xs uppercase tracking-widest text-text-muted">
                  Developer · {profile.location}
                </p>
                <p className="font-display text-xl font-semibold">
                  {profile.shortName}
                </p>
              </div>
              <span className="rounded-full border border-border-strong bg-bg/60 px-3 py-1 text-[10px] uppercase tracking-widest text-text-muted backdrop-blur">
                v.2026
              </span>
            </div>
          </div>

          {/* floating chip */}
          <div className="absolute -left-4 top-10 hidden -rotate-6 rounded-2xl border border-border bg-card/80 px-4 py-3 backdrop-blur md:block">
            <p className="text-[10px] uppercase tracking-widest text-text-muted">
              Currently
            </p>
            <p className="font-display text-sm font-semibold">
              Building AI workflows
            </p>
          </div>
        </div>
      </div>

      {/* scroll hint */}
      <div className="hero-fade pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 text-xs uppercase tracking-widest text-text-faint">
        scroll
      </div>
    </section>
  )
}
