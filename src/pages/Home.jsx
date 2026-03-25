
import React, { useEffect, useState, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { SectionTitle } from '../components/common/SectionTitle'
import { defaultContent } from '../config/defaultContent'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8000'

export default function Home() {
  const [content, setContent] = useState(defaultContent)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    console.log('Fetching content from:', `${API_BASE}/api/content`)
    fetch(`${API_BASE}/api/content`)
      .then(res => res.json())
      .then(res => {
        console.log('API Response:', res)
        if (res.success && res.data) {
          // Merge API content with defaults to ensure all fields exist
          const merged = { ...defaultContent }
          Object.keys(res.data).forEach(key => {
            if (res.data[key] && typeof res.data[key] === 'object') {
              // Deep merge at the section level to preserve default fields
              merged[key] = { ...defaultContent[key], ...res.data[key] }
            }
          })
          console.log('Merged Content:', merged)
          setContent(merged)
        }
        setLoading(false)
      })
      .catch(err => {
        console.error('Failed to fetch content, using defaults:', err)
        setLoading(false)
      })
  }, [])

  if (loading) return <div className="min-h-screen bg-[#0b1a2a] flex items-center justify-center text-white">Loading...</div>

  return (
    <>
      <Hero data={content?.hero} />
      <div className="bg-[#0b1a2a]">
        <CapabilitiesPreview data={content?.capabilities} />
        <Process data={content?.process} />
        <PortfolioPreview data={content?.portfolioPreview} />
        <Quality data={content?.quality} />
        <Why data={content?.why} />
        <CTA data={content?.hero} />
      </div>
    </>
  )
}

