import type { Article } from '../types/blog'

export const articles: Article[] = [
  {
    id: 1,
    title: 'Designing a Go Service for Predictable Throughput',
    content: `A Go service should do one thing clearly: accept requests, process them deterministically, and return a response that is easy to trust.

I prefer **small handlers**, explicit input validation, and service layers that make failure modes obvious. That keeps the code easier to test and the production behavior easier to explain.

When the request path is narrow and the dependencies are visible, the service becomes easier to scale, profile, and maintain over time.

## Handler Design

Keep handlers thin and push business logic into testable services:

\`\`\`go
func HandleCreate(w http.ResponseWriter, r *http.Request) {
    var req CreateRequest
    if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
        respondError(w, http.StatusBadRequest, "invalid body")
        return
    }

    if err := svc.Create(r.Context(), req); err != nil {
        respondError(w, http.StatusInternalServerError, err.Error())
        return
    }
    respondOK(w)
}
\`\`\`

## Key Takeaways

- Keep handlers thin and push business logic into testable services.
- Make validation explicit so bad requests fail early and predictably.
- Measure latency at each boundary so bottlenecks are easy to find.

> Good backend design is not about doing more. It is about making the right path obvious.`,
    status: 'published',
    published: 1,
    created_at: 1711238400,
    updated_at: 1711238400,
    category_id: 1,
    category: 'Go',
  },
  {
    id: 2,
    title: 'MySQL Schema Choices That Age Well',
    content: `The best schema is not the fanciest one. It is the one that lets you read, write, and migrate without surprises.

I care a lot about **primary keys**, composite indexes, and whether a table structure will still make sense when traffic grows and requirements shift.

## Primary Keys

Choose keys that match access patterns:

\`\`\`sql
CREATE TABLE orders (
  id         BIGINT PRIMARY KEY AUTOINCREMENT,
  user_id    BIGINT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_user_created (user_id, created_at)
);
\`\`\`

## Indexing Strategy

Add indexes only where query plans justify the write cost:

- **Composite indexes** follow the leftmost prefix rule
- **Covering indexes** avoid table lookups entirely
- **Partial indexes** reduce storage for filtered queries

## Migration Philosophy

Treat migrations as part of the product, not an afterthought. Every schema change should be:

1. **Backward compatible** — old code still works
2. **Forward compatible** — new code handles missing columns
3. **Reversible** — you can roll back safely

> A healthy schema makes the obvious things fast and the dangerous things hard.`,
    status: 'published',
    published: 1,
    created_at: 1710633600,
    updated_at: 1710633600,
    category_id: 2,
    category: 'MySQL',
  },
  {
    id: 3,
    title: 'Using Redis Without Letting It Become a Liability',
    content: `Redis is easy to add and easy to misuse. The part that matters is not just storing hot data, but deciding when cached data should disappear.

I use Redis for **rate limits**, short-lived state, and caching paths where the fallback is safe and predictable. If the cache is wrong, the system still has to behave well.

## Caching Pattern

\`\`\`
Request → Cache Hit? → Yes → Return cached
                   → No  → Query DB → Cache result → Return
\`\`\`

## Rate Limiting

A sliding window counter works well for most APIs:

\`\`\`python
def is_rate_limited(user_id, limit=100, window=60):
    key = f"rate:{user_id}:{int(time.time()) // window}"
    count = redis.incr(key)
    if count == 1:
        redis.expire(key, window)
    return count > limit
\`\`\`

## When Cache Misses Happen

Treat cache misses as a **normal code path**, not an exception. The system must:

- Degrade gracefully when Redis is down
- Never block the critical path on cache availability
- Log miss rates to understand warming needs

> A cache is helpful only when the system still behaves correctly without it.`,
    status: 'published',
    published: 1,
    created_at: 1710028800,
    updated_at: 1710028800,
    category_id: 2,
    category: 'Redis',
  },
  {
    id: 4,
    title: 'Dockerizing a Backend Stack Without Making It Fragile',
    content: `Docker is most useful when it removes environment drift instead of creating another place for confusion to hide.

For backend work, I like containers for **local dependencies**, predictable test environments, and a clean way to bring up services together.

## Multi-Stage Build

Keep images small by separating build and runtime:

\`\`\`dockerfile
FROM golang:1.22-alpine AS builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 go build -o server ./cmd/server

FROM alpine:3.19
COPY --from=builder /app/server /server
EXPOSE 8080
CMD ["/server"]
\`\`\`

## Compose for Local Dev

Use compose for local orchestration, not for hiding architectural gaps:

\`\`\`yaml
services:
  api:
    build: .
    ports: ["8080:8080"]
    depends_on: [db, redis]
  db:
    image: postgres:16
    environment:
      POSTGRES_DB: myapp
  redis:
    image: redis:7-alpine
\`\`\`

## Key Principles

- Keep Dockerfiles small and explicit so the runtime story is obvious
- Use compose for local orchestration, not for hiding architectural gaps
- Match container behavior to production as closely as practical

> A good container setup disappears into the workflow instead of becoming the workflow.`,
    status: 'published',
    published: 1,
    created_at: 1709424000,
    updated_at: 1709424000,
    category_id: 2,
    category: 'Docker',
  },
]

export const getArticleById = (articleId: string | undefined) =>
  articles.find((article) => article.id === Number(articleId)) ?? articles[0]
