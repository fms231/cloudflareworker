export async function getMoments(db: D1Database) {
  const { results } = await db.prepare(
    'SELECT * FROM moments ORDER BY created_at DESC'
  ).all()
  return results
}
