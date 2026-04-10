import { useLang } from '../context/LanguageContext'
import { t } from '../i18n/translations'
import './Footer.css'

export default function Footer() {
  const { lang } = useLang()
  const tx = t[lang].footer

  return (
    <footer className="footer">
      <div className="footer__inner">
        <p className="footer__copy mono">
          {tx.built} <span style={{ color: 'var(--accent-cyan)' }}>Lucas Gaspari</span>
        </p>
        <a
          href="https://github.com/Caspiom"
          target="_blank"
          rel="noopener noreferrer"
          className="footer__github"
        >
          github.com/Caspiom
        </a>
      </div>
    </footer>
  )
}
