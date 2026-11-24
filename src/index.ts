import { GetArticleById, ListArticles } from './api/articles'
import { ListCategories } from './api/categories'
import { ListMoments } from './api/moments'
import { json } from './api/response'

export default {
	async fetch(request, env): Promise<Response> {
		const { pathname } = new URL(request.url)

		if (pathname === '/api/categories') {
			return ListCategories(request, env.DB)
		}

		if (pathname === '/api/articles') {
			return ListArticles(request, env.DB)
		}

		const articleMatch = pathname.match(/^\/api\/articles\/([^/]+)$/)
		if (articleMatch) {
			return GetArticleById(request, env.DB, articleMatch[1])
		}

		if (pathname === '/api/moments') {
			return ListMoments(request, env.DB)
		}

		if (pathname === '/api' || pathname.startsWith('/api/')) {
			return json({ error: 'Not found' }, 404)
		}

		return env.ASSETS.fetch(request)
	},
} satisfies ExportedHandler<Env>
