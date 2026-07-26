import { useEffect, useState, type CSSProperties } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { tabOrder, type WorkTab } from './i18n'
import { useLang } from './LangContext'
import { getWorkCover, isLogoMedia } from './workMedia'
import { HeroCollage } from './HeroCollage'
import { SiteFooter, SiteHeader } from './SiteChrome'

const pieceShapes = ['trap', 'rhomb', 'skew'] as const
const pieceBgs = ['#3d5a80', '#2a4060', '#5a6f7d', '#4a5d4e'] as const

export default function HomePage() {
  const { t } = useLang()
  const location = useLocation()
  const [tab, setTab] = useState<WorkTab>('projects')
  const [reshaping, setReshaping] = useState(false)
  const overview = t.work[tab]

  useEffect(() => {
    if (!location.hash) return
    const id = location.hash.replace(/^#/, '')
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [location.hash, location.pathname])

  const selectTab = (next: WorkTab) => {
    if (next === tab) return
    setReshaping(true)
    window.setTimeout(() => {
      setTab(next)
      setReshaping(false)
    }, 220)
  }

  return (
    <>
      <SiteHeader />

      <main id="top">

        <section className="hero" aria-label="Hero">
          <h1 className="visually-hidden">{t.brand}</h1>
          <div className="hero-name" aria-hidden="true">
            <span className="hero-name-line hero-name-line-top">Luis De</span>
            <span className="hero-name-line hero-name-line-bottom">León</span>
          </div>
          <div className="hero-copy">
            <p className="hero-focus">{t.focus}</p>
            <span className="hero-rule" aria-hidden="true" />
            <p className="hero-tag">
              {t.tagline.split('\n').map((line) => (
                <span key={line} className="hero-tag-line">
                  {line}
                </span>
              ))}
            </p>
          </div>
          <div className="hero-stage" aria-hidden="true">
            <HeroCollage />
          </div>
        </section>

        <section className="site section" aria-labelledby="about-title">
          <div className="about-grid">
            <div className="wall-label">
              <span className="num">{t.aboutLabel}</span>
              <h2 id="about-title">{t.aboutTitle}</h2>
            </div>
            <div className="about-copy">
              <p className="lede">{t.aboutBody}</p>
              {t.aboutSkills.length > 0 ? (
                <ul className="about-skills" aria-label="Stack">
                  {t.aboutSkills.map((skill) => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          </div>
        </section>

        <section className="site section" id="experiencia" aria-labelledby="exp-title">
          <div className="section-head split">
            <div className="wall-label">
              <span className="num">02</span>
              <h2 id="exp-title">{t.experienceTitle}</h2>
            </div>
            <p className="lede">{t.experienceIntro}</p>
          </div>
          <div className="timeline">
            {t.experience.map((item) => (
              <article key={item.role} className="timeline-item">
                <div className="timeline-meta">
                  <span>{item.period}</span>
                  <span>{item.place}</span>
                </div>
                <h3>{item.role}</h3>
                <p>{item.note}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="site section" id="experimentos" aria-labelledby="work-title">
          <div className="section-head split">
            <div className="wall-label">
              <span className="num">03</span>
              <h2 id="work-title">{t.workTitle}</h2>
            </div>
            <p className="lede">{t.workIntro}</p>
          </div>

          <div className="tabs" role="tablist" aria-label={t.workTitle}>
            {tabOrder.map((id) => (
              <button
                key={id}
                type="button"
                className="tab"
                role="tab"
                id={`tab-${id}`}
                aria-selected={tab === id}
                aria-controls="work-panel"
                onClick={() => selectTab(id)}
              >
                {t.tabs[id]}
              </button>
            ))}
          </div>

          <div
            className={`work-stage${reshaping ? ' is-reshaping' : ''}`}
            role="tabpanel"
            id="work-panel"
            aria-labelledby={`tab-${tab}`}
          >
            <p className="work-summary">{overview.summary}</p>
            {overview.items.length === 0 ? (
              <div className="coming-soon" role="status">
                <p className="coming-soon-label">{t.comingSoon}</p>
              </div>
            ) : (
              <>
                <div className="hang">
                  {overview.items.slice(0, 3).map((item, i) => {
                    const cover = getWorkCover(tab, item.id)
                    const logo = Boolean(cover && isLogoMedia(tab, item.id))
                    return (
                      <Link
                        key={item.id}
                        to={`/e/${tab}/${item.id}`}
                        className="piece piece-link"
                        aria-label={`${t.openItem}: ${item.title}`}
                      >
                        <div className={`piece-mount ${pieceShapes[i % pieceShapes.length]}`}>
                          <div
                            className={`piece-fill${cover ? ' has-photo' : ''}${logo ? ' is-logo' : ''}`}
                            style={
                              cover
                                ? undefined
                                : ({
                                    '--piece-bg': pieceBgs[i % pieceBgs.length],
                                  } as CSSProperties)
                            }
                          >
                            {cover ? (
                              <img
                                className={`media-photo${logo ? ' is-logo' : ''}`}
                                src={cover}
                                alt=""
                              />
                            ) : (
                              t.placeholder
                            )}
                          </div>
                        </div>
                        <span className="meta">{item.meta}</span>
                        <h3>{item.title}</h3>
                        <p>{item.blurb}</p>
                      </Link>
                    )
                  })}
                </div>
                <div className="work-actions">
                  <Link className="btn btn-primary" to={`/e/${tab}`}>
                    {t.seeMore}
                  </Link>
                </div>
              </>
            )}
          </div>
        </section>

        <section className="site section" id="premios" aria-labelledby="awards-title">
          <div className="section-head split">
            <div className="wall-label">
              <span className="num">04</span>
              <h2 id="awards-title">{t.awardsTitle}</h2>
            </div>
            {t.awardsIntro ? <p className="lede">{t.awardsIntro}</p> : null}
          </div>
          <div className="rail">
            {t.awards.slice(0, 3).map((item) => (
              <article key={item.id} className="rail-item">
                <span className="meta">
                  {item.org}
                  <span aria-hidden="true"> · </span>
                  {item.year}
                </span>
                <h3>
                  <Link to={`/premios/${item.id}`}>{item.title}</Link>
                </h3>
              </article>
            ))}
          </div>
          <div className="work-actions">
            <Link className="btn btn-primary" to="/premios">
              {t.seeMore}
            </Link>
          </div>
        </section>

        <section className="site section" id="educacion" aria-labelledby="edu-title">
          <div className="section-head split">
            <div className="wall-label">
              <span className="num">05</span>
              <h2 id="edu-title">{t.educationTitle}</h2>
            </div>
            <p className="lede">{t.educationIntro}</p>
          </div>
          <div className="rail">
            {t.education.map((item) => (
              <article key={item.title} className="rail-item">
                <span className="meta">{item.meta}</span>
                <h3>{item.title}</h3>
                <p>{item.note}</p>
              </article>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  )
}
