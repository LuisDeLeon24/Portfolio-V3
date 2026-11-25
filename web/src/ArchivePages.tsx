import { useState } from 'react'
import { Link } from 'react-router-dom'
import { features } from './data/editorial'
import { communityMoments } from './data/community'
import { pressMentions, speakingAndCommunity, type Mention } from './data/mentions'
import { selectFeatured } from './data/featured'
import { useLang } from './language'
import { CommunityLogos } from './CommunityLogos'
import { MomentList } from './PortfolioAreas'
import { getProjectCover } from './projectMedia'
import { Arrow } from './SiteChrome'
import telescope from './assets/proyects/Sextant/Rename.png'
import './ArchivePages.css'

function BackToDirectory() {
  const es = useLang().lang === 'es'
  return <Link className="archive-back" to="/#explorar"><span aria-hidden="true">←</span> {es ? 'Volver al índice' : 'Back to index'}</Link>
}

export function ProjectsArchive() {
  const { lang, t } = useLang()
  const es = lang === 'es'
  const [featuredOnly, setFeaturedOnly] = useState(false)
  const all = t.work.projects.items
  const featured = selectFeatured(all, 'projects')
  const items = featuredOnly ? featured : all
  return (
    <main id="main" className="archive-page projects-archive">
      <div className="wrap">
        <BackToDirectory />
        <header className="archive-heading">
          <h1>{t.work.projects.title}<em>.</em></h1>
          <p>{es ? 'Ideas que llevé a un prototipo, desde un telescopio de realidad aumentada hasta un simulador de impactos con datos de la NASA.'
            : 'Ideas I turned into prototypes, from an augmented reality telescope to an impact simulator built with NASA data.'}</p>
        </header>
        {featured.length < all.length && (
          <div className="catalog-filters" role="group" aria-label={es ? 'Filtrar proyectos' : 'Filter projects'}>
            <button type="button" aria-pressed={!featuredOnly} onClick={() => setFeaturedOnly(false)}>
              {es ? 'Todos' : 'All'} <span>{all.length}</span>
            </button>
            <button type="button" aria-pressed={featuredOnly} onClick={() => setFeaturedOnly(true)}>
              {es ? 'Destacados' : 'Featured'} <span>{featured.length}</span>
            </button>
          </div>
        )}
        <div className="project-catalog">
          {items.map((item, index) => {
            const cover = item.id === 'sextant' ? telescope : getProjectCover(item.id)
            return (
              <article key={item.id} className="catalog-case">
                <Link to={'/e/projects/' + item.id} aria-label={item.title}>
                  {cover && <div className="catalog-case__photo">
                    <img src={cover} alt="" loading={index ? 'lazy' : 'eager'} decoding="async" />
                  </div>}
                  <div className="catalog-case__text">
                    <p className="archive-meta">{item.meta}</p>
                    <h2>{item.title} <Arrow diagonal /></h2>
                    <p>{features.find(feature => feature.id === item.id)?.problem[lang] ?? item.blurb}</p>
                  </div>
                </Link>
              </article>
            )
          })}
        </div>
      </div>
    </main>
  )
}

function MentionList({ items }: { items: Mention[] }) {
  const { lang } = useLang()
  return (
    <ul className="mention-list">
      {items.map(item => (
        <li key={item.id} id={item.id}>
          <h3><a href={item.href} target="_blank" rel="noopener noreferrer">{item.title[lang]}</a></h3>
        </li>
      ))}
    </ul>
  )
}

export function CommunityArchive() {
  const { lang } = useLang()
  const es = lang === 'es'
  const events = communityMoments.filter(moment => moment.kind === 'event')
  const talks = communityMoments.filter(moment => moment.kind === 'talk')
  const talk = talks[0]
  return (
    <main id="main" className="archive-page community-archive">
      <div className="wrap">
        <BackToDirectory />
        <header className="community-cover">
          <div className="community-cover__copy">
            <h1>{es ? 'Comunidad' : 'Community'}<em>.</em></h1>
            <p>{es ? 'Organizo encuentros, doy charlas y conecto builders en Centroamérica.'
              : 'I organize meetups, give talks, and connect builders in Central America.'}</p>
            <CommunityLogos />
          </div>
          {talk && <figure>
            <img src={talk.photos[0].src} alt={talk.photos[0].alt[lang]} />
            <figcaption><Link to={'/community#' + talk.id}>{talk.title[lang]} <span aria-hidden="true">↓</span></Link></figcaption>
          </figure>}
        </header>
        <nav className="archive-jump" aria-label={es ? 'En esta página' : 'On this page'}>
          <Link to="/community#eventos">{es ? 'Eventos' : 'Events'} <span>{events.length}</span></Link>
          <Link to="/community#charlas">{es ? 'Charlas' : 'Talks'} <span>{talks.length}</span></Link>
          <Link to="/community#prensa">{es ? 'Prensa y menciones' : 'Press & mentions'} <span>{pressMentions.length}</span></Link>
        </nav>
        <section id="eventos" className="community-collection">
          <h2>{es ? 'Eventos' : 'Events'}</h2>
          <MomentList items={events} />
        </section>
        <section id="charlas" className="community-collection">
          <h2>{es ? 'Charlas' : 'Talks'}</h2>
          <MomentList items={talks} />
        </section>
        <section id="agenda" className="community-collection">
          <h2>{es ? 'Charlas y comunidad' : 'Speaking & community'}</h2>
          <MentionList items={speakingAndCommunity} />
        </section>
        <section id="prensa" className="community-collection">
          <h2>{es ? 'Prensa y menciones' : 'Press & mentions'}</h2>
          <MentionList items={pressMentions} />
        </section>
      </div>
    </main>
  )
}
