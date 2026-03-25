
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { defaultContent } from '../config/defaultContent'
import { SectionTitle } from '../components/common/SectionTitle'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8000'

export default function About() {
  const [content, setContent] = useState(defaultContent)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    console.log('Fetching about content from:', `${API_BASE}/api/content`)
    fetch(`${API_BASE}/api/content`)
      .then(res => res.json())
      .then(res => {
        console.log('About API Response:', res)
        if (res.success && res.data) {
          // Merge API content with defaults to ensure all fields exist
          const merged = { ...defaultContent }
          Object.keys(res.data).forEach(key => {
            if (res.data[key] && typeof res.data[key] === 'object') {
              merged[key] = { ...defaultContent[key], ...res.data[key] }
            }
          })
          console.log('Merged About Content:', merged)
          setContent(merged)
        }
        setLoading(false)
      })
      .catch(err => {
        console.error('Failed to fetch about content, using defaults:', err)
        setLoading(false)
      })
  }, [])

  if (loading) return null

  const aboutTitle = content?.about?.aboutTitle || 'About Inject Tools'
  const aboutDesc = content?.about?.aboutDesc || 'At Inject Tools, we bridge the gap between complex engineering requirements and manufacturing reality.'
  const aboutImage1 = content?.about?.aboutImage1 || defaultContent.about.aboutImage1
  const aboutImage2 = content?.about?.aboutImage2 || defaultContent.about.aboutImage2

  return (
    <div className="bg-[#0b1a2a]">
      <div className="relative h-[40vh] min-h-[400px] flex items-center justify-center bg-black/50">
        <div className="absolute inset-0">
          <img src={aboutImage1} alt="About Us Hero" className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b1a2a] to-transparent" />
        </div>
        <div className="relative z-10 text-center max-w-4xl px-6">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 reveal">{aboutTitle}</h1>
          <p className="text-xl text-gray-300 reveal delay-100">Precision manufacturing partners for the world's most demanding industries.</p>
        </div>
      </div>

      <section className="section reveal">
        <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div>
            <SectionTitle>Our Mission</SectionTitle>
            <div className="mt-6 text-lg text-gray-300 leading-relaxed whitespace-pre-line">
              {aboutDesc}
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-[var(--accent)]/10 rounded-2xl transform rotate-3"></div>
            <img src={aboutImage2} alt="Our Facility" className="relative rounded-xl shadow-2xl border border-white/10" />
          </div>
        </div>
      </section>

      <OwnerSection data={content?.owner} />
    </div>
  )
}

function OwnerSection({ data }) {
  const name = data?.ownerName || 'James Anderson'
  const role = data?.ownerRole || 'Founder & Chief Engineer'
  const message = data?.ownerMessage || 'In the life sciences, a micron can be the difference between a breakthrough and a failure. We take that responsibility personally.'
  const image = data?.ownerImage || defaultContent.owner.ownerImage

  return (
    <section className="section bg-black reveal">
      <div className="mx-auto max-w-7xl px-6">
        <div className="bg-[#0c1218] rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
          <div className="grid md:grid-cols-2">
            <div className="relative h-[300px] md:h-auto overflow-hidden group">
              <img src={image} alt="Founder Portrait" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:bg-gradient-to-r" />
            </div>
            <div className="p-8 md:p-16 flex flex-col justify-center">
              <div className="inline-block px-3 py-1 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] text-sm font-semibold mb-6 w-fit">Leadership</div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Built on Precision, <br/>Driven by Integrity.</h2>
              <blockquote className="text-xl text-gray-300 italic mb-8 border-l-4 border-[var(--accent)] pl-6">
                "{message}"
              </blockquote>
              <div>
                <div className="text-white font-bold text-lg">{name}</div>
                <div className="text-gray-400">{role}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
