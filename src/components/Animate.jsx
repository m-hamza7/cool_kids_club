import { useEffect, useRef, useState } from 'react'

/**
 * Wraps children in a div that animates into view when scrolled into the viewport.
 * animation: 'fade-up' | 'fade-in' | 'slide-left' | 'slide-right' | 'scale-up'
 * delay: ms delay before the transition starts (for staggered groups)
 */
export default function Animate({ children, className = '', animation = 'fade-up', delay = 0 }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -24px 0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`scroll-anim scroll-anim--${animation}${visible ? ' scroll-anim--visible' : ''} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  )
}
