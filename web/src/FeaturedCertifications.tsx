import { useId, type CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { getCertCover } from './certMedia'
import { credentials } from './data/editorial'
import { selectFeatured } from './data/featured'
import { useLang } from './language'
import { Arrow } from './SiteChrome'
import './FeaturedCertifications.css'

// Coordinates are fractions of the whole mosaic so the curved seams scale together.
const tileOutlines = [
  'M.018 0 H.748 Q.778 0 .762 .026 L.536 .392 Q.488 .467 .372 .467 H.026 Q0 .467 0 .443 V.025 Q0 0 .018 0 Z',
  'M.816 0 H.982 Q1 0 1 .025 V.501 Q1 .528 .974 .528 H.526 Q.503 .528 .498 .503 Q.488 .478 .507 .447 L.773 .039 Q.797 0 .816 0 Z',
  'M.026 .478 H.461 Q.484 .478 .492 .499 Q.510 .534 .490 .561 L.249 .962 Q.226 1 .197 1 H.018 Q0 1 0 .975 V.504 Q0 .478 .026 .478 Z',
  'M.647 .539 H.974 Q1 .539 1 .566 V.975 Q1 1 .982 1 H.272 Q.239 1 .257 .971 L.500 .575 C.522 .544 .569 .539 .647 .539 Z',
]

export default function FeaturedCertifications() {
  const { t } = useLang()
  const clipId = useId()
  const items = selectFeatured(t.work.certs.items, 'certs')
  const mosaic = items.length === tileOutlines.length

  return (
    <section className="cert-showcase" id="certificaciones" aria-labelledby="cert-heading">
      <div className="cert-showcase__surface">
        <div className="wrap section-head">
          <h2 id="cert-heading">{t.work.certs.title}<em>.</em></h2>
          <Link className="text-link" to="/e/certs">{t.allCertifications} <Arrow diagonal /></Link>
        </div>
        <div className={mosaic ? 'cert-mosaic cert-mosaic--four' : 'cert-mosaic'}>
          {mosaic && (
            <svg className="cert-clip-defs" width="0" height="0" aria-hidden="true" focusable="false">
              <defs>{tileOutlines.map((outline, slot) => (
                <clipPath key={slot} id={clipId + slot} clipPathUnits="objectBoundingBox">
                  <path d={outline} />
                </clipPath>
              ))}</defs>
            </svg>
          )}
          {items.map((cert, slot) => {
            const issuer = credentials[cert.id]?.issuer
            const image = getCertCover(cert.id)
            return (
              <Link key={cert.id} className="cert-tile" to={'/e/certs/' + cert.id}
                data-issuer={issuer}
                style={mosaic ? { '--tile-clip': 'url(#' + clipId + slot + ')' } as CSSProperties : undefined}>
                <span className="cert-tile__logo">
                  {image ? <img src={image} alt={issuer ?? ''} loading="lazy" /> : issuer}
                </span>
                <h3>{cert.title} <Arrow diagonal /></h3>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
