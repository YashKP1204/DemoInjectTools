
import React, { useEffect, useState } from 'react'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8080'

export default function RFQs() {
  const [rfqs, setRfqs] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${API_BASE}/api/admin/rfqs`, { credentials: 'include' })
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(data => {
        setRfqs(data)
        setLoading(false)
      })
      .catch(()=> {
        setError('Unauthorized or network error. Please login.')
        setLoading(false)
      })
  }, [])

  async function updateStatus(id, status) {
    try {
      await fetch(`${API_BASE}/api/admin/rfqs/${id}/status`, { 
        method: 'PATCH', 
        headers: { 'Content-Type': 'application/json' }, 
        credentials: 'include', 
        body: JSON.stringify({ status }) 
      })
      setRfqs(rfqs.map(r => r._id===id ? { ...r, status } : r))
    } catch(e) {
      alert('Failed to update status')
    }
  }

  async function remove(id) {
    if(!confirm('Are you sure you want to delete this inquiry?')) return
    try {
      await fetch(`${API_BASE}/api/admin/rfqs/${id}`, { method: 'DELETE', credentials: 'include' })
      setRfqs(rfqs.filter(r => r._id!==id))
    } catch(e) {
      alert('Failed to delete')
    }
  }

  if (loading) return <div className="text-[var(--accent)] text-center py-12">Loading Submissions...</div>
  if (error) return <div className="text-red-400 text-center py-12">{error}</div>

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <h1 className="text-2xl font-bold text-white">RFQ Submissions</h1>
        <div className="text-[var(--accent)] font-bold">{rfqs.length} <span className="text-gray-500 font-normal">Total</span></div>
      </div>

      <div className="bg-[#0c1218] rounded-xl border border-white/10 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 text-gray-400 text-sm uppercase tracking-wider border-b border-white/10">
                <th className="p-6 font-medium">Date</th>
                <th className="p-6 font-medium">Company</th>
                <th className="p-6 font-medium">Contact</th>
                <th className="p-6 font-medium">Project</th>
                <th className="p-6 font-medium">Status</th>
                <th className="p-6 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {rfqs.map(r => (
                <tr key={r._id} className="hover:bg-white/5 transition-colors group">
                  <td className="p-6 text-gray-400 text-sm whitespace-nowrap">
                    {new Date(r.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-6 text-white font-medium">{r.companyName}</td>
                  <td className="p-6">
                    <div className="text-white">{r.contactPerson}</div>
                    <div className="text-gray-500 text-sm">{r.email}</div>
                  </td>
                  <td className="p-6">
                    <div className="text-gray-300">{r.projectType}</div>
                    <div className="text-gray-500 text-sm">{r.estimatedQuantity} units</div>
                  </td>
                  <td className="p-6">
                    <select 
                      value={r.status} 
                      onChange={e=>updateStatus(r._id, e.target.value)} 
                      className={`bg-transparent border border-white/10 rounded px-3 py-1.5 text-sm font-medium focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] outline-none cursor-pointer
                        ${r.status === 'New' ? 'text-blue-400' : ''}
                        ${r.status === 'In Review' ? 'text-yellow-400' : ''}
                        ${r.status === 'Completed' ? 'text-green-400' : ''}
                      `}
                    >
                      <option value="New" className="bg-[#0c1218]">New</option>
                      <option value="In Review" className="bg-[#0c1218]">In Review</option>
                      <option value="Completed" className="bg-[#0c1218]">Completed</option>
                    </select>
                  </td>
                  <td className="p-6 text-right">
                    <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <a href={`${API_BASE}/api/admin/rfqs/${r._id}`} target="_blank" rel="noreferrer" className="text-[var(--accent)] hover:underline text-sm font-medium">View Details</a>
                      <button onClick={()=>remove(r._id)} className="text-red-400 hover:text-red-300 transition text-sm">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
              {rfqs.length === 0 && (
                <tr>
                  <td colSpan="6" className="p-12 text-center text-gray-500">No inquiries found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
