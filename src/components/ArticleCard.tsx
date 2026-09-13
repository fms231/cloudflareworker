import type { Article } from '../types/blog'
import { articleDate, articleExcerpt, articleReadMinutes, articleWordCount } from '../types/blog'

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
        <span className="chip">{article.category ?? '未分类'}</span>
        <span>{articleDate(article)}</span>
      </div>
      <h3>{article.title}</h3>
      <p>{articleExcerpt(article)}</p>
      <div className="article-stats">
        <span>● {articleReadMinutes(article)} min read</span>
        <span>● {articleWordCount(article)} words</span>
      </div>
    </article>
  )
}

export default ArticleCard
