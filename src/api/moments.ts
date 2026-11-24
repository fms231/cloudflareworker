import { ListMoments as QueryMoments } from '../db/moments'
import { json, methodNotAllowed } from './response'

export async function ListMoments(request: Request, db: D1Database): Promise<Response> {
  if (request.method !== 'GET') return methodNotAllowed()

  try {
    return json(await QueryMoments(db))
  } catch (error) {
    return json({ error: String(error), stack: (error as Error)?.stack }, 500)
  }
}
