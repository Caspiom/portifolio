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
    // IntersectionObserver replaces the old scroll handler: the browser
    // batches visibility checks off the main thread instead of us calling
    // getBoundingClientRect() on every element on every scroll frame — a
    // meaningful win on low-powered mobile devices.
    if (!('IntersectionObserver' in window)) {
      document
        .querySelectorAll('.reveal:not(.revealed)')
        .forEach((el) => el.classList.add('revealed'))
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

    const track = (el) => {
      if (el.classList.contains('revealed')) return

      // Anything already at or above the fold is shown outright instead of
      // being observed. The negative bottom rootMargin means an element that
      // sits ABOVE the viewport never counts as intersecting, so on any load
      // that starts mid-page — a reload with restored scroll position, a
      // deep link to #projects — every element further up would otherwise
      // stay at opacity 0 permanently. There is also nothing to animate for
      // content the visitor never watched arrive.
      if (el.getBoundingClientRect().top < window.innerHeight) {
        el.classList.add('revealed')
        return
      }
      io.observe(el)
    }

    const scan = (node) => {
      if (node.nodeType !== 1) return
      if (node.classList.contains('reveal')) track(node)
      node.querySelectorAll('.reveal:not(.revealed)').forEach(track)
    }

    scan(document.body)

    // React throws away and rebuilds DOM nodes whenever a list's keys change.
    // Switching language does exactly that across the whole page, and the
    // replacements arrive without the `revealed` class this effect already
    // handed out — leaving entire sections stranded at opacity 0. Watching for
    // new nodes covers that, and any other late-arriving content, without this
    // effect needing to know when it happened.
    const mo = new MutationObserver((records) => {
      records.forEach((record) => record.addedNodes.forEach(scan))
    })
    mo.observe(document.body, { childList: true, subtree: true })

    return () => {
      io.disconnect()
      mo.disconnect()
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
