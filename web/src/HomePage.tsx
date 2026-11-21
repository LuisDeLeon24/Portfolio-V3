import { useLayoutEffect, useRef } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import CommunityJournal from './CommunityJournal'
import { useLang } from './language'
import FeaturedPublications from './FeaturedPublications'
import CollageHero from './CollageHero'
import AboutSection from './AboutSection'
import PortfolioDirectory from './PortfolioDirectory'
import ProjectReel from './ProjectReel'
import { InfoList } from './PortfolioAreas'
import { gsap, ScrollTrigger, useReducedMotion } from './motionPreferences'

export default function HomePage() {
  const { lang } = useLang()
  const { hash } = useLocation()
  const main = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  useLayoutEffect(() => {
    const awards = main.current?.querySelector<HTMLElement>('.award-frame:has(.award-fan)')
    const stage = main.current?.querySelector<HTMLElement>('#proyectos')
    const spread = stage?.querySelector<HTMLElement>('.project-spread:has(.project-panel)')
    if (reduced || !awards || !stage || !spread) return

    const animation = gsap.context(() => {
      const colors = getComputedStyle(spread)
      const panels = spread.querySelectorAll('.project-panel')
      const cut = gsap.timeline({ paused: true })
      cut.to(awards.querySelector('.award-fan'), {
        scale: .83, rotation: -4, xPercent: -9, duration: .36, ease: 'power3.in',
      }, 0)
      .to(awards, { opacity: 0, duration: .27, ease: 'power2.in' }, .18)
      .fromTo(spread, {
        clipPath: 'polygon(67% 0, 67% 0, 33% 100%, 33% 100%)',
      }, {
        clipPath: 'polygon(0% 0, 134% 0, 100% 100%, -34% 100%)',
        duration: .42, ease: 'power3.inOut',
      }, .03)
      .fromTo(spread, { backgroundColor: colors.getPropertyValue('--accent').trim() }, {
        backgroundColor: colors.getPropertyValue('--text').trim(), duration: .33, ease: 'power2.inOut',
      }, .46)
      .fromTo(panels, { '--panel-entry': (index: number) => index % 2 === 0 ? -1 : 1 }, {
        '--panel-entry': 0, stagger: { amount: .23, from: 'center' }, duration: .5, ease: 'power4.out',
      }, .23)
      .fromTo(spread.querySelector('.project-spread__intro'), { xPercent: -25, opacity: 0 }, {
        xPercent: 0, opacity: 1, duration: .35, ease: 'expo.out',
      }, .65)

      const draw = ({ progress, start, end }: ScrollTrigger) => {
        cut.progress(progress)
        // Align the two surfaces only during their overlap. CSS owns the hold after it.
        const crossing = progress > 0 && progress < 1
        awards.style.translate = crossing ? '0 ' + progress * (end - start) + 'px' : ''
        spread.style.translate = crossing ? '0 ' + (progress - 1) * (end - start) + 'px' : ''
      }
      const transition = ScrollTrigger.create({
        trigger: stage,
        start: 'top bottom',
        end: () => 'top ' + getComputedStyle(stage).scrollMarginTop,
        onUpdate: draw,
        onRefresh: draw,
      })
      draw(transition)
    }, main)
    return () => {
      animation.revert()
      awards.style.removeProperty('translate')
      spread.style.removeProperty('translate')
    }
  }, [lang, reduced])
  if (hash === '#charlas') return <Navigate to="/community#charlas" replace />
  return (
    <main id="main" ref={main}>
      <CollageHero />
      <AboutSection />
      <div id="explorar" className="directory-track">
        <PortfolioDirectory />
      </div>
      <section id="info" aria-labelledby="experience-title">
        <InfoList />
      </section>
      <section id="proyectos" className="project-stage" aria-labelledby="projects-heading">
        <ProjectReel key={lang} />
      </section>
      <CommunityJournal />
      <FeaturedPublications />
    </main>
  )
}
