import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { dictionaries, getFeaturedItems, type WorkItem, type WorkTab } from './i18n'
import { useLang } from './LangContext'
import { getWorkCover, isLogoMedia } from './workMedia'

type ShowcaseProps = {
  items: WorkItem[]
  detailTo: (id: string) => string
  seeAll: string
  ariaLabel: string
  getCover?: (id: string) => string | undefined
  isLogo?: (id: string) => boolean
}

const AUTOPLAY_MS = 5500

function scrollToArchive() {
  document.getElementById('archivo')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

/** Category featured carousel for experiment tabs. */
export default function FeaturedShowcase({ tab }: { tab: WorkTab }) {
  const { lang, t } = useLang()
  const categoryTitle = dictionaries[lang].work[tab].title
  const seeAll = t.seeAllInCategory.replace('{category}', categoryTitle.toLowerCase())
  return (
    <FeaturedCarousel
      items={getFeaturedItems(lang, tab)}
      detailTo={(id) => `/e/${tab}/${id}`}
      seeAll={seeAll}
      ariaLabel={t.featuredNav}
      getCover={(id) => getWorkCover(tab, id)}
      isLogo={(id) => isLogoMedia(tab, id)}
    />
  )
}

/** Shared featured carousel — works for experiments and awards. */
export function FeaturedCarousel({
  items,
  detailTo,
  seeAll,
  ariaLabel,
  getCover,
  isLogo,
}: ShowcaseProps) {
  const { t, lang } = useLang()
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    setIndex(0)
  }, [lang, items])

  useEffect(() => {
    if (items.length <= 1 || paused) return
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % items.length)
    }, AUTOPLAY_MS)
    return () => window.clearInterval(timer)
  }, [items.length, paused, lang, items])

  if (items.length === 0) return null

  const safeIndex = Math.min(index, items.length - 1)
  const current = items[safeIndex]
  const layout: 'bleed' | 'split' = safeIndex % 2 === 0 ? 'bleed' : 'split'
  const splitFlip = Math.floor(safeIndex / 2) % 2 === 1
  const canNavigate = items.length > 1

  const goTo = (next: number) => {
    setIndex((next + items.length) % items.length)
  }

  const goPrev = () => goTo(safeIndex - 1)
  const goNext = () => goTo(safeIndex + 1)

  return (
    <section
      className={`featured featured-hero${layout === 'split' ? ' is-split' : ''}`}
      aria-roledescription="carousel"
      aria-label={ariaLabel}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setPaused(false)
        }
      }}
    >
      <div className="featured-stage">
        {layout === 'bleed' ? (
          <BleedSlide
            item={current}
            detailTo={detailTo}
            label={t.featuredLabel}
            cta={t.learnMore}
            seeAll={seeAll}
            cover={getCover?.(current.id)}
            logoMedia={isLogo?.(current.id)}
          />
        ) : (
          <SplitSlide
            item={current}
            detailTo={detailTo}
            label={t.featuredLabel}
            cta={t.learnMore}
            seeAll={seeAll}
            flip={splitFlip}
            cover={getCover?.(current.id)}
            logoMedia={isLogo?.(current.id)}
          />
        )}
      </div>

      {canNavigate ? (
        <>
          <button
            type="button"
            className="featured-arrow featured-arrow-prev"
            aria-label={t.prevItem}
            onClick={goPrev}
          >
            <span aria-hidden="true">←</span>
          </button>
          <button
            type="button"
            className="featured-arrow featured-arrow-next"
            aria-label={t.nextItem}
            onClick={goNext}
          >
            <span aria-hidden="true">→</span>
          </button>

          <div className="featured-chrome">
            <div className="featured-segments" role="tablist" aria-label={t.featuredTitle}>
              {items.map((item, i) => (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  className={`featured-segment${i === safeIndex ? ' is-active' : ''}`}
                  aria-selected={i === safeIndex}
                  aria-label={item.title}
                  onClick={() => goTo(i)}
                />
              ))}
            </div>
            <p className="featured-counter" aria-live="polite">
              {safeIndex + 1} / {items.length}
            </p>
          </div>
        </>
      ) : null}
    </section>
  )
}

