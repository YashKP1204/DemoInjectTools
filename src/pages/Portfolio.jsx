
import React, { useState } from 'react'
import { SectionTitle } from '../components/common/SectionTitle'

export default function Portfolio() {
  const projects = [
    { id: 1, title: 'Medical Implant Mold', img: '/assets/images/part-1.jpg', cat: 'Mold Making' },
    { id: 2, title: 'Surgical Handpiece', img: '/assets/images/cap-machining.jpg', cat: 'CNC Machining' },
    { id: 3, title: 'Microfluidic Manifold', img: '/assets/images/cap-laser.jpg', cat: 'Precision Milling' },
    { id: 4, title: 'Diagnostic Cartridge', img: '/assets/images/hero-bg.jpg', cat: 'Tool Design' },
    { id: 5, title: 'Orthopedic Fixture', img: '/assets/images/cap-machining.jpg', cat: 'Custom Fixturing' },
    { id: 6, title: 'Pharmaceutical Housing', img: '/assets/images/part-1.jpg', cat: 'Assembly' }
  ]

  const [lightbox, setLightbox] = useState(null)

  return (
    <div className="bg-[#0b1a2a] min-h-screen py-24">
      <div className="text-center px-6 mb-20">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 reveal">Project Portfolio</h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto reveal delay-100">A showcase of precision engineering and manufacturing excellence.</p>
      </div>

      <div className="max-w-7xl mx-auto px-6 columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
        {projects.map((p, i) => (
          <div key={p.id} className="break-inside-avoid relative group rounded-xl overflow-hidden cursor-pointer border border-white/10 shadow-lg reveal" onClick={() => setLightbox(p)}>
            <img src={p.img} alt={p.title} className="w-full h-auto transform transition-transform duration-500 group-hover:scale-110" />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-center p-6">
              <h3 className="text-xl font-bold text-white mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{p.title}</h3>
              <span className="text-[var(--accent)] text-sm font-semibold uppercase tracking-wider translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">{p.cat}</span>
            </div>
          </div>
        ))}
      </div>

      {lightbox && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-10 animate-fade-in" onClick={() => setLightbox(null)}>
          <button className="absolute top-6 right-6 text-white hover:text-[var(--accent)] transition-colors">
            <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          <div className="max-w-5xl w-full max-h-full flex flex-col items-center" onClick={e => e.stopPropagation()}>
            <img src={lightbox.img} alt={lightbox.title} className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl border border-white/10" />
            <div className="mt-6 text-center">
              <h2 className="text-2xl font-bold text-white">{lightbox.title}</h2>
              <p className="text-[var(--accent)] mt-2 font-medium">{lightbox.cat}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
