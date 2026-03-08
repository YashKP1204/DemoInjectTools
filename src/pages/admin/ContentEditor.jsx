
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Save, Upload } from 'lucide-react'

const sections = [
  { id: 'hero', label: 'Hero' },
  { id: 'about', label: 'About' },
  { id: 'capabilities', label: 'Capabilities' },
  { id: 'industries', label: 'Industries' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'owner', label: 'Owner' },
  { id: 'contact', label: 'Contact' },
]

export default function ContentEditor() {
  const [activeTab, setActiveTab] = useState('hero')
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      heroHeadline: 'Precision Mold & Machining Solutions',
      heroSubhead: 'Engineering-grade tooling and tight-tolerance components.',
      aboutTitle: 'About Inject Tools',
      ownerName: 'James Anderson',
      contactEmail: 'contact@injecttools.com',
    }
  })

  const onSubmit = (data) => {
    console.log('Saved:', data)
    alert('Content saved successfully (Mock)')
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Content Editor</h1>
        <button 
          onClick={handleSubmit(onSubmit)}
          className="bg-[var(--accent)] text-black px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-white transition-colors"
        >
          <Save size={18} />
          Save Changes
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Navigation */}
        <div className="lg:w-64 flex-shrink-0">
          <nav className="bg-[#0c1218] rounded-xl border border-white/10 p-2 space-y-1">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveTab(section.id)}
                className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors
                  ${activeTab === section.id 
                    ? 'bg-[var(--accent)] text-black' 
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                  }`}
              >
                {section.label} Section
              </button>
            ))}
          </nav>
        </div>

        {/* Form Content */}
        <div className="flex-1 bg-[#0c1218] rounded-xl border border-white/10 p-6 lg:p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-3xl">
            
            {activeTab === 'hero' && (
              <div className="space-y-6 animate-fade-in">
                <h2 className="text-xl font-bold text-white mb-4 border-b border-white/10 pb-2">Hero Section</h2>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Headline</label>
                  <input {...register('heroHeadline')} className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:border-[var(--accent)] focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Subheadline</label>
                  <textarea {...register('heroSubhead')} rows={3} className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:border-[var(--accent)] focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Background Image</label>
                  <div className="border-2 border-dashed border-white/10 rounded-lg p-8 text-center hover:border-[var(--accent)]/50 transition-colors cursor-pointer bg-black/20">
                    <Upload className="mx-auto text-gray-500 mb-2" />
                    <span className="text-sm text-gray-400">Click to upload or drag and drop</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'about' && (
              <div className="space-y-6 animate-fade-in">
                <h2 className="text-xl font-bold text-white mb-4 border-b border-white/10 pb-2">About Section</h2>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
                  <input {...register('aboutTitle')} className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:border-[var(--accent)] focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                  <textarea {...register('aboutDesc')} rows={5} className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:border-[var(--accent)] focus:outline-none" />
                </div>
              </div>
            )}
            
            {/* Add other sections similarly as needed */}
            {activeTab === 'owner' && (
              <div className="space-y-6 animate-fade-in">
                <h2 className="text-xl font-bold text-white mb-4 border-b border-white/10 pb-2">Owner Profile</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                    <input {...register('ownerName')} className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:border-[var(--accent)] focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Designation</label>
                    <input {...register('ownerRole')} className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:border-[var(--accent)] focus:outline-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                  <textarea {...register('ownerMessage')} rows={4} className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:border-[var(--accent)] focus:outline-none" />
                </div>
              </div>
            )}

            {activeTab === 'contact' && (
               <div className="space-y-6 animate-fade-in">
                 <h2 className="text-xl font-bold text-white mb-4 border-b border-white/10 pb-2">Contact Info</h2>
                 <div>
                   <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                   <input {...register('contactEmail')} className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:border-[var(--accent)] focus:outline-none" />
                 </div>
                 <div>
                   <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
                   <input {...register('contactPhone')} className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:border-[var(--accent)] focus:outline-none" />
                 </div>
                 <div>
                   <label className="block text-sm font-medium text-gray-300 mb-2">Address</label>
                   <textarea {...register('contactAddress')} rows={3} className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:border-[var(--accent)] focus:outline-none" />
                 </div>
               </div>
            )}

          </form>
        </div>
      </div>
    </div>
  )
}
