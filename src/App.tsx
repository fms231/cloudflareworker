import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import SiteLayout from './components/SiteLayout'
import AboutPage from './pages/AboutPage'
import ArticleDetailPage from './pages/ArticleDetailPage'
import ArticlesPage from './pages/ArticlesPage'
import HomePage from './pages/HomePage'
import MomentsPage from './pages/MomentsPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route index element={<HomePage />} />
          <Route path="articles" element={<ArticlesPage />} />
          <Route path="articles/:articleId" element={<ArticleDetailPage />} />
          <Route path="moments" element={<MomentsPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
