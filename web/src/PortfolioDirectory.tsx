import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from './language'
import { ScrollTrigger, useReducedMotion } from './motionPreferences'
import experience from './assets/collage/experience-laptop.webp'
import community from './assets/collage/community-workshop.webp'
import coding from './assets/collage/coding.webp'
import qPay from './assets/proyects/Q-pay/q-pay-laptop.webp'
import './PortfolioDirectory.css'

type DirectoryCard = {
  id: string
  label: string
  scene: string
  description: string
  links: [label: string, to: string][]
}

export default function PortfolioDirectory() {
  const { lang, t } = useLang()
  const es = lang === 'es'
  const [active, setActive] = useState<string | null>(null)
  const directory = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()
  const previewTap = useRef(false)

  useLayoutEffect(() => {
    const root = directory.current
    if (!root || reducedMotion) return

    const updateIntro = ({ progress }: ScrollTrigger) => {
      const sealEnd = 0.16
      const lineProgress = Math.max(0, (progress - sealEnd) / (1 - sealEnd))
      root.style.setProperty('--seal-progress', String(Math.min(1, progress / sealEnd)))
      root.style.setProperty('--line-progress', String(lineProgress))
      if (progress < 1 && !root.hasAttribute('data-entering') && !root.matches(':has(:focus-visible)')) {
        setActive(null)
      }
      root.toggleAttribute('data-entering', progress < 1)
    }

    const trigger = ScrollTrigger.create({
      trigger: root.parentElement,
      start: () => `${root.offsetHeight / 2}px bottom`,
      end: () => `+=${Number(getComputedStyle(root).getPropertyValue('--intro-viewports')) * 100}%`,
      onUpdate: updateIntro,
      onRefresh: updateIntro,
    })
    updateIntro(trigger)
    return () => {
      trigger.kill()
      root.style.removeProperty('--seal-progress')
      root.style.removeProperty('--line-progress')
      delete root.dataset.entering
    }
  }, [reducedMotion])

  useEffect(() => {
    if (!active) return
    function dismissOutside(event: PointerEvent) {
      if (event.target instanceof Node && !directory.current?.contains(event.target)) setActive(null)
    }
    function dismissOnEscape(event: KeyboardEvent) {
      if (event.key !== 'Escape') return
      const tile = directory.current?.querySelector('.directory-tile.is-open')
      if (tile?.contains(document.activeElement)) tile.querySelector<HTMLElement>('.directory-entry')?.focus()
      setActive(null)
    }
    document.addEventListener('pointerdown', dismissOutside)
    document.addEventListener('keydown', dismissOnEscape)
    return () => {
      document.removeEventListener('pointerdown', dismissOutside)
      document.removeEventListener('keydown', dismissOnEscape)
    }
  }, [active])

  const cards: DirectoryCard[] = [
    {
      id: 'experience', label: t.experienceTitle, scene: experience,
      description: es
        ? 'Algunas cosas las aprendí en clase y otras, trabajando con gente que hacía preguntas distintas a las mías. Ambas experiencias explican cómo pienso y cómo trabajo hoy.'
        : 'Some lessons came from the classroom. Others came from working with people who asked different questions than I did. Both shaped how I think and work today.',
      links: [[es ? 'Trayectoria' : 'Background', '/#info'], [es ? 'Estudios' : 'Education', '/#educacion'],
        [es ? 'Certificaciones' : 'Certifications', '/#certificaciones'], [es ? 'Premios' : 'Awards', '/#premios']],
    },
    {
      id: 'projects', label: 'Projects', scene: qPay,
      description: es
        ? 'Me apasionan la inteligencia artificial y la seguridad. Cuando algo me intriga, mi forma favorita de entenderlo es construir una primera versión y ver qué pasa al probarla.'
        : 'I love AI and security. When something catches my curiosity, my favorite way to understand it is to build a first version and see what happens when I try it.',
      links: [[es ? 'Ver proyectos' : 'View projects', '/projects'], ['Q-Pay', '/e/projects/q-pay']],
    },
    {
      id: 'community', label: 'Community', scene: community,
      description: es
        ? 'A veces otra persona hace la pregunta que me faltaba. Me importa que tengamos espacios para probar ideas juntos.'
        : 'Sometimes someone else asks the question I was missing. I care about making room for us to try ideas together.',
      links: [[es ? 'Ver comunidad' : 'Explore community', '/community'], [es ? 'Ver charlas' : 'View talks', '/community#charlas']],
    },
    {
      id: 'publications', label: es ? 'Escritos' : 'Writing', scene: coding,
      description: es
        ? 'Aquí reúno los resúmenes de mis charlas para que puedas volver a las ideas que compartí en el escenario.'
        : 'I collect my talk recaps here so you can revisit the ideas I shared on stage.',
      links: [[es ? 'Ver escritos' : 'Browse writing', '/escritos']],
    },
  ]

  return (
    <nav ref={directory} className="portfolio-directory" data-active={active ?? undefined}
      aria-label={es ? 'Explorar el portfolio' : 'Explore the portfolio'}
      onPointerLeave={event => {
        if (event.pointerType === 'mouse' && !event.currentTarget.querySelector(':focus-visible')) setActive(null)
      }}
      onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setActive(null) }}>
      {cards.map(card => {
        const destination = card.links[0][1]
        const open = active === card.id
        const descriptionId = 'preview-' + card.id
        const labelLang = card.id === 'projects' || card.id === 'community' ? 'en' : lang
        return (
          <div key={destination} className={open ? 'directory-tile is-open' : 'directory-tile'}
            onPointerEnter={event => { if (event.pointerType === 'mouse') setActive(card.id) }}
            onFocus={event => { if (event.target.matches(':focus-visible')) setActive(card.id) }}>
            <div className="directory-scene" aria-hidden="true">
              <img src={card.scene} alt="" loading="lazy" />
            </div>
            <Link className="directory-entry" aria-label={card.label} lang={labelLang} to={destination}
              aria-describedby={open ? descriptionId : undefined}
              onPointerDown={event => { previewTap.current = event.pointerType !== 'mouse' && !open }}
              onClick={event => {
                if (event.detail && previewTap.current) {
                  event.preventDefault()
                  setActive(card.id)
                } else {
                  setActive(null)
                }
                previewTap.current = false
              }} />
            <div className="directory-content">
              <span className="directory-label" lang={labelLang} aria-hidden="true">{card.label}<span>↗</span></span>
              <div className="directory-drawer" inert={!open} aria-hidden={!open}>
                <div className="directory-drawer-inner">
                  <p id={descriptionId}>{card.description}</p>
                  <div className="directory-links">
                    {card.links.map(([label, to]) => <Link key={to} to={to} onClick={() => setActive(null)}>{label}</Link>)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      })}
      <span className="directory-axis directory-axis-x" aria-hidden="true" />
      <span className="directory-axis directory-axis-y" aria-hidden="true" />
      <span className="directory-seal" aria-hidden="true">
        <img src="/brand/isotipo-blanco.svg" alt="" width="512" height="512" />
      </span>
    </nav>
  )
}
