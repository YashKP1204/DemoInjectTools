
import React from 'react'
import { SectionTitle } from '../components/common/SectionTitle'

export default function Industries() {
  const industries = [
    { title: 'Medical Devices', desc: 'Implantables, surgical instruments, and diagnostic tools.', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
    { title: 'Laboratory Equipment', desc: 'Liquid handling, centrifugation, and automation components.', icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z' },
    { title: 'Pharmaceutical Packaging', desc: 'Closures, delivery systems, and blister packaging molds.', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' },
    { title: 'Life Science Instrumentation', desc: 'Optical mounts, fluidic manifolds, and chassis.', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' }
  ]

  return (
    <div className="bg-black min-h-screen pt-24 pb-24">
      <div className="text-center px-6 mb-20">
        <SectionTitle>Industries Served</SectionTitle>
        <p className="mt-4 text-xl text-gray-400 max-w-3xl mx-auto">Providing critical components for the advancement of healthcare and science.</p>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10">
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
  )
}
