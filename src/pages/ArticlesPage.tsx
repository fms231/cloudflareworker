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
    <section className="flex flex-col gap-10">
      <header className="flex flex-col gap-3">
        <span className="inline-flex w-fit rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-400">ARTICLES</span>
        <h1 className="font-display text-5xl font-bold tracking-tight">My Articles</h1>
        <p className="max-w-3xl leading-8 text-neutral-600 dark:text-neutral-300">
          Exploring Go, Python, Redis, MySQL, MQ, Docker, and the practical side of shipping backend systems.
        </p>
        {searchQuery && (
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            {visibleArticles.length > 0
              ? `Matched ${visibleArticles.length} article(s) for "${searchQuery}"`
              : `No article title matched "${searchQuery}"`}
          </p>
        )}
      </header>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          className={`rounded-full border px-3 py-1.5 text-sm font-semibold ${selectedCategory === '' ? 'border-neutral-900 bg-neutral-900 text-white dark:border-white dark:bg-white dark:text-neutral-900' : 'border-neutral-200 bg-neutral-50 text-neutral-600 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-300'}`}
          onClick={() => setSelectedCategory('')}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            className={`rounded-full border px-3 py-1.5 text-sm font-semibold ${selectedCategory === cat ? 'border-neutral-900 bg-neutral-900 text-white dark:border-white dark:bg-white dark:text-neutral-900' : 'border-neutral-200 bg-neutral-50 text-neutral-600 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-300'}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {visibleArticles.map((article) => (
          <article key={article.id} className="flex items-stretch overflow-hidden rounded-[18px] border border-neutral-200 bg-neutral-50 shadow-lg shadow-neutral-900/5 dark:border-neutral-800 dark:bg-neutral-900 dark:shadow-black/20">
            <div className="min-w-0 flex-1 cursor-pointer p-6" onClick={() => navigate(`/articles/${article.id}`)}>
              <div className="mb-3 flex flex-wrap items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400">
                <span className="rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs font-semibold uppercase dark:border-neutral-700 dark:bg-neutral-800">{article.category ?? '未分类'}</span>
                <span>{articleDate(article)}</span>
              </div>
              <h3 className="font-display text-2xl font-semibold leading-tight">{article.title}</h3>
            </div>
            <button className="w-16 border-l border-neutral-200 text-xl text-neutral-500 dark:border-neutral-800 dark:text-neutral-400" type="button" onClick={() => navigate(`/articles/${article.id}`)}>
              ↗
            </button>
          </article>
        ))}
        {visibleArticles.length === 0 && (
          <article className="rounded-2xl border border-dashed border-neutral-300 p-6 dark:border-neutral-700">
            <h3 className="font-semibold">No matching article yet</h3>
            <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">Try searching with another title keyword from your posts.</p>
          </article>
        )}
      </div>
    </section>
  )
}

export default ArticlesPage
