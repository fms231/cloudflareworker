import { useEffect, useRef, useState } from 'react'

interface Category {
  id: number
  name: string
}

interface Bubble {
  id: number
  name: string
  x: number
  y: number
  vx: number
  vy: number
  size: number
  hue: number
}

function resolveCollision(a: Bubble, b: Bubble): [Bubble, Bubble] {
  const dx = b.x - a.x
  const dy = b.y - a.y
  const dist = Math.sqrt(dx * dx + dy * dy)
  const minDist = (a.size + b.size) / 2

  if (dist >= minDist || dist === 0) return [a, b]

  const nx = dx / dist
  const ny = dy / dist
  const overlap = minDist - dist

  const ma = a.size * a.size
  const mb = b.size * b.size
  const total = ma + mb

  const aNew = { ...a }
  const bNew = { ...b }

  aNew.x -= nx * overlap * (mb / total)
  aNew.y -= ny * overlap * (mb / total)
  bNew.x += nx * overlap * (ma / total)
  bNew.y += ny * overlap * (ma / total)

  const dvx = a.vx - b.vx
  const dvy = a.vy - b.vy
  const dvDotN = dvx * nx + dvy * ny

  if (dvDotN <= 0) return [aNew, bNew]

  const impulse = (2 * dvDotN) / total

  aNew.vx -= impulse * mb * nx
  aNew.vy -= impulse * mb * ny
  bNew.vx += impulse * ma * nx
  bNew.vy += impulse * ma * ny

  return [aNew, bNew]
}

function BubblePool() {
  const [categories, setCategories] = useState<Category[]>([])
  const [bubbles, setBubbles] = useState<Bubble[]>([])
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const poolRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetch('/api/categories')
      .then((res) => res.json())
      .then((data: Category[]) => {
        setCategories(data)
        const hues = [270, 200, 340, 160, 40]
        const w = poolRef.current?.clientWidth ?? 600
        const h = poolRef.current?.clientHeight ?? 300
        const init: Bubble[] = data.map((cat, i) => ({
          id: cat.id,
          name: cat.name,
          x: w * 0.2 + Math.random() * w * 0.6,
          y: h * 0.2 + Math.random() * h * 0.6,
          vx: (Math.random() - 0.5) * 4,
          vy: (Math.random() - 0.5) * 4,
          size: 80 + Math.random() * 20,
          hue: hues[i % hues.length],
        }))
        setBubbles(init)
      })
      .catch(() => {})
  }, [])

  useEffect(() => {
    if (bubbles.length === 0) return

    let frame: number
    const poolW = () => poolRef.current?.clientWidth ?? 600
    const poolH = () => poolRef.current?.clientHeight ?? 300

    const tick = () => {
      setBubbles((prev) => {
        let next = prev.map((b) => {
          if (b.id === hoveredId) return b

          let { x, y, vx, vy, size } = b
          const w = poolW()
          const h = poolH()
          const r = size / 2

          x += vx * 2
          y += vy * 2

          if (x - r < 0) { x = r; vx = Math.abs(vx) }
          if (x + r > w) { x = w - r; vx = -Math.abs(vx) }
          if (y - r < 0) { y = r; vy = Math.abs(vy) }
          if (y + r > h) { y = h - r; vy = -Math.abs(vy) }

          return { ...b, x, y, vx, vy }
        })

        for (let i = 0; i < next.length; i++) {
          for (let j = i + 1; j < next.length; j++) {
            const [a, b] = resolveCollision(next[i], next[j])
            next[i] = a
            next[j] = b
          }
        }

        return next
      })
      frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [bubbles.length, hoveredId])

  return (
    <div className="bubble-pool" ref={poolRef}>
      <div className="bubble-pool-label">Categories</div>
      {bubbles.map((b) => (
        <div
          key={b.id}
          className="bubble"
          onMouseEnter={() => setHoveredId(b.id)}
          onMouseLeave={() => setHoveredId(null)}
          style={{
            left: `${b.x}px`,
            top: `${b.y}px`,
            width: `${b.size}px`,
            height: `${b.size}px`,
            background: `radial-gradient(circle at 35% 30%, hsla(${b.hue},70%,78%,0.85), hsla(${b.hue},55%,55%,0.7))`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <span className="bubble-text">{b.name}</span>
        </div>
      ))}
      {categories.length === 0 && (
        <div className="bubble-empty">No categories yet</div>
      )}
    </div>
  )
}

export default BubblePool
