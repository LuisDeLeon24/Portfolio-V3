import { useLayoutEffect, useRef } from 'react'
import { useLang } from './language'
import { gsap, useReducedMotion } from './motionPreferences'
import './SloganBand.css'

export default function SloganBand() {
  const { t } = useLang()
  const band = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useLayoutEffect(() => {
    const root = band.current
    if (!root || reduced) return
    const animation = gsap.context(() => {
      gsap.fromTo('.slogan-band__face', { xPercent: -100 }, {
        xPercent: 0,
        ease: 'none',
        scrollTrigger: { trigger: root, start: 'top bottom', end: 'bottom bottom', scrub: true },
      })
    }, root)
    return () => animation.revert()
  }, [reduced])

  return (
    <div className="slogan-band" ref={band}>
      <p className="slogan-band__face" lang="en">{t.tagline}</p>
    </div>
  )
}
