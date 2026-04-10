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
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar__inner">
        <a href="#hero" className="navbar__logo">
          <span className="logo-bracket">&lt;</span>LG.Dev<span className="logo-bracket">/&gt;</span>
        </a>

        <nav className={`navbar__links ${menuOpen ? 'open' : ''}`}>
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
          >
            {tx.github}
          </a>
          <button
            className="lang-toggle"
            onClick={toggle}
            aria-label={lang === 'en' ? 'Mudar para Português' : 'Switch to English'}
            title={lang === 'en' ? 'Mudar para Português' : 'Switch to English'}
          >
            {lang === 'en' ? '🇧🇷' : '🇺🇸'}
          </button>
        </nav>

        <button
          className={`navbar__burger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>
    </header>
  )
}
