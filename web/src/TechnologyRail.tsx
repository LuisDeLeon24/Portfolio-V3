import { useState } from 'react'
import { useLang } from './language'
import './TechnologyRail.css'

const technologies = [
  ['react', 'React'], ['nextjs', 'Next.js'], ['typescript', 'TypeScript'],
  ['tailwindcss', 'Tailwind CSS'], ['nodejs', 'Node.js'], ['express', 'Express'],
  ['python', 'Python'], ['java', 'Java'], ['spring', 'Spring'], ['mysql', 'MySQL'],
  ['postgresql', 'PostgreSQL'], ['supabase', 'Supabase'], ['mongodb', 'MongoDB'], ['neo4j', 'Neo4j'],
]

export default function TechnologyRail() {
  const es = useLang().lang === 'es'
  const [paused, setPaused] = useState(false)
  return (
    <section className="tech-rail" aria-label={es ? 'Tecnologías que uso' : 'Technologies I use'}>
      <div className="tech-rail__window">
        <div className="tech-rail__belt" style={{ animationPlayState: paused ? 'paused' : 'running' }}>
          {[false, true].map(copy => (
            <ul className="tech-rail__run" key={String(copy)} aria-hidden={copy || undefined}>
              {technologies.map(([id, label]) => (
                <li key={id}>
                  <svg viewBox="0 0 128 128" aria-hidden="true" focusable="false">
                    <use href={'/brand/technologies.svg#' + id} />
                  </svg>
                  <span>{label}</span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
      <button className="tech-rail__toggle" type="button" onClick={() => setPaused(!paused)}
        aria-label={paused ? (es ? 'Reanudar carrilera' : 'Resume logo rail') : (es ? 'Pausar carrilera' : 'Pause logo rail')}>
        <svg viewBox="0 0 16 16" aria-hidden="true" fill="currentColor">
          <path d={paused ? 'M5 2.5 13 8l-8 5.5Z' : 'M4 3h3v10H4zm5 0h3v10H9z'} />
        </svg>
      </button>
    </section>
  )
}
