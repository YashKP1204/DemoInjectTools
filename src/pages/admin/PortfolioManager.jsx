
import React, { useEffect, useState } from 'react'
import { Plus, Pencil, Trash2, X, Save, Loader2, Image as ImageIcon } from 'lucide-react'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8000'

export default function PortfolioManager() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingProject, setEditingProject] = useState(null)
  const [saving, setSaving] = useState(false)
  
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    image: ''
  })

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/portfolio`)
      const data = await res.json()
      if (data.success) {
        setProjects(data.data)
      }
    } catch (err) {
      console.error('Failed to fetch projects:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleOpenModal = (project = null) => {
    if (project) {
      setEditingProject(project)
      setFormData({
        title: project.title,
        category: project.category,
        description: project.description || '',
        image: project.image
      })
    } else {
      setEditingProject(null)
      setFormData({ title: '', category: '', description: '', image: '' })
    }
    setModalOpen(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    
    const url = editingProject 
      ? `${API_BASE}/api/portfolio/${editingProject._id}`
      : `${API_BASE}/api/portfolio`
    
    const method = editingProject ? 'PUT' : 'POST'

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
        credentials: 'include'
      })
      const data = await res.json()
      
      if (data.success) {
        if (editingProject) {
          setProjects(projects.map(p => p._id === editingProject._id ? data.data : p))
        } else {
          setProjects([...projects, data.data])
        }
        setModalOpen(false)
      } else {
        alert(data.message || 'Failed to save')
      }
    } catch (err) {
      console.error('Save failed:', err)
      alert('Network error')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this project?')) return
    
    try {
      const res = await fetch(`${API_BASE}/api/portfolio/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      })
      if (res.ok) {
        setProjects(projects.filter(p => p._id !== id))
      }
    } catch (err) {
      console.error('Delete failed:', err)
    }
  }

  if (loading) return <div className="p-8 text-white flex items-center gap-3"><Loader2 className="animate-spin" /> Loading portfolio...</div>

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Portfolio Management</h1>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-[var(--accent)] text-black px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-white transition-colors"
        >
          <Plus size={18} />
          Add New Project
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div key={project._id} className="bg-[#0c1218] rounded-xl border border-white/10 overflow-hidden flex flex-col">
            <div className="aspect-video relative bg-black/50">
              {project.image ? (
                <img src={project.image.startsWith('http') ? project.image : `${API_BASE}${project.image}`} alt={project.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-600">
                  <ImageIcon size={48} />
                </div>
              )}
            </div>
            <div className="p-4 flex-grow">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-bold text-white">{project.title}</h3>
                <span className="text-[var(--accent)] text-xs font-semibold uppercase tracking-wider bg-[var(--accent)]/10 px-2 py-1 rounded">{project.category}</span>
              </div>
              <p className="text-sm text-gray-400 line-clamp-2 mb-4">{project.description}</p>
              <div className="flex gap-2 mt-auto">
                <button 
                  onClick={() => handleOpenModal(project)}
                  className="flex-1 flex items-center justify-center gap-2 py-2 rounded bg-white/5 text-gray-300 hover:bg-white/10 transition-colors"
                >
                  <Pencil size={16} /> Edit
                </button>
                <button 
                  onClick={() => handleDelete(project._id)}
                  className="p-2 rounded bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0c1218] w-full max-w-lg rounded-2xl border border-white/10 shadow-2xl overflow-hidden animate-fade-in" onClick={e => e.stopPropagation()}>
            <div className="p-6 border-b border-white/10 flex justify-between items-center">
              <h2 className="text-xl font-bold text-white">{editingProject ? 'Edit Project' : 'Add New Project'}</h2>
              <button onClick={() => setModalOpen(false)} className="text-gray-400 hover:text-white"><X size={24} /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Project Title</label>
                <input 
                  type="text" 
                  required
                  className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:border-[var(--accent)] focus:outline-none"
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Category</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. CNC Machining"
                  className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:border-[var(--accent)] focus:outline-none"
                  value={formData.category}
                  onChange={e => setFormData({...formData, category: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Image URL or Path</label>
                <input 
                  type="text" 
                  required
                  placeholder="/uploads/..."
                  className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:border-[var(--accent)] focus:outline-none"
                  value={formData.image}
                  onChange={e => setFormData({...formData, image: e.target.value})}
                />
                <p className="text-xs text-gray-500 mt-1">Tip: Upload in Media Manager first, then copy the URL here.</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Description</label>
                <textarea 
                  rows={3}
                  className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:border-[var(--accent)] focus:outline-none"
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                />
              </div>
              <button 
                type="submit" 
                disabled={saving}
                className="w-full bg-[var(--accent)] text-black py-3 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-white transition-colors disabled:opacity-50"
              >
                {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                {saving ? 'Saving...' : 'Save Project'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
