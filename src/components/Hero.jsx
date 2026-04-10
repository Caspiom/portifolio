import { useEffect, useRef } from 'react'
import { useLang } from '../context/LanguageContext'
import { t } from '../i18n/translations'
import './Hero.css'

export default function Hero() {
  const { lang } = useLang()
  const tx = t[lang].hero
  const glowLeftRef = useRef(null)
  const glowRightRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      if (glowLeftRef.current)
        glowLeftRef.current.style.transform = `translateY(${y * 0.2}px)`
      if (glowRightRef.current)
        glowRightRef.current.style.transform = `translateY(${y * -0.14}px)`
      if (contentRef.current)
        contentRef.current.style.transform = `translateY(${y * 0.07}px)`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section id="hero" className="hero">
      <div ref={glowLeftRef} className="hero__glow hero__glow--left" />
      <div ref={glowRightRef} className="hero__glow hero__glow--right" />

      <div ref={contentRef} className="hero__content">
        <p className="hero__greeting mono hero__anim hero__anim--1">{tx.greeting}</p>
        <h1 className="hero__name hero__anim hero__anim--2">Lucas Gaspari</h1>
        <h2 className="hero__title hero__anim hero__anim--3">{tx.title}</h2>
        <p className="hero__bio hero__anim hero__anim--4">{tx.bio}</p>

        <div className="hero__actions hero__anim hero__anim--5">
          <a href="#projects" className="btn-primary">{tx.viewProjects}</a>
          <a href="#contact" className="btn-ghost">{tx.getInTouch}</a>
        </div>

        <div className="hero__socials hero__anim hero__anim--6">
          <a
            href="https://github.com/Caspiom"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
            aria-label="GitHub"
          >
            <GithubIcon />
          </a>
          <a href="mailto:lucasamsg6@gmail.com" className="social-link" aria-label="Email">
            <MailIcon />
          </a>
        </div>
      </div>

      <a href="#about" className="hero__scroll-cue hero__anim hero__anim--7" aria-label="Scroll down">
        <span className="hero__scroll-cue-line" />
        <ChevronDown />
      </a>
    </section>
  )
}

function GithubIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  )
}

function MailIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}

function ChevronDown() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}
