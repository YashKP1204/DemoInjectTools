
import React, { useState } from 'react'
import { SectionTitle } from '../components/common/SectionTitle'
import { Label } from '../components/common/Label'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8080'

export default function Contact() {
  const [status, setStatus] = useState(null)
  const [errors, setErrors] = useState({})
  const [files, setFiles] = useState([])
  const [step, setStep] = useState(0)
  const [fields, setFields] = useState({
    companyName: '', contactPerson: '', email: '', phone: '', country: '',
    projectType: '', materialType: '', requiredTolerance: '', estimatedQuantity: '', deliveryDate: '',
    additionalNotes: ''
  })

  const allowed = ['application/pdf', 'model/step', 'application/sla', 'application/vnd.ms-pki.stl', 'application/dwg', 'image/vnd.dwg', 'application/octet-stream']
  const allowedExt = ['.pdf','.step','.stp','.stl','.dwg']

  function onFilesChange(ev) {
    const list = Array.from(ev.target.files || [])
    const filtered = list.filter(f => {
      const ext = f.name.slice(f.name.lastIndexOf('.')).toLowerCase()
      return allowed.includes(f.type) || allowedExt.includes(ext)
    })
    setFiles(filtered)
  }

  function updateField(e) {
    const { name, value } = e.target
    setFields(prev => ({ ...prev, [name]: value }))
  }

  function validateStep(s) {
    const stepFields = [
      ['companyName','contactPerson','email','country','phone'],
      ['projectType','materialType','requiredTolerance','estimatedQuantity','deliveryDate'],
      []
    ]
    const need = stepFields[s]
    const e = {}
    need.forEach(k => {
      if (k !== 'phone' && !fields[k]) e[k] = 'Required'
    })
    if (s===0 && fields.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) e.email = 'Invalid email'
    if (s===1) {
      const q = parseInt(fields.estimatedQuantity,10)
      if (isNaN(q) || q<1) e.estimatedQuantity = 'Must be ≥ 1'
    }
    setErrors(e)
    return Object.keys(e).length===0
  }

  function next() {
    if (validateStep(step)) setStep(step+1)
  }
  function back() {
    setErrors({})
    setStep(Math.max(0, step-1))
  }

  async function onSubmit(ev) {
    ev.preventDefault()
    setStatus(null)
    if (!validateStep(2)) return
    const form = new FormData()
    Object.entries(fields).forEach(([k,v]) => form.append(k, v))
    files.forEach(f => form.append('files', f))
    try {
      const res = await fetch(`${API_BASE}/api/rfq`, { method: 'POST', body: form })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        setStatus({ ok: false, message: data?.errors ? 'Validation failed' : 'Submission failed' })
        return
      }
      setStatus({ ok: true, message: 'Submitted successfully. We will be in touch.' })
      setFields({
        companyName: '', contactPerson: '', email: '', phone: '', country: '',
        projectType: '', materialType: '', requiredTolerance: '', estimatedQuantity: '', deliveryDate: '',
        additionalNotes: ''
      })
      setFiles([])
      setStep(0)
    } catch (e) {
      setStatus({ ok: false, message: 'Network error' })
    }
  }

  return (
    <div className="bg-[#0b1a2a] min-h-screen py-24">
      <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-2 gap-16">
        <div>
          <SectionTitle>Contact & RFQ</SectionTitle>
          <p className="mt-6 text-lg text-gray-300 leading-relaxed">
            Ready to start your project? Fill out the form to request a quote. 
            Our engineering team will review your specifications and provide DFM feedback along with pricing.
          </p>
          
          <div className="mt-12 space-y-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)]">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Visit Us</h3>
                <p className="text-gray-400 mt-1">123 Precision Way<br/>Tech Valley, CA 94000</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)]">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Email Us</h3>
                <p className="text-gray-400 mt-1">contact@injecttools.com<br/>sales@injecttools.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)]">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Call Us</h3>
                <p className="text-gray-400 mt-1">+1 (555) 012-3456<br/>Mon-Fri, 8am - 5pm PST</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#0c1218] p-8 rounded-2xl border border-white/10 shadow-2xl">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white">Request a Quote</h2>
            <div className="mt-4 flex items-center gap-2">
              <div className={`h-2 flex-1 rounded-full ${step >= 0 ? 'bg-[var(--accent)]' : 'bg-white/10'}`}></div>
              <div className={`h-2 flex-1 rounded-full ${step >= 1 ? 'bg-[var(--accent)]' : 'bg-white/10'}`}></div>
              <div className={`h-2 flex-1 rounded-full ${step >= 2 ? 'bg-[var(--accent)]' : 'bg-white/10'}`}></div>
            </div>
            <p className="text-right text-sm text-gray-400 mt-2">Step {step + 1} of 3</p>
          </div>

          <form onSubmit={onSubmit} className="space-y-6">
            {step===0 && (
              <div className="space-y-5 animate-fade-in">
                <div className="grid grid-cols-2 gap-5">
                  <div><Label htmlFor="companyName">Company <span className="text-[var(--accent)]">*</span></Label><input id="companyName" name="companyName" value={fields.companyName} onChange={updateField} className={`mt-2 w-full rounded border px-3 py-2 bg-black/30 text-white ${errors.companyName?'border-red-500':'border-white/10 focus:border-[var(--accent)]'}`} /></div>
                  <div><Label htmlFor="contactPerson">Contact <span className="text-[var(--accent)]">*</span></Label><input id="contactPerson" name="contactPerson" value={fields.contactPerson} onChange={updateField} className={`mt-2 w-full rounded border px-3 py-2 bg-black/30 text-white ${errors.contactPerson?'border-red-500':'border-white/10 focus:border-[var(--accent)]'}`} /></div>
                </div>
                <div><Label htmlFor="email">Email <span className="text-[var(--accent)]">*</span></Label><input id="email" name="email" type="email" value={fields.email} onChange={updateField} className={`mt-2 w-full rounded border px-3 py-2 bg-black/30 text-white ${errors.email?'border-red-500':'border-white/10 focus:border-[var(--accent)]'}`} /></div>
                <div className="grid grid-cols-2 gap-5">
                  <div><Label htmlFor="phone">Phone</Label><input id="phone" name="phone" type="tel" value={fields.phone} onChange={updateField} className="mt-2 w-full rounded border border-white/10 bg-black/30 text-white px-3 py-2 focus:border-[var(--accent)]" /></div>
                  <div><Label htmlFor="country">Country <span className="text-[var(--accent)]">*</span></Label><input id="country" name="country" value={fields.country} onChange={updateField} className={`mt-2 w-full rounded border px-3 py-2 bg-black/30 text-white ${errors.country?'border-red-500':'border-white/10 focus:border-[var(--accent)]'}`} /></div>
                </div>
              </div>
            )}
            {step===1 && (
              <div className="space-y-5 animate-fade-in">
                <div>
                  <Label htmlFor="projectType">Project Type <span className="text-[var(--accent)]">*</span></Label>
                  <select id="projectType" name="projectType" value={fields.projectType} onChange={updateField} className={`mt-2 w-full rounded border px-3 py-2 bg-black/30 text-white ${errors.projectType?'border-red-500':'border-white/10 focus:border-[var(--accent)]'}`}>
                    <option value="">Select...</option>
                    <option value="Mold Manufacturing">Mold Manufacturing</option>
                    <option value="CNC Components">CNC Components</option>
                    <option value="Tool Design">Tool Design</option>
                    <option value="Custom Manufacturing">Custom Manufacturing</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-5">
                  <div><Label htmlFor="materialType">Material <span className="text-[var(--accent)]">*</span></Label><input id="materialType" name="materialType" value={fields.materialType} onChange={updateField} className={`mt-2 w-full rounded border px-3 py-2 bg-black/30 text-white ${errors.materialType?'border-red-500':'border-white/10 focus:border-[var(--accent)]'}`} /></div>
                  <div><Label htmlFor="requiredTolerance">Tolerance <span className="text-[var(--accent)]">*</span></Label><input id="requiredTolerance" name="requiredTolerance" value={fields.requiredTolerance} onChange={updateField} className={`mt-2 w-full rounded border px-3 py-2 bg-black/30 text-white ${errors.requiredTolerance?'border-red-500':'border-white/10 focus:border-[var(--accent)]'}`} /></div>
                </div>
                <div className="grid grid-cols-2 gap-5">
                  <div><Label htmlFor="estimatedQuantity">Quantity <span className="text-[var(--accent)]">*</span></Label><input id="estimatedQuantity" name="estimatedQuantity" type="number" min="1" value={fields.estimatedQuantity} onChange={updateField} className={`mt-2 w-full rounded border px-3 py-2 bg-black/30 text-white ${errors.estimatedQuantity?'border-red-500':'border-white/10 focus:border-[var(--accent)]'}`} /></div>
                  <div><Label htmlFor="deliveryDate">Delivery <span className="text-[var(--accent)]">*</span></Label><input id="deliveryDate" name="deliveryDate" type="date" value={fields.deliveryDate} onChange={updateField} className={`mt-2 w-full rounded border px-3 py-2 bg-black/30 text-white ${errors.deliveryDate?'border-red-500':'border-white/10 focus:border-[var(--accent)]'}`} /></div>
                </div>
              </div>
            )}
            {step===2 && (
              <div className="space-y-5 animate-fade-in">
                <div><Label htmlFor="additionalNotes">Project Description / Notes</Label><textarea id="additionalNotes" name="additionalNotes" rows="4" value={fields.additionalNotes} onChange={updateField} className="mt-2 w-full rounded border border-white/10 bg-black/30 text-white px-3 py-2 focus:border-[var(--accent)]" /></div>
                <div className="p-4 border border-dashed border-white/20 rounded-lg bg-white/5">
                  <Label htmlFor="files">Upload Drawings (PDF, STEP, STL, DWG)</Label>
                  <input id="files" type="file" onChange={onFilesChange} multiple className="mt-2 block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-[var(--accent)] file:text-black hover:file:opacity-90 cursor-pointer" />
                  <p className="mt-2 text-xs text-gray-500">Max file size: 10MB per file.</p>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              {step > 0 ? (
                <button type="button" onClick={back} className="px-6 py-2 rounded border border-white/20 text-white hover:bg-white/10 transition">Back</button>
              ) : <div></div>}
              
              {step < 2 ? (
                <button type="button" onClick={next} className="px-8 py-3 rounded font-bold bg-[var(--accent)] text-[#0b0f14] hover:bg-white transition transform hover:-translate-y-1 shadow-lg">Next Step</button>
              ) : (
                <button type="submit" className="px-8 py-3 rounded font-bold bg-[var(--accent)] text-[#0b0f14] hover:bg-white transition transform hover:-translate-y-1 shadow-lg">Submit Request</button>
              )}
            </div>
          </form>

          {Object.keys(errors).length > 0 && (
            <div className="mt-6 text-red-400 bg-red-900/20 border border-red-900/50 rounded p-4 flex items-center gap-3">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              Please complete all required fields.
            </div>
          )}
          {status && (
            <div className={`mt-6 rounded p-4 border flex items-center gap-3 ${status.ok ? 'text-green-400 bg-green-900/20 border-green-900/50' : 'text-red-400 bg-red-900/20 border-red-900/50'}`}>
              {status.message}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
