import { Fragment, useLayoutEffect, useRef } from 'react'
import TechnologyRail from './TechnologyRail'
import { useLang } from './language'
import { gsap, ScrollTrigger, useReducedMotion } from './motionPreferences'

const motionDistance = 5
const exitAt = 0.87

export default function AboutSection() {
  const { t } = useLang()
  const section = useRef<HTMLElement>(null)
  const panel = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  useLayoutEffect(() => {
    const root = section.current
    const content = panel.current
    if (!root || !content || reducedMotion) return

    const style = getComputedStyle(root)
    const accent = style.getPropertyValue('--accent').trim()
    const clearAccent = `rgba(${gsap.utils.splitColor(accent).slice(0, 3).join(', ')}, 0)`
    const ivory = style.color
    const context = gsap.context(() => {
      // Overscan keeps accents and descenders inside the mask when the type is at rest.
      const closedLeft = 'polygon(-2% -30%, -2% -30%, -24% 135%, -24% 135%)'
      const open = 'polygon(-30% -30%, 142% -30%, 120% 135%, -30% 135%)'
      const closedRight = 'polygon(142% -30%, 142% -30%, 120% 135%, 120% 135%)'
      const reveals: {
        anchor: Element; timeline: gsap.core.Timeline; entryEnd: number
        start: number; distance: number; exitDelay: number
      }[] = []

      const animateGroup = (selector: string, headline: boolean) => {
        root.querySelectorAll<HTMLElement>(selector).forEach((ink, index) => {
          const entry = index * 0.032
          const trail = headline
            ? `-0.065em 0.035em 0 ${accent}, -0.14em 0.075em 0 ${accent}`
            : `-4px 2px 0 ${accent}, -8px 4px 1px ${accent}`
          gsap.set(ink, {
            clipPath: closedLeft,
            x: headline ? '-0.28em' : '-0.85em',
            y: headline ? '0.32em' : '0.65em',
            skewX: headline ? -13 : -4,
            color: accent,
            textShadow: trail,
          })
          const timeline = gsap.timeline({ paused: true })
          reveals.push({ anchor: ink.parentElement!, timeline, entryEnd: entry + 0.21, start: 0, distance: 1, exitDelay: 0 })
          timeline.to(ink, { clipPath: open, duration: 0.16, ease: 'power2.inOut' }, entry)
          timeline.to(ink, { x: 0, y: 0, skewX: 0, duration: 0.21, ease: 'back.out(1.4)' }, entry)
          timeline.to(ink, {
            color: ivory,
            textShadow: `0 0 0 ${clearAccent}, 0 0 0 ${clearAccent}`,
            duration: 0.11,
            ease: 'power2.out',
          }, entry + 0.085)
          timeline.to(ink, {
            clipPath: closedRight,
            x: headline ? '0.19em' : '0.55em',
            y: headline ? '-0.18em' : '-0.35em',
            skewX: headline ? -9 : -3,
            color: accent,
            textShadow: trail,
            duration: 0.13,
            ease: 'power2.in',
          }, exitAt)
        })
      }

      animateGroup('.about-word > span', true)
      animateGroup('.about-copy > * > span', false)

      let holdEnd = 0
      const measureReveals = () => {
        const viewport = window.innerHeight
        const panelBox = content.getBoundingClientRect()
        const pinStart = Math.max(0, content.offsetHeight - viewport)
        let entryEnd = pinStart
        let exitExtension = 0
        reveals.forEach(reveal => {
          const box = reveal.anchor.getBoundingClientRect()
          const originalDistance = 0.95 * viewport + box.height
          reveal.start = box.top - panelBox.top - viewport
          reveal.distance = originalDistance * motionDistance
          reveal.exitDelay = Math.max(0, reveal.start + originalDistance * exitAt - pinStart)
          entryEnd = Math.max(entryEnd, reveal.start + reveal.distance * reveal.entryEnd)
          exitExtension = Math.max(exitExtension, (1 - exitAt) * (reveal.distance - originalDistance))
        })
        content.style.top = -pinStart + 'px'
        root.style.setProperty('--about-motion-space', (entryEnd - pinStart + exitExtension) + 'px')
        // The track also contains two viewport heights reserved for reading.
        holdEnd = pinStart + root.offsetHeight - content.offsetHeight - exitExtension
      }
      const updateReveals = () => {
        const scroll = -root.getBoundingClientRect().top
        reveals.forEach(({ start, distance, entryEnd, exitDelay, timeline }) => {
          const exit = scroll - holdEnd - exitDelay
          const progress = exit > 0 ? exitAt + exit / distance : Math.min(entryEnd, (scroll - start) / distance)
          timeline.progress(gsap.utils.clamp(0, 1, progress))
        })
      }
      measureReveals()
      ScrollTrigger.create({
        trigger: root,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: updateReveals,
        onRefreshInit: measureReveals,
        onRefresh: updateReveals,
      })
    }, root)
    const frame = requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => {
      cancelAnimationFrame(frame)
      context.revert()
      content.style.removeProperty('top')
      root.style.removeProperty('--about-motion-space')
    }
  }, [reducedMotion, t])

  return (
    <section id="sobre-mi" className="about-track" aria-labelledby="about-title" ref={section}>
      <div className="about" ref={panel}>
        <h2 className="about-slogan" lang="en" aria-label={t.tagline}>
          {t.tagline.split(' ').map((word, index) => (
            <Fragment key={word}>
              {index > 0 && ' '}
              <span className="about-word"><span>{word}</span></span>
            </Fragment>
          ))}
        </h2>
        <div className="about-copy">
          <h3 id="about-title"><span>{t.aboutTitle}</span></h3>
          {t.aboutBody.map((paragraph) => <p key={paragraph}><span>{paragraph}</span></p>)}
          <TechnologyRail />
        </div>
      </div>
    </section>
  )
}
