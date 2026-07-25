import { useEffect, useMemo, type CSSProperties } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  findWorkItem,
  getAdjacentInCategory,
  getRandomFromOtherCategories,
  isWorkTab,
  type WorkTab,
} from './i18n'
import { useLang } from './LangContext'
import { SiteFooter, SiteHeader } from './SiteChrome'
import { getWorkCover, getWorkImages, isLogoMedia } from './workMedia'

const pieceShapes = ['trap', 'rhomb', 'skew'] as const
const pieceBgs = ['#3d5a80', '#2a4060', '#5a6f7d', '#4a5d4e'] as const

export default function ItemPage() {
  const { tab = '', id = '' } = useParams()
  const { lang } = useLang()

  if (!isWorkTab(tab)) {
    return <Missing />
  }

  return <ItemDetail tab={tab} id={id} lang={lang} />
}

function ItemDetail({ tab, id, lang }: { tab: WorkTab; id: string; lang: 'es' | 'en' }) {
  const { t } = useLang()
  const found = findWorkItem(lang, tab, id)

  const adjacent = useMemo(
    () => getAdjacentInCategory(lang, tab, id),
    [lang, tab, id],
  )

  const others = useMemo(
    () => getRandomFromOtherCategories(lang, tab, id, 3),
    [lang, tab, id],
  )

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [tab, id])

  if (!found) {
    return <Missing />
  }

  const { item, category } = found
  const { prev, next, position, total } = adjacent
  const photos = getWorkImages(tab, item.id)
  const cover = photos[0]
  const gallery = photos.slice(1)
  const logo = Boolean(cover && isLogoMedia(tab, item.id))

  return (
    <>
      <SiteHeader />
      <main className="site detail" id="top">
        <p className="detail-kicker">
          <Link to={{ pathname: '/', hash: 'experimentos' }}>{t.workTitle}</Link>
          <span aria-hidden="true"> · </span>
          <span>{category}</span>
          {total > 0 ? (
            <>
              <span aria-hidden="true"> · </span>
              <span>
                {position}/{total}
              </span>
            </>
          ) : null}
        </p>
        <header className="detail-head">
          <p className="meta">{item.meta}</p>
          <h1>{item.title}</h1>
          <p className="detail-blurb">{item.blurb}</p>
        </header>

        <div className="detail-mount">
          <div className={`detail-mount-frame${logo ? ' is-logo' : ''}`}>
            {cover ? (
              <img className={`media-photo${logo ? ' is-logo' : ''}`} src={cover} alt="" />
            ) : (
              <div className="piece-fill detail-fill">{t.placeholder}</div>
            )}
          </div>
        </div>

        {gallery.length > 0 ? (
          <div className="detail-gallery" aria-label={item.title}>
            {gallery.map((src) => (
              <figure key={src} className="detail-gallery-item">
                <img src={src} alt="" />
              </figure>
            ))}
          </div>
        ) : null}

        <div className="detail-body">
          {item.body.map((paragraph) => (
            <p key={paragraph.slice(0, 32)}>{paragraph}</p>
          ))}
        </div>

        {item.links?.length ? (
          <section className="detail-links" aria-labelledby="detail-links-title">
            <h2 id="detail-links-title">{t.detailLinks}</h2>
            <ul>
              {item.links.map((link) => (
                <li key={link.label}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <nav className="detail-pager" aria-label={`${t.prevItem} / ${t.nextItem}`}>
          {prev ? (
            <Link className="pager-btn pager-prev" to={`/e/${tab}/${prev.id}`}>
              <span className="pager-arrow" aria-hidden="true">
                ←
              </span>
              <span className="pager-copy">
                <span className="pager-label">{t.prevItem}</span>
                <span className="pager-title">{prev.title}</span>
              </span>
            </Link>
          ) : (
            <span className="pager-btn pager-prev is-disabled" aria-disabled="true">
              <span className="pager-arrow" aria-hidden="true">
                ←
              </span>
              <span className="pager-copy">
                <span className="pager-label">{t.prevItem}</span>
              </span>
            </span>
          )}

          {next ? (
            <Link className="pager-btn pager-next" to={`/e/${tab}/${next.id}`}>
              <span className="pager-copy">
                <span className="pager-label">{t.nextItem}</span>
                <span className="pager-title">{next.title}</span>
              </span>
              <span className="pager-arrow" aria-hidden="true">
                →
              </span>
            </Link>
          ) : (
            <span className="pager-btn pager-next is-disabled" aria-disabled="true">
              <span className="pager-copy">
                <span className="pager-label">{t.nextItem}</span>
              </span>
              <span className="pager-arrow" aria-hidden="true">
                →
              </span>
            </span>
          )}
        </nav>

        {others.length > 0 ? (
          <section className="detail-more" aria-labelledby="more-title">
            <div className="wall-label">
              <h2 id="more-title">{t.moreExperiments}</h2>
            </div>
            <div className="hang detail-more-hang">
              {others.map((ref, i) => {
                const cover = getWorkCover(ref.tab, ref.item.id)
                const logo = Boolean(cover && isLogoMedia(ref.tab, ref.item.id))
                return (
                  <Link
                    key={`${ref.tab}-${ref.item.id}`}
                    to={`/e/${ref.tab}/${ref.item.id}`}
                    className="piece piece-link"
                    aria-label={`${t.openItem}: ${ref.item.title}`}
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
                          t.tabs[ref.tab]
                        )}
                      </div>
                    </div>
                    <span className="meta">
                      {t.tabs[ref.tab]} · {ref.item.meta}
                    </span>
                    <h3>{ref.item.title}</h3>
                    <p>{ref.item.blurb}</p>
                  </Link>
                )
              })}
            </div>
          </section>
        ) : null}

        <p className="detail-back">
          <Link className="btn btn-ghost" to={{ pathname: '/', hash: 'experimentos' }}>
            {t.backHome}
          </Link>
        </p>
      </main>
      <SiteFooter />
    </>
  )
}

function Missing() {
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
