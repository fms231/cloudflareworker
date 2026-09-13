import { useMemo } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { articles } from '../data/articles'

function ArticlesPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const searchQuery = (searchParams.get('q') ?? '').trim()

  const visibleArticles = useMemo(() => {
    if (!searchQuery) {
      return articles
    }

    const normalizedQuery = searchQuery.toLowerCase()
    return articles.filter((article) =>
      article.title.toLowerCase().includes(normalizedQuery),
    )
  }, [searchQuery])

  return (
    <section className="page">
      <header className="page-header">
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

      <div className="stack">
        {visibleArticles.map((article) => (
          <article key={article.id} className="card article-line">
            <div className="article-line-main" onClick={() => navigate(`/articles/${article.id}`)}>
              <div className="article-meta">
                <span className="chip">{article.category}</span>
                <span>{article.date}</span>
              </div>
              <h3>{article.title}</h3>
              <p>{article.excerpt}</p>
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
