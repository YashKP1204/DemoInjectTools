
import React, { useState } from 'react'
import { Upload, Trash2, Eye, X } from 'lucide-react'

const initialImages = [
  { id: 1, name: 'hero-bg.jpg', url: '/assets/images/hero-bg.jpg', size: '1.2 MB' },
  { id: 2, name: 'cap-machining.jpg', url: '/assets/images/cap-machining.jpg', size: '850 KB' },
  { id: 3, name: 'cap-laser.jpg', url: '/assets/images/cap-laser.jpg', size: '620 KB' },
  { id: 4, name: 'part-1.jpg', url: '/assets/images/part-1.jpg', size: '450 KB' },
  { id: 5, name: 'owner.jpg', url: '/assets/images/owner.jpg', size: '320 KB' },
]

export default function MediaManager() {
  const [images, setImages] = useState(initialImages)
  const [preview, setPreview] = useState(null)

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this image?')) {
      setImages(images.filter(img => img.id !== id))
    }
  }

  const handleUpload = (e) => {
    // Mock upload
    const file = e.target.files[0]
    if (file) {
      const newImage = {
        id: Date.now(),
        name: file.name,
        url: URL.createObjectURL(file),
        size: `${(file.size / 1024).toFixed(0)} KB`
      }
      setImages([newImage, ...images])
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Media Manager</h1>
        <label className="bg-[var(--accent)] text-black px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-white transition-colors cursor-pointer">
          <Upload size={18} />
          Upload New Image
          <input type="file" className="hidden" accept="image/*" onChange={handleUpload} />
        </label>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {images.map((img) => (
          <div key={img.id} className="group relative bg-[#0c1218] rounded-xl border border-white/10 overflow-hidden hover:border-[var(--accent)]/50 transition-all">
            <div className="aspect-square bg-black/50 relative">
              <img src={img.url} alt={img.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                <button 
                  onClick={() => setPreview(img)}
                  className="p-2 bg-white/10 rounded-full hover:bg-[var(--accent)] hover:text-black transition-colors"
                >
                  <Eye size={20} />
                </button>
                <button 
                  onClick={() => handleDelete(img.id)}
                  className="p-2 bg-white/10 rounded-full hover:bg-red-500 hover:text-white transition-colors"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
            <div className="p-3">
              <div className="text-sm font-medium text-white truncate" title={img.name}>{img.name}</div>
              <div className="text-xs text-gray-500 mt-1">{img.size}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Preview */}
      {preview && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm" onClick={() => setPreview(null)}>
          <button className="absolute top-4 right-4 text-white hover:text-red-400">
            <X size={32} />
          </button>
          <img src={preview.url} alt={preview.name} className="max-w-full max-h-[90vh] rounded-lg shadow-2xl" onClick={e => e.stopPropagation()} />
        </div>
      )}
    </div>
  )
}
