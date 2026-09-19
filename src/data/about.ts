export const aboutContent = {
  hero: {
    eyebrow: 'Backend Engineer',
    title: 'Hi, I\'m Quito. Backend Engineer based in Guangzhou, China.',
    description:
      'Open to opportunities in Backend Development or AI Application Development. Currently working in Guangzhou, China.',
    tags: ['MySQL', 'Docker', 'Redis', 'RocketMQ'],
    videoSrc: '',
    videoAlt: 'Wallpaper video background',
  },
  journey: {
    title: 'Engineering Journey',
    description: 'A backend-first path centered on APIs, data layers, caching, messaging, and deployment tooling.',
    items: [
      {
        period: '2024.09 — 2027.06',
        title: 'USTC M.S. Student',
        description: 'Software learner at University of Science and Technology of China, Hefei.',
      },
      {
        period: '2025.06 — 2026.03',
        title: 'ByteDance (GMPT)',
        description: 'Worked on ByteDance GMPT team. Focused on Go backend distributed systems.',
      },
      {
        period: '2026.09 — 至今',
        title: 'Tencent (WeChat Group)',
        description: 'Backend engineering at Tencent, working on WeChat Group systems.',
      },
    ],
  },
  expertise: [
    {
      title: 'API Design',
      description:
        'Designing predictable interfaces, clear contracts, and maintainable service boundaries.',
      tags: ['REST', 'gRPC', 'Versioning'],
    },
    {
      title: 'Data Reliability',
      description: 'Reducing failure modes through retries, idempotency, and careful schema design.',
      variant: 'highlight',
    },
    {
      title: 'AI-Assisted Coding',
      description: 'Using vibe coding to accelerate implementation while still reviewing every edge case.',
      variant: 'cyan',
    },
    {
      title: 'Infrastructure',
      description: 'Keeping Docker, queues, caches, and databases aligned for a predictable production stack.',
    },
  ],
  philosophy: {
    title: 'Engineering Philosophy',
    principles: [
      {
        title: 'Reliability First',
        description:
          'Every system should fail predictably, recover quickly, and be easy to reason about.',
      },
      {
        title: 'Ship with Discipline',
        description:
          'Speed matters, but only when the codebase stays observable, testable, and maintainable.',
      },
    ],
  },
}
