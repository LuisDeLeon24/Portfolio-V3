import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { dictionaries, type Lang } from './i18n'

type LangContextValue = {
  lang: Lang
  setLang: (lang: Lang) => void
  t: (typeof dictionaries)[Lang]
}

const LangContext = createContext<LangContextValue | null>(null)

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    const saved = window.localStorage.getItem('ldl-lang')
    return saved === 'en' || saved === 'es' ? saved : 'es'
  })

  useEffect(() => {
    window.localStorage.setItem('ldl-lang', lang)
    document.documentElement.lang = lang
  }, [lang])

  const value = useMemo(
    () => ({
      lang,
      setLang,
      t: dictionaries[lang],
    }),
    [lang],
  )

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}

export function useLang() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang must be used within LangProvider')
  return ctx
}
