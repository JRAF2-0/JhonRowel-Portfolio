import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Reveals every element matching `selector` inside the given container ref
 * when it scrolls into view. Honors prefers-reduced-motion.
 */
export function useScrollReveal(containerRef, selector = '.reveal-up', deps = []) {
  useEffect(() => {
    const el = containerRef?.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      gsap.utils.toArray(selector).forEach((target) => {
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
    }, el)

    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
