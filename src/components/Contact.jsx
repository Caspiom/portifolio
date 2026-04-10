import { useLang } from '../context/LanguageContext'
import { t } from '../i18n/translations'
import CodeBg from './CodeBg'
import './Contact.css'

const TERMINAL_CODE = `$ git clone https://github.com/Caspiom/portfolio
Cloning into 'portfolio'...
remote: Enumerating objects: 214, done.
remote: Counting objects: 100% (214/214), done.
Receiving objects: 100% (214/214), 1.84 MiB, done.

$ cd portfolio && npm install && npm run dev

  VITE v5.4  ready in 128ms
  ➜  Local:   http://localhost:5173/

$ curl -s https://api.github.com/users/Caspiom | jq .
{
  "login": "Caspiom",
  "name": "Gaspari",
  "public_repos": 29,
  "followers": 13,
  "bio": "Coding in Java, Python, and Rust."
}

$ ssh lucas@gaspari.dev
Welcome to Ubuntu 24.04 LTS
Last login: Wed Apr  9 22:00:00 2026

lucas@server:~$ uptime
 22:04:01  load average: 0.08, 0.03, 0.01

lucas@server:~$ docker ps
CONTAINER ID   IMAGE         STATUS
a3f1b2c8d4e9   api:latest    Up 3 days
7c9e2a1f0b3d   postgres:15   Up 3 days
f8d4c6b2a1e5   nginx:alpine  Up 3 days`

export default function Contact() {
  const { lang } = useLang()
  const tx = t[lang].contact

  return (
    <section id="contact" className="section contact has-code-bg">
      <CodeBg

        snippets={[{ code: TERMINAL_CODE, side: 'right', color: '#3eccc1', rotate: 1.5, top: '3rem', opacity: 0.05 }]}
      />
      <div className="container">
        <p className="section-tag reveal">{tx.label}</p>
        <h2 className="section-title reveal d1">{tx.title}</h2>

        <div className="contact__inner">
          <p className="contact__desc reveal d2">{tx.desc}</p>

          <div className="contact__cards">
            <a href="mailto:lucasamsg6@gmail.com" className="contact-card reveal d2">
              <div className="contact-card__icon"><MailIcon /></div>
              <div>
                <div className="contact-card__label">{tx.emailLabel}</div>
                <div className="contact-card__value">lucasamsg6@gmail.com</div>
              </div>
            </a>

            <a href="tel:+5571994108099" className="contact-card reveal d3">
              <div className="contact-card__icon"><PhoneIcon /></div>
              <div>
                <div className="contact-card__label">{tx.phoneLabel}</div>
                <div className="contact-card__value">(71) 99410–8099</div>
              </div>
            </a>

            <a href="https://github.com/Caspiom" target="_blank" rel="noopener noreferrer" className="contact-card reveal d4">
              <div className="contact-card__icon"><GithubIcon /></div>
              <div>
                <div className="contact-card__label">{tx.githubLabel}</div>
                <div className="contact-card__value">github.com/Caspiom</div>
              </div>
            </a>

            <div className="contact-card contact-card--location reveal d5">
              <div className="contact-card__icon"><LocationIcon /></div>
              <div>
                <div className="contact-card__label">{tx.locationLabel}</div>
                <div className="contact-card__value">{tx.location}</div>
              </div>
            </div>
          </div>

          <a href="mailto:lucasamsg6@gmail.com" className="btn-primary contact__cta reveal d3">
            {tx.cta}
          </a>
        </div>
      </div>
    </section>
  )
}

function MailIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.07 6.07l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}

function GithubIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  )
}

function LocationIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}
