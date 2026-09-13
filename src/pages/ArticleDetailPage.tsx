import { Navigate, useNavigate, useParams } from 'react-router-dom'

import avatarImage from '../assets/avatar.png'
import { getArticleById } from '../data/articles'
import { siteContent } from '../data/content'

function ArticleDetailPage() {
  const navigate = useNavigate()
  const { articleId } = useParams<{ articleId: string }>()
  const article = getArticleById(articleId)

  if (articleId && article.id !== articleId) {
    return <Navigate replace to="/articles" />
  }

  return (
    <section className="page page-detail">
      <button type="button" className="back-btn" onClick={() => navigate('/articles')}>
        ← Back to Feed
      </button>
      <article className="card detail-shell">
        <header className="detail-header">
          <div className="article-meta">
            <span className="chip">{article.category}</span>
            <span>{article.readMinutes} min read</span>
            <span>{article.date}</span>
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
          {article.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <blockquote>{article.quote}</blockquote>
          <h2>Structural Integrity of Thought</h2>
          <ol>
            {article.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ol>
          <p>
            The goal is a crystalline organization: a space where users can
            breathe, think, and create with confidence.
          </p>
        </div>
      </article>
    </section>
  )
}

export default ArticleDetailPage
