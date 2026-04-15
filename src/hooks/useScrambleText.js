import { useState, useEffect, useRef } from 'react'

const CHARS = 'アイウエオカキクケコサシスセソタチツテトナニヌネノ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ<>{}[]=+*#@!'

/**
 * Animates text from random matrix characters → real text, left-to-right.
 * @param {string} target  - The final text to reveal
 * @param {object} options
 * @param {number} options.delay    - ms before animation starts (default 0)
 * @param {number} options.duration - ms for full decode (default 900)
 * @param {boolean} options.trigger - set false to skip animation entirely
 */
export function useScrambleText(target, { delay = 0, duration = 900, trigger = true } = {}) {
  const [output, setOutput] = useState(() => '\u00A0'.repeat(target.length))
  const rafRef = useRef(null)
  const tmrRef = useRef(null)

  useEffect(() => {
    if (!trigger) {
      setOutput(target)
      return
    }

    // Start invisible (spaces preserve layout while opacity:0 from CSS)
    setOutput('\u00A0'.repeat(target.length))

    tmrRef.current = setTimeout(() => {
      const start = performance.now()

      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1)
        const revealed = Math.floor(progress * target.length)
        let out = ''

        for (let i = 0; i < target.length; i++) {
          const ch = target[i]
          if (ch === ' ') {
            out += ' '
          } else if (i < revealed) {
            out += ch
          } else if (i <= revealed + 1) {
            // The "cursor" char: random matrix char
            out += CHARS[Math.floor(Math.random() * CHARS.length)]
          } else {
            out += '\u00A0'
          }
        }

        setOutput(out)

        if (progress < 1) {
          rafRef.current = requestAnimationFrame(tick)
        } else {
          setOutput(target)
        }
      }

      rafRef.current = requestAnimationFrame(tick)
    }, delay)

    return () => {
      clearTimeout(tmrRef.current)
      cancelAnimationFrame(rafRef.current)
    }
  }, [target, delay, duration, trigger])

  return output
}
