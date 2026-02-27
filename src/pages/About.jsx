
import React from 'react'
import { SectionTitle } from '../components/common/SectionTitle'

export default function About() {
  return (
    <div className="bg-[#0b1a2a]">
      <div className="relative h-[40vh] min-h-[400px] flex items-center justify-center bg-black/50">
        <div className="absolute inset-0">
          <img src="/assets/images/cap-machining.jpg" alt="About Us Hero" className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b1a2a] to-transparent" />
        </div>
        <div className="relative z-10 text-center max-w-4xl px-6">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 reveal">About Inject Tools</h1>
          <p className="text-xl text-gray-300 reveal delay-100">Precision manufacturing partners for the world's most demanding industries.</p>
        </div>
      </div>

      <section className="section reveal">
        <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <SectionTitle>Our Mission</SectionTitle>
            <p className="mt-6 text-lg text-gray-300 leading-relaxed">
              At Inject Tools, we bridge the gap between complex engineering requirements and manufacturing reality. Founded with a vision to serve the life science sector, we have cultivated a culture of uncompromising quality and technical depth.
            </p>
            <p className="mt-4 text-lg text-gray-300 leading-relaxed">
              We don't just make parts; we validate processes. Our facility is equipped with state-of-the-art CNC machining centers, EDM, and injection molding capabilities, all underpinned by a rigorous quality management system designed for medical device and pharmaceutical applications.
            </p>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-[var(--accent)]/10 rounded-2xl transform rotate-3"></div>
            <img src="/assets/images/cap-laser.jpg" alt="Our Facility" className="relative rounded-xl shadow-2xl border border-white/10" />
          </div>
        </div>
      </section>

      <OwnerSection />
    </div>
  )
}

function OwnerSection() {
  return (
    <section className="section bg-black reveal">
      <div className="mx-auto max-w-7xl px-6">
        <div className="bg-[#0c1218] rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
          <div className="grid md:grid-cols-2">
            <div className="relative h-[400px] md:h-auto overflow-hidden group">
              <img src="/assets/images/owner.jpg" alt="Founder Portrait" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:bg-gradient-to-r" />
            </div>
            <div className="p-10 md:p-16 flex flex-col justify-center">
              <div className="inline-block px-3 py-1 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] text-sm font-semibold mb-6 w-fit">Leadership</div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Built on Precision, <br/>Driven by Integrity.</h2>
              <blockquote className="text-xl text-gray-300 italic mb-8 border-l-4 border-[var(--accent)] pl-6">
                "In the life sciences, a micron can be the difference between a breakthrough and a failure. We take that responsibility personally."
              </blockquote>
              <div>
                <div className="text-white font-bold text-lg">James Anderson</div>
                <div className="text-gray-400">Founder & Chief Engineer</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
