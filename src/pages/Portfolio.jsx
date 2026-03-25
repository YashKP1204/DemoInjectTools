
import React, { useEffect, useState } from 'react'
import { SectionTitle } from '../components/common/SectionTitle'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8000'

export default function Portfolio() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [lightbox, setLightbox] = useState(null)

  useEffect(() => {
    fetch(`${API_BASE}/api/portfolio`)
      .then(res => res.json())
      .then(res => {
        if (res.success) {
          setProjects(res.data)
        }
        setLoading(false)
      })
      .catch(err => {
        console.error('Failed to fetch portfolio:', err)
        setLoading(false)
      })
  }, [])

  if (loading) return <div className="min-h-screen bg-[#0b1a2a] flex items-center justify-center text-white">Loading...</div>

  return (
    <div className="bg-[#0b1a2a] min-h-screen py-24">
      <div className="text-center px-6 mb-20">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 reveal">Project Portfolio</h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto reveal delay-100">A showcase of precision engineering and manufacturing excellence.</p>
      </div>

      <div className="max-w-7xl mx-auto px-6 columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
        {projects.map((p, i) => (
          <div key={p._id} className="break-inside-avoid relative group rounded-xl overflow-hidden cursor-pointer border border-white/10 shadow-lg reveal" onClick={() => setLightbox(p)}>
            <img src={p.image.startsWith('http') ? p.image : `${API_BASE}${p.image}`} alt={p.title} className="w-full h-auto transform transition-transform duration-500 group-hover:scale-110" />
            <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-center p-6">
              <h3 className="text-xl font-bold text-white mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{p.title}</h3>
              <span className="text-[var(--accent)] text-sm font-semibold uppercase tracking-wider translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75 mb-3">{p.category}</span>
              {p.description && (
                <p className="text-gray-300 text-xs line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-150">{p.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {lightbox && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-10 animate-fade-in" onClick={() => setLightbox(null)}>
          <button className="absolute top-6 right-6 text-white hover:text-[var(--accent)] transition-colors z-[110]">
            <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          
          <div 
            className="bg-[#0c1218] max-w-6xl w-full max-h-[90vh] rounded-2xl border border-white/10 shadow-2xl overflow-hidden flex flex-col md:flex-row" 
            onClick={e => e.stopPropagation()}
          >
            {/* Left Side: Image */}
            <div className="md:w-3/5 bg-black/50 flex items-center justify-center p-4">
              <img 
                src={lightbox.image.startsWith('http') ? lightbox.image : `${API_BASE}${lightbox.image}`} 
                alt={lightbox.title} 
                className="max-w-full max-h-full object-contain rounded-lg" 
              />
            </div>
            
            {/* Right Side: Content */}
            <div className="md:w-2/5 p-8 md:p-12 flex flex-col justify-center border-t md:border-t-0 md:border-l border-white/10 overflow-y-auto">
              <div className="inline-block px-3 py-1 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] text-xs font-bold uppercase tracking-widest mb-6 w-fit">
                {lightbox.category}
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                {lightbox.title}
              </h2>
              {lightbox.description && (
                <div className="space-y-4">
                  <div className="h-1 w-12 bg-[var(--accent)] rounded-full mb-6"></div>
                  <p className="text-gray-300 leading-relaxed text-lg">
                    {lightbox.description}
                  </p>
                </div>
              )}
              
              <div className="mt-10 pt-10 border-t border-white/5">
                <button 
                  onClick={() => setLightbox(null)}
                  className="px-8 py-3 bg-white/5 text-white rounded font-bold hover:bg-white/10 transition-colors border border-white/10"
                >
                  Close Project
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
