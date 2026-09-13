import { Outlet } from 'react-router-dom'

import Footer from './Footer'
import NavBar from './NavBar'

function SiteLayout() {
  return (
    <div className="layout">
      <NavBar />
      <main className="canvas">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default SiteLayout
