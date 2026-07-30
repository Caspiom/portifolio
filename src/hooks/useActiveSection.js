import { useState, useEffect } from 'react'

/**
 * Tracks which section is currently in view so the navbar can show it.
 *
 * Returns the id of the section nearest the top of the viewport, or '' before
 * the observer has reported anything (which is also what the server render
 * sees, so the markup matches on hydration).
 *
 * Uses IntersectionObserver rather than a scroll handler for the same reason
 * App.jsx does: visibility checks stay off the main thread instead of us
 * measuring every section on every scroll frame.
 */
export function useActiveSection(ids) {
  const [active, setActive] = useState('')

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return

    const els = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean)

    if (!els.length) return

    // Tracked outside the callback because each callback only reports the
    // entries that *changed*, not everything currently on screen.
    const visible = new Set()

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visible.add(entry.target)
          else visible.delete(entry.target)
        })

        if (!visible.size) return

        // Topmost wins: with two sections on screen the one you have scrolled
        // into is the one you are reading.
        //
        // Positions are measured here rather than read off entry.boundingClientRect,
        // because that rectangle is from the moment the entry crossed the
        // threshold. Comparing a value captured several hundred pixels ago
        // against a fresh one picks the wrong section. This only runs when a
        // section enters or leaves the band, not per scroll frame.
        let top = null
        let topY = Infinity
        visible.forEach((el) => {
          const y = el.getBoundingClientRect().top
          if (y < topY) { topY = y; top = el }
        })

        if (top) setActive(top.id)
      },
      // Ignore the band under the fixed navbar, and only count a section once
      // a real amount of it is showing.
      { rootMargin: '-25% 0px -55% 0px' },
    )

    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [ids])

  return active
}
