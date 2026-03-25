
import React, { useState } from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { LayoutDashboard, FileText, Image as ImageIcon, Settings, BarChart, FileInput, LogOut, Menu, X } from 'lucide-react'

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const navItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/admin/rfqs', label: 'RFQ Submissions', icon: FileInput },
    { path: '/admin/portfolio', label: 'Portfolio Items', icon: ImageIcon },
    { path: '/admin/content', label: 'Content Editor', icon: FileText },
    { path: '/admin/media', label: 'Media Manager', icon: ImageIcon },
    { path: '/admin/settings', label: 'Theme Settings', icon: Settings },
  ]

  const handleLogout = async () => {
    try {
      await fetch(`${API_BASE}/api/auth/logout`, { method: 'POST', credentials: 'include' })
      navigate('/')
    } catch (e) {
      console.error('Logout failed', e)
      navigate('/')
    }
  }

  return (
    <div className="min-h-screen bg-[#080c10] flex text-gray-300 font-sans">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/80 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[#0c1218] border-r border-white/10 transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="h-full flex flex-col">
          <div className="h-16 flex items-center px-6 border-b border-white/10">
            <div className="w-8 h-8 rounded bg-[var(--accent)] flex items-center justify-center text-black font-bold mr-3">A</div>
            <span className="text-white font-bold text-lg tracking-wide">Inject Tools</span>
          </div>

          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.path
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group
                    ${isActive 
                      ? 'bg-[var(--accent)]/10 text-[var(--accent)] font-medium' 
                      : 'text-gray-400 hover:bg-white/5 hover:text-white'
                    }`}
                >
                  <Icon size={20} className={isActive ? 'text-[var(--accent)]' : 'text-gray-500 group-hover:text-white'} />
                  {item.label}
                </Link>
              )
            })}
          </nav>

          <div className="p-4 border-t border-white/10">
            <button 
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-red-400 hover:bg-red-900/10 transition-colors"
            >
              <LogOut size={20} />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-16 bg-[#0c1218] border-b border-white/10 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-30">
          <button 
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 text-gray-400 hover:text-white"
          >
            <Menu size={24} />
          </button>

          <div className="flex items-center gap-4 ml-auto">
            <div className="hidden md:block text-right">
              <div className="text-sm font-medium text-white">Admin User</div>
              <div className="text-xs text-gray-500">Administrator</div>
            </div>
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white font-bold border border-white/10">
              AU
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
