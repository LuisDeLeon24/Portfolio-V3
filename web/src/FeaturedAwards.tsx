import { useLayoutEffect, useRef, useState, type CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { getAwardLogo } from './awardMedia'
import { selectFeatured } from './data/featured'
import { useLang } from './language'
import { ScrollTrigger, useReducedMotion } from './motionPreferences'
import { Arrow } from './SiteChrome'
import './FeaturedAwards.css'

const folio = (number: number) => String(number).padStart(2, '0')

// Keep a neighbor on either side, including at the beginning and end of the scroll track.
function offsetFromCenter(slot: number, position: number, count: number) {
  const delta = slot - position
  return count > 2 ? delta - count * Math.floor(delta / count + .5) : delta
}

export default function FeaturedAwards() {
  const { t, lang } = useLang()
  const awards = selectFeatured(t.awards, 'awards')
  const count = awards.length
  const scrollPages = Math.max(0, count - 1) + 2
  const reduced = useReducedMotion()
  const track = useRef<HTMLElement>(null)
  const scroll = useRef<ScrollTrigger | null>(null)
  const [index, setIndex] = useState(0)
  const selected = Math.min(index, count - 1)
  const fanLimit = count > 2 ? Math.min(2.65, count / 2) : 2

  useLayoutEffect(() => {
    const root = track.current
    if (!root || reduced || !count) return

    const plates = root.querySelectorAll<HTMLElement>('.award-card')
    root.dataset.scrolling = ''
    const draw = ({ progress }: ScrollTrigger) => {
      const pages = Math.min(count - 1, progress * scrollPages)
      const page = Math.min(count - 1, Math.floor(pages + .001))
      const phase = Math.max(0, (pages - page - .45) / .55)
      const position = page + phase * phase * (3 - 2 * phase)
      plates.forEach((plate, slot) => {
        plate.style.setProperty('--offset', String(offsetFromCenter(slot, position, count)))
      })
      setIndex(Math.round(position))
    }
    const trigger = ScrollTrigger.create({
      trigger: root,
      start: () => 'top ' + getComputedStyle(root).scrollMarginTop,
      end: () => '+=' + parseFloat(getComputedStyle(root, '::after').height),
      onUpdate: draw,
      onRefresh: draw,
    })
    scroll.current = trigger
    draw(trigger)
    return () => {
      trigger.kill()
      scroll.current = null
      delete root.dataset.scrolling
      plates.forEach(plate => plate.style.removeProperty('--offset'))
    }
  }, [count, reduced, scrollPages])

  function goTo(page: number) {
    const trigger = scroll.current
    if (!trigger) return
    trigger.scroll(Math.ceil(trigger.start + (trigger.end - trigger.start) * page / scrollPages))
    ScrollTrigger.update()
  }

  return (
    <section id="premios" className="award-track" ref={track} aria-labelledby="awards-heading"
      style={{ '--award-pages': scrollPages, '--fan-limit': fanLimit } as CSSProperties}>
      <div className="award-frame">
        <header className="wrap award-heading">
          <h2 id="awards-heading">{t.awardsTitle}<em>.</em></h2>
          <Link className="text-link" to="/premios">{t.awardsArchiveTitle} <Arrow diagonal /></Link>
        </header>
        {count > 0 && (
          <div className={reduced ? 'award-list wrap' : 'award-fan wrap'}>
            {awards.map((award, slot) => {
              const logo = getAwardLogo(award.id)
              const active = reduced || slot === selected
              const offset = offsetFromCenter(slot, selected, count)
              return (
                <article key={award.id} className="award-card" data-active={active} data-award={award.id}
                  data-side={offset < 0 ? 'left' : offset > 0 ? 'right' : undefined}
                  inert={!active && Math.abs(offset) >= fanLimit}>
                  {logo && (
                    <div className="award-mark">
                      <img src={logo} alt="" loading="lazy" decoding="async" />
                    </div>
                  )}
                  <div className="award-caption">
                    <h3>{award.title}</h3>
                    <p>{award.org}</p>
                  </div>
                  {active ? (
                    <Link className="award-open" to={'/premios/' + award.id} aria-label={award.title} />
                  ) : (
                    <button className="award-choose" type="button" tabIndex={Math.abs(offset) <= 1 ? 0 : -1}
                      aria-label={(lang === 'es' ? 'Mostrar ' : 'Show ') + award.title}
                      onClick={() => goTo(slot)} />
                  )}
                </article>
              )
            })}
          </div>
        )}
        {!reduced && count > 1 && (
          <p className="award-counter" aria-live="polite" aria-atomic="true">{folio(selected + 1)} / {folio(count)}</p>
        )}
      </div>
    </section>
  )
}
