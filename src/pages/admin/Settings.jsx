
import React, { useState } from 'react'
import { Save, RefreshCw } from 'lucide-react'

export default function ThemeSettings() {
  const [primaryColor, setPrimaryColor] = useState('#2fb4ff')
  const [secondaryColor, setSecondaryColor] = useState('#0b1a2a')
  const [font, setFont] = useState('Inter')

  const handleSave = () => {
    document.documentElement.style.setProperty('--accent', primaryColor)
    // In a real app, save to backend/localStorage
    alert('Theme updated successfully!')
  }

  const handleReset = () => {
    setPrimaryColor('#2fb4ff')
    setSecondaryColor('#0b1a2a')
    setFont('Inter')
    document.documentElement.style.removeProperty('--accent')
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Theme Settings</h1>
        <div className="flex gap-4">
          <button 
            onClick={handleReset}
            className="text-gray-400 hover:text-white flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 hover:bg-white/5 transition-colors"
          >
            <RefreshCw size={18} />
            Reset Defaults
          </button>
          <button 
            onClick={handleSave}
            className="bg-[var(--accent)] text-black px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-white transition-colors"
          >
            <Save size={18} />
            Apply Changes
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6 bg-[#0c1218] p-8 rounded-xl border border-white/10">
          <h2 className="text-lg font-bold text-white border-b border-white/10 pb-4 mb-6">Color Palette</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Primary Accent Color</label>
              <div className="flex items-center gap-4">
                <input 
                  type="color" 
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="w-12 h-12 rounded-lg border border-white/10 bg-transparent cursor-pointer"
                />
                <span className="text-gray-400 font-mono">{primaryColor}</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Secondary Background</label>
              <div className="flex items-center gap-4">
                <input 
                  type="color" 
                  value={secondaryColor}
                  onChange={(e) => setSecondaryColor(e.target.value)}
                  className="w-12 h-12 rounded-lg border border-white/10 bg-transparent cursor-pointer"
                />
                <span className="text-gray-400 font-mono">{secondaryColor}</span>
              </div>
            </div>
          </div>

          <div className="mt-8 p-6 bg-[#0b1a2a] rounded-lg border border-white/10">
            <h3 className="text-sm font-bold text-gray-400 mb-4 uppercase tracking-wider">Preview</h3>
            <div className="flex gap-4">
              <button 
                className="px-6 py-2 rounded font-bold text-black shadow-lg"
                style={{ backgroundColor: primaryColor }}
              >
                Primary Button
              </button>
              <button 
                className="px-6 py-2 rounded font-bold border text-white hover:bg-white/10"
                style={{ borderColor: primaryColor }}
              >
                Secondary Button
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-6 bg-[#0c1218] p-8 rounded-xl border border-white/10">
          <h2 className="text-lg font-bold text-white border-b border-white/10 pb-4 mb-6">Typography</h2>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Primary Font Family</label>
            <select 
              value={font} 
              onChange={(e) => setFont(e.target.value)}
              className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:border-[var(--accent)] focus:outline-none"
            >
              <option value="Inter">Inter (Default)</option>
              <option value="Roboto">Roboto</option>
              <option value="Open Sans">Open Sans</option>
              <option value="Montserrat">Montserrat</option>
            </select>
          </div>

          <div className="mt-8">
            <h3 className="text-sm font-bold text-gray-400 mb-4 uppercase tracking-wider">Preview Text</h3>
            <div className="space-y-4" style={{ fontFamily: font }}>
              <h1 className="text-4xl font-bold text-white">Heading 1 Display</h1>
              <h2 className="text-2xl font-semibold text-white">Heading 2 Title</h2>
              <p className="text-gray-300 leading-relaxed">
                This is a sample paragraph demonstrating the typography settings. 
                Precision engineering requires clarity in both design and communication.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
