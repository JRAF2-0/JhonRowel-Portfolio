import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import gsap from 'gsap'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

/**
 * Full-screen image lightbox with optional prev/next navigation.
 * Composes on top of any existing modal — uses a higher z-index.
 */
export default function Lightbox({ images, index, onClose, onPrev, onNext, alt }) {
  const isOpen = index !== null && index !== undefined && images?.[index]
  const backdropRef = useRef(null)
  const imageRef = useRef(null)

  // Keyboard nav
  useEffect(() => {
    if (!isOpen) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight' && onNext) onNext()
      if (e.key === 'ArrowLeft' && onPrev) onPrev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, onClose, onNext, onPrev])

  // Enter animation
  useEffect(() => {
    if (!isOpen) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        backdropRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.2, ease: 'power2.out' }
      )
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, scale: 0.96 },
        { opacity: 1, scale: 1, duration: 0.35, ease: 'power3.out' }
      )
    })
    return () => ctx.revert()
  }, [isOpen, index])

  if (!isOpen) return null

  const hasMultiple = images.length > 1
  const src = images[index]

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Image viewer"
      className="fixed inset-0 z-[200] flex items-center justify-center"
    >
      {/* backdrop */}
      <button
        ref={backdropRef}
        type="button"
        aria-label="Close image"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-black/90 backdrop-blur-md"
      />

      {/* close */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute right-6 top-6 z-10 grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-bg/70 text-white backdrop-blur transition-colors hover:bg-bg/90"
      >
        <X size={20} />
      </button>

      {/* counter */}
      {hasMultiple && (
        <div className="absolute left-1/2 top-6 z-10 -translate-x-1/2 rounded-full border border-white/15 bg-bg/70 px-3 py-1 text-xs text-white/90 backdrop-blur">
          {index + 1} / {images.length}
        </div>
      )}

      {/* prev */}
      {hasMultiple && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            onPrev?.()
          }}
          aria-label="Previous image"
          className="absolute left-4 top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-bg/70 text-white backdrop-blur transition-colors hover:bg-bg/90 md:left-8"
        >
          <ChevronLeft size={22} />
        </button>
      )}

      {/* image */}
      <img
        ref={imageRef}
        src={src}
        alt={alt ? `${alt} — image ${index + 1}` : `Image ${index + 1}`}
        className="relative z-[1] max-h-[88vh] max-w-[92vw] rounded-lg object-contain shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      />

      {/* next */}
      {hasMultiple && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            onNext?.()
          }}
          aria-label="Next image"
          className="absolute right-4 top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-bg/70 text-white backdrop-blur transition-colors hover:bg-bg/90 md:right-8"
        >
          <ChevronRight size={22} />
        </button>
      )}
    </div>,
    document.body
  )
}
