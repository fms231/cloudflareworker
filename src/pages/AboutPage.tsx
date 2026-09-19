import { aboutContent } from '../data/about'

function AboutPage() {
  return (
    <section className="page page-about">
      <header className="about-hero reveal">
        <div className="stack">
          <span className="eyebrow">{aboutContent.hero.eyebrow}</span>
          <h1>{aboutContent.hero.title}</h1>
          <p>{aboutContent.hero.description}</p>
        </div>
        <div className="portrait">
          <div className="portrait-light" />
          <div className="portrait-quote">
            <p>自信人生二百年</p>
            <p>会当击水三千里</p>
          </div>
        </div>
      </header>

      <section className="stack">
        <div className="section-head compact reveal">
          <div>
            <h2>{aboutContent.journey.title}</h2>
            <p>{aboutContent.journey.description}</p>
          </div>
        </div>
        <div className="journey-grid reveal-stagger">
          {aboutContent.journey.items.map((item) => (
            <article key={item.period} className="journey-card">
              <span className="period">{item.period}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      {/* <section className="expertise-grid reveal-stagger">
        {aboutContent.expertise.map((item) => (
          <article
            key={item.title}
            className={`card ${item.variant === 'highlight' ? 'highlight' : ''} ${item.variant === 'cyan' ? 'cyan' : ''} ${item.tags ? 'big' : ''}`}
          >
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            {item.tags ? (
              <div className="tag-list">
                {item.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            ) : null}
          </article>
        ))}
      </section> */}

      <section className="philosophy reveal">
        <h2>{aboutContent.philosophy.title}</h2>
        <div className="philosophy-grid">
          {aboutContent.philosophy.principles.map((principle) => (
            <article key={principle.title}>
              <h3>{principle.title}</h3>
              <p>{principle.description}</p>
            </article>
          ))}
        </div>
      </section>
    </section>
  )
}

export default AboutPage
