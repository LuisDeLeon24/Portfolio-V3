import { Link } from 'react-router-dom'
import type { CommunityMoment } from './data/community'
import { publications, publicationFormats } from './data/publications'
import { selectFeatured } from './data/featured'
import { useLang } from './language'
import { Arrow } from './SiteChrome'
import WorkEducation from './WorkEducation'
import FeaturedCertifications from './FeaturedCertifications'
import FeaturedAwards from './FeaturedAwards'
import SloganBand from './SloganBand'

export function InfoList() {
  return (
    <div className="info-list">
      <WorkEducation />
      <FeaturedCertifications />
      <SloganBand />
      <FeaturedAwards />
    </div>
  )
}

export function MomentList({ items }: { items: CommunityMoment[] }) {
  const { lang } = useLang()
  const es = lang === 'es'
  return (
    <div className="moment-list">
      {items.map(moment => (
        <article key={moment.id} id={moment.id}>
          <div className="moment-gallery" data-layout={moment.galleryLayout}>
            {moment.photos.map((photo, index) => (
              <a className={index === 0 ? 'moment-gallery__cover' : 'moment-gallery__thumb'}
                key={photo.src} href={photo.src}
                aria-label={(es ? 'Ampliar imagen · ' : 'Enlarge image · ') + photo.alt[lang]}>
                <img src={photo.src} alt={photo.alt[lang]} loading="lazy" decoding="async" />
              </a>
            ))}
          </div>
          <div>
            <h3>{moment.kind === 'talk' && moment.to
              ? <Link to={moment.to}>{moment.title[lang]}</Link>
              : moment.title[lang]}</h3>
            {moment.kind === 'event' && moment.description && <p>{moment.description[lang]}</p>}
            {moment.kind === 'event' && moment.to && <Link className="text-link" to={moment.to}>
              {es ? 'Ver participación' : 'View my contribution'} <Arrow diagonal />
            </Link>}
          </div>
        </article>
      ))}
    </div>
  )
}

export function FeaturedPublicationCards() {
  const { lang } = useLang()
  return (
    <div className="notes-panels">
      {selectFeatured(publications, 'publications').map(item => (
        <article key={item.id}>
          <span className="eyebrow">{publicationFormats[item.format].label[lang]}</span>
          <h3>{item.title[lang]}</h3>
          <p>{item.summary[lang]}</p>
          <Link className="text-link" to={'/escritos/' + item.id}
            aria-label={(lang === 'es' ? 'Leer ' : 'Read ') + item.title[lang]}>
            {lang === 'es' ? 'Leer escrito' : 'Read piece'} <Arrow diagonal />
          </Link>
        </article>
      ))}
    </div>
  )
}
