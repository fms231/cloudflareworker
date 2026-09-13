import { useEffect, useMemo, useState } from 'react'

import type { Moment } from '../types/blog'

const MOMENTS_BATCH_SIZE = 3

function momentTime(ts: number): string {
  const d = new Date(ts * 1000)
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  const hh = d.getHours()
  const mm = String(d.getMinutes()).padStart(2, '0')
  const ampm = hh >= 12 ? 'PM' : 'AM'
  const h12 = hh % 12 || 12
  return `${h12}:${mm} ${ampm} · ${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`
}

function MomentsPage() {
  const [moments, setMoments] = useState<Moment[]>([])
  const [visibleCount, setVisibleCount] = useState(MOMENTS_BATCH_SIZE)

  useEffect(() => {
    fetch('/api/moments')
      .then((res) => res.json())
      .then((data: Moment[]) => setMoments(data))
      .catch(() => {})
  }, [])

  const visibleMoments = useMemo(
    () => moments.slice(0, visibleCount),
    [moments, visibleCount],
  )

  const hasMoreMoments = visibleCount < moments.length

  return (
    <section className="page page-moments">
      <header className="page-header centered reveal">
        <span className="chip status">Mood</span>
        <h1>Daily Moments</h1>
        <p>
          Record my daily experiences and reflections, anything that matters.
        </p>
      </header>

      <div className="timeline reveal-stagger">
        {visibleMoments.map((moment, idx) => (
          <article
            key={moment.id}
            className={`card moment-card ${idx % 2 === 0 ? 'left' : 'right'}`}
          >
            <time>{momentTime(moment.created_at)}</time>
            <p>{moment.text}</p>
          </article>
        ))}
      </div>

      {hasMoreMoments && (
        <div className="timeline-more reveal">
          <button
            type="button"
            onClick={() =>
              setVisibleCount((currentCount) =>
                Math.min(currentCount + MOMENTS_BATCH_SIZE, moments.length),
              )
            }
          >
            Load Previous Moments
          </button>
        </div>
      )}
    </section>
  )
}

export default MomentsPage
