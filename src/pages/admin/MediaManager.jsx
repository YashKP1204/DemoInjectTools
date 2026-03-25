
import React, { useEffect, useState } from 'react'
import { Upload, Trash2, Eye, X, Loader2, Copy, Check } from 'lucide-react'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8000'

export default function MediaManager() {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState(null)
  const [copiedId, setCopiedId] = useState(null)

  useEffect(() => {
    fetchMedia()
  }, [])

  const fetchMedia = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/media`, { credentials: 'include' })
      const data = await res.json()
      if (data.success) {
        setImages(data.data)
      }
    } catch (err) {
      console.error('Failed to fetch media:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleCopyUrl = (img) => {
    navigator.clipboard.writeText(img.url)
    setCopiedId(img._id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this image?')) {
      try {
        const res = await fetch(`${API_BASE}/api/media/${id}`, {
          method: 'DELETE',
          credentials: 'include'
        })
        if (res.ok) {
          setImages(images.filter(img => img._id !== id))
        }
      } catch (err) {
        console.error('Delete failed:', err)
      }
    }
  }

  const handleUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    setUploading(true)
    const formData = new FormData()
    formData.append('file', file)

    try {
      const res = await fetch(`${API_BASE}/api/media/upload`, {
        method: 'POST',
        body: formData,
        credentials: 'include'
      })
      const data = await res.json()
      if (data.success) {
        setImages([data.data, ...images])
      } else {
        alert(data.message || 'Upload failed')
      }
    } catch (err) {
      console.error('Upload failed:', err)
      alert('Network error during upload')
    } finally {
      setUploading(false)
    }
  }

  if (loading) return <div className="p-8 text-white flex items-center gap-3"><Loader2 className="animate-spin" /> Loading media...</div>

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Media Manager</h1>
        <label className={`bg-[var(--accent)] text-black px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-white transition-colors cursor-pointer ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}>
          {uploading ? <Loader2 size={18} className="animate-spin" /> : <Upload size={18} />}
          {uploading ? 'Uploading...' : 'Upload New Image'}
          <input type="file" className="hidden" accept="image/*" onChange={handleUpload} disabled={uploading} />
        </label>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {images.map((img) => (
          <div key={img._id} className="group relative bg-[#0c1218] rounded-xl border border-white/10 overflow-hidden hover:border-[var(--accent)]/50 transition-all">
            <div className="aspect-square bg-black/50 relative">
              <img src={img.url} alt={img.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button 
                  onClick={() => setPreview(img)}
                  className="p-2 bg-white/10 rounded-full hover:bg-[var(--accent)] hover:text-black transition-colors"
                  title="Preview"
                >
                  <Eye size={18} />
                </button>
                <button 
                  onClick={() => handleCopyUrl(img)}
                  className="p-2 bg-white/10 rounded-full hover:bg-[var(--accent)] hover:text-black transition-colors"
                  title="Copy URL"
                >
                  {copiedId === img._id ? <Check size={18} /> : <Copy size={18} />}
                </button>
                <button 
                  onClick={() => handleDelete(img._id)}
                  className="p-2 bg-white/10 rounded-full hover:bg-red-500 hover:text-white transition-colors"
                  title="Delete"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
            <div className="p-3">
              <div className="text-sm font-medium text-white truncate" title={img.name}>{img.name}</div>
              <div className="text-[10px] text-gray-500 mt-1 uppercase tracking-wider">Cloud Storage</div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Preview */}
      {preview && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm" onClick={() => setPreview(null)}>
          <button className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors">
            <X size={32} />
          </button>
          <div className="relative max-w-5xl w-full flex flex-col items-center gap-4" onClick={e => e.stopPropagation()}>
            <img src={preview.url} alt={preview.name} className="max-w-full max-h-[80vh] rounded-lg shadow-2xl border border-white/10" />
            <div className="bg-[#0c1218] p-4 rounded-xl border border-white/10 w-full max-w-2xl flex items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-500 uppercase font-bold mb-1">Image URL</p>
                <p className="text-sm text-gray-300 truncate">{preview.url}</p>
              </div>
              <button 
                onClick={() => handleCopyUrl(preview)}
                className="bg-[var(--accent)] text-black px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-white transition-colors shrink-0"
              >
                {copiedId === preview._id ? <Check size={18} /> : <Copy size={18} />}
                {copiedId === preview._id ? 'Copied' : 'Copy URL'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
