/**
 * THESIS: Portfolio as a quiet gallery hang — work leads; refuse recruiter/SaaS pitch scaffolding.
 * OWN-WORLD: Cool plaster light, Bricolage + Source Serif, matte steel accent, rhomboid/trapezoid mounts.
 * STORY: Visitor reads name + AI×cyber×research focus, then explores experience and sparse experiments; contact stays optional.
 * FIRST VIEWPORT: LDL + ES/EN; staggered giant wine name; focus + tagline left.
 * FORM: Galería · hang disperso + open-storage “Ver más”; detail routes /e/:tab/:id; seed key 7d8b313a; approved comp-a.
 */
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import AwardsPage, { AwardItemPage } from './AwardsPage'
import CategoryPage from './CategoryPage'
import HomePage from './HomePage'
import ItemPage from './ItemPage'
import { LangProvider } from './LangContext'
import './App.css'

export default function App() {
  return (
    <LangProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/premios/:id" element={<AwardItemPage />} />
          <Route path="/premios" element={<AwardsPage />} />
          <Route path="/e/:tab/:id" element={<ItemPage />} />
          <Route path="/e/:tab" element={<CategoryPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </LangProvider>
  )
}
