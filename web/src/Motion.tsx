import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Lenis from 'lenis'
import { gsap, ScrollTrigger, useReducedMotion } from './motionPreferences'
import 'lenis/dist/lenis.css'

let scroller: Lenis | undefined
const formerSections: Record<string, string> = {
  notas: 'escritos',
  publicaciones: 'escritos',
  experimentos: 'proyectos',
  education: 'educacion',
  work: 'proyectos',
  contact: 'contacto',
}
export default function Motion() {
  const reduced = useReducedMotion()
  const { pathname, hash, key } = useLocation()
  useEffect(() => {
    if (reduced) return
    const lenis = new Lenis({ duration: 0.9, syncTouch: false })
    scroller = lenis
    lenis.on('scroll', ScrollTrigger.update)
    const tick = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
      scroller = undefined
    }
  }, [reduced])
  useEffect(() => {
    let cancelled = false
    const frame = requestAnimationFrame(async () => {
      if (hash) await document.fonts.ready
      if (cancelled) return
      ScrollTrigger.refresh()
      const id = hash.slice(1)
      const el = document.getElementById(formerSections[id] ?? id)
      if (el && scroller) {
        scroller.resize()
        const offset = el.id === 'info' || el.id === 'premios' || el.id === 'proyectos' || el.id === 'comunidad' || el.id === 'escritos' || el.closest('.work-education-track') ? 0 : -78
        scroller.scrollTo(el, { immediate: true, offset })
      }
      else if (el) el.scrollIntoView()
      else if (scroller) scroller.scrollTo(0, { immediate: true })
      else window.scrollTo(0, 0)
    })
    return () => {
      cancelled = true
      cancelAnimationFrame(frame)
    }
  }, [pathname, hash, key])
  return null
}
