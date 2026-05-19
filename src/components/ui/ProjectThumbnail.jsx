const gradientByTag = {
  capstone: 'from-amber-500/30 via-pink-500/20 to-rose-500/30',
  web: 'from-blue-500/30 via-cyan-500/20 to-sky-500/30',
  automation: 'from-violet-500/30 via-fuchsia-500/20 to-purple-500/30',
  freelance: 'from-amber-500/30 via-yellow-500/20 to-orange-500/30',
  internship: 'from-pink-500/30 via-rose-500/20 to-fuchsia-500/30',
}

/**
 * Renders a project image when available, or an attractive gradient
 * placeholder with the project initials when not.
 */
export default function ProjectThumbnail({ image, alt, tag, title, className = '' }) {
  if (image) {
    return (
      <div className={`overflow-hidden ${className}`}>
        <img
          src={image}
          alt={alt}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
    )
  }

  const initials = (title || '?')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()

  const gradient = gradientByTag[tag] ?? gradientByTag.web

  return (
    <div
      className={`relative grid place-items-center overflow-hidden bg-gradient-to-br ${gradient} ${className}`}
      aria-hidden="true"
    >
      {/* dotted noise */}
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            'radial-gradient(rgba(255,255,255,0.4) 1px, transparent 1px)',
          backgroundSize: '14px 14px',
        }}
      />
      <span className="relative font-display text-4xl font-black tracking-tight text-white/85 drop-shadow-lg">
        {initials}
      </span>
    </div>
  )
}
