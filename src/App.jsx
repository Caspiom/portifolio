import { useEffect } from 'react'
import { LanguageProvider } from './context/LanguageContext'
import MatrixBackground from './components/MatrixBackground'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ScrollProgress from './components/ScrollProgress'

export default function App() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal:not(.revealed)')

    // IntersectionObserver replaces the old scroll handler: the browser
    // batches visibility checks off the main thread instead of us calling
    // getBoundingClientRect() on every element on every scroll frame — a
    // meaningful win on low-powered mobile devices.
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('revealed'))
      return
    }

    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
            obs.unobserve(entry.target) // reveal once, then stop watching
          }
        })
      },
      { rootMargin: '0px 0px -60px 0px' },
    )

    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <LanguageProvider>
      <ScrollProgress />
      <MatrixBackground />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </LanguageProvider>
  )
}
