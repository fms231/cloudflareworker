import { useEffect, useState } from 'react'
import type { FormEvent, KeyboardEvent } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { navItems, siteContent } from '../data/content'

function NavBar() {
  const navigate = useNavigate()
  const location = useLocation()
  const [searchText, setSearchText] = useState('')

  useEffect(() => {
    if (!location.pathname.startsWith('/articles')) {
      return
    }

    const query = new URLSearchParams(location.search).get('q') ?? ''
    setSearchText(query)
  }, [location.pathname, location.search])

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
    <nav className="top-nav">
      <div className="brand">{siteContent.brandName}</div>
      <div className="top-links">
        {navItems.map((item) => {
          const isActive =
            item.path === '/'
              ? location.pathname === '/'
              : location.pathname === item.path || location.pathname.startsWith(`${item.path}/`)

          return (
            <button
              key={item.path}
              className={isActive ? 'is-active' : ''}
              onClick={() => navigate(item.path)}
              type="button"
            >
              {item.label}
            </button>
          )
        })}
      </div>
      <div className="top-actions">
        <form className="search-form" onSubmit={onSearchSubmit}>
          <input
            aria-label="Search articles by title"
            className="search"
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
