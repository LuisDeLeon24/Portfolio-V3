import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import AwardsPage, { AwardItemPage } from './AwardsPage'
import CategoryPage from './CategoryPage'
import HomePage from './HomePage'
import ItemPage from './ItemPage'
import { LangProvider } from './LangContext'
import Motion from './Motion'
import { SiteFooter, SiteHeader } from './SiteChrome'
import { ProjectsArchive, CommunityArchive } from './ArchivePages'
import { PublicationsArchive, PublicationPage, LegacyNotesRedirect } from './Publications'
import './App.css'

function LegacyPublicationsRedirect() {
  const { pathname, search, hash } = useLocation()
  return <Navigate replace to={{ pathname: pathname.replace(/^\/publications/i, '/escritos'), search, hash }} />
}

function ExperienceRedirect() {
  const { hash } = useLocation()
  const target = ['#educacion', '#certificaciones', '#premios', '#experiencia'].includes(hash) ? hash : '#info'
  return <Navigate replace to={'/' + target} />
}

export default function App() {
  return (
    <LangProvider>
      <BrowserRouter>
        <Motion />
        <SiteHeader />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/info" element={<ExperienceRedirect />} />
          <Route path="/projects" element={<ProjectsArchive />} />
          <Route path="/e/projects" element={<Navigate replace to="/projects" />} />
          <Route path="/community" element={<CommunityArchive />} />
          <Route path="/publications/:id?" element={<LegacyPublicationsRedirect />} />
          <Route path="/escritos" element={<PublicationsArchive />} />
          <Route path="/escritos/:id" element={<PublicationPage />} />
          <Route path="/notes" element={<LegacyNotesRedirect />} />
          <Route path="/premios/:id" element={<AwardItemPage />} />
          <Route path="/premios" element={<AwardsPage />} />
          <Route path="/e/ctfs/:id?" element={<Navigate replace to="/escritos" />} />
          <Route path="/e/:tab/:id" element={<ItemPage />} />
          <Route path="/e/:tab" element={<CategoryPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <SiteFooter />
      </BrowserRouter>
    </LangProvider>
  )
}
