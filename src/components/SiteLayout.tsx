import { useEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router-dom'

import Footer from './Footer'
import NavBar from './NavBar'

function SiteLayout() {
  const location = useLocation()
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    if (motionQuery.matches) {
      document.querySelectorAll('.reveal, .reveal-stagger').forEach((el) => {
        el.classList.add('is-visible')
      })
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -20px 0px' },
    )

    const scan = () => {
      document.querySelectorAll('.reveal:not(.is-visible), .reveal-stagger:not(.is-visible)').forEach((el) => {
        observer.observe(el)
      })
    }

    timerRef.current = setTimeout(() => {
      scan()
      requestAnimationFrame(scan)
    }, 120)

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
      observer.disconnect()
    }
  }, [location.pathname])

  return (
    <div className="layout">
      <NavBar />
      <main className="canvas">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default SiteLayout
