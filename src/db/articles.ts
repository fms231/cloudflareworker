export async function ListArticles(db: D1Database) {
  const { results } = await db.prepare(
    "SELECT a.*, c.name as category FROM articles a LEFT JOIN categories c ON a.category_id = c.id WHERE a.status = 'published' ORDER BY a.created_at DESC"
  ).all()
  return results
}

export async function getArticleById(db: D1Database, id: string) {
  return await db.prepare(
    "SELECT a.*, c.name as category FROM articles a LEFT JOIN categories c ON a.category_id = c.id WHERE a.id = ? AND a.status = 'published'"
  ).bind(id).first()
}
