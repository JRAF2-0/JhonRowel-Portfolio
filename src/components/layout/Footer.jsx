import { FaGithub, FaLinkedin, FaFacebook, FaInstagram } from 'react-icons/fa'
import { Mail } from 'lucide-react'
import { profile } from '../../data/profile'

const socials = [
  { href: profile.social.github, Icon: FaGithub, label: 'GitHub' },
  { href: profile.social.linkedin, Icon: FaLinkedin, label: 'LinkedIn' },
  { href: profile.social.facebook, Icon: FaFacebook, label: 'Facebook' },
  { href: profile.social.instagram, Icon: FaInstagram, label: 'Instagram' },
]

export default function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-xs text-text-muted md:flex-row">
        <p>
          © {new Date().getFullYear()} {profile.name}. All rights reserved.
        </p>

        <div className="flex items-center gap-2">
          {socials.map(({ href, Icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="grid h-9 w-9 place-items-center rounded-lg border border-border bg-card text-text-muted transition-colors hover:border-border-strong hover:text-text"
            >
              <Icon size={14} />
            </a>
          ))}
          <a
            href={profile.mailtoHref}
            aria-label="Email"
            className="grid h-9 w-9 place-items-center rounded-lg border border-border bg-card text-text-muted transition-colors hover:border-border-strong hover:text-text"
          >
            <Mail size={14} />
          </a>
        </div>
      </div>
    </footer>
  )
}
