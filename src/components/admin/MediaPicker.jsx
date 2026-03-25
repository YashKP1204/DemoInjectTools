import React, { useEffect, useState } from 'react';
import { X, Search, Loader2, CheckCircle2 } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8000';

export default function MediaPicker({ onSelect, onClose, currentUrl }) {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/media`, { credentials: 'include' });
      const data = await res.json();
      if (data.success) {
        setImages(data.data);
      }
    } catch (err) {
      console.error('Failed to fetch media:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredImages = images.filter(img => 
    img.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4 backdrop-blur-md" onClick={onClose}>
      <div className="bg-[#0b0f14] w-full max-w-4xl max-h-[85vh] rounded-2xl border border-white/10 flex flex-col overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">Media Library</h2>
            <p className="text-xs text-gray-500 mt-1 uppercase tracking-widest">Select an asset to use in your CMS</p>
          </div>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-full transition-all">
            <X size={24} />
          </button>
        </div>

        {/* Search */}
        <div className="p-4 bg-black/20">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input 
              type="text" 
              placeholder="Search images by name..." 
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-black/40 border border-white/5 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white focus:border-[var(--accent)]/50 focus:outline-none transition-all"
            />
          </div>
        </div>

        {/* Grid */}
        <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 text-gray-500 gap-4">
              <Loader2 className="animate-spin" size={32} />
              <p className="font-medium">Syncing with Cloud Storage...</p>
            </div>
          ) : filteredImages.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {filteredImages.map((img) => (
                <div 
                  key={img._id} 
                  onClick={() => onSelect(img.url)}
                  className={`group relative aspect-square rounded-xl overflow-hidden cursor-pointer border-2 transition-all ${
                    currentUrl === img.url ? 'border-[var(--accent)]' : 'border-transparent hover:border-white/20'
                  }`}
                >
                  <img src={img.url} alt={img.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="bg-[var(--accent)] text-black text-[10px] font-bold px-2 py-1 rounded uppercase">Select</span>
                  </div>
                  {currentUrl === img.url && (
                    <div className="absolute top-2 right-2 text-[var(--accent)]">
                      <CheckCircle2 size={20} fill="#000" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-gray-500 italic">
              No matching images found in library.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
