import { useState, type CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { selectFeatured } from './data/featured'
import { useLang } from './language'
import { getProjectCover } from './projectMedia'
import { Arrow } from './SiteChrome'
import telescope from './assets/proyects/Sextant/Rename.png'
import aprendiPortrait from './assets/proyects/Arendi/Me.jpeg'
import orbits from './assets/proyects/AstroTracker/Orbits.png'
import './ProjectReel.css'

const panelImages: Record<string, string> = {
  sextant: telescope,
  aprendi: aprendiPortrait,
  'astro-tracker': orbits,
}

export default function ProjectReel() {
  const { lang, t } = useLang()
  const projects = selectFeatured(t.work.projects.items, 'projects')
  const [activeId, setActiveId] = useState<string>()
  const active = projects.find(project => project.id === activeId) ?? projects[Math.floor(projects.length / 2)]

  return (
    <div className="project-spread"
      style={{ '--project-count': Math.max(projects.length, 1) } as CSSProperties}>
      <header className="project-spread__intro">
        <h2 id="projects-heading">{lang === 'es' ? 'Proyectos' : 'Projects'}<em>.</em></h2>
        <Link className="project-spread__archive" to="/projects">
          {lang === 'es' ? 'Ver todos los proyectos' : 'All projects'} <Arrow diagonal />
        </Link>
        {active && <p className="project-spread__summary">{active.blurb}</p>}
      </header>
      {projects.map((project, index) => {
        const image = panelImages[project.id] ?? getProjectCover(project.id)
        return (
          <Link key={project.id} className="project-panel" to={'/e/projects/' + project.id}
            data-project={project.id} data-active={project.id === active?.id}
            style={{ '--slot': index } as CSSProperties}
            onPointerEnter={event => { if (event.pointerType !== 'touch') setActiveId(project.id) }}
            onFocus={() => setActiveId(project.id)}>
            {image && <img className="project-panel__image" src={image} alt="" loading="lazy" decoding="async" />}
            <span className="project-panel__caption">
              <span className="project-panel__number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
              <span className="project-panel__name">{project.title}</span>
            </span>
          </Link>
        )
      })}
    </div>
  )
}
