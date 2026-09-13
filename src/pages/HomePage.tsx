import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import avatarImage from '../assets/avatar.png'
import ArticleCard from '../components/ArticleCard'
import { articles } from '../data/articles'
import { siteContent } from '../data/content'

function HomePage() {
  const navigate = useNavigate()
  const fullBio = siteContent.hero.bio
  const [typedBio, setTypedBio] = useState('')

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
        <div className="avatar-shell">
          <div className="avatar">
            <img
              src={avatarImage}
              alt={`${siteContent.hero.name} avatar`}
              className="avatar-image"
            />
          </div>
        </div>
        <div className="hero-content">
          <span className="chip status">{siteContent.hero.status}</span>
          <h1>{siteContent.hero.name}</h1>
          <p className="hero-bio typing-bio">
            {typedBio}
            <span
              aria-hidden="true"
              className={`typing-cursor ${typedBio.length >= fullBio.length ? 'is-done' : ''}`}
            />
          </p>
          <div className="hero-meta">
            <span>{siteContent.hero.location}</span>
            <span>{siteContent.hero.writingSince}</span>
          </div>
        </div>
      </header>

      <section className="section-head">
        <div>
          <h2>Latest Articles</h2>
          <p>Notes on Go, Python, AI-assisted coding, and the systems I build every day.</p>
        </div>
        <button type="button" onClick={() => navigate('/articles')}>
          View Articles →
        </button>
      </section>

      <section className="home-grid">
        <div className="stack">
          {articles.slice(0, 3).map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              onOpen={() => navigate(`/articles/${article.id}`)}
            />
          ))}
        </div>
        <aside className="stack">
          <article className="card">
            <h3>Core Tools</h3>
            <div className="tag-list">
              {siteContent.topics.map((topic) => (
                <span key={topic}>{topic}</span>
              ))}
            </div>
          </article>

          <article className="card">
            <h3>Links</h3>
            <div className="connect-list">
              {siteContent.connectLinks.map((link) => (
                <a key={link.label} href={link.href}>
                  {link.label}
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
