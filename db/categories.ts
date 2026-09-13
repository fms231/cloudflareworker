export async function getCategories(db: D1Database) {
  const { results } = await db.prepare('SELECT id, name FROM categories').all()
  return results
}
