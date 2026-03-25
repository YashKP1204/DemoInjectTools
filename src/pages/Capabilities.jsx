
import React, { useEffect, useState } from 'react'
import { SectionTitle } from '../components/common/SectionTitle'
import { defaultContent } from '../config/defaultContent'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8000'

export default function Capabilities() {
  const [content, setContent] = useState(defaultContent.capabilities)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    console.log('Fetching capabilities from:', `${API_BASE}/api/content`)
    fetch(`${API_BASE}/api/content`)
      .then(res => res.json())
      .then(res => {
        console.log('Capabilities API Response:', res)
        if (res.success && res.data && res.data.capabilities) {
          setContent({ ...defaultContent.capabilities, ...res.data.capabilities })
        }
        setLoading(false)
      })
      .catch(err => {
        console.error('Failed to fetch capabilities, using defaults:', err)
        setLoading(false)
      })
  }, [])

  const caps = (content?.items || defaultContent.capabilities.items).map((item, i) => ({
    ...item,
    img: item.img || defaultContent.capabilities.items[i]?.img || '/assets/images/hero-bg.jpg',
    points: Array.isArray(item.points) ? item.points : (typeof item.points === 'string' ? [item.points] : [])
  }))

  if (loading) return null

  return (
    <div className="bg-[#0b1a2a] min-h-screen">
      <div className="bg-black py-24 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white reveal">{content?.title || 'Our Capabilities'}</h1>
        <p className="mt-4 text-xl text-gray-400 max-w-2xl mx-auto reveal delay-100">{content?.subtitle || 'End-to-end manufacturing solutions for the life science industry.'}</p>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 py-24 space-y-32">
        {caps.map((cap, i) => (
          <div key={i} className={`flex flex-col md:flex-row gap-16 items-center reveal ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
            <div className="flex-1 relative group">
              <div className="absolute -inset-4 bg-[var(--accent)]/5 rounded-2xl transform rotate-2 transition-transform group-hover:rotate-1"></div>
              <img src={cap.img} alt={cap.title} className="relative rounded-xl shadow-2xl border border-white/10 w-full h-[400px] object-cover transition-transform duration-500 group-hover:scale-[1.02]" />
            </div>
            <div className="flex-1">
              <SectionTitle>{cap.title}</SectionTitle>
              <p className="mt-6 text-lg text-gray-300 leading-relaxed">{cap.desc}</p>
              <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {cap.points.map(p => (
                  <li key={p} className="flex items-center gap-3 text-gray-200 bg-[#0c1218] p-3 rounded border border-white/5">
                    <svg className="w-5 h-5 text-[var(--accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    <span className="font-medium">{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
