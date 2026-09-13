import { siteContent } from '../data/content'

function Footer() {
  return (
    <footer className="site-footer">
      <div>
        <strong>{siteContent.brandName}</strong>
        <p>{siteContent.footer.copyright}</p>
      </div>
      <div className="footer-links">
        {siteContent.footer.links.map((link) => (
          <a key={link.label} href={link.href}>
            {link.label}
          </a>
        ))}
      </div>
    </footer>
  )
}

export default Footer
