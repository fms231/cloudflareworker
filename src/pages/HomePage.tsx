import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import avatarImage from '../assets/avatar.png'
import ArticleCard from '../components/ArticleCard'
import Terminal from '../components/Terminal'
import { siteContent } from '../data/content'
import type { Article } from '../types/blog'

function HomePage() {
  const navigate = useNavigate()
  const fullBio = siteContent.hero.bio
  const [typedBio, setTypedBio] = useState('')
  const [articles, setArticles] = useState<Article[]>([])

  useEffect(() => {
    fetch('/api/articles')
      .then((res) => {
        if (!res.ok) throw new Error(`Article request failed: ${res.status}`)
        return res.json()
      })
      .then((data: Article[]) => setArticles(data))
      .catch(() => {})
  }, [])

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (motionQuery.matches) {
      setTypedBio(fullBio)
      return
    }

    setTypedBio('')
    let cursor = 0
    const timer = window.setInterval(() => {
      cursor += 1
      setTypedBio(fullBio.slice(0, cursor))

      if (cursor >= fullBio.length) {
        window.clearInterval(timer)
      }
    }, 22)

    return () => window.clearInterval(timer)
  }, [fullBio])

  return (
    <section className="page page-home">
      <header className="hero card">
        <div className="avatar-shell hero-enter">
          <div className="avatar">
            <img
              src={avatarImage}
              alt={`${siteContent.hero.name} avatar`}
              className="avatar-image"
            />
          </div>
        </div>
        <div className="hero-content">
          <span className="chip status hero-enter-delay-1">{siteContent.hero.status}</span>
          <h1 className="hero-enter-delay-2">{siteContent.hero.name}</h1>
          <p className="hero-bio typing-bio hero-enter-delay-3">
            {typedBio}
            <span
              aria-hidden="true"
              className={`typing-cursor ${typedBio.length >= fullBio.length ? 'is-done' : ''}`}
            />
          </p>
          <div className="hero-meta hero-enter-delay-3">
            <span>{siteContent.hero.location}</span>
            <span>{siteContent.hero.writingSince}</span>
          </div>
        </div>
        <Terminal />
      </header>

      <section className="section-head reveal">
        <div>
          <h2>Latest Articles</h2>

        </div>
        <button type="button" onClick={() => navigate('/articles')}>
          View Articles →
        </button>
      </section>

      <section className="home-grid">
        <div className="stack reveal-stagger">
          {articles.slice(0, 3).map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              onOpen={() => navigate(`/articles/${article.id}`)}
            />
          ))}
        </div>
        <aside className="stack reveal-stagger">
          {/* <article className="card">
            <h3>Core Tools</h3>
            <div className="tag-list">
              {siteContent.topics.map((topic) => (
                <span key={topic}>{topic}</span>
              ))}
            </div>
          </article> */}

          <article className="card">
            <h3>Links</h3>
            <div className="connect-list">
              {siteContent.connectLinks.map((link) => (
                <a key={link.label} href={link.href}>
                  {link.icon === 'GitHub' && (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  )}
                  {link.icon === 'LinkedIn' && (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  )}
                  {link.icon === 'Blog' && (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                    </svg>
                  )}
                  {link.icon === 'Resume' && (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
                    </svg>
                  )}
                  {link.icon === 'Xiaohongshu' && (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-2-6h4v2h-4v-2zm0-4h4v2h-4v-2z"/>
                    </svg>
                  )}
                  {link.icon === 'WeChat' && (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178A1.17 1.17 0 0 1 4.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178 1.17 1.17 0 0 1-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 0 1 .598.082l1.584.926a.272.272 0 0 0 .14.045c.134 0 .24-.108.24-.243 0-.06-.024-.12-.04-.178l-.325-1.232a.49.49 0 0 1 .177-.554C23.41 18.308 24 16.926 24 15.402c0-3.372-3.284-6.15-7.062-6.544zm-2.745 3.09c.535 0 .969.44.969.983a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.97-.982zm4.49 0c.535 0 .969.44.969.983a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.97-.982z"/>
                    </svg>
                  )}
                  <span>{link.label}</span>
                </a>
              ))}
            </div>
          </article>
        </aside>
      </section>
    </section>
  )
}

export default HomePage
