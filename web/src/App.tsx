/**
 * THESIS: The signature leads. Show built work; claim only what can be pointed to.
 * OWN-WORLD: Cream, burgundy, ink. Playfair italic speaks; Plex explains; mono labels.
 * STORY: Del miedo al prototipo. Projects and awards with evidence. Contact stays optional.
 * FIRST VIEWPORT: Firma — tilde naranja, filete dorado bajo «De León» — tagline apart from the name.
 * FORM: Cream ground, grain, one glitch cut in the background, never on the mark.
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
