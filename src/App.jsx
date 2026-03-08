
import React, { useEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Capabilities from './pages/Capabilities'
import Industries from './pages/Industries'
import Portfolio from './pages/Portfolio'
import Contact from './pages/Contact'
import AdminLogin from './pages/admin/Login'
import AdminLayout from './pages/admin/AdminLayout'
import Overview from './pages/admin/Overview'
import RFQs from './pages/admin/RFQs'
import ContentEditor from './pages/admin/ContentEditor'
import MediaManager from './pages/admin/MediaManager'
import ThemeSettings from './pages/admin/Settings'

export default function App() {
  const location = useLocation()
  
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    
    // Observer for reveal animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view')
        }
      })
    }, { threshold: 0.15 })

    const elements = document.querySelectorAll('.reveal')
    elements.forEach(el => observer.observe(el))
    
    return () => observer.disconnect()
  }, [location.pathname])

  // Admin routes don't use the main layout
  if (location.pathname.startsWith('/admin') || location.pathname === '/admin-login') {
    return (
      <Routes>
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Overview />} />
          <Route path="rfqs" element={<RFQs />} />
          <Route path="content" element={<ContentEditor />} />
          <Route path="media" element={<MediaManager />} />
          <Route path="settings" element={<ThemeSettings />} />
        </Route>
      </Routes>
    )
  }

  return (
    <div className="bg-[#0b1a2a] text-gray-300 min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/capabilities" element={<Capabilities />} />
          <Route path="/industries" element={<Industries />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
