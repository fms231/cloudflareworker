import type { Article } from '../types/blog'

function ArticleCard({
  article,
  onOpen,
}: {
  article: Article
  onOpen: (article: Article) => void
}) {
  return (
    <article className="card article-card" onClick={() => onOpen(article)}>
      <div className="article-meta">
        <span className="chip">{article.category}</span>
        <span>{article.date}</span>
      </div>
      <h3>{article.title}</h3>
      <p>{article.excerpt}</p>
      <div className="article-stats">
        <span>● {article.readMinutes} min read</span>
        <span>● {article.wordCount} words</span>
      </div>
    </article>
  )
}

export default ArticleCard
