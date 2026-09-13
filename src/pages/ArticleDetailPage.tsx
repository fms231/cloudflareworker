import { useEffect, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import Markdown from 'react-markdown'

import avatarImage from '../assets/avatar.png'
import { siteContent } from '../data/content'
import type { Article } from '../types/blog'
import { articleDate, articleReadMinutes } from '../types/blog'

function ArticleDetailPage() {
  const navigate = useNavigate()
  const { articleId } = useParams<{ articleId: string }>()
  const [article, setArticle] = useState<Article | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!articleId) return
    fetch(`/api/articles/${articleId}`)
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error('Not found'))))
      .then((data: Article) => {
        setArticle(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [articleId])

  if (loading) return null
  if (!article) return <Navigate replace to="/articles" />

  return (
    <section className="page page-detail">
      <button type="button" className="back-btn" onClick={() => navigate('/articles')}>
        ← Back to Feed
      </button>
      <article className="card detail-shell">
        <header className="detail-header">
          <div className="article-meta">
            <span className="chip">{article.category ?? '未分类'}</span>
            <span>{articleReadMinutes(article)} min read</span>
            <span>{articleDate(article)}</span>
          </div>
          <h1>{article.title}</h1>
          <div className="author">
            <span className="author-avatar">
              <img src={avatarImage} alt={siteContent.detailAuthor.name} className="avatar-image"/>
            </span>
            <div>
              <strong>{siteContent.detailAuthor.name}</strong>
              <p>{siteContent.detailAuthor.title}</p>
            </div>
          </div>
        </header>

        <div className="detail-content">
          <Markdown>{article.content}</Markdown>
        </div>
      </article>
    </section>
  )
}

export default ArticleDetailPage
