import type { NavItem } from '../types/blog'

export const navItems: NavItem[] = [
  { path: '/', label: 'Home' },
  { path: '/articles', label: 'Articles' },
  { path: '/moments', label: 'Moments' },
  { path: '/about', label: 'About' },
]

export const siteContent = {
  brandName: 'Destiny',
  searchPlaceholder: 'Search posts by title...',
  hero: {
    initials: "src/assets/avatar.png",
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
    { label: 'GitHub', href: '#', icon: 'GitHub' },
    { label: 'LinkedIn', href: '#', icon: 'LinkedIn' },
    { label: 'Blog', href: '#', icon: 'Blog' },
    { label: 'Resume', href: '#', icon: 'Resume' },
    { label: '小红书', href: '#', icon: 'Xiaohongshu' },
    { label: '微信公众号', href: '#', icon: 'WeChat' },
  ],
  detailAuthor: {
    initials: 'BE',
    name: 'Quito',
    title: 'Backend Developer focused on Go, Python, and scalable systems',
  },
  footer: {
    copyright: '© 2024 Destiny. Built with the calm discipline of reliable systems.',
    links: [
      { label: 'Archives', href: '#' },
      { label: 'RSS', href: '#' },
      { label: 'Contact', href: '#' },
    ],
  },
}
