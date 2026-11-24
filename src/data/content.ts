import type { NavItem } from '../types/blog'

export const navItems: NavItem[] = [
  { path: '/', label: 'Home' },
  { path: '/articles', label: 'Articles' },
  { path: '/moments', label: 'Moments' },
]

export const siteContent = {
  brandName: 'Destiny',
  searchPlaceholder: 'Search posts by title...',
  hero: {
    initials: '/avatar.png',
    status: 'Dazed',
    name: 'Quito',
    bio: 'To be both a speaker of words and a doer of deeds.',
    location: '📍 Remote, Global',
    writingSince: '✦ Writing since 2021',
  },
  topics: [
    'Go',
    'Python',
    'Redis',
    'MySQL',
    'MQ',
    'Docker',
  ],
  connectLinks: [
    { label: 'GitHub', href: 'https://github.com/fms231', icon: 'GitHub' },
    { label: 'LinkedIn', href: '#', icon: 'LinkedIn' },
    { label: 'Blog', href: '#', icon: 'Blog' },
  ],
  detailAuthor: {
    initials: 'BE',
    name: 'Quito',
    title: 'Backend Developer focused on Go, Python, and scalable systems',
  },
}
