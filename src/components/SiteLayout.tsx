import { Outlet } from 'react-router-dom'

import Footer from './Footer'
import NavBar from './NavBar'

function SiteLayout() {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-8 px-4 py-4 sm:px-6">
      <NavBar />
      <main className="min-w-0 flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default SiteLayout
