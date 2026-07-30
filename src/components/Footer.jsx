import { useLang } from '../context/LanguageContext'
import { t } from '../i18n/translations'
import './Footer.css'

export default function Footer() {
  const { lang } = useLang()
  const tx = t[lang].footer

  return (
    <footer className="footer">
      <div className="footer__inner">
        <p className="footer__copy">
          {tx.built} <span className="footer__name">Lucas Gaspari</span>
        </p>

        <a
          href="https://github.com/Caspiom"
          target="_blank"
          rel="noopener noreferrer"
          className="footer__link"
        >
          github.com/Caspiom
        </a>

        <a href="#hero" className="footer__link footer__top">
          <span aria-hidden="true">↑</span> {tx.backToTop}
        </a>
      </div>
    </footer>
  )
}