function FeaturedActions({
  itemId,
  detailTo,
  cta,
  seeAll,
  tone,
}: {
  itemId: string
  detailTo: (id: string) => string
  cta: string
  seeAll: string
  tone: 'light' | 'dark'
}) {
  return (
    <div className="featured-actions">
      <Link className={`featured-cta featured-cta-${tone}`} to={detailTo(itemId)}>
        {cta}
      </Link>
      <button
        type="button"
        className={`featured-scroll featured-scroll-${tone}`}
        onClick={scrollToArchive}
      >
        <span>{seeAll}</span>
        <span className="featured-scroll-arrow" aria-hidden="true">
          ↓
        </span>
      </button>
    </div>
  )
}

function BleedSlide({
  item,
  detailTo,
  label,
  cta,
  seeAll,
  cover,
  logoMedia,
}: {
  item: WorkItem
  detailTo: (id: string) => string
  label: string
  cta: string
  seeAll: string
  cover?: string
  logoMedia?: boolean
}) {
  return (
    <article
      className={`featured-bleed${cover ? ' has-photo' : ` art-${item.featureArt ?? 0}`}${logoMedia && cover ? ' is-logo' : ''}`}
    >
      {cover ? (
        <img className={`featured-photo${logoMedia ? ' is-logo' : ''}`} src={cover} alt="" />
      ) : null}
      <div className="featured-bleed-scrim" aria-hidden="true" />
      <div className="featured-bleed-copy">
        <p className="featured-kicker">{label}</p>
        <h2 className="featured-title">{item.title}</h2>
        {item.featureSubtitle ? (
          <p className="featured-subtitle">{item.featureSubtitle}</p>
        ) : (
          <p className="featured-subtitle">{item.blurb}</p>
        )}
        <p className="featured-meta">{item.meta}</p>
        <FeaturedActions
          itemId={item.id}
          detailTo={detailTo}
          cta={cta}
          seeAll={seeAll}
          tone="light"
        />
      </div>
    </article>
  )
}

function SplitSlide({
  item,
  detailTo,
  label,
  cta,
  seeAll,
  flip,
  cover,
  logoMedia,
}: {
  item: WorkItem
  detailTo: (id: string) => string
  label: string
  cta: string
  seeAll: string
  flip: boolean
  cover?: string
  logoMedia?: boolean
}) {
  return (
    <article className={`featured-split${flip ? ' is-flipped' : ''}`}>
      <div className={`featured-split-panel tone-${(item.featureArt ?? 0) % 2}`}>
        <div className="featured-split-copy">
          <p className="featured-kicker featured-kicker-dark">{label}</p>
          <h2 className="featured-title featured-title-dark">{item.title}</h2>
          {item.featureSubtitle ? (
            <p className="featured-subtitle featured-subtitle-dark">{item.featureSubtitle}</p>
          ) : (
            <p className="featured-subtitle featured-subtitle-dark">{item.blurb}</p>
          )}
          <p className="featured-meta featured-meta-dark">{item.meta}</p>
          <FeaturedActions
            itemId={item.id}
            detailTo={detailTo}
            cta={cta}
            seeAll={seeAll}
            tone="dark"
          />
        </div>
      </div>
      <div
        className={`featured-split-media${cover ? ' has-photo' : ` art-${item.featureArt ?? 0}`}${logoMedia && cover ? ' is-logo' : ''}`}
        aria-hidden="true"
      >
        {cover ? (
          <img className={`featured-photo${logoMedia ? ' is-logo' : ''}`} src={cover} alt="" />
        ) : null}
      </div>
    </article>
  )
}
