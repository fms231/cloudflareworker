export type View = 'home' | 'articles' | 'moments' | 'about'

export type Article = {
  id: string
  category: string
  date: string
  title: string
  excerpt: string
  readMinutes: number
  wordCount: number
  body: string[]
  quote: string
  points: string[]
}

export type Moment = {
  id: string
  time: string
  text: string
  tags: string[]
}

export type NavItem = {
  path: string
  label: string
}
