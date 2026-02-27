
import React from 'react'
import { Link } from 'react-router-dom'
import { SectionTitle } from '../components/common/SectionTitle'

export default function Home() {
  return (
    <>
      <Hero />
      <div className="bg-[#0b1a2a]">
        <CapabilitiesPreview />
        <Process />
        <Quality />
        <Why />
        <CTA />
      </div>
    </>
  )
}

function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative h-screen min-h-[600px] flex items-center">
      <div className="absolute inset-0">
        <img src="/assets/images/hero-bg.jpg" alt="CNC Machining Background" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent" />
      </div>
      <div className="relative z-10 w-full">
        <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-2 gap-12 items-center">
          <div className="max-w-2xl">
            <div className="inline-flex items-center px-3 py-1 rounded-full border border-[var(--accent)] text-[var(--accent)] text-xs font-semibold tracking-wider uppercase mb-6 bg-black/50 backdrop-blur-sm">
              ISO 9001:2015 Certified
            </div>
            <h1 id="hero-title" className="text-white text-5xl md:text-7xl font-bold leading-tight tracking-tight reveal drop-shadow-lg">
              Precision Mold & <span className="text-[var(--accent)]">CNC Machining</span>
            </h1>
            <p className="mt-6 text-xl text-gray-300 max-w-lg leading-relaxed reveal drop-shadow-md">
              Engineering-grade tooling and tight-tolerance components for the life science industry.
            </p>
            <div className="mt-10 flex flex-wrap gap-4 reveal">
              <Link to="/contact" className="inline-flex items-center px-8 py-4 rounded font-bold shadow-lg hover:shadow-xl transition transform hover:-translate-y-1 bg-[var(--accent)] text-[#0b0f14]">
                Request a Quote
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

function CapabilitiesPreview() {
  return (
    <section className="section reveal relative">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex justify-between items-end mb-12">
          <SectionTitle>Core Capabilities</SectionTitle>
          <Link to="/capabilities" className="hidden md:inline-flex items-center text-[var(--accent)] font-medium hover:underline">
            View All Capabilities &rarr;
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <CapCard title="Precision Mold Manufacturing" icon="M4 7h16M7 4v6m10-6v6M4 17h16M7 14v6m10-6v6" desc="Multi-cavity molds and insert tooling." />
          <CapCard title="CNC Machining" icon="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" desc="Tight-tolerance stainless and polymer components." />
          <CapCard title="Tool Design" icon="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" desc="DFM and robust engineering for efficiency." />
          <CapCard title="Custom Solutions" icon="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" desc="Prototyping to low-volume production." />
        </div>
      </div>
    </section>
  )
}

function CapCard({ title, icon, desc }) {
  return (
    <div className="bg-[#0c1218] p-8 rounded-xl border border-white/5 hover:border-[var(--accent)]/50 transition-all duration-300 hover:-translate-y-2 group shadow-lg hover:shadow-[var(--accent)]/10">
      <div className="w-12 h-12 rounded-lg bg-white/5 grid place-items-center text-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-black transition-colors duration-300">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d={icon} /></svg>
      </div>
      <h3 className="mt-6 text-xl font-bold text-white group-hover:text-[var(--accent)] transition-colors">{title}</h3>
      <p className="mt-3 text-gray-400 leading-relaxed">{desc}</p>
    </div>
  )
}

