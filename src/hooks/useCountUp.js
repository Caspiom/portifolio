import { useState, useEffect, useRef } from 'react'

const DIGITS = '0123456789'

/**
 * Counts a number from 0 → target when the returned ref enters the viewport.
 * While counting, a random digit flickers at the "active" position.
 *
 * Returns: { displayValue: string, nodeRef }
 * displayValue is the animated number string (e.g. "17") + optional suffix.
 */
export function useCountUp(target, suffix = '', { duration = 1100, delay = 0 } = {}) {
  const [count, setCount]     = useState(0)
  const [flicker, setFlicker] = useState(false)
  const nodeRef  = useRef(null)
  const rafRef   = useRef(null)
  const tmrRef   = useRef(null)
  const firedRef = useRef(false)

  useEffect(() => {
    const el = nodeRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !firedRef.current) {
          firedRef.current = true
          observer.disconnect()

          tmrRef.current = setTimeout(() => {
            const start = performance.now()

            const tick = (now) => {
              const t     = Math.min((now - start) / duration, 1)
              const eased = 1 - Math.pow(1 - t, 3) // easeOutCubic
              const cur   = Math.floor(eased * target)

              setCount(cur)
              setFlicker(t < 0.88) // Flicker until near the end

              if (t < 1) {
                rafRef.current = requestAnimationFrame(tick)
              } else {
                setCount(target)
                setFlicker(false)
              }
            }

            rafRef.current = requestAnimationFrame(tick)
          }, delay)
        }
      },
      { threshold: 0.5 }
    )

    observer.observe(el)

    return () => {
      observer.disconnect()
      clearTimeout(tmrRef.current)
      cancelAnimationFrame(rafRef.current)
    }
  }, [target, delay, duration])

  // Build the display string: number + optional flicker char + suffix
  const flickerChar = flicker
    ? DIGITS[Math.floor(Math.random() * DIGITS.length)]
    : ''

  // Only show the flicker when count < target (not done yet)
  const displayValue = count < target && flicker
    ? `${count}${flickerChar}${suffix}`
    : `${count}${suffix}`

  return { displayValue, nodeRef }
}
