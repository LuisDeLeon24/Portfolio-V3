import { Link, useParams } from 'react-router-dom'
import { findWorkItem, isWorkTab } from './i18n'
import { useLang } from './language'
import { getWorkImages } from './workMedia'
import { features, credentials } from './data/editorial'
import { Arrow } from './SiteChrome'

export function Missing() {
  const { t } = useLang()
  return (
    <main className="wrap paper" id="main">
      <h1>{t.notFoundTitle}</h1>
      <p>{t.notFoundBody}</p>
      <Link className="text-link" to="/">
        {t.backHome} <Arrow />
      </Link>
    </main>
  )
}
export default function ItemPage() {
  const { tab = '', id = '' } = useParams(),
    { lang, t } = useLang(),
    es = lang === 'es'
  if (!isWorkTab(tab)) return <Missing />
  const result = findWorkItem(lang, tab, id)
  if (!result) return <Missing />
  const { item, category, index, items } = result,
    images = getWorkImages(tab, id)
  const feature = tab === 'projects' ? features.find((x) => x.id === id) : undefined
  const credential = tab === 'certs' ? credentials[id] : undefined
  const next = items[index + 1]
  return (
    <main id="main" className="wrap paper">
      <Link className="back" to={tab === 'projects' ? '/projects' : '/e/' + tab}>
        ← {category}
      </Link>
      <div className="paper-head">
        <p className="eyebrow">
          <i className="dot" />
          {feature?.category[lang] ?? item.meta}
        </p>
        <h1>{item.title}</h1>
        <p className="lede">{item.blurb}</p>
      </div>
      {images[0] && (
        <a
          className={'cover' + (credential ? ' logo-cover' : '')}
          href={images[0]}
          aria-label={es ? 'Ampliar imagen' : 'Enlarge image'}
        >
          <img src={images[0]} alt={item.title} />
        </a>
      )}
      <div className="paper-body">
        <aside className="meta">
          {item.meta}
          {credential?.date && <p>{credential.date}</p>}
        </aside>
        <div>
          {feature
            ? [
                [es ? 'Problema' : 'Problem', feature.problem],
                [es ? 'Decisiones técnicas' : 'Technical decisions', feature.approach],
                [es ? 'Resultado' : 'Outcome', feature.result],
              ].map(
                ([label, content]) =>
                  typeof content === 'object' && (
                    <section key={String(label)}>
                      <h2>{String(label)}</h2>
                      <p>{content[lang]}</p>
                    </section>
                  ),
              )
            : item.body.map((p) => <p key={p}>{p}</p>)}
          <div className="link-group">
            {item.links?.map((link) => (
              <a className="text-link" key={link.href} href={link.href}>
                {link.label} <Arrow diagonal />
              </a>
            ))}
            {credential?.verification && (
              <a className="text-link" href={credential.verification}>
                {es ? 'Verificar credencial' : 'Verify credential'} <Arrow diagonal />
              </a>
            )}
          </div>
        </div>
      </div>
      {images.length > 1 && (
        <div className="gallery">
          {images.slice(1).map((src, i) => (
            <a key={src} href={src}>
              <img
                loading="lazy"
                src={src}
                alt={item.title + ' · ' + (es ? 'Imagen ' : 'Image ') + (i + 2)}
              />
            </a>
          ))}
        </div>
      )}
      <div className="paper-end">
        <Link className="text-link" to="/">
          {t.backHome} <Arrow />
        </Link>
        {next && (
          <Link className="text-link" to={'/e/' + tab + '/' + next.id}>
            {t.nextItem} · {next.title} <Arrow />
          </Link>
        )}
      </div>
    </main>
  )
}
