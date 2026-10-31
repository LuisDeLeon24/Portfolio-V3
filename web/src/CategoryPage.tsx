import { useEffect, type CSSProperties } from 'react'
import { Link, useParams } from 'react-router-dom'
import FeaturedShowcase from './FeaturedShowcase'
import { dictionaries, isWorkTab, type WorkItem, type WorkTab } from './i18n'
import { useLang } from './LangContext'
import { SiteFooter, SiteHeader } from './SiteChrome'
import { getWorkCover, isLogoMedia } from './workMedia'

const pieceShapes = ['trap', 'rhomb', 'skew'] as const
const pieceBgs = ['#66023C', '#120A0F', '#8C6A2F', '#4A012C'] as const

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

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [tab])

  return (
    <>
      <SiteHeader />
      <main id="top">
        <h1 className="visually-hidden">{category.title}</h1>
        <FeaturedShowcase tab={tab} />

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
              <Link className="btn btn-ghost" to={{ pathname: '/', hash: 'trabajo' }}>
                {t.backHome}
              </Link>
            </p>
          </div>
      </main>
      <SiteFooter />
    </>
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
