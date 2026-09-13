export async function getArticles(db: D1Database) {
  const { results } = await db.prepare(
    'SELECT a.*, c.name as category FROM articles a LEFT JOIN categories c ON a.category_id = c.id ORDER BY a.created_at DESC'
  ).all()
  return results
}

export async function getArticleById(db: D1Database, id: string) {
  return await db.prepare(
    'SELECT a.*, c.name as category FROM articles a LEFT JOIN categories c ON a.category_id = c.id WHERE a.id = ?'
  ).bind(id).first()
}

export async function insertArticle(db: D1Database, article: {
  title: string
  content: string
  status?: string
  published?: number
  category_id?: number
}) {
  return await db.prepare(
    'INSERT INTO articles (title, content, status, published, category_id) VALUES (?, ?, ?, ?, ?)'
  ).bind(
    article.title,
    article.content,
    article.status || 'draft',
    article.published || 0,
    article.category_id || null,
  ).run()
}
