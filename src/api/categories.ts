import { ListCategories as QueryCategories } from '../db/categories'
import { json, methodNotAllowed } from './response'

export async function ListCategories(request: Request, db: D1Database): Promise<Response> {
  if (request.method !== 'GET') return methodNotAllowed()

  try {
    return json(await QueryCategories(db))
  } catch {
    return json({ error: 'Internal server error' }, 500)
  }
}
