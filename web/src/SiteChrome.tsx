import { useEffect, useId, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { CONTACT_EMAIL, SOCIAL_LINKS, tabOrder } from './i18n'
import { useLang } from './LangContext'

function sectionTo(id: string) {
  return { pathname: '/', hash: id }
}

export function SiteHeader() {
  const { lang, setLang, t } = useLang()

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link className="logo" to="/">
          LDL
        </Link>
        <div className="nav-cluster">
          <nav aria-label="Primary">
            <ul className="nav-links">
              <li>
                <Link to={sectionTo('experiencia')}>{t.nav.experience}</Link>
              </li>
              <li className="nav-item-experiments">
                <ExperimentsMenu />
              </li>
              <li>
                <Link to={sectionTo('premios')}>{t.nav.awards}</Link>
              </li>
              <li>
                <Link to={sectionTo('educacion')}>{t.nav.education}</Link>
              </li>
              <li>
                <Link to={sectionTo('contacto')}>{t.nav.contact}</Link>
              </li>
            </ul>
          </nav>
          <div className="experiments-mobile">
            <ExperimentsMenu />
          </div>
          <div className="lang-toggle" role="group" aria-label="Language">
            <button type="button" aria-pressed={lang === 'es'} onClick={() => setLang('es')}>
              ES
            </button>
            <span className="sep" aria-hidden="true">
              /
            </span>
            <button type="button" aria-pressed={lang === 'en'} onClick={() => setLang('en')}>
              EN
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

function ExperimentsMenu() {
  const { t } = useLang()
  const location = useLocation()
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const menuId = useId()

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (!open) return

    const onPointer = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
    }
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('mousedown', onPointer)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onPointer)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div className={`experiments-combo${open ? ' is-open' : ''}`} ref={rootRef}>
      <Link className="experiments-label" to={sectionTo('experimentos')} onClick={() => setOpen(false)}>
        {t.nav.work}
      </Link>
      <button
        type="button"
        className="experiments-caret"
        aria-expanded={open}
        aria-controls={menuId}
        aria-haspopup="menu"
        aria-label={t.openCategories}
        onClick={() => setOpen((value) => !value)}
      >
        <span aria-hidden="true">▾</span>
      </button>
      {open ? (
        <ul className="experiments-menu" id={menuId} role="menu">
          {tabOrder.map((id) => (
            <li key={id} role="none">
              <Link role="menuitem" to={`/e/${id}`} onClick={() => setOpen(false)}>
                {t.tabs[id]}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}

export function SiteFooter() {
  const { t } = useLang()

  return (
    <footer className="site-footer" id="contacto">
      <div className="footer-panel">
        <div className="footer-panel-inner">
          <h2>{t.footerTitle}</h2>
          <p>{t.footerBody}</p>
          <div className="footer-actions">
            <a className="btn btn-primary" href={`mailto:${CONTACT_EMAIL}`}>
              {t.emailCta}
            </a>
            <span className="btn btn-ghost" aria-hidden="true">
              {t.socialCta}
            </span>
          </div>
          <ul className="social-list">
            {SOCIAL_LINKS.map((link) => (
              <li key={link.id}>
                <a href={link.href} target="_blank" rel="noreferrer">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p className="colophon">
        <span className="footer-panel-inner colophon-inner">
          {t.brand} · {t.focus}
        </span>
      </p>
    </footer>
  )
}
