import { useState, useEffect } from 'react'
import { useLang } from '../context/LanguageContext'
import { t } from '../i18n/translations'
import { useActiveSection } from '../hooks/useActiveSection'
import { useScrambleText } from '../hooks/useScrambleText'
import './Navbar.css'

// Module-level so the identity is stable across renders and the observer in
// useActiveSection isn't torn down and rebuilt on every one.
const sectionIds = ['about', 'experience', 'skills', 'projects', 'contact']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { lang, toggle } = useLang()
  const tx = t[lang].nav
  const active = useActiveSection(sectionIds)

  // The identity block moved up here from the hero. Reads the location from
  // the hero strings rather than copying it, so the two can't drift apart.
  const based = t[lang].hero.based
  const nameDecoded = useScrambleText('Lucas Gaspari', { delay: 250, duration: 900 })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll and enable Escape-to-close only while the mobile
  // overlay menu is open. Both effects are torn down together so the class
  // and listener can never leak between renders.
  useEffect(() => {
    if (!menuOpen) return

    document.body.classList.add('nav-open')
    const onKey = (e) => e.key === 'Escape' && setMenuOpen(false)
    window.addEventListener('keydown', onKey)

    return () => {
      document.body.classList.remove('nav-open')
      window.removeEventListener('keydown', onKey)
    }
  }, [menuOpen])

  const langLabel = lang === 'en' ? 'Mudar para Português' : 'Switch to English'

  return (
    <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar__inner">
        <a href="#hero" className="navbar__logo">
          <span className="navbar__name">{nameDecoded}</span>
          <span className="navbar__place">{based} [BR]</span>
        </a>

        <div className="navbar__right">
          <nav
            id="primary-nav"
            aria-label="Primary"
            className={`navbar__links ${menuOpen ? 'open' : ''}`}
          >
            {tx.links.map((label, i) => {
              const id = sectionIds[i]
              const isActive = active === id
              return (
                <a
                  key={id}
                  href={`#${id}`}
                  className={`navbar__link ${isActive ? 'is-active' : ''}`}
                  aria-current={isActive ? 'true' : undefined}
                  onClick={() => setMenuOpen(false)}
                >
                  {/* The filled square is the active marker; it holds its slot
                      when inactive so labels never shift as you scroll. */}
                  <span className="navbar__marker" aria-hidden="true" />
                  {label}
                </a>
              )
            })}
            <a
              href="https://github.com/Caspiom"
              target="_blank"
              rel="noopener noreferrer"
              className="navbar__github"
              onClick={() => setMenuOpen(false)}
            >
              {tx.github} <span aria-hidden="true">↗</span>
            </a>
          </nav>

          {/* Kept outside the collapsible <nav> so the language switch is
              always reachable on mobile without opening the menu. */}
          <div className="navbar__actions">
            <button
              className="lang-toggle"
              onClick={toggle}
              aria-label={langLabel}
              title={langLabel}
            >
              <span className={lang === 'pt' ? 'is-on' : ''}>PT</span>
              <span className={lang === 'en' ? 'is-on' : ''}>EN</span>
            </button>

            <button
              className={`navbar__burger ${menuOpen ? 'open' : ''}`}
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="primary-nav"
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
