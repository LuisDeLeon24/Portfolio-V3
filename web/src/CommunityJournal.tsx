import { useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import portrait from './assets/collage/community-speaker-portrait.jpeg'
import { roles } from './data/editorial'
import { communityMoments } from './data/community'
import { selectFeatured } from './data/featured'
import { useLang } from './language'
import { gsap, ScrollTrigger, useReducedMotion } from './motionPreferences'
import { Arrow } from './SiteChrome'
import './CommunityJournal.css'

const albums = communityMoments.filter(moment => moment.photos.length > 1)
const featured = selectFeatured(communityMoments, 'community')
const coverMoments = [...new Set([...albums, ...featured])]
const prints = [
  ...coverMoments.map(moment => ({ moment, photo: moment.photos[0] })),
  ...albums.flatMap(moment => moment.photos.slice(1).map(photo => ({ moment, photo }))),
]
const pageSize = 4
const pageCount = Math.ceil(prints.length / pageSize)

export default function CommunityJournal() {
  const { lang } = useLang()
  const es = lang === 'es'
  const [page, setPage] = useState(0)
  const offset = page * pageSize
  const stage = useRef<HTMLElement>(null)
  const board = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useLayoutEffect(() => {
    const root = stage.current
    const surface = board.current
    if (!root || !surface || reduced) return
    const projects = root.previousElementSibling?.querySelector<HTMLElement>('.project-spread')
    const motion = gsap.context(() => {
      const entrance = gsap.timeline({ paused: true })
        .fromTo(surface, { '--curtain': '0%' }, {
          '--curtain': '51%', duration: .66, ease: 'power3.inOut',
        }, 0)
        .fromTo('.community-prints', {
          x: () => -window.innerWidth,
        }, { x: 0, duration: .76, ease: 'expo.out' }, .12)
        .fromTo('.community-portrait', {
          x: () => window.innerWidth,
        }, { x: 0, duration: .82, ease: 'power4.out' }, .18)
        .fromTo('.community-journal__header, .community-journal__actions', { xPercent: -31, opacity: 0 }, {
          xPercent: 0, opacity: 1, duration: .44, ease: 'power3.out',
        }, .45)

      if (projects) entrance.fromTo(projects, { opacity: 1 }, {
        opacity: 0, duration: .47, ease: 'power2.in',
      }, .18)

      const measure = () => {
        const header = parseFloat(getComputedStyle(root).scrollMarginTop)
        surface.style.top = Math.min(header, window.innerHeight - surface.offsetHeight) + 'px'
      }
      const draw = ({ progress, start, end }: ScrollTrigger) => {
        entrance.progress(progress)
        const crossing = progress > 0 && progress < 1
        const travel = end - start
        surface.style.translate = crossing ? '0 ' + (progress - 1) * travel + 'px' : ''
        // Projects finishes its own hold before these two surfaces overlap.
        if (projects) projects.style.transform = crossing
          ? 'translateY(' + progress * travel + 'px) scale(' + (1 - .075 * progress) + ')'
          : ''
      }
      measure()
      const trigger = ScrollTrigger.create({
        trigger: root,
        start: 'top bottom',
        end: () => 'top ' + getComputedStyle(root).scrollMarginTop,
        onRefreshInit: () => {
          measure()
          entrance.invalidate()
        },
        onUpdate: draw,
        onRefresh: draw,
      })
      draw(trigger)
    }, root)
    return () => {
      motion.revert()
      surface.style.removeProperty('translate')
      surface.style.removeProperty('top')
      projects?.style.removeProperty('transform')
    }
  }, [lang, reduced])

  return (
    <section id="comunidad" ref={stage} className="community-journal" aria-labelledby="community-heading">
      <div ref={board} className="community-journal__surface">
        <div className="wrap community-journal__layout">
          <div className="community-journal__pages">
            <header className="community-journal__header">
              <h2 id="community-heading">
                <Link to="/community" aria-label={es ? 'Comunidad · Ver archivo' : 'Community · View archive'}>
                  {es ? 'Comunidad' : 'Community'}<em>.</em> <Arrow diagonal />
                </Link>
              </h2>
              <p>{es
                ? 'Organizo encuentros, doy charlas y conecto builders en Centroamérica'
                : 'I organize meetups, give talks, and connect builders in Central America'}</p>
            </header>
            <nav id="community-prints" className="community-prints" aria-label={es ? 'Fotos de encuentros' : 'Event photos'}>
              {prints.slice(offset, offset + pageSize).map(({ moment, photo }) => (
                <Link key={photo.src} className="community-print" to={'/community#' + moment.id}>
                  <span className="community-prints__frame">
                    <img src={photo.src} loading="lazy" decoding="async" alt={photo.alt[lang]} />
                  </span>
                  <span className="community-prints__title">{moment.title[lang]}</span>
                </Link>
              ))}
            </nav>
            <div className="community-journal__actions">
              <Link className="community-journal__archive" to="/community"
                aria-label={es ? 'Ver más de Comunidad' : 'See more from Community'}>
                {es ? 'Ver más' : 'See more'} <Arrow diagonal />
              </Link>
              {pageCount > 1 && <div className="community-journal__pager">
                <button type="button" disabled={page === 0} aria-controls="community-prints"
                  aria-label={es ? 'Fotos anteriores' : 'Previous photos'} onClick={() => setPage(page - 1)}>←</button>
                <span aria-live="polite" aria-atomic="true">{page + 1} / {pageCount}</span>
                <button type="button" disabled={page + 1 === pageCount} aria-controls="community-prints"
                  aria-label={es ? 'Fotos siguientes' : 'Next photos'} onClick={() => setPage(page + 1)}>→</button>
              </div>}
            </div>
          </div>

          <figure className="community-portrait">
            <img className="community-portrait__photo" src={portrait} loading="lazy" decoding="async"
              alt={es ? 'Luis De León con gafas y suéter beige, gesticulando con ambas manos.' : 'Luis De León wearing glasses and a beige sweater, gesturing with both hands.'} />
            <figcaption>
              <span className="community-portrait__name">Luis De León</span>
              <span className="community-portrait__roles" lang="en">
                {roles.map(role => (
                  <span key={role.org}>
                    {role.org === 'IEEE' ? role.org : role.name}{role.org === 'Open2' && ' · Open2'}
                  </span>
                ))}
              </span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  )
}
