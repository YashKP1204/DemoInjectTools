
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { defaultContent } from '../../config/defaultContent'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8000'

export function Footer() {
  const [content, setContent] = useState(defaultContent.contact)

  useEffect(() => {
    fetch(`${API_BASE}/api/content`)
      .then(res => res.json())
      .then(res => {
        if (res.success && res.data.contact) {
          setContent({ ...defaultContent.contact, ...res.data.contact })
        }
      })
      .catch(() => {})
  }, [])

  return (
    <footer id="footer" className="bg-black text-white border-t border-white/10">
      <div className="mx-auto max-w-7xl px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-white/10 grid place-items-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 2l2.5 5.5L20 10l-5.5 2.5L12 18l-2.5-5.5L4 10l5.5-2.5L12 2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg>
            </div>
            <span className="font-semibold">Inject Tools</span>
          </div>
          <p className="mt-3 text-white/80 max-w-sm">Precision molds and CNC components for the life science industry. Delivering reliability through engineering excellence.</p>
        </div>
        <div>
          <h3 className="font-semibold text-[var(--accent)]">Contact</h3>
          <ul className="mt-3 space-y-2 text-gray-400">
            <li><a href={`mailto:${content.contactEmail}`} className="hover:text-white transition">{content.contactEmail}</a></li>
            <li><a href={`tel:${content.contactPhone}`} className="hover:text-white transition">{content.contactPhone}</a></li>
            <li>{content.contactAddress}</li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-[var(--accent)]">Quick Links</h3>
          <ul className="mt-3 space-y-2 text-gray-400">
            <li><Link to="/about" className="hover:text-white transition">About Us</Link></li>
            <li><Link to="/capabilities" className="hover:text-white transition">Capabilities</Link></li>
            <li><Link to="/industries" className="hover:text-white transition">Industries</Link></li>
            <li><Link to="/portfolio" className="hover:text-white transition">Portfolio</Link></li>
            <li><Link to="/contact" className="hover:text-white transition">Request a Quote</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 bg-[#080c10]">
        <div className="mx-auto max-w-7xl px-6 py-4 flex flex-col md:flex-row justify-between items-center text-sm text-white/50">
          <p>© {new Date().getFullYear()} Inject Tools. All rights reserved.</p>
          <div className="flex gap-4 mt-2 md:mt-0">
            <Link to="/admin-login" className="hover:text-white transition">Admin</Link>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
