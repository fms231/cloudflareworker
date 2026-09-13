import { getCategories } from '../db/categories'
import { getArticles, getArticleById, insertArticle } from '../db/articles'

function json(data: unknown, status = 200) {
	return new Response(JSON.stringify(data), {
		status,
		headers: { 'Content-Type': 'application/json' },
	})
}

export default {
	async fetch(request, env, _ctx): Promise<Response> {
		const url = new URL(request.url)

		if (url.pathname === '/api/categories') {
			const categories = await getCategories(env.DB)
			return json(categories)
		}

		if (url.pathname === '/api/articles') {
			if (request.method === 'POST') {
				const body = await request.json() as Parameters<typeof insertArticle>[1]
				await insertArticle(env.DB, body)
				return json({ success: true })
			}
			try {
				const articles = await getArticles(env.DB)
				return json(articles)
			} catch (e) {
				return json({ error: String(e), stack: (e as Error)?.stack }, 500)
			}
		}

		const articleMatch = url.pathname.match(/^\/api\/articles\/(.+)$/)
		if (articleMatch) {
			try {
				const article = await getArticleById(env.DB, articleMatch[1])
				if (!article) return json({ error: 'Not found' }, 404)
				return json(article)
			} catch (e) {
				return json({ error: String(e), stack: (e as Error)?.stack }, 500)
			}
		}

		return env.ASSETS.fetch(request)
	},
} satisfies ExportedHandler<Env>
