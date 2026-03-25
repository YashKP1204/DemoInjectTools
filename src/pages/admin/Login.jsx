
import React, { useState } from 'react'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8000'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  async function onSubmit(e) {
    e.preventDefault()
    setError('')
    try {
      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password })
      })
      const result = await res.json()
      if (res.ok && result.ok) {
        window.location.href = '/admin/dashboard'
      } else {
        setError(result.error || 'Invalid credentials')
      }
    } catch {
      setError('Network error')
    }
  }

  return (
    <div className="min-h-screen grid place-items-center bg-[#080c10]">
      <div className="w-full max-w-md bg-[#0c1218] p-8 rounded-2xl border border-white/10 shadow-2xl">
        <div className="text-center mb-8">
          <div className="inline-block p-3 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] mb-4">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
          </div>
          <h2 className="text-2xl font-bold text-white">Admin Access</h2>
          <p className="text-gray-400 mt-2">Inject Tools Secure Portal</p>
        </div>
        
        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300">Email Address</label>
            <input 
              type="email" 
              className="mt-2 w-full rounded-lg border border-white/10 bg-black/50 text-white px-4 py-3 focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-colors" 
              value={email} 
              onChange={e=>setEmail(e.target.value)} 
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Password</label>
            <input 
              type="password" 
              className="mt-2 w-full rounded-lg border border-white/10 bg-black/50 text-white px-4 py-3 focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-colors" 
              value={password} 
              onChange={e=>setPassword(e.target.value)} 
              required
            />
          </div>
          
          {error && <div className="text-red-400 text-sm bg-red-900/20 p-3 rounded border border-red-900/50 text-center">{error}</div>}
          
          <button className="w-full py-3 rounded-lg font-bold bg-[var(--accent)] text-[#0b0f14] hover:bg-white transition transform hover:-translate-y-1 shadow-lg">
            Sign In
          </button>
        </form>
        
        <div className="mt-8 text-center">
          <a href="/" className="text-sm text-gray-500 hover:text-gray-300 transition">&larr; Return to Website</a>
        </div>
      </div>
    </div>
  )
}
