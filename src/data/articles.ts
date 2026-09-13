import type { Article } from '../types/blog'

export const articles: Article[] = [
  {
    id: 'focus',
    category: 'Go',
    date: 'March 24, 2024',
    title: 'Designing a Go Service for Predictable Throughput',
    excerpt:
      'How I approach service boundaries, latency control, and clean delivery in a Go backend.',
    readMinutes: 12,
    wordCount: 684,
    body: [
      'A Go service should do one thing clearly: accept requests, process them deterministically, and return a response that is easy to trust.',
      'I prefer small handlers, explicit input validation, and service layers that make failure modes obvious. That keeps the code easier to test and the production behavior easier to explain.',
      'When the request path is narrow and the dependencies are visible, the service becomes easier to scale, profile, and maintain over time.',
    ],
    quote: 'Good backend design is not about doing more. It is about making the right path obvious.',
    points: [
      'Keep handlers thin and push business logic into testable services.',
      'Make validation explicit so bad requests fail early and predictably.',
      'Measure latency at each boundary so bottlenecks are easy to find.',
    ],
  },
  {
    id: 'minimalism',
    category: 'MySQL',
    date: 'March 18, 2024',
    title: 'MySQL Schema Choices That Age Well',
    excerpt:
      'Practical notes on keys, indexes, and schema decisions that keep data models sane.',
    readMinutes: 9,
    wordCount: 612,
    body: [
      'The best schema is not the fanciest one. It is the one that lets you read, write, and migrate without surprises.',
      'I care a lot about primary keys, composite indexes, and whether a table structure will still make sense when traffic grows and requirements shift.',
      'When the schema is boring in the right way, application code becomes cleaner and operational work becomes calmer.',
    ],
    quote: 'A healthy schema makes the obvious things fast and the dangerous things hard.',
    points: [
      'Choose keys that match access patterns instead of guessing later.',
      'Add indexes only where query plans justify the write cost.',
      'Treat migrations as part of the product, not an afterthought.',
    ],
  },
  {
    id: 'calm-tech',
    category: 'Redis',
    date: 'March 12, 2024',
    title: 'Using Redis Without Letting It Become a Liability',
    excerpt:
      'Caching works best when the expiry strategy, invalidation path, and fallback behavior are all explicit.',
    readMinutes: 8,
    wordCount: 571,
    body: [
      'Redis is easy to add and easy to misuse. The part that matters is not just storing hot data, but deciding when cached data should disappear.',
      'I use Redis for rate limits, short-lived state, and caching paths where the fallback is safe and predictable. If the cache is wrong, the system still has to behave well.',
      'Caching only helps when the operational model is simple enough that the team knows when data is stale, when it is missing, and how the application should react.',
    ],
    quote: 'A cache is helpful only when the system still behaves correctly without it.',
    points: [
      'Treat cache misses as a normal code path, not an exception.',
      'Use TTLs deliberately and keep invalidation logic obvious.',
      'Make sure cached data can never silently override correctness.',
    ],
  },
  {
    id: 'systems',
    category: 'Docker',
    date: 'March 5, 2024',
    title: 'Dockerizing a Backend Stack Without Making It Fragile',
    excerpt:
      'A practical look at keeping local development close to production while avoiding brittle container setup.',
    readMinutes: 10,
    wordCount: 645,
    body: [
      'Docker is most useful when it removes environment drift instead of creating another place for confusion to hide.',
      'For backend work, I like containers for local dependencies, predictable test environments, and a clean way to bring up services together.',
      'The goal is not to make everything containerized for its own sake. The goal is to make setup repeatable enough that the team can spend time on code instead of environment issues.',
    ],
    quote: 'A good container setup disappears into the workflow instead of becoming the workflow.',
    points: [
      'Keep Dockerfiles small and explicit so the runtime story is obvious.',
      'Use compose for local orchestration, not for hiding architectural gaps.',
      'Match container behavior to production as closely as practical.',
    ],
  },
]

export const getArticleById = (articleId: string | undefined) =>
  articles.find((article) => article.id === articleId) ?? articles[0]