function Process() {
  const steps = ['Design', 'Machining', 'Assembly', 'Inspection', 'Delivery']
  return (
    <section className="section bg-black reveal">
      <div className="mx-auto max-w-7xl px-6">
        <SectionTitle>Manufacturing Process</SectionTitle>
        <div className="mt-16 relative">
          <div className="absolute top-8 left-0 w-full h-0.5 bg-white/10 hidden md:block"></div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
            {steps.map((step, i) => (
              <div key={step} className="relative group">
                <div className="w-16 h-16 mx-auto md:mx-0 bg-[#1a2332] rounded-full border-4 border-black flex items-center justify-center text-xl font-bold text-white relative z-10 group-hover:border-[var(--accent)] transition-colors duration-300 shadow-xl">
                  {i + 1}
                </div>
                <div className="mt-6 text-center md:text-left">
                  <h3 className="text-lg font-bold text-white">{step}</h3>
                  <p className="mt-2 text-sm text-gray-400">
                    {{
                      Design: 'DFM & Tool Design',
                      Machining: 'Precision CNC & EDM',
                      Assembly: 'Fitting & Finishing',
                      Inspection: 'CMM Verification',
                      Delivery: 'Secure Shipping'
                    }[step]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Quality() {
  return (
    <section className="section reveal bg-[#0b1a2a] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-white/5 to-transparent pointer-events-none"></div>
      <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <SectionTitle>Quality & Compliance</SectionTitle>
          <p className="mt-6 text-lg text-gray-300 leading-relaxed">
            Our quality management system is the backbone of our operation. We utilize advanced metrology equipment including CMM and vision systems to ensure every component meets your exact specifications.
          </p>
          <ul className="mt-8 space-y-4">
            <li className="flex items-center gap-3 text-gray-200">
              <span className="w-2 h-2 bg-[var(--accent)] rounded-full"></span>
              <span>ISO 9001:2015 Certified Processes</span>
            </li>
            <li className="flex items-center gap-3 text-gray-200">
              <span className="w-2 h-2 bg-[var(--accent)] rounded-full"></span>
              <span>Full Material Traceability</span>
            </li>
            <li className="flex items-center gap-3 text-gray-200">
              <span className="w-2 h-2 bg-[var(--accent)] rounded-full"></span>
              <span>In-Process & Final Inspection Reports</span>
            </li>
          </ul>
        </div>
        <div className="relative">
          <div className="aspect-video bg-[#0c1218] rounded-xl overflow-hidden border border-white/10 shadow-2xl group">
            <img src="/assets/images/part-1.jpg" alt="Quality Inspection" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-105 transform" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-8">
              <div className="text-white font-bold text-xl">Zero Defect Commitment</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Why() {
  return (
    <section className="section bg-black reveal text-center">
      <div className="mx-auto max-w-7xl px-6">
        <SectionTitle>Why Inject Tools?</SectionTitle>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-2xl bg-[#0c1218] border border-white/5">
            <h3 className="text-xl font-bold text-white mb-4">Life Science Focus</h3>
            <p className="text-gray-400">Specialized experience with medical grades, strict cleanliness, and validation protocols.</p>
          </div>
          <div className="p-8 rounded-2xl bg-[#0c1218] border border-white/5">
            <h3 className="text-xl font-bold text-white mb-4">Engineering First</h3>
            <p className="text-gray-400">We don't just machine; we optimize. Our engineers improve manufacturability and cost.</p>
          </div>
          <div className="p-8 rounded-2xl bg-[#0c1218] border border-white/5">
            <h3 className="text-xl font-bold text-white mb-4">Reliable Delivery</h3>
            <p className="text-gray-400">Proven track record of on-time delivery for critical product launches and supply chains.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

function CTA() {
  return (
    <section className="py-24 bg-[var(--accent)] text-[#0b0f14] relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/assets/images/pattern.svg')] opacity-10"></div>
      <div className="mx-auto max-w-7xl px-6 text-center relative z-10">
        <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to start your project?</h2>
        <p className="text-xl max-w-2xl mx-auto mb-10 font-medium opacity-90">Send us your files and requirements. We'll provide a detailed quote and DFM feedback within 24 hours.</p>
        <Link to="/contact" className="inline-block px-10 py-4 bg-[#0b0f14] text-white font-bold rounded shadow-xl hover:shadow-2xl transition transform hover:-translate-y-1 hover:bg-black">
          Get a Quote Now
        </Link>
      </div>
    </section>
  )
}
