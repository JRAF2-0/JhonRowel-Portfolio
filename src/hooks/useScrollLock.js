import { useEffect } from 'react'

/**
 * Locks page scroll while `active` is true.
 * Preserves the existing scrollbar gap to avoid layout shift.
 */
export function useScrollLock(active) {
  useEffect(() => {
    if (!active) return

    const original = {
      overflow: document.body.style.overflow,
      paddingRight: document.body.style.paddingRight,
    }
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth

    document.body.style.overflow = 'hidden'
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`
    }

    return () => {
      document.body.style.overflow = original.overflow
      document.body.style.paddingRight = original.paddingRight
    }
  }, [active])
}
