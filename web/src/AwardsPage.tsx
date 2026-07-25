import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getAwardCover, getAwardImages } from './awardMedia'
import { FeaturedCarousel } from './FeaturedShowcase'
import {
  findAwardItem,
  getAdjacentAward,
  getAwards,
  getFeaturedAwards,
  type AwardItem,
} from './i18n'
import { useLang } from './LangContext'
import { SiteFooter, SiteHeader } from './SiteChrome'

const AWARD_SHAPES = [
  'trap-a',
  'rhomb-a',
  'para-a',
  'slash-a',
  'trap-b',
  'rhomb-b',
  'kite-a',
  'para-b',
  'trap-c',
  'slash-b',
  'rhomb-c',
  'trap-d',
] as const

export default function AwardsPage() {
  const { lang, t } = useLang()
  const awards = getAwards(lang)
  const featured = getFeaturedAwards(lang)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return (
    <>
      <SiteHeader />
      <main id="top">
        <h1 className="visually-hidden">{t.awardsTitle}</h1>
        <FeaturedCarousel
          items={featured}
          detailTo={(id) => `/premios/${id}`}
          seeAll={t.seeAllAwards}
          ariaLabel={t.featuredAwardsNav}
          getCover={getAwardCover}
        />

        <section className="site awards-archive" id="archivo" aria-label={t.awardsArchiveTitle}>
          <header className="awards-archive-head">
            <h2>{t.awardsArchiveTitle}</h2>
            <p className="lede">{t.awardsArchiveLead}</p>
          </header>

          <div className="awards-blocks">
            {awards.map((item, i) => (
              <AwardBlock
                key={item.id}
                item={item}
                shape={AWARD_SHAPES[i % AWARD_SHAPES.length]}
                openLabel={t.openItem}
                placeholder={t.placeholder}
                prevLabel={t.prevItem}
                nextLabel={t.nextItem}
              />
            ))}
          </div>

          <p className="detail-back">
            <Link className="btn btn-ghost" to={{ pathname: '/', hash: 'premios' }}>
              {t.backHome}
            </Link>
          </p>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}

function AwardBlock({
  item,
  shape,
  openLabel,
  placeholder,
  prevLabel,
  nextLabel,
}: {
  item: AwardItem
  shape: (typeof AWARD_SHAPES)[number]
  openLabel: string
  placeholder: string
  prevLabel: string
  nextLabel: string
}) {
  return (
    <article className="award-block" id={item.id} aria-labelledby={`award-title-${item.id}`}>
      <div className="award-block-compose">
        <h3 id={`award-title-${item.id}`} className="award-block-title">
          {item.title}
        </h3>

        <div className="award-block-meta">
          <p className="award-block-org">
            {item.org}
            <span aria-hidden="true"> · </span>
            {item.year}
          </p>
          <p className="award-block-why">{item.blurb}</p>
          <Link className="award-block-link" to={`/premios/${item.id}`}>
            <span>{openLabel}</span>
            <span aria-hidden="true"> →</span>
          </Link>
        </div>

        <AwardGallery
          awardId={item.id}
          featureArt={item.featureArt ?? 0}
          shape={shape}
          placeholder={placeholder}
          prevLabel={prevLabel}
          nextLabel={nextLabel}
          label={item.title}
        />
      </div>
    </article>
  )
}

function AwardGallery({
  awardId,
  featureArt,
  shape,
  placeholder,
  prevLabel,
  nextLabel,
  label,
}: {
  awardId: string
  featureArt: 0 | 1 | 2 | 3
  shape: (typeof AWARD_SHAPES)[number]
  placeholder: string
  prevLabel: string
  nextLabel: string
  label: string
}) {
  const photos = getAwardImages(awardId)
  const [index, setIndex] = useState(0)
  const count = Math.max(photos.length, 1)
  const safeIndex = Math.min(index, count - 1)
  const photo = photos[safeIndex]
  const canNavigate = photos.length > 1

  const goPrev = () => setIndex((current) => (current - 1 + count) % count)
  const goNext = () => setIndex((current) => (current + 1) % count)

  return (
    <div className={`award-gallery media-${shape}`}>
      <div
        className={`award-gallery-frame${photo ? ' has-photo' : ` art-${featureArt}`}`}
        aria-hidden="true"
      >
        {photo ? (
          <img className="media-photo" src={photo} alt="" />
        ) : (
          <>
            <span className="award-gallery-veil" />
            <span className="award-gallery-label">{placeholder}</span>
          </>
        )}
      </div>

      {canNavigate ? (
        <div className="award-gallery-controls">
          <button
            type="button"
            className="award-gallery-arrow"
            aria-label={`${prevLabel}: ${label}`}
            onClick={goPrev}
          >
            ←
          </button>
          <span className="award-gallery-count" aria-live="polite">
            {safeIndex + 1}/{count}
          </span>
          <button
            type="button"
            className="award-gallery-arrow"
            aria-label={`${nextLabel}: ${label}`}
            onClick={goNext}
          >
            →
          </button>
        </div>
      ) : null}
    </div>
  )
}

export function AwardItemPage() {
  const { id = '' } = useParams()
  const { lang, t } = useLang()
  const found = findAwardItem(lang, id)

  const adjacent = useMemo(() => getAdjacentAward(lang, id), [lang, id])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [id])

  if (!found) {
    return <MissingAward />
  }

  const { item } = found
  const { prev, next, position, total } = adjacent
  const cover = getAwardCover(item.id)

  return (
    <>
      <SiteHeader />
      <main className="site detail" id="top">
        <p className="detail-kicker">
          <Link to="/premios">{t.awardsTitle}</Link>
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
          <p className="meta">
            {item.org}
            <span aria-hidden="true"> · </span>
            {item.year}
          </p>
          <h1>{item.title}</h1>
          <p className="detail-blurb">{item.blurb}</p>
        </header>

        <div className="detail-mount" aria-hidden="true">
          <div className="detail-mount-frame">
            <div
              className={`piece-fill detail-fill${cover ? ' has-photo' : ` art-${item.featureArt ?? 0}`}`}
            >
              {cover ? <img className="media-photo" src={cover} alt="" /> : t.placeholder}
            </div>
          </div>
        </div>

        <div className="detail-body">
          {item.body.map((paragraph) => (
            <p key={paragraph.slice(0, 32)}>{paragraph}</p>
          ))}
        </div>

        {item.links?.length ? (
          <section className="detail-links" aria-labelledby="award-links-title">
            <h2 id="award-links-title">{t.detailLinks}</h2>
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
            <Link className="pager-btn pager-prev" to={`/premios/${prev.id}`}>
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
            <Link className="pager-btn pager-next" to={`/premios/${next.id}`}>
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

        <p className="detail-back">
          <Link className="btn btn-ghost" to="/premios">
            {t.seeAllAwards}
          </Link>
        </p>
      </main>
      <SiteFooter />
    </>
  )
}

function MissingAward() {
  const { t } = useLang()
  return (
    <>
      <SiteHeader />
      <main className="site detail" id="top">
        <h1>{t.notFoundTitle}</h1>
        <p className="lede">{t.notFoundBody}</p>
        <p className="detail-back">
          <Link className="btn btn-primary" to="/premios">
            {t.awardsTitle}
          </Link>
        </p>
      </main>
      <SiteFooter />
    </>
  )
}
