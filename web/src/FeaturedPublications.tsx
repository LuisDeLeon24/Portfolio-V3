import { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from './language'
import { ScrollTrigger, useReducedMotion } from './motionPreferences'
import { FeaturedPublicationCards } from './PortfolioAreas'
import { Arrow } from './SiteChrome'

export default function FeaturedPublications() {
  const { lang } = useLang()
  const es = lang === 'es'
  const track = useRef<HTMLElement>(null)
  const surface = useRef<HTMLDivElement>(null)
  const runway = useRef<HTMLDivElement>(null)
  const signature = useRef<HTMLSpanElement>(null)
  const reduced = useReducedMotion()

  useLayoutEffect(() => {
    const root = track.current
    const board = surface.current
    const path = runway.current
    const wordmark = signature.current
    if (!root || !board || !path || !wordmark || reduced) return

    // On short screens the bottom link scrolls into view before the reading hold begins.
    const measure = () => root.style.setProperty('--notes-height', board.offsetHeight + 'px')
    measure()
    const community = root.previousElementSibling?.querySelector<HTMLElement>('.community-journal__surface')
    const resetFold = () => {
      board.style.removeProperty('transform')
      board.style.removeProperty('transform-origin')
      board.style.removeProperty('--fold-shade')
      community?.style.removeProperty('transform')
    }
    const fold = ({ progress, start, end }: ScrollTrigger) => {
      if (progress <= 0 || progress >= 1) {
        resetFold()
        return
      }
      const travel = end - start
      const remaining = 1 - progress
      // Keep the hinge at the bottom of the visible page, even when the section is taller on mobile.
      board.style.transformOrigin = '50% ' + travel + 'px'
      board.style.transform = `translateY(${-remaining * travel}px) perspective(${travel * 2.8}px) rotateX(${remaining * 90}deg)`
      board.style.setProperty('--fold-shade', String(remaining * .66))
      if (community) community.style.transform = `translateY(${progress * travel}px)`
    }
    const transition = ScrollTrigger.create({
      trigger: root, start: 'top bottom',
      end: () => 'top ' + getComputedStyle(root).scrollMarginTop,
      onUpdate: fold, onRefresh: fold,
    })
    fold(transition)
    const slide = ({ progress }: ScrollTrigger) => {
      wordmark.style.setProperty('--signature-progress', String(progress))
    }
    const signatureMotion = ScrollTrigger.create({
      trigger: root,
      // Wait until the unfolded board settles at its sticky inset, including on short screens.
      start: () => 'top ' + getComputedStyle(board).top,
      end: () => '+=' + path.offsetHeight,
      onUpdate: slide, onRefresh: slide,
    })
    slide(signatureMotion)
    const observer = new ResizeObserver(() => {
      measure()
      ScrollTrigger.refresh()
    })
    observer.observe(board)
    return () => {
      transition.kill()
      signatureMotion.kill()
      wordmark.style.removeProperty('--signature-progress')
      observer.disconnect()
      root.style.removeProperty('--notes-height')
      resetFold()
    }
  }, [reduced])

  return (
    <section ref={track} id="publicaciones" className="notes-track" aria-labelledby="publications-title">
      <div ref={surface} className="notes-section">
        <div className="notes-photo" aria-hidden="true" />
        <div className="notes-signature-plane" aria-hidden="true">
          <span ref={signature} className="notes-signature" />
        </div>
        <div className="wrap notes-feature">
          <h2 id="publications-title">{es ? 'Publicaciones' : 'Publications'}<em>.</em></h2>
          <FeaturedPublicationCards />
          <div className="notes-feature__index">
            <Link to="/publications">{es ? 'Ver publicaciones' : 'View publications'} <Arrow diagonal /></Link>
          </div>
        </div>
      </div>
      <div ref={runway} className="notes-signature-runway" aria-hidden="true" />
    </section>
  )
}