function Hero({ data }) {
  const headline = data?.heroHeadline || defaultContent.hero.heroHeadline
  const subhead = data?.heroSubhead || defaultContent.hero.heroSubhead
  const heroImage = data?.heroImage || defaultContent.hero.heroImage
  
  return (
    <section aria-labelledby="hero-title" className="relative h-screen min-h-[600px] flex items-center">
      <div className="absolute inset-0">
        <img src={heroImage} alt="CNC Machining Background" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent" />
      </div>
      <div className="relative z-10 w-full">
        <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-2 gap-12 items-center">
          <div className="max-w-2xl">
            <div className="inline-flex items-center px-3 py-1 rounded-full border border-[var(--accent)] text-[var(--accent)] text-xs font-semibold tracking-wider uppercase mb-6 bg-black/50 backdrop-blur-sm">
              ISO 9001:2015 Certified
            </div>
            <h1 id="hero-title" className="text-white text-5xl md:text-7xl font-bold leading-tight tracking-tight reveal drop-shadow-lg">
              {headline.includes('CNC') 
                ? headline.split('CNC').map((part, i) => i === 0 ? part : <Fragment key={i}><span className="text-[var(--accent)]">CNC</span>{part}</Fragment>)
                : headline
              }
            </h1>
            <p className="mt-6 text-xl text-gray-300 max-w-lg leading-relaxed reveal drop-shadow-md">
              {subhead}
            </p>
            <div className="mt-10 flex flex-wrap gap-4 reveal">
              <Link to="/contact" className="inline-flex items-center px-8 py-4 rounded font-bold shadow-lg hover:shadow-xl transition transform hover:-translate-y-1 bg-[var(--accent)] text-[#0b0f14]">
                {data?.cta || defaultContent.hero.cta}
              </Link>
              <Link to="/capabilities" className="inline-flex items-center px-8 py-4 rounded border border-white/30 text-white hover:bg-white/10 transition backdrop-blur-sm font-medium">
                Our Capabilities
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function CapabilitiesPreview({ data }) {
  const title = data?.title || defaultContent.capabilities.title
  const items = data?.items || defaultContent.capabilities.items

  return (
    <section className="section reveal relative">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex justify-between items-end mb-12">
          <SectionTitle>{title}</SectionTitle>
          <Link to="/capabilities" className="hidden md:inline-flex items-center text-[var(--accent)] font-medium hover:underline">
            View All Capabilities &rarr;
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.slice(0, 4).map((item, i) => (
            <CapCard 
              key={i}
              title={item.title} 
              icon={item.icon || (i === 0 ? "M4 7h16M7 4v6m10-6v6M4 17h16M7 14v6m10-6v6" : i === 1 ? "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" : "M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z")} 
              desc={item.desc} 
              img={item.img}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
  

function CapCard({ title, icon, desc, img }) {
  return (
    <div className="bg-[#0c1218] rounded-xl border border-white/5 hover:border-[var(--accent)]/50 transition-all duration-300 hover:-translate-y-2 group shadow-lg hover:shadow-[var(--accent)]/10 flex flex-col h-full overflow-hidden">
      {img && (
        <div className="aspect-video w-full overflow-hidden border-b border-white/5">
          <img src={img} alt={title} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      )}
      <div className="p-8 flex flex-col flex-1">
        <div className="w-12 h-12 rounded-lg bg-white/5 grid place-items-center text-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-black transition-colors duration-300">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d={icon} /></svg>
        </div>
        <h3 className="mt-6 text-xl font-bold text-[var(--accent)] transition-colors">{title}</h3>
        <p className="mt-4 text-gray-400 text-sm leading-relaxed">{desc}</p>
      </div>
    </div>
  )
}

function Process({ data }) {
  const title = data?.title || defaultContent.process.title
  const steps = data?.steps || defaultContent.process.steps

  return (
    <section className="section bg-black reveal">
      <div className="mx-auto max-w-7xl px-6">
        <SectionTitle>{title}</SectionTitle>
        <div className="mt-16 relative">
          <div className="absolute top-8 left-0 w-full h-0.5 bg-white/10 hidden md:block"></div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
            {steps.map((step, i) => (
              <div key={i} className="relative group">
                <div className="w-16 h-16 mx-auto md:mx-0 bg-[#1a2332] rounded-full border-4 border-black flex items-center justify-center text-xl font-bold text-white relative z-10 group-hover:border-[var(--accent)] transition-colors duration-300 shadow-xl">
                  {i + 1}
                </div>
                <div className="mt-6 text-center md:text-left">
                  <h3 className="text-lg font-bold text-white">{step.title}</h3>
                  <p className="mt-2 text-sm text-gray-400">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function PortfolioPreview({ data }) {
  const [projects, setProjects] = useState([])
  const [lightbox, setLightbox] = useState(null)
  const title = data?.title || defaultContent.portfolioPreview.title
  const subtitle = data?.subtitle || defaultContent.portfolioPreview.subtitle

  useEffect(() => {
    fetch(`${API_BASE}/api/portfolio`)
      .then(res => res.json())
      .then(res => {
        if (res.success) {
          setProjects(res.data.slice(0, 3))
        }
      })
      .catch(() => {})
  }, [])

  return (
    <section className="section bg-black/50 reveal">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-16">
          <SectionTitle>{title}</SectionTitle>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">{subtitle}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((p, i) => (
            <div 
              key={i} 
              onClick={() => setLightbox(p)}
              className="group relative rounded-xl overflow-hidden border border-white/10 shadow-lg aspect-video bg-[#0c1218] cursor-pointer"
            >
              <img src={p.image.startsWith('http') ? p.image : `${API_BASE}${p.image}`} alt={p.title} className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-6 text-center">
                <h3 className="text-xl font-bold text-white mb-2">{p.title}</h3>
                <span className="text-[var(--accent)] text-sm font-semibold uppercase mb-3">{p.category}</span>
                {p.description && (
                  <p className="text-gray-300 text-xs line-clamp-3 max-w-[250px]">{p.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link to="/portfolio" className="inline-flex items-center text-[var(--accent)] font-bold hover:underline gap-2 group">
            View All Projects 
            <svg className="w-5 h-5 transform transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </Link>
        </div>
      </div>

      {/* Shared Lightbox Component-style rendering */}
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
            <div className="md:w-2/5 p-8 md:p-12 flex flex-col justify-center border-t md:border-t-0 md:border-l border-white/10 overflow-y-auto text-left">
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
    </section>
  )
}

function Quality({ data }) {
  const title = data?.title || defaultContent.quality.title
  const description = data?.description || defaultContent.quality.description
  const points = data?.points || defaultContent.quality.points
  const image = data?.image || defaultContent.quality.image
  const imageLabel = data?.imageLabel || defaultContent.quality.imageLabel

  return (
    <section className="section reveal bg-[#0b1a2a] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-white/5 to-transparent pointer-events-none"></div>
      <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <SectionTitle>{title}</SectionTitle>
          <p className="mt-6 text-lg text-gray-300 leading-relaxed">
            {description}
          </p>
          <ul className="mt-8 space-y-4">
            {points.map((point, i) => (
              <li key={i} className="flex items-center gap-3 text-gray-200">
                <span className="w-2 h-2 bg-[var(--accent)] rounded-full"></span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="relative">
          <div className="aspect-video bg-[#0c1218] rounded-xl overflow-hidden border border-white/10 shadow-2xl group">
            <img src={image} alt={title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-105 transform" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-8">
              <div className="text-white font-bold text-xl">{imageLabel}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Why({ data }) {
  const title = data?.title || defaultContent.why.title
  const items = data?.items || defaultContent.why.items

  return (
    <section className="section bg-black reveal text-center">
      <div className="mx-auto max-w-7xl px-6">
        <SectionTitle>{title}</SectionTitle>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((item, i) => (
            <div key={i} className="p-8 rounded-2xl bg-[#0c1218] border border-white/5">
              <h3 className="text-xl font-bold text-white mb-4">{item.title}</h3>
              <p className="text-gray-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CTA({ data }) {
  const ctaText = data?.cta || defaultContent.hero.cta
  return (
    <section className="py-24 bg-[var(--accent)] text-[#0b0f14] relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/assets/images/pattern.svg')] opacity-10"></div>
      <div className="mx-auto max-w-7xl px-6 text-center relative z-10">
        <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to start your project?</h2>
        <p className="text-xl max-w-2xl mx-auto mb-10 font-medium opacity-90">Send us your files and requirements. We'll provide a detailed quote and DFM feedback within 24 hours.</p>
        <Link to="/contact" className="inline-block px-10 py-4 bg-[#0b0f14] text-white font-bold rounded shadow-xl hover:shadow-2xl transition transform hover:-translate-y-1 hover:bg-black">
          {ctaText}
        </Link>
      </div>
    </section>
  )
}
