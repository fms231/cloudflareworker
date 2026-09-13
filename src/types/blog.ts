export type View = 'home' | 'articles' | 'moments' | 'about'

export type Article = {
  id: number
  title: string
  content: string
  status: string
  published: number
  created_at: number
  updated_at: number
  category_id: number | null
  category: string | null
}

export function articleDate(a: Article): string {
  const d = new Date(a.created_at * 1000)
  const months = ['January','February','March','April','May','June','July','August','September','October','November','December']
  return `${months[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()}`
}

export function articleExcerpt(a: Article): string {
  return a.content.length > 150 ? a.content.substring(0, 150) + '...' : a.content
}

export function articleReadMinutes(a: Article): number {
  return Math.max(1, Math.ceil(a.content.split(/\s+/).filter(Boolean).length / 200))
}

export function articleWordCount(a: Article): number {
  return a.content.split(/\s+/).filter(Boolean).length
}

export type Moment = {
  id: number
  text: string
  created_at: number
  updated_at: number
}

export type NavItem = {
  path: string
  label: string
}
