import { Link, Navigate, useParams } from 'react-router-dom'
import { isWorkTab } from './i18n'
import { useLang } from './language'
import { Missing } from './ItemPage'
import { Arrow } from './SiteChrome'

export default function CategoryPage() {
  const { tab = '' } = useParams(),
    { t } = useLang()
  if (!isWorkTab(tab)) return <Missing />
  const group = t.work[tab]
  if (tab === 'research' && !group.items.length) return <Navigate replace to="/publications" />
  return (
    <main id="main" className="wrap paper">
      <Link className="back" to="/#proyectos">
        ← {t.backHome}
      </Link>
      <div className="paper-head">
        <h1>
          {group.title}
          <em>.</em>
        </h1>
      </div>
      <div className="archive-list">
        {group.items.map((item) => (
          <Link key={item.id} to={'/e/' + tab + '/' + item.id}>
            <span className="meta">{item.meta}</span>
            <h2>{item.title}</h2>
            <Arrow diagonal />
          </Link>
        ))}
      </div>
    </main>
  )
}
