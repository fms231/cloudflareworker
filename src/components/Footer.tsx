import { siteContent } from '../data/content'

function Footer() {
  return (
    <footer className="relative mt-auto flex items-end justify-between gap-4 border-t border-neutral-200 px-1 py-6 text-sm text-neutral-500 dark:border-neutral-800 dark:text-neutral-400">
      <div>
        <strong className="font-brand text-base text-neutral-900 dark:text-neutral-100">{siteContent.brandName}</strong>
      </div>
    </footer>
  )
}

export default Footer
