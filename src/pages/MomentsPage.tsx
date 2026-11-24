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
    <section className="flex flex-col gap-8">
      <header className="flex flex-col items-center gap-3 text-center">
        <span className="inline-flex rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-400">Mood</span>
        <h1 className="font-display text-5xl font-bold tracking-tight">Daily Moments</h1>
        <p className="max-w-xl text-neutral-600 dark:text-neutral-300">
          Record my daily experiences and reflections, anything that matters.
        </p>
      </header>

      <div className="mx-auto flex w-full max-w-3xl flex-col gap-5 border-l border-neutral-200 pl-6 dark:border-neutral-800">
        {visibleMoments.map((moment) => (
          <article
            key={moment.id}
            className="relative rounded-[18px] border border-neutral-200 bg-neutral-50 p-6 shadow-lg shadow-neutral-900/5 before:absolute before:-left-[31px] before:top-8 before:size-3 before:rounded-full before:border-2 before:border-neutral-500 before:bg-white dark:border-neutral-800 dark:bg-neutral-900 dark:shadow-black/20 dark:before:bg-neutral-950"
          >
            <time className="text-xs font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">{momentTime(moment.created_at)}</time>
            <p className="mt-3 leading-7 text-neutral-700 dark:text-neutral-300">{moment.text}</p>
          </article>
        ))}
      </div>

      {hasMoreMoments && (
        <div className="text-center">
          <button
            className="rounded-full border border-neutral-300 px-4 py-2 text-sm font-semibold dark:border-neutral-700"
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
