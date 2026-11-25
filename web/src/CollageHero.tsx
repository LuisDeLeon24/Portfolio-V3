import { Link } from 'react-router-dom'
import { useLang } from './language'
import streetPortrait from './assets/collage/street-portrait.webp'
import talkStage from './assets/events/Flisol Talk - 2026.jpeg'
import codeCloseup from './assets/collage/code-closeup.webp'
import './CollageHero.css'

export default function CollageHero() {
  const { lang } = useLang()
  return (
    <section id="home-hero" className="collage-hero" aria-labelledby="hero-title">
      <svg className="collage-filters" width="0" height="0" aria-hidden="true" focusable="false">
        <defs>
          <filter id="hero-photo-denoise" colorInterpolationFilters="sRGB">
            <feGaussianBlur in="SourceGraphic" stdDeviation="0.9" edgeMode="duplicate" result="smooth" />
            <feBlend in="SourceGraphic" in2="smooth" mode="difference" />
            {/* Keep high-contrast details while smoothing low-contrast grain. */}
            <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  3 10 1 0 -0.12" result="edges" />
            <feComposite in="SourceGraphic" in2="edges" operator="in" />
            <feComposite in2="smooth" operator="over" />
          </filter>
        </defs>
      </svg>
      <div
        className="collage-window"
        role="img"
        aria-label={lang === 'es'
          ? 'Luis en la calle con gafas de sol, Luis dando una charla en FLISOL Guatemala y un primer plano de código JavaScript.'
          : 'Luis wearing sunglasses outdoors, Luis giving a talk at FLISOL Guatemala, and a close-up of JavaScript code.'}
      >
        <div className="collage-street">
          <img src={streetPortrait} alt="" decoding="async" />
        </div>
        <img className="collage-talk" src={talkStage} alt="" fetchPriority="high" />
        <img className="collage-coding" src={codeCloseup} alt="" decoding="async" />
      </div>
      <div className="collage-signature">
        <h1 id="hero-title">
          <img width="484" height="245" src="/brand/firma-dos-lineas.svg" alt="Luis De León" />
        </h1>
        <p className="collage-role" lang="en">Software developer</p>
      </div>
      <div className="collage-actions" lang="en">
        <Link to="/#sobre-mi">
          More <span aria-hidden="true">↓</span>
        </Link>
        <Link to="/#contacto">
          Contact <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </section>
  )
}
