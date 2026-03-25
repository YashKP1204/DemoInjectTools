
import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8000'

export function Header() {
  const location = useLocation()
  const isActive = (path) => location.pathname === path

  return (
    <header className="bg-black/80 backdrop-blur border-b border-white/10 text-white sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-6 py-5 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded bg-white/10 grid place-items-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 2l2.5 5.5L20 10l-5.5 2.5L12 18l-2.5-5.5L4 10l5.5-2.5L12 2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg>
          </div>
          <span className="text-lg md:text-xl font-semibold tracking-wide">Inject Tools</span>
        </Link>
        <nav aria-label="Primary" className="hidden md:flex items-center gap-6">
          <NavLink to="/" label="Home" active={isActive('/')} />
          <NavLink to="/about" label="About" active={isActive('/about')} />
          <NavLink to="/capabilities" label="Capabilities" active={isActive('/capabilities')} />
          <NavLink to="/industries" label="Industries" active={isActive('/industries')} />
          <NavLink to="/portfolio" label="Portfolio" active={isActive('/portfolio')} />
          <NavLink to="/contact" label="Contact / RFQ" active={isActive('/contact')} />
        </nav>
        <div className="hidden md:flex items-center gap-3">
          <Link to="/contact" className="px-4 py-2 rounded font-medium transition transform hover:-translate-y-0.5 shadow-lg" style={{ backgroundColor: 'var(--accent)', color: '#0b0f14' }}>Request a Quote</Link>
        </div>
      </div>
    </header>
  )
}

function NavLink({ to, label, active }) {
  return (
    <Link to={to} className={`text-sm font-medium transition pb-1 border-b-2 ${active ? 'text-white border-[var(--accent)]' : 'text-white/70 border-transparent hover:text-white hover:border-white/30'}`}>
      {label}
    </Link>
  )
}
