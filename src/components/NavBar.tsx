import { useEffect, useState, useCallback } from 'react'
import type { FormEvent, KeyboardEvent } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { navItems, siteContent } from '../data/content'

function getInitialTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'dark'
  const stored = localStorage.getItem('theme')
  if (stored === 'dark' || stored === 'light') return stored
  return 'dark'
}

function NavBar() {
  const navigate = useNavigate()
  const location = useLocation()
  const [searchText, setSearchText] = useState('')
  const [theme, setTheme] = useState<'light' | 'dark'>(getInitialTheme)

  const applyTheme = useCallback((t: 'light' | 'dark') => {
    document.documentElement.setAttribute('data-theme', t)
    localStorage.setItem('theme', t)
  }, [])

  useEffect(() => {
    applyTheme(theme)
  }, [theme, applyTheme])

  useEffect(() => {
    if (!location.pathname.startsWith('/articles')) {
      return
    }

    const query = new URLSearchParams(location.search).get('q') ?? ''
    setSearchText(query)
  }, [location.pathname, location.search])

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  const submitSearch = () => {
    const normalizedQuery = searchText.trim()

    if (!normalizedQuery) {
      navigate('/articles')
      return
    }

    navigate(`/articles?q=${encodeURIComponent(normalizedQuery)}`)
  }

  const onSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    submitSearch()
  }

  const onSearchKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Escape') {
      return
    }

    setSearchText('')
    if (location.pathname.startsWith('/articles')) {
      navigate('/articles')
    }
  }

  return (
    <nav className="sticky top-3 z-30 flex flex-wrap items-center justify-between gap-4 rounded-[18px] border border-neutral-200 bg-white/95 p-3 shadow-lg shadow-neutral-900/5 dark:border-neutral-800 dark:bg-neutral-900/95 dark:shadow-black/20 sm:p-4">
      <div className="font-brand text-2xl font-bold tracking-tight">{siteContent.brandName}</div>
      <div className="flex flex-wrap gap-1 font-ui">
        {navItems.map((item) => {
          const isActive =
            item.path === '/'
              ? location.pathname === '/'
              : location.pathname === item.path || location.pathname.startsWith(`${item.path}/`)

          return (
            <button
              key={item.path}
              className={`rounded-full px-3.5 py-2 text-sm font-semibold text-neutral-500 dark:text-neutral-400 ${isActive ? 'bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100' : ''}`}
              onClick={() => navigate(item.path)}
              type="button"
            >
              {item.label}
            </button>
          )
        })}
      </div>
      <div className="flex w-full items-center gap-2 sm:w-auto">
        <button
          className="flex size-9 shrink-0 items-center justify-center rounded-full border border-neutral-200 bg-neutral-50 text-neutral-700 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200"
          onClick={toggleTheme}
          type="button"
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          )}
        </button>
        <form className="min-w-0 flex-1 sm:flex-none" onSubmit={onSearchSubmit}>
          <input
            aria-label="Search articles by title"
            className="w-full rounded-full border border-neutral-200 bg-neutral-50 px-3.5 py-2 text-sm text-neutral-900 outline-none placeholder:text-neutral-400 focus:border-neutral-400 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100 dark:placeholder:text-neutral-500 dark:focus:border-neutral-500 sm:w-56"
            placeholder={siteContent.searchPlaceholder}
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
            onKeyDown={onSearchKeyDown}
          />
        </form>
      </div>
    </nav>
  )
}

export default NavBar
