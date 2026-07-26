import { useState, useEffect } from 'react'
import { useLang } from '../context/LanguageContext'
import { t } from '../i18n/translations'
import './Navbar.css'

const sectionIds = ['about', 'experience', 'skills', 'projects', 'contact']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { lang, toggle } = useLang()
  const tx = t[lang].nav

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
          <span className="logo-bracket">&lt;</span>LG.Dev<span className="logo-bracket">/&gt;</span>
        </a>

        <div className="navbar__right">
          <nav
            id="primary-nav"
            aria-label="Primary"
            className={`navbar__links ${menuOpen ? 'open' : ''}`}
          >
            {tx.links.map((label, i) => (
              <a
                key={label}
                href={`#${sectionIds[i]}`}
                className="navbar__link"
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </a>
            ))}
            <a
              href="https://github.com/Caspiom"
              target="_blank"
              rel="noopener noreferrer"
              className="navbar__github btn-outline"
              onClick={() => setMenuOpen(false)}
            >
              {tx.github}
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
              {lang === 'en' ? '🇧🇷' : '🇺🇸'}
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
