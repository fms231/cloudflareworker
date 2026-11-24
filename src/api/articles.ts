import { getArticleById, ListArticles as QueryArticles } from '../db/articles'
import { json, methodNotAllowed } from './response'

export async function ListArticles(request: Request, db: D1Database): Promise<Response> {
  if (request.method !== 'GET') return methodNotAllowed()

  try {
    return json(await QueryArticles(db))
  } catch (error) {
    return json({ error: String(error), stack: (error as Error)?.stack }, 500)
  }
}

export async function GetArticleById(
  request: Request,
  db: D1Database,
  articleId: string,
): Promise<Response> {
  if (request.method !== 'GET') return methodNotAllowed()

  try {
    const article = await getArticleById(db, articleId)
    if (!article) return json({ error: 'Not found' }, 404)
    return json(article)
  } catch (error) {
    return json({ error: String(error), stack: (error as Error)?.stack }, 500)
  }
}
