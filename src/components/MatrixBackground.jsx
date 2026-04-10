import { useEffect, useRef } from 'react'
import './MatrixBackground.css'

const CHARS = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ<>{}[]=+*#@!'

const FONT_SIZE = 13
const PURPLE = [137, 87, 229]
const TEAL   = [62, 204, 193]

function lerp(a, b, t) { return a + (b - a) * t }

export default function MatrixBackground() {
  const canvasRef = useRef(null)

  /* ── Mask spreads as user scrolls through the hero ── */
  useEffect(() => {
    const canvas = canvasRef.current

    const onScroll = () => {
      // t goes 0→1 as you scroll one full viewport height
      const t = Math.min(window.scrollY / window.innerHeight, 1)

      if (t === 0) {
        // Let the CSS class handle the default mask
        canvas.style.maskImage = ''
        canvas.style.webkitMaskImage = ''
        return
      }

      // Expand the ellipse from a tight top-center area to full viewport coverage
      const ellW    = 100 + t * 300        // 100% → 400% (far exceeds viewport)
      const ellH    = 100 + t * 300
      const opaque  = 40  + t * 58        // opaque zone 40% → 98% of ellipse radius
      const centerY = t * 50              // center drifts down: 0% → 50%

      const mask = `radial-gradient(ellipse ${ellW}% ${ellH}% at 50% ${centerY}%, black ${opaque}%, transparent 100%)`
      canvas.style.maskImage        = mask
      canvas.style.webkitMaskImage  = mask
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* ── Canvas animation (original, unchanged) ── */
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx    = canvas.getContext('2d')

    let w, h, cols, trails, raf, lastTime = 0

    function buildTrails() {
      cols   = Math.floor(w / FONT_SIZE)
      trails = Array.from({ length: cols }, () => {
        const active = Math.random() < 0.38
        const color  = Math.random() < 0.55 ? PURPLE : TEAL
        return {
          active,
          y:         active ? Math.random() * (h / FONT_SIZE) : 0,
          speed:     0.12 + Math.random() * 0.22,
          trailLen:  5 + Math.floor(Math.random() * 9),
          color,
          chars:     Array.from({ length: 30 }, () => CHARS[Math.floor(Math.random() * CHARS.length)]),
          charFrame: Math.floor(Math.random() * 30),
          restTimer: active ? 0 : Math.random() * 300,
        }
      })
    }

    function resize() {
      w = window.innerWidth
      h = window.innerHeight
      canvas.width  = w
      canvas.height = h
      buildTrails()
    }

    resize()
    window.addEventListener('resize', resize)

    function draw(time) {
      raf = requestAnimationFrame(draw)
      const dt = Math.min(time - lastTime, 50)
      lastTime = time

      ctx.clearRect(0, 0, w, h)
      ctx.font      = `${FONT_SIZE}px "JetBrains Mono", monospace`
      ctx.textAlign = 'left'

      const rows = h / FONT_SIZE

      for (let i = 0; i < trails.length; i++) {
        const tr = trails[i]

        if (!tr.active) {
          tr.restTimer -= dt / 16
          if (tr.restTimer <= 0) {
            tr.active   = true
            tr.y        = -tr.trailLen
            tr.speed    = 0.12 + Math.random() * 0.22
            tr.trailLen = 5 + Math.floor(Math.random() * 9)
            tr.color    = Math.random() < 0.55 ? PURPLE : TEAL
          }
          continue
        }

        tr.y += tr.speed * (dt / 16)

        tr.charFrame += dt / 16
        if (tr.charFrame > 8 + Math.random() * 12) {
          tr.charFrame = 0
          const idx = Math.floor(Math.random() * tr.chars.length)
          tr.chars[idx] = CHARS[Math.floor(Math.random() * CHARS.length)]
        }

        const headRow = Math.floor(tr.y)
        const x       = i * FONT_SIZE

        for (let j = 0; j <= tr.trailLen; j++) {
          const row = headRow - j
          if (row < 0 || row > rows) continue

          const progress = j / tr.trailLen
          const opacity  = lerp(0.42, 0.02, Math.pow(progress, 0.7))

          const [r, g, b] = tr.color
          ctx.fillStyle = `rgba(${r},${g},${b},${opacity})`
          const char = tr.chars[(row + tr.chars.length) % tr.chars.length]
          ctx.fillText(char, x, row * FONT_SIZE)
        }

        if ((headRow - tr.trailLen) > rows) {
          tr.active    = false
          tr.restTimer = 40 + Math.random() * 180
        }
      }
    }

    raf = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="matrix-bg" />
}
