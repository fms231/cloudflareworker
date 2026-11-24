import { aboutContent } from '../data/about'

function AboutPage() {
  return (
    <section className="flex flex-col gap-10">
      <header className="grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-stretch">
        <div className="flex flex-col justify-center gap-4">
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-neutral-500 dark:text-neutral-400">{aboutContent.hero.eyebrow}</span>
          <h1 className="font-display text-5xl font-bold leading-tight tracking-tight sm:text-6xl">{aboutContent.hero.title}</h1>
          <p className="max-w-2xl text-base leading-8 text-neutral-600 dark:text-neutral-300">{aboutContent.hero.description}</p>
        </div>
        <div className="flex min-h-80 items-center justify-center overflow-hidden rounded-[18px] border border-neutral-800 bg-gradient-to-br from-neutral-950 via-slate-950 to-neutral-900 p-8 text-center text-2xl leading-loose text-neutral-200 shadow-xl shadow-neutral-950/20">
          <div className="space-y-4 font-serif tracking-[0.18em]">
            <p>自信人生二百年</p>
            <p>会当击水三千里</p>
          </div>
        </div>
      </header>

      <section className="flex flex-col gap-5">
        <div>
          <h2 className="font-display text-3xl font-semibold tracking-tight">{aboutContent.journey.title}</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {aboutContent.journey.items.map((item) => (
            <article key={item.period} className="rounded-[18px] border border-neutral-200 bg-neutral-50 p-6 shadow-lg shadow-neutral-900/5 dark:border-neutral-800 dark:bg-neutral-900 dark:shadow-black/20">
              <span className="mb-3 inline-block rounded-lg border border-neutral-200 bg-white px-3 py-1 text-xs font-semibold text-neutral-500 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-400">{item.period}</span>
              <h3 className="mb-2 font-display text-2xl font-semibold">{item.title}</h3>
              <p className="text-sm leading-7 text-neutral-600 dark:text-neutral-300">{item.description}</p>
            </article>
          ))}
        </div>
      </section>

    </section>
  )
}

export default AboutPage
