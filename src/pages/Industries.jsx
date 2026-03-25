
import React, { useEffect, useState } from 'react'
import { SectionTitle } from '../components/common/SectionTitle'
import { defaultContent } from '../config/defaultContent'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8000'

export default function Industries() {
  const [content, setContent] = useState(defaultContent.industries)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    console.log('Fetching industries from:', `${API_BASE}/api/content`)
    fetch(`${API_BASE}/api/content`)
      .then(res => res.json())
      .then(res => {
        console.log('Industries API Response:', res)
        if (res.success && res.data && res.data.industries) {
          setContent({ ...defaultContent.industries, ...res.data.industries })
        }
        setLoading(false)
      })
      .catch(err => {
        console.error('Failed to fetch industries, using defaults:', err)
        setLoading(false)
      })
  }, [])

  const industries = (content?.items || defaultContent.industries.items || []).map((item, i) => ({
    ...item,
    icon: item.icon || defaultContent.industries.items[i]?.icon || 'M13 10V3L4 14h7v7l9-11h-7z'
  }))

  if (loading) return null

  return (
    <div className="bg-[#0b1a2a] min-h-screen">
      <div className="bg-black py-24 text-center px-6">
        <h1 className="text-4xl md:text-6xl font-bold text-white reveal">{content?.title || 'Industries Served'}</h1>
        <p className="mt-4 text-xl text-gray-400 max-w-2xl mx-auto reveal delay-100">{content?.subtitle || 'Providing high-precision components and tooling for specialized applications.'}</p>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {industries.map((ind, i) => (
            <div key={i} className="bg-[#0c1218] p-10 rounded-2xl border border-white/5 hover:border-[var(--accent)] transition-all duration-300 hover:-translate-y-2 group">
              <div className="w-16 h-16 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:bg-[var(--accent)] transition-colors">
                <svg className="w-8 h-8 text-[var(--accent)] group-hover:text-black transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={ind.icon} /></svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{ind.title}</h3>
              <p className="text-gray-400 text-lg leading-relaxed">{ind.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
