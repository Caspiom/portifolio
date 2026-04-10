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
    const reveal = () => {
      document.querySelectorAll('.reveal:not(.revealed)').forEach((el) => {
        const { top, bottom } = el.getBoundingClientRect()
        if (top < window.innerHeight - 60 && bottom > 0) {
          el.classList.add('revealed')
        }
      })
    }

    reveal()
    window.addEventListener('scroll', reveal, { passive: true })
    window.addEventListener('resize', reveal, { passive: true })
    return () => {
      window.removeEventListener('scroll', reveal)
      window.removeEventListener('resize', reveal)
    }
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
