export default function SectionHeading({ kicker, title, action }) {
  return (
    <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
      <div>
        <p className="reveal-up text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          {kicker}
        </p>
        <h2 className="reveal-up mt-3 font-display text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
          {title}
        </h2>
      </div>
      {action}
    </div>
  )
}
