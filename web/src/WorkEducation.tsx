import { useLayoutEffect, useRef } from 'react'
import { useLang } from './language'
import { ScrollTrigger, useReducedMotion } from './motionPreferences'
import './WorkEducation.css'

export default function WorkEducation() {
  const { lang, t } = useLang()
  const track = useRef<HTMLDivElement>(null)
  const stage = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()
  const es = lang === 'es'

  useLayoutEffect(() => {
    const root = track.current
    const spread = stage.current
    const certifications = root?.nextElementSibling
    if (!root || !spread || !(certifications instanceof HTMLElement) || reducedMotion) return

    root.dataset.animated = ''
    const draw = ({ progress }: ScrollTrigger) => {
      root.style.setProperty('--entry-offset', (100 * (1 - progress)) + '%')
    }
    const trigger = ScrollTrigger.create({
      trigger: root,
      start: () => 'top ' + getComputedStyle(root).scrollMarginTop,
      end: () => '+=' + parseFloat(getComputedStyle(root, '::after').height),
      onUpdate: draw,
      onRefresh: draw,
    })
    draw(trigger)
    // The extra viewport in normal flow lets the incoming surface travel at half scroll speed.
    // Use the rendered margin so both the animation and layout use the same viewport height.
    const keepStill = ({ start, end, progress }: ScrollTrigger) => {
      const distance = end - start
      spread.style.translate = '0 ' + (distance * progress) + 'px'
      certifications.style.setProperty('--cert-rise-offset', ((progress - 1) * distance / 2) + 'px')
    }
    const cover = ScrollTrigger.create({
      trigger: root,
      start: 'bottom bottom',
      end: () => '+=' + 2 * parseFloat(getComputedStyle(certifications).marginBlockStart),
      onUpdate: keepStill,
      onRefresh: keepStill,
    })
    keepStill(cover)
    return () => {
      cover.kill()
      trigger.kill()
      spread.style.removeProperty('translate')
      certifications.style.removeProperty('--cert-rise-offset')
      delete root.dataset.animated
      root.style.removeProperty('--entry-offset')
    }
  }, [reducedMotion])

  return (
    <div className="work-education-track" id="experiencia" ref={track}>
      <div className="work-education" ref={stage}>
        <div className="work-education__panel work-education__panel--work">
          <div className="work-education__work">
            <h2 className="work-education__title" id="experience-title">{t.experienceTitle}<em>.</em></h2>
            <h3 className="work-education__heading">{es ? 'Laboral' : 'Work'}</h3>
            <div className="work-education__entries">
              {t.experience.map(job => (
                <article key={job.place + job.role}>
                  <h4>{job.role}</h4>
                  <p className="work-education__source">{job.place} · {job.period}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
        <div className="work-education__panel work-education__panel--study">
          <div className="work-education__study">
            <h3 className="work-education__heading">{es ? 'Estudios' : 'Education'}</h3>
            <div className="work-education__entries">
              {t.education.map(study => (
                <article key={study.title}>
                  <h4>{study.title}</h4>
                  <p className="work-education__source">{study.meta}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
      <span className="work-education__study-anchor" id="educacion" aria-hidden="true" />
    </div>
  )
}
