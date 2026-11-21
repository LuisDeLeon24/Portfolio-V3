import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { CONTACT_EMAIL } from './i18n'
import { useLang } from './language'
import { nav } from './data/editorial'
import ContactControl from './ContactControl'
import SocialLinks from './SocialLinks'

export function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <span aria-hidden="true" className="arrow">
      {diagonal ? '↗' : '→'}
    </span>
  )
}
export function SiteHeader() {
  const { lang, setLang } = useLang()
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const toggle = useRef<HTMLButtonElement>(null)
  const header = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!open) return
    function dismissOutside(event: PointerEvent) {
      if (event.target instanceof Node && !header.current?.contains(event.target)) setOpen(false)
    }
    document.addEventListener('pointerdown', dismissOutside)
    return () => document.removeEventListener('pointerdown', dismissOutside)
  }, [open])
  const es = lang === 'es'
  return (
    <header ref={header} className="mast mast-cover"
      onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false) }}
      onKeyDown={event => {
        if (open && event.key === 'Escape') {
          setOpen(false)
          toggle.current?.focus()
        }
      }}>
      <a className="skip" href="#main">
        {es ? 'Saltar al contenido' : 'Skip to content'}
      </a>
      <div className="mast-inner">
        <Link
          to="/"
          className="brand"
          onClick={() => setOpen(false)}
          aria-label={es ? 'Luis De León · Inicio' : 'Luis De León · Home'}
        >
          <img
            src="/brand/isotipo-blanco.svg"
            width="46"
            height="46"
            alt=""
          />
        </Link>
        <ContactControl onOpen={() => setOpen(false)} />
        <div className="langs" aria-label={es ? 'Idioma' : 'Language'}>
          {(['es', 'en'] as const).map((l) => (
            <button
              type="button"
              key={l}
              aria-pressed={lang === l}
              lang={l}
              onClick={() => setLang(l)}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>
        <button
          ref={toggle}
          id="menu-toggle"
          className="menu-toggle"
          type="button"
          aria-controls="primary-nav"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? (es ? 'Cerrar' : 'Close') : es ? 'Menú' : 'Menu'}
        </button>
        <nav id="primary-nav" className={open ? 'main-nav open' : 'main-nav'} aria-label={es ? 'Principal' : 'Main'}>
          {nav.map(([id, label, english, path]) => (
            <Link key={id} to={path}
              aria-current={pathname === path ? 'page' : undefined}
              onClick={() => setOpen(false)}>
              {es ? label : english}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}

export function SiteFooter() {
  const es = useLang().lang === 'es'
  return (
    <footer id="contacto" className="site-footer">
      <div className="site-footer__top">
        <nav className="site-footer__nav" aria-label={es ? 'Navegación del pie de página' : 'Footer navigation'}>
          <Link to="/">{es ? 'Inicio' : 'Home'}</Link>
          <Link to="/#info">{es ? 'Experiencia' : 'Experience'}</Link>
          {nav.map(([id, label, english]) => (
            <Link key={id} to={'/#' + id}>{es ? label : english}</Link>
          ))}
        </nav>
        <div className="site-footer__contact">
          <SocialLinks />
          <h2>{es ? 'Hablemos.' : 'Let’s talk.'}</h2>
          <p className="site-footer__invitation">
            {es
              ? 'Si estás construyendo algo en IA o seguridad, o armando un espacio para hablar de eso, me gustaría conocerlo'
              : 'If you’re building something in AI or security, or bringing people together to talk about it, I’d love to hear about it.'}
          </p>
          <a href={'mailto:' + CONTACT_EMAIL}>{CONTACT_EMAIL} <Arrow diagonal /></a>
          <p>Guatemala</p>
        </div>
      </div>
      <div className="site-footer__signature" role="img" aria-label="Luis De León" />
    </footer>
  )
}
