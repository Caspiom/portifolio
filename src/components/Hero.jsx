import { useEffect, useRef } from 'react'
import { useLang } from '../context/LanguageContext'
import { t } from '../i18n/translations'
import { useScrambleText } from '../hooks/useScrambleText'
import WireGlobe from './WireGlobe'
import './Hero.css'

export default function Hero() {
  const { lang } = useLang()
  const tx = t[lang].hero
  const glowLeftRef = useRef(null)
  const glowRightRef = useRef(null)
  const stageRef = useRef(null)
  const contentRef = useRef(null)

  // Monospace, so the swapping glyphs can't reflow anything around them —
  // which is why the effect stays off the display-scale role below.
  const greetingDecoded = useScrambleText(tx.greeting, { delay: 100, duration: 700 })

  useEffect(() => {
    // Skip parallax on touch/small screens and when the user prefers reduced
    // motion: it's a purely decorative desktop flourish, and running transform
    // writes on every scroll frame is wasteful (and jittery) on phones.
    const enabled = window.matchMedia(
      '(min-width: 700px) and (pointer: fine) and (prefers-reduced-motion: no-preference)',
    ).matches
    if (!enabled) return

    let ticking = false
    const apply = () => {
      const y = window.scrollY
      if (glowLeftRef.current)
        glowLeftRef.current.style.transform = `translateY(${y * 0.2}px)`
      if (glowRightRef.current)
        glowRightRef.current.style.transform = `translateY(${y * -0.14}px)`
      // The band drifts faster than the copy, so the object reads as sitting
      // deeper. Applied to the band and not the object itself, so it doesn't
      // fight the float keyframes running on the object.
      if (stageRef.current)
        stageRef.current.style.transform = `translateY(${y * 0.16}px)`
      if (contentRef.current)
        contentRef.current.style.transform = `translateY(${y * 0.07}px)`
      ticking = false
    }

    // Coalesce scroll events into one rAF-aligned write per frame.
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(apply)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section id="hero" className="hero">
      <div ref={glowLeftRef} className="hero__glow hero__glow--left" />
      <div ref={glowRightRef} className="hero__glow hero__glow--right" />

      {/* Corner metadata. The name and location half of this moved into the
          navbar, which is where it now leads the page from. */}
      <div className="hero__corners hero__anim hero__anim--1">
        <div className="hero__corner hero__corner--end">
          <span className="hud hud--bright">{tx.portfolio}</span>
          <span className="hud">{tx.role}</span>
        </div>
      </div>

      {/* The centrepiece gets its own flex band rather than being positioned
          absolutely. Taking part in the layout is what guarantees it can never
          land on top of the display type, whatever the viewport is. */}
      <div ref={stageRef} className="hero__stage">
        <div className="hero__object">
          <WireGlobe />
        </div>
      </div>

      <div ref={contentRef} className="hero__content">
        <div className="hero__status-row hero__anim hero__anim--2">
          <span className="hud-box hero__status">
            <span className="hero__status-dot" aria-hidden="true" />
            {tx.status}
          </span>
          <span className="rule" />
          {/* Decorative greeting; the matrix rain behind it is the same script. */}
          <span className="hero__ja" aria-hidden="true">ようこそ</span>
        </div>

        <p className="hero__greeting hero__anim hero__anim--3">{greetingDecoded}</p>

        {/* The role carries the display scale, the way the reference does.
            The name still leads the page, from the corner block above. */}
        <p className="hero__student hero__anim hero__anim--4">{tx.student}</p>
        <h1 className="hero__role hero__anim hero__anim--5">{tx.roleBig}</h1>

        <div className="hero__divider hero__anim hero__anim--5" />

        <div className="hero__lower">
          <p
            className="hero__bio hero__anim hero__anim--6"
            dangerouslySetInnerHTML={{ __html: tx.bio }}
          />

          <div className="hero__side">
            <div className="hero__actions hero__anim hero__anim--6">
              <a href="#projects" className="btn-primary">{tx.viewProjects}</a>
              <a href="#contact" className="btn-ghost">{tx.getInTouch}</a>
            </div>

            <div className="hero__socials hero__anim hero__anim--7">
              <span className="hud hero__socials-label">{tx.socials}</span>
              <span className="rule rule--dim" />
              <a
                href="https://github.com/Caspiom"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="GitHub"
              >
                <GithubIcon />
              </a>
              <a
                href="https://www.linkedin.com/in/lucas-gaspari/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="LinkedIn"
              >
                <LinkedinIcon />
              </a>
              <a href="mailto:lucasamsg6@gmail.com" className="social-link" aria-label="Email">
                <MailIcon />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function GithubIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  )
}

function LinkedinIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
    </svg>
  )
}

function MailIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="16" x="2" y="4" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}
