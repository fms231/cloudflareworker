import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import type { Article } from '../types/blog'
import { articleDate } from '../types/blog'

function ArticlesPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const searchQuery = (searchParams.get('q') ?? '').trim()
  const [articles, setArticles] = useState<Article[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('')

  useEffect(() => {
    fetch('/api/articles')
      .then((res) => res.json())
      .then((data: Article[]) => setArticles(data))
      .catch(() => {})
  }, [])

  const categories = useMemo(() => {
    const cats = new Set(articles.map((a) => a.category ?? '未分类'))
    return Array.from(cats)
  }, [articles])

  const visibleArticles = useMemo(() => {
    let result = articles

    if (selectedCategory) {
      result = result.filter((a) => (a.category ?? '未分类') === selectedCategory)
    }

    if (searchQuery) {
      const normalizedQuery = searchQuery.toLowerCase()
      result = result.filter((a) =>
        a.title.toLowerCase().includes(normalizedQuery),
      )
    }

    return result
  }, [searchQuery, selectedCategory, articles])

  return (
    <section className="page">
      <header className="page-header reveal">
        <span className="chip status">ARTICLES</span>
        <h1>My Articles</h1>
        <p>
          Exploring Go, Python, Redis, MySQL, MQ, Docker, and the practical side of shipping backend systems.
        </p>
        {searchQuery && (
          <p>
            {visibleArticles.length > 0
              ? `Matched ${visibleArticles.length} article(s) for "${searchQuery}"`
              : `No article title matched "${searchQuery}"`}
          </p>
        )}
      </header>

      <div className="category-filter">
        <button
          type="button"
          className={`chip ${selectedCategory === '' ? 'active' : ''}`}
          onClick={() => setSelectedCategory('')}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            className={`chip ${selectedCategory === cat ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="articles-grid reveal-stagger">
        {visibleArticles.map((article) => (
          <article key={article.id} className="card article-line">
            <div className="article-line-main" onClick={() => navigate(`/articles/${article.id}`)}>
              <div className="article-meta">
                <span className="chip">{article.category ?? '未分类'}</span>
                <span>{articleDate(article)}</span>
              </div>
              <h3>{article.title}</h3>
            </div>
            <button type="button" onClick={() => navigate(`/articles/${article.id}`)}>
              ↗
            </button>
          </article>
        ))}
        {visibleArticles.length === 0 && (
          <article className="card article-line-empty">
            <h3>No matching article yet</h3>
            <p>Try searching with another title keyword from your posts.</p>
          </article>
        )}
      </div>
    </section>
  )
}

export default ArticlesPage
