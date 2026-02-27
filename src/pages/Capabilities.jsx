
import React from 'react'
import { SectionTitle } from '../components/common/SectionTitle'

export default function Capabilities() {
  const caps = [
    {
      title: 'Precision Mold Manufacturing',
      img: '/assets/images/cap-machining.jpg',
      desc: 'We design and build high-cavitation, hot runner, and insert molds for medical consumables and packaging. Our EDM and high-speed machining centers achieve mirror finishes and tight shut-offs essential for flash-free parts.',
      points: ['Multi-Cavity & Hot Runner', 'Insert & Overmolding', 'Class 101 Production Tooling', 'Prototype Molds (Aluminum/Soft Steel)']
    },
    {
      title: 'CNC Machining',
      img: '/assets/images/cap-laser.jpg',
      desc: 'From PEEK and Ultem to Stainless Steel and Titanium, our CNC department specializes in complex geometries. We maintain strict process controls for surface finish and dimensional accuracy.',
      points: ['5-Axis Milling', 'Swiss Turning', 'Wire EDM', 'Micro-Machining']
    },
    {
      title: 'Tool Design & Engineering',
      img: '/assets/images/part-1.jpg',
      desc: 'Our engineering team uses advanced CAD/CAM software to simulate mold flow and optimize part design for manufacturability (DFM) before steel is cut.',
      points: ['DFM Analysis', 'Mold Flow Simulation', '3D Modeling (SolidWorks)', 'Fixture Design']
    },
    {
      title: 'Custom Manufacturing Solutions',
      img: '/assets/images/hero-bg.jpg',
      desc: 'Beyond standard tooling, we offer comprehensive manufacturing support including assembly, laser marking, and cleanroom packaging services.',
      points: ['Cleanroom Assembly', 'Laser Marking & Engraving', 'Ultrasonic Welding', 'Validation Support (IQ/OQ/PQ)']
    }
  ]

  return (
    <div className="bg-[#0b1a2a] min-h-screen">
      <div className="bg-black py-24 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white reveal">Our Capabilities</h1>
        <p className="mt-4 text-xl text-gray-400 max-w-2xl mx-auto reveal delay-100">End-to-end manufacturing solutions for the life science industry.</p>
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
