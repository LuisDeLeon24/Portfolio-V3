import { Link, useParams } from 'react-router-dom'
import { useLang } from './language'
import { findAwardItem } from './i18n'
import { getAwardCover, getAwardLogo } from './awardMedia'
import { awardEvidence } from './data/editorial'
import { Missing } from './ItemPage'
import { Arrow } from './SiteChrome'
import nasaDiploma from './assets/proyects/AstroTracker/Award.png'

export default function AwardsPage() {
  const { t } = useLang()
  return (
    <main id="main" className="wrap paper">
      <Link className="back" to="/#premios">
        ← {t.backHome}
      </Link>
      <div className="paper-head">
        <h1>
          {t.awardsArchiveTitle}
          <em>.</em>
        </h1>
      </div>
      <div className="archive-list">
        {t.awards.map((item) => (
          <Link key={item.id} to={'/premios/' + item.id}>
            <span className="meta">
              {item.org} · {item.year}
            </span>
            <h2>{item.title}</h2>
            <Arrow diagonal />
          </Link>
        ))}
      </div>
    </main>
  )
}
export function AwardItemPage() {
  const { id = '' } = useParams(),
    { lang, t } = useLang(),
    found = findAwardItem(lang, id),
    es = lang === 'es'
  if (!found) return <Missing />
  const { item } = found,
    cover = getAwardCover(id),
    logo = getAwardLogo(id),
    proof = awardEvidence[id]
  return (
    <main id="main" className="wrap paper">
      <Link className="back" to="/premios">
        ← {t.awardsArchiveTitle}
      </Link>
      <div className="paper-head">
        <p className="eyebrow">
          {item.org} · {item.year}
        </p>
        <h1>{item.title}</h1>
        <p className="lede">{item.blurb}</p>
      </div>
      <div className="paper-body">
        <aside className="meta">
          {logo && <img src={logo} width="72" alt="" />}
          {item.org}
        </aside>
        <div>
          {item.body.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <div className="link-group">
            {item.links?.map((l) => (
              <a key={l.href} className="text-link" href={l.href}>
                {l.label} <Arrow diagonal />
              </a>
            ))}
            {proof && (
              <a href={proof.url} className="text-link">
                {proof.label[lang]} <Arrow diagonal />
              </a>
            )}
            {id === 'nasa-space-apps' && (
              <a className="text-link" href={nasaDiploma}>
                {es ? 'Ver documento del proyecto' : 'View project document'} <Arrow diagonal />
              </a>
            )}
          </div>
        </div>
      </div>
      {cover && (
        <a className="cover award-cover" href={cover}>
          <img src={cover} alt={item.title} />
        </a>
      )}
      <div className="paper-end">
        <Link className="text-link" to="/premios">
          {t.seeAllAwards} <Arrow />
        </Link>
      </div>
    </main>
  )
}
