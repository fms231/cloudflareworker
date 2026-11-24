import { useEffect, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import Markdown from 'react-markdown'

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
    <section className="mx-auto flex max-w-4xl flex-col gap-5">
      <button type="button" className="w-fit rounded-full border border-neutral-300 px-4 py-2 text-sm font-semibold dark:border-neutral-700" onClick={() => navigate('/articles')}>
        Back to Feed
      </button>
      <article className="overflow-hidden rounded-[18px] border border-neutral-200 bg-neutral-50 shadow-xl shadow-neutral-900/5 dark:border-neutral-800 dark:bg-neutral-900 dark:shadow-black/25">
        <header className="border-b border-neutral-200 p-6 dark:border-neutral-800 sm:p-8">
          <div className="mb-4 flex flex-wrap items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400">
            <span className="rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs font-semibold uppercase dark:border-neutral-700 dark:bg-neutral-800">{article.category ?? '未分类'}</span>
            <span>{articleReadMinutes(article)} min read</span>
            <span>{articleDate(article)}</span>
          </div>
          <h1 className="font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl">{article.title}</h1>
          <div className="mt-6 flex items-center gap-3">
            <span className="size-10 overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-800">
              <img src="/avatar.png" alt={siteContent.detailAuthor.name} className="size-full object-cover"/>
            </span>
            <div>
              <strong className="text-sm">{siteContent.detailAuthor.name}</strong>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">{siteContent.detailAuthor.title}</p>
            </div>
          </div>
        </header>

        <div className="space-y-6 p-6 font-sans leading-8 text-neutral-700 dark:text-neutral-300 sm:p-10 [&_a]:underline [&_blockquote]:border-l-4 [&_blockquote]:border-neutral-300 [&_blockquote]:bg-neutral-100 [&_blockquote]:pl-4 [&_blockquote]:text-neutral-600 dark:[&_blockquote]:border-neutral-700 dark:[&_blockquote]:bg-neutral-800 dark:[&_blockquote]:text-neutral-400 [&_code]:rounded [&_code]:bg-neutral-200 [&_code]:px-1 [&_code]:py-0.5 dark:[&_code]:bg-neutral-800 [&_h2]:mt-8 [&_h2]:font-display [&_h2]:text-3xl [&_h2]:font-semibold [&_h3]:mt-6 [&_h3]:font-display [&_h3]:text-2xl [&_h3]:font-semibold [&_li]:ml-5 [&_li]:list-disc [&_ol]:list-decimal [&_p]:mb-5 [&_pre]:overflow-x-auto [&_pre]:rounded-xl [&_pre]:bg-neutral-950 [&_pre]:p-4 [&_pre]:font-mono [&_pre]:text-sm [&_pre]:text-neutral-200 [&_strong]:font-semibold [&_ul]:list-disc">
          <Markdown>{article.content}</Markdown>
        </div>
      </article>
    </section>
  )
}

export default ArticleDetailPage
