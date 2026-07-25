import { useEffect, useRef, type CSSProperties } from 'react'
import { Link, useParams } from 'react-router-dom'
import FeaturedShowcase from './FeaturedShowcase'
import { dictionaries, isWorkTab, type WorkItem, type WorkTab } from './i18n'
import { useLang } from './LangContext'
import { SiteFooter, SiteHeader } from './SiteChrome'
import { getWorkCover, isLogoMedia } from './workMedia'

const pieceShapes = ['trap', 'rhomb', 'skew'] as const
const pieceBgs = ['#3d5a80', '#2a4060', '#5a6f7d', '#4a5d4e'] as const

export default function CategoryPage() {
  const { tab = '' } = useParams()
  const { lang } = useLang()

  if (!isWorkTab(tab)) {
    return <MissingCategory />
  }

  return <CategoryView tab={tab} lang={lang} />
}

function CategoryView({ tab, lang }: { tab: WorkTab; lang: 'es' | 'en' }) {
  const { t } = useLang()
  const category = dictionaries[lang].work[tab]
  const archiveTitle =
    tab === 'certs'
      ? t.allCertifications
      : t.allInCategory.replace('{category}', category.title)
  const isProjects = tab === 'projects'
  const isLabs = tab === 'ctfs'
  const isResearch = tab === 'research'

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [tab])

  return (
    <>
      <SiteHeader />
      <main id="top">
        <h1 className="visually-hidden">{category.title}</h1>
        <FeaturedShowcase tab={tab} />

        {isLabs ? (
          <section className="labs-archive" id="archivo" aria-label={archiveTitle}>
            <header className="site labs-archive-head">
              <h2>{archiveTitle}</h2>
            </header>
            <LabsStrip
              tab={tab}
              items={category.items}
              learnMore={t.learnMore}
              openLabel={t.openItem}
              placeholder={t.placeholder}
            />
            <div className="site labs-archive-foot">
              <Link className="btn btn-ghost" to={{ pathname: '/', hash: 'experimentos' }}>
                {t.backHome}
              </Link>
            </div>
          </section>
        ) : isResearch ? (
          <section className="research-archive" id="archivo" aria-label={archiveTitle}>
            {category.items.length === 0 ? (
              <div className="site coming-soon coming-soon-page" role="status">
                <h2>{category.title}</h2>
                <p className="coming-soon-label">{t.comingSoon}</p>
                <p className="coming-soon-note">{category.summary}</p>
              </div>
            ) : (
              <ResearchRail
                tab={tab}
                items={category.items}
                title={category.title}
                exploreLabel={t.exploreResearch}
                learnMore={t.learnMore}
                openLabel={t.openItem}
                placeholder={t.placeholder}
              />
            )}
            <div className="site research-archive-foot">
              <Link className="btn btn-ghost" to={{ pathname: '/', hash: 'experimentos' }}>
                {t.backHome}
              </Link>
            </div>
          </section>
        ) : (
          <div className={`site category-archive${isProjects ? ' is-projects' : ''}`} id="archivo">
            <header className="category-archive-head">
              <h2>{archiveTitle}</h2>
            </header>

            {isProjects ? (
              <ProjectsRail
                tab={tab}
                items={category.items}
                categoryLabel={category.title}
                openLabel={t.openItem}
                placeholder={t.placeholder}
              />
            ) : (
              <div className="hang category-hang">
                {category.items.map((item, i) => {
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
                              : ({ '--piece-bg': pieceBgs[i % pieceBgs.length] } as CSSProperties)
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
            )}

            <p className="detail-back">
              <Link className="btn btn-ghost" to={{ pathname: '/', hash: 'experimentos' }}>
                {t.backHome}
              </Link>
            </p>
          </div>
        )}
      </main>
      <SiteFooter />
    </>
  )
}

/** Horizontal frames with slight geometric clip variants. */
const LABS_MEDIA_SHAPES = ['trap-a', 'rhomb-a', 'trap-b', 'rhomb-b', 'trap-c', 'rhomb-a'] as const
const RESEARCH_MEDIA_SHAPES = [
  'trap-a',
  'rhomb-a',
  'para-a',
  'trap-b',
  'rhomb-b',
  'trap-c',
  'para-b',
  'kite-a',
  'trap-d',
  'slash-a',
  'rhomb-c',
] as const

function ResearchRail({
  tab,
  items,
  title,
  exploreLabel,
  learnMore,
  openLabel,
  placeholder,
}: {
  tab: WorkTab
  items: WorkItem[]
  title: string
  exploreLabel: string
  learnMore: string
  openLabel: string
  placeholder: string
}) {
  const pinRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const pin = pinRef.current
    const track = trackRef.current
    if (!pin || !track) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let overflow = 0

    const measure = () => {
      overflow = Math.max(0, track.scrollWidth - window.innerWidth)
      if (reduceMotion.matches) {
        pin.style.height = ''
        track.style.transform = ''
        return
      }
      pin.style.height = `${window.innerHeight + overflow}px`
    }

    const sync = () => {
      if (reduceMotion.matches || overflow <= 0) {
        track.style.transform = 'translate3d(0,0,0)'
        return
      }
      const scrollable = pin.offsetHeight - window.innerHeight
      if (scrollable <= 0) {
        track.style.transform = 'translate3d(0,0,0)'
        return
      }
      const progress = Math.min(1, Math.max(0, -pin.getBoundingClientRect().top / scrollable))
      track.style.transform = `translate3d(${-overflow * progress}px, 0, 0)`
    }

    const onResize = () => {
      measure()
      sync()
    }

    measure()
    sync()

    window.addEventListener('scroll', sync, { passive: true })
    window.addEventListener('resize', onResize)
    const ro = new ResizeObserver(onResize)
    ro.observe(track)

    const onMotionChange = () => onResize()
    reduceMotion.addEventListener('change', onMotionChange)

    return () => {
      window.removeEventListener('scroll', sync)
      window.removeEventListener('resize', onResize)
      ro.disconnect()
      reduceMotion.removeEventListener('change', onMotionChange)
    }
  }, [items])

  return (
    <div className="research-pin" ref={pinRef}>
      <div className="research-sticky">
        <header className="site research-archive-head">
          <h2>{title}</h2>
          <span className="research-explore">{exploreLabel}</span>
        </header>
        <div className="research-rail" aria-label={title}>
          <div className="research-rail-track" ref={trackRef}>
            {items.map((item, i) => {
              const shape = RESEARCH_MEDIA_SHAPES[i % RESEARCH_MEDIA_SHAPES.length]
              return (
                <article key={item.id} className={`research-card media-${shape}`}>
                  <div
                    className={`research-card-media art-${item.featureArt ?? i % 4}`}
                    aria-hidden="true"
                  >
                    <span>{placeholder}</span>
                  </div>
                  <h3>{item.title}</h3>
                  <p className="research-card-meta">{item.blurb}</p>
                  <p className="research-card-date">{item.meta}</p>
                  <Link
                    className="research-card-link"
                    to={`/e/${tab}/${item.id}`}
                    aria-label={`${openLabel}: ${item.title}`}
                  >
                    {learnMore}
                  </Link>
                </article>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

function LabsStrip({
  tab,
  items,
  learnMore,
  openLabel,
  placeholder,
}: {
  tab: WorkTab
  items: WorkItem[]
  learnMore: string
  openLabel: string
  placeholder: string
}) {
  return (
    <div className="labs-strip">
      {items.map((item, i) => {
        const shape = LABS_MEDIA_SHAPES[i % LABS_MEDIA_SHAPES.length]
        const flip = i % 2 === 1
        const cover = getWorkCover(tab, item.id)
        return (
          <article
            key={item.id}
            className={`labs-row media-${shape}${flip ? ' is-flip' : ''}`}
          >
            <div
              className={`labs-media${cover ? ' has-photo' : ` art-${item.featureArt ?? i % 4}`}`}
              aria-hidden="true"
            >
              {cover ? <img className="media-photo" src={cover} alt="" /> : null}
              <span>{placeholder}</span>
            </div>
            <div className="labs-copy">
              <h3>{item.title}</h3>
              {item.featureSubtitle ? <p className="labs-subtitle">{item.featureSubtitle}</p> : null}
              <p className="labs-meta">{item.meta}</p>
              <p className="labs-blurb">{item.blurb}</p>
              <Link
                className="labs-link"
                to={`/e/${tab}/${item.id}`}
                aria-label={`${openLabel}: ${item.title}`}
              >
                {learnMore} <span aria-hidden="true">→</span>
              </Link>
            </div>
          </article>
        )
      })}
    </div>
  )
}

function ProjectsRail({
  tab,
  items,
  categoryLabel,
  openLabel,
  placeholder,
}: {
  tab: WorkTab
  items: WorkItem[]
  categoryLabel: string
  openLabel: string
  placeholder: string
}) {
  if (items.length === 0) return null

  const [latest, ...rest] = items

  return (
    <div className="projects-rail">
      <aside className="projects-rail-latest">
        <ProjectCard
          tab={tab}
          item={latest}
          categoryLabel={categoryLabel}
          openLabel={openLabel}
          placeholder={placeholder}
          size="lg"
          artIndex={latest.featureArt ?? 0}
        />
      </aside>

      {rest.length > 0 ? (
        <div className="projects-rail-grid">
          {rest.map((item, i) => {
            const shape = SMALL_MEDIA_SHAPES[i % SMALL_MEDIA_SHAPES.length]
            return (
              <ProjectCard
                key={item.id}
                tab={tab}
                item={item}
                categoryLabel={categoryLabel}
                openLabel={openLabel}
                placeholder={placeholder}
                size="sm"
                artIndex={(item.featureArt ?? i + 1) % 4}
                mediaShape={shape}
              />
            )
          })}
        </div>
      ) : null}
    </div>
  )
}

const SMALL_MEDIA_SHAPES = [
  'landscape',
  'landscape-sm',
  'landscape',
  'portrait',
  'landscape-sm',
  'landscape',
  'portrait',
  'landscape',
  'landscape-sm',
  'portrait',
] as const

type MediaShape = (typeof SMALL_MEDIA_SHAPES)[number]

function ProjectCard({
  tab,
  item,
  categoryLabel,
  openLabel,
  placeholder,
  size,
  artIndex,
  mediaShape = 'landscape',
}: {
  tab: WorkTab
  item: WorkItem
  categoryLabel: string
  openLabel: string
  placeholder: string
  size: 'lg' | 'sm'
  artIndex: number
  mediaShape?: MediaShape
}) {
  const { lang } = useLang()
  const shapeClass = size === 'sm' ? ` media-${mediaShape}` : ''
  const cover = getWorkCover(tab, item.id)
  const awarded = Boolean(item.awarded)
  const awardedLabel = lang === 'es' ? 'Premiado' : 'Awarded'

  return (
    <Link
      to={`/e/${tab}/${item.id}`}
      className={`project-card project-card-${size}${shapeClass}${awarded ? ' is-awarded' : ''}`}
      aria-label={`${openLabel}: ${item.title}${awarded ? ` · ${awardedLabel}` : ''}`}
    >
      <div
        className={`project-card-media${cover ? ' has-photo' : ` art-${artIndex}`}`}
        aria-hidden="true"
      >
        {cover ? <img className="media-photo" src={cover} alt="" /> : null}
        {!cover ? <span>{placeholder}</span> : null}
      </div>
      <div className="project-card-body">
        <p className="project-card-label">{categoryLabel}</p>
        <h3 className="project-card-title">
          <span>{item.title}</span>
          {awarded ? (
            <span className="project-award-inline" title={awardedLabel}>
              <TrophyIcon />
            </span>
          ) : null}
        </h3>
        <p className="project-card-date">{item.meta}</p>
      </div>
    </Link>
  )
}

function TrophyIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M7 3h10v2h3v3c0 2.2-1.5 4-3.5 4.5A5 5 0 0 1 13 15.9V18h3v2H8v-2h3v-2.1A5 5 0 0 1 7.5 12.5C5.5 12 4 10.2 4 8V5h3V3zm0 4H6v1c0 1 .7 1.8 1.7 2.1L7.5 10A3 3 0 0 0 7 7zm10 0h1v1c0 1-.7 1.8-1.7 2.1L16.5 10A3 3 0 0 1 17 7z"
      />
    </svg>
  )
}

function MissingCategory() {
  const { t } = useLang()
  return (
    <>
      <SiteHeader />
      <main className="site detail" id="top">
        <h1>{t.notFoundTitle}</h1>
        <p className="lede">{t.notFoundBody}</p>
        <p className="detail-back">
          <Link className="btn btn-primary" to="/">
            {t.backHome}
          </Link>
        </p>
      </main>
      <SiteFooter />
    </>
  )
}
