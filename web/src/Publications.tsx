import { useState } from 'react'
import { Link, Navigate, useLocation, useParams } from 'react-router-dom'
import { publications, publicationFormats, type PublicationFormat } from './data/publications'
import { Missing } from './ItemPage'
import { useLang } from './language'
import { Arrow } from './SiteChrome'
import './Publications.css'

export function PublicationsArchive() {
  const { lang } = useLang()
  const es = lang === 'es'
  const [format, setFormat] = useState<PublicationFormat | null>(null)
  const formats = [...new Set(publications.map(item => item.format))]
  const entries = format ? publications.filter(item => item.format === format) : publications

  return (
    <main id="main" className="archive-page publications-archive">
      <div className="wrap">
        <Link className="archive-back" to="/#explorar">← {es ? 'Volver al índice' : 'Back to index'}</Link>
        <header className="archive-heading">
          <h1>{es ? 'Escritos' : 'Writing'}<em>.</em></h1>
          <p>{es ? 'Lo que comparto en el escenario y lo que voy documentando al construir. Por ahora, resúmenes de mis charlas.'
            : 'What I share on stage and document as I build. For now, recaps of my talks.'}</p>
        </header>
        <div className="publication-catalog">
          {formats.length > 1 && <div className="publication-formats" role="group" aria-label={es ? 'Filtrar por formato' : 'Filter by format'}>
            <h2>{es ? 'Formato' : 'Format'}</h2>
            <button type="button" aria-pressed={format === null} onClick={() => setFormat(null)}>{es ? 'Todos' : 'All'} <span>{publications.length}</span></button>
            {formats.map(key => {
              const count = publications.filter(item => item.format === key).length
              return <button key={key} type="button" aria-pressed={format === key} onClick={() => setFormat(key)}>
                {publicationFormats[key].group[lang]} <span>{count}</span>
              </button>
            })}
          </div>}
          <div className="publication-results">
            {entries.map(item => (
              <article key={item.id}>
                <Link to={'/escritos/' + item.id} className={'publication-row' + (item.image ? ' publication-row--photo' : '')} aria-labelledby={'pub-' + item.id}>
                  {item.image && <img src={item.image.src} alt="" />}
                  <div className="publication-row__copy">
                    <p className="archive-meta">{publicationFormats[item.format].label[lang]}</p>
                    <h2 id={'pub-' + item.id}>{item.title[lang]}</h2>
                    <p>{item.summary[lang]}</p>
                  </div>
                  <Arrow diagonal />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}

const formerPublicationDestinations: ReadonlyMap<string, string> = new Map([
  ['data-as-a-service', '/escritos'],
  ['del-meme-al-meteorito', '/escritos'],
  ['impacto', '/e/projects/astro-tracker'],
  ['ocr', '/e/projects/unmask-ai'],
  ['fuentes', '/e/projects/agent-builder'],
])

export function PublicationPage() {
  const { id = '' } = useParams()
  const { lang } = useLang()
  const item = publications.find(entry => entry.id === id)
  if (!item) {
    const destination = formerPublicationDestinations.get(id)
    return destination ? <Navigate replace to={destination} /> : <Missing />
  }
  return (
    <main id="main" className="archive-page publication-reader">
      <div className="wrap">
        <Link to="/escritos" className="archive-back">← {lang === 'es' ? 'Todos los escritos' : 'All writing'}</Link>
        <article className="publication-sheet">
          <header>
            <p className="archive-meta">{publicationFormats[item.format].label[lang]}</p>
            <h1>{item.title[lang]}</h1>
            <p className="publication-deck">{item.summary[lang]}</p>
          </header>
          {item.image && <figure><img src={item.image.src} alt={item.image.alt[lang]} /></figure>}
          <div className="publication-body">
            {item.body.map((paragraph, index) => <p key={index}>{paragraph[lang]}</p>)}
            {item.source && ('to' in item.source
              ? <Link className="text-link" to={item.source.to}>{item.source.label[lang]} <Arrow diagonal /></Link>
              : <a className="text-link" href={item.source.href}>{item.source.label[lang]} <Arrow diagonal /></a>)}
          </div>
        </article>
      </div>
    </main>
  )
}

export function LegacyNotesRedirect() {
  const { hash } = useLocation()
  const id = hash.slice(1)
  if (publications.some(item => item.id === id)) return <Navigate replace to={'/escritos/' + id} />
  return <Navigate replace to={formerPublicationDestinations.get(id) ?? '/escritos'} />
}
