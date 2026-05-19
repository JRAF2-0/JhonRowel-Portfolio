import { useRef } from 'react'
import { Mail, Download } from 'lucide-react'
import { FaGithub, FaLinkedin, FaFacebook, FaInstagram } from 'react-icons/fa'
import { profile } from '../../data/profile'
import { useScrollReveal } from '../../hooks/useScrollReveal'

export default function Contact() {
  const ref = useRef(null)
  useScrollReveal(ref)

  return (
    <section ref={ref} id="contact" className="relative py-32">
      {/* glow */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center"
        aria-hidden="true"
      >
        <div className="h-[50vh] w-[80%] max-w-2xl rounded-full bg-accent/10 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-3xl px-6 text-center">
        <p className="reveal-up text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          Get in Touch
        </p>
        <h2 className="reveal-up mt-3 font-display text-4xl font-bold tracking-tight md:text-6xl">
          Let's <span className="text-gradient">connect</span>.
        </h2>
        <p className="reveal-up mx-auto mt-6 max-w-lg text-base leading-relaxed text-text-muted md:text-lg">
          Have an opportunity, a question, or just want to talk about AI, automation,
          or what I'm building? My inbox is open — I usually reply within a day.
        </p>

        {/* Primary actions: email + resume */}
        <div className="reveal-up mt-10 flex flex-wrap justify-center gap-3">
          <a
            href={profile.mailtoHref}
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-brand px-6 py-3 text-sm font-semibold text-white shadow-glow transition-transform hover:-translate-y-0.5"
          >
            <Mail size={18} />
            {profile.email}
          </a>
          <a
            href={profile.resumeUrl}
            download
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-6 py-3 text-sm font-semibold text-text transition-colors hover:border-border-strong"
          >
            <Download size={16} />
            Resume (PDF)
          </a>
        </div>

        {/* Professional links — front and center for recruiters */}
        <div className="reveal-up mt-5 flex flex-wrap justify-center gap-3">
          <a
            href={profile.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-lg border border-border bg-card px-5 py-2.5 text-sm font-semibold text-text transition-colors hover:border-border-strong"
          >
            <FaGithub size={16} className="text-text-muted group-hover:text-text" />
            GitHub
          </a>
          <a
            href={profile.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-lg border border-border bg-card px-5 py-2.5 text-sm font-semibold text-text transition-colors hover:border-border-strong"
          >
            <FaLinkedin size={16} className="text-[#0a66c2]" />
            LinkedIn
          </a>
          <a
            href={profile.social.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-5 py-2.5 text-sm font-semibold text-text transition-colors hover:border-border-strong"
          >
            <FaFacebook size={16} className="text-[#1877f2]" />
            Facebook
          </a>
          <a
            href={profile.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-5 py-2.5 text-sm font-semibold text-text transition-colors hover:border-border-strong"
          >
            <FaInstagram size={16} className="text-pink-400" />
            Instagram
          </a>
        </div>
      </div>
    </section>
  )
}
