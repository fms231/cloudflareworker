import type { Article } from '../types/blog'
import { articleDate, articleReadMinutes, articleWordCount } from '../types/blog'

function ArticleCard({
  article,
  onOpen,
}: {
  article: Article
  onOpen: (article: Article) => void
}) {
  return (
    <article
      className="cursor-pointer rounded-[18px] border border-neutral-200 bg-neutral-50 p-6 shadow-lg shadow-neutral-900/5 dark:border-neutral-800 dark:bg-neutral-900 dark:shadow-black/20"
      onClick={() => onOpen(article)}
    >
      <div className="mb-4 flex flex-wrap items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400">
        <span className="rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs font-semibold uppercase dark:border-neutral-700 dark:bg-neutral-800">{article.category ?? '未分类'}</span>
        <span>{articleDate(article)}</span>
      </div>
      <h3 className="font-display text-2xl font-semibold tracking-tight">{article.title}</h3>
      <div className="mt-4 flex flex-wrap gap-4 font-mono text-xs text-neutral-500 dark:text-neutral-400">
        <span>● {articleReadMinutes(article)} min read</span>
        <span>● {articleWordCount(article)} words</span>
      </div>
    </article>
  )
}

export default ArticleCard
