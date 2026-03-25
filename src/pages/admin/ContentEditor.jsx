
import React, { useEffect, useState } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { Save, Upload, Loader2, RotateCcw, Plus, Trash2, GripVertical, Image as ImageIcon } from 'lucide-react'
import MediaPicker from '../../components/admin/MediaPicker'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8000'

const sections = [
  { id: 'hero', label: 'Hero' },
  { id: 'about', label: 'About' },
  { id: 'capabilities', label: 'Capabilities' },
  { id: 'industries', label: 'Industries' },
  { id: 'portfolioPreview', label: 'Portfolio Preview' },
  { id: 'process', label: 'Process' },
  { id: 'quality', label: 'Quality' },
  { id: 'why', label: 'Why Us' },
  { id: 'owner', label: 'Owner' },
  { id: 'contact', label: 'Contact' },
]

export default function ContentEditor() {
  const [activeTab, setActiveTab] = useState('hero')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [resetting, setResetting] = useState(false)
  const [pickerOpen, setPickerOpen] = useState(false)
  const [currentPickerField, setCurrentPickerField] = useState(null)
  
  const { register, handleSubmit, reset, control, setValue, watch, formState: { errors } } = useForm({
    defaultValues: {
      capabilitiesItems: [],
      industriesItems: [],
      processSteps: [],
      whyItems: []
    }
  })

  const watchedCapabilities = watch("capabilitiesItems")

  const { fields: capFields, append: appendCap, remove: removeCap } = useFieldArray({
    control,
    name: "capabilitiesItems"
  })

  const { fields: industryFields, append: appendIndustry, remove: removeIndustry } = useFieldArray({
    control,
    name: "industriesItems"
  })

  const { fields: processFields, append: appendProcess, remove: removeProcess } = useFieldArray({
    control,
    name: "processSteps"
  })

  const { fields: whyFields, append: appendWhy, remove: removeWhy } = useFieldArray({
    control,
    name: "whyItems"
  })

  const mapDataToForm = (data) => {
    return {
      heroHeadline: data.hero?.heroHeadline || '',
      heroSubhead: data.hero?.heroSubhead || '',
      heroImage: data.hero?.heroImage || '',
      cta: data.hero?.cta || '',
      aboutTitle: data.about?.aboutTitle || '',
      aboutDesc: data.about?.aboutDesc || '',
      aboutImage1: data.about?.aboutImage1 || '',
      aboutImage2: data.about?.aboutImage2 || '',
      capabilitiesTitle: data.capabilities?.title || '',
      capabilitiesSubtitle: data.capabilities?.subtitle || '',
      capabilitiesItems: data.capabilities?.items || [],
      industriesTitle: data.industries?.title || '',
      industriesSubtitle: data.industries?.subtitle || '',
      industriesItems: data.industries?.items || [],
      portfolioPreviewTitle: data.portfolioPreview?.title || '',
      portfolioPreviewSubtitle: data.portfolioPreview?.subtitle || '',
      processTitle: data.process?.title || '',
      processSteps: data.process?.steps || [],
      qualityTitle: data.quality?.title || '',
      qualityDesc: data.quality?.description || '',
      qualityImage: data.quality?.image || '',
      whyTitle: data.why?.title || '',
      whyItems: data.why?.items || [],
      ownerName: data.owner?.ownerName || '',
      ownerRole: data.owner?.ownerRole || '',
      ownerMessage: data.owner?.ownerMessage || '',
      ownerImage: data.owner?.ownerImage || '',
      contactEmail: data.contact?.contactEmail || '',
      contactPhone: data.contact?.contactPhone || '',
      contactAddress: data.contact?.contactAddress || '',
    }
  }

  useEffect(() => {
     setLoading(true)
     fetch(`${API_BASE}/api/content`)
       .then(res => res.json())
       .then(res => {
         if (res.success) {
           reset(mapDataToForm(res.data))
         }
         setLoading(false)
       })
       .catch(err => {
         console.error('Failed to fetch content:', err)
         setLoading(false)
       })
   }, [reset])

  const onResetSection = () => {
    if (!confirm(`Are you sure you want to reset the ${activeTab} section to defaults?`)) return
    
    // Get local defaults for this section
    const sectionDefaults = defaultContent[activeTab]
    if (!sectionDefaults) return

    // Map the defaults into the form structure
    const flatDefaults = mapDataToForm({ [activeTab]: sectionDefaults })
    
    // Only reset the keys belonging to this section
    Object.keys(flatDefaults).forEach(key => {
      if (flatDefaults[key] !== undefined) {
        setValue(key, flatDefaults[key])
      }
    })
    
    alert(`${activeTab} section has been reset locally. Click 'Save Changes' to apply.`)
  }

  const onSubmit = async (data) => {
    setSaving(true)
    try {
      // Structure the data back for the section-based API
      const sectionData = {
        hero: { 
          heroHeadline: data.heroHeadline, 
          heroSubhead: data.heroSubhead,
          heroImage: data.heroImage,
          cta: data.cta
        },
        about: { 
          aboutTitle: data.aboutTitle, 
          aboutDesc: data.aboutDesc,
          aboutImage1: data.aboutImage1,
          aboutImage2: data.aboutImage2
        },
        capabilities: { 
          title: data.capabilitiesTitle, 
          subtitle: data.capabilitiesSubtitle,
          items: data.capabilitiesItems 
        },
        industries: { 
          title: data.industriesTitle, 
          subtitle: data.industriesSubtitle,
          items: data.industriesItems 
        },
        portfolioPreview: { title: data.portfolioPreviewTitle, subtitle: data.portfolioPreviewSubtitle },
        process: { 
          title: data.processTitle,
          steps: data.processSteps
        },
        quality: { 
          title: data.qualityTitle, 
          description: data.qualityDesc,
          image: data.qualityImage 
        },
        why: { 
          title: data.whyTitle,
          items: data.whyItems
        },
        owner: { 
          ownerName: data.ownerName, 
          ownerRole: data.ownerRole, 
          ownerMessage: data.ownerMessage,
          ownerImage: data.ownerImage
        },
        contact: { contactEmail: data.contactEmail, contactPhone: data.contactPhone, contactAddress: data.contactAddress }
      }

      // Update the active section
      const res = await fetch(`${API_BASE}/api/content/${activeTab}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sectionData[activeTab]),
        credentials: 'include'
      })

      if (res.ok) {
        alert('Content updated successfully!')
      } else {
        const err = await res.json()
        alert(`Error: ${err.error || 'Failed to update'}`)
      }
    } catch (err) {
      console.error('Save failed:', err)
      alert('Network error. Check console.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div className="p-8 text-white flex items-center gap-3"><Loader2 className="animate-spin" /> Loading content...</div>

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Content Editor</h1>
        <div className="flex gap-3">
          <button 
            onClick={onResetSection}
            disabled={resetting || saving}
            className="bg-white/5 text-gray-400 px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-red-500/10 hover:text-red-500 transition-all border border-white/10 disabled:opacity-50"
          >
            <RotateCcw size={18} />
            Reset Section
          </button>
          <button 
            onClick={handleSubmit(onSubmit)}
            disabled={saving || resetting}
            className="bg-[var(--accent)] text-black px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-white transition-colors disabled:opacity-50"
          >
            {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
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
                  <label className="block text-sm font-medium text-gray-300 mb-2">CTA Button Text</label>
                  <input {...register('cta')} className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:border-[var(--accent)] focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Background Image</label>
                  <div className="flex gap-4">
                    <div className="w-48 aspect-video bg-black/50 rounded-lg border border-white/10 overflow-hidden relative">
                      {watch('heroImage') ? (
                        <img src={watch('heroImage')} alt="Hero Preview" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-600">No Image</div>
                      )}
                    </div>
                    <div className="flex-1 space-y-3">
                      <input 
                        {...register('heroImage')} 
                        placeholder="Image URL from Media Library"
                        className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-sm text-gray-400 focus:border-[var(--accent)] focus:outline-none" 
                      />
                      <button 
                        type="button"
                        onClick={() => { setCurrentPickerField('heroImage'); setPickerOpen(true); }}
                        className="flex items-center gap-2 text-sm bg-white/5 text-white px-4 py-2 rounded-lg hover:bg-white/10 transition-all font-bold border border-white/10"
                      >
                        <ImageIcon size={18} /> Select from Media Library
                      </button>
                    </div>
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
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div>
                     <label className="block text-sm font-medium text-gray-300 mb-2">Hero Image</label>
                     <div className="flex flex-col gap-3">
                       <div className="w-full aspect-video bg-black/50 rounded-lg border border-white/10 overflow-hidden">
                         {watch('aboutImage1') ? (
                           <img src={watch('aboutImage1')} alt="About Hero" className="w-full h-full object-cover" />
                         ) : (
                           <div className="w-full h-full flex items-center justify-center text-gray-600">No Image</div>
                         )}
                       </div>
                       <button 
                         type="button"
                         onClick={() => { setCurrentPickerField('aboutImage1'); setPickerOpen(true); }}
                         className="flex items-center justify-center gap-2 text-xs bg-white/5 text-white py-2 rounded-lg hover:bg-white/10 transition-all border border-white/10"
                       >
                         <ImageIcon size={14} /> Change Image
                       </button>
                     </div>
                   </div>
                   <div>
                     <label className="block text-sm font-medium text-gray-300 mb-2">Mission Image</label>
                     <div className="flex flex-col gap-3">
                       <div className="w-full aspect-video bg-black/50 rounded-lg border border-white/10 overflow-hidden">
                         {watch('aboutImage2') ? (
                           <img src={watch('aboutImage2')} alt="About Mission" className="w-full h-full object-cover" />
                         ) : (
                           <div className="w-full h-full flex items-center justify-center text-gray-600">No Image</div>
                         )}
                       </div>
                       <button 
                         type="button"
                         onClick={() => { setCurrentPickerField('aboutImage2'); setPickerOpen(true); }}
                         className="flex items-center justify-center gap-2 text-xs bg-white/5 text-white py-2 rounded-lg hover:bg-white/10 transition-all border border-white/10"
                       >
                         <ImageIcon size={14} /> Change Image
                       </button>
                     </div>
                   </div>
                 </div>
               </div>
             )}

            {activeTab === 'capabilities' && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-2">
                  <h2 className="text-xl font-bold text-white">Capabilities Section</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Section Title</label>
                    <input {...register('capabilitiesTitle')} className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:border-[var(--accent)] focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Section Subtitle</label>
                    <input {...register('capabilitiesSubtitle')} className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:border-[var(--accent)] focus:outline-none" />
                  </div>
                </div>

                <div className="mt-8 space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-bold text-white">Capability Items</h3>
                    <button 
                      type="button"
                      onClick={() => appendCap({ title: '', desc: '', points: [] })}
                      className="flex items-center gap-2 text-sm bg-[var(--accent)]/10 text-[var(--accent)] px-3 py-1.5 rounded-lg hover:bg-[var(--accent)] hover:text-black transition-all font-bold"
                    >
                      <Plus size={16} /> Add Item
                    </button>
                  </div>

                  <div className="grid grid-cols-1 gap-6">
                    {capFields.map((field, index) => (
                      <div key={field.id} className="bg-black/40 border border-white/5 rounded-xl p-6 relative group/item">
                        <button 
                          type="button"
                          onClick={() => removeCap(index)}
                          className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition-colors"
                          title="Remove Item"
                        >
                          <Trash2 size={18} />
                        </button>
                        
                        <div className="grid grid-cols-1 gap-4">
                          <div className="flex items-center gap-3">
                            <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-xs font-bold text-gray-500">{index + 1}</span>
                            <div className="flex-1">
                              <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Capability Title</label>
                              <input 
                                {...register(`capabilitiesItems.${index}.title`)} 
                                placeholder="e.g. Precision Mold Manufacturing"
                                className="w-full bg-transparent border-b border-white/10 p-1 text-white focus:border-[var(--accent)] focus:outline-none font-bold" 
                              />
                            </div>
                          </div>
                          
                          <div>
                            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Description</label>
                            <textarea 
                              {...register(`capabilitiesItems.${index}.desc`)} 
                              rows={2}
                              placeholder="Describe the capability..."
                              className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-sm text-gray-300 focus:border-[var(--accent)] focus:outline-none" 
                            />
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Key Points (One per line)</label>
                              <textarea 
                                className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-sm text-gray-300 focus:border-[var(--accent)] focus:outline-none" 
                                placeholder="Multi-Cavity Molds&#10;Hot Runner Systems&#10;..."
                                rows={4}
                                value={watchedCapabilities[index]?.points?.join('\n') || ''}
                                onChange={(e) => {
                                  const val = e.target.value.split('\n');
                                  setValue(`capabilitiesItems.${index}.points`, val);
                                }}
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Feature Image</label>
                              <div className="flex flex-col gap-2">
                                <div className="w-full aspect-video bg-black/50 rounded-lg border border-white/10 overflow-hidden relative">
                                  {watchedCapabilities[index]?.img ? (
                                    <img src={watchedCapabilities[index].img} alt="Cap Preview" className="w-full h-full object-cover" />
                                  ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-600 text-[10px]">No Image</div>
                                  )}
                                </div>
                                <button 
                                  type="button"
                                  onClick={() => { setCurrentPickerField(`capabilitiesItems.${index}.img`); setPickerOpen(true); }}
                                  className="flex items-center justify-center gap-2 text-[10px] bg-white/5 text-white py-1.5 rounded-lg hover:bg-white/10 transition-all border border-white/10"
                                >
                                  <ImageIcon size={12} /> Select Image
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {capFields.length === 0 && (
                      <div className="text-center py-12 bg-black/20 rounded-xl border border-dashed border-white/10">
                        <p className="text-gray-500 italic">No capabilities added yet. Click 'Add Item' to start.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'industries' && (
               <div className="space-y-6 animate-fade-in">
                 <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-2">
                   <h2 className="text-xl font-bold text-white">Industries Section</h2>
                 </div>
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div>
                     <label className="block text-sm font-medium text-gray-300 mb-2">Section Title</label>
                     <input {...register('industriesTitle')} className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:border-[var(--accent)] focus:outline-none" />
                   </div>
                   <div>
                     <label className="block text-sm font-medium text-gray-300 mb-2">Section Subtitle</label>
                     <input {...register('industriesSubtitle')} className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:border-[var(--accent)] focus:outline-none" />
                   </div>
                 </div>

                 <div className="mt-8 space-y-6">
                   <div className="flex justify-between items-center">
                     <h3 className="text-lg font-bold text-white">Industry Items</h3>
                     <button 
                       type="button"
                       onClick={() => appendIndustry({ title: '', desc: '' })}
                       className="flex items-center gap-2 text-sm bg-[var(--accent)]/10 text-[var(--accent)] px-3 py-1.5 rounded-lg hover:bg-[var(--accent)] hover:text-black transition-all font-bold"
                     >
                       <Plus size={16} /> Add Item
                     </button>
                   </div>

                   <div className="grid grid-cols-1 gap-6">
                     {industryFields.map((field, index) => (
                       <div key={field.id} className="bg-black/40 border border-white/5 rounded-xl p-6 relative group/item">
                         <button 
                           type="button"
                           onClick={() => removeIndustry(index)}
                           className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition-colors"
                           title="Remove Item"
                         >
                           <Trash2 size={18} />
                         </button>
                         
                         <div className="grid grid-cols-1 gap-4">
                           <div className="flex items-center gap-3">
                             <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-xs font-bold text-gray-500">{index + 1}</span>
                             <div className="flex-1">
                               <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Industry Title</label>
                               <input 
                                 {...register(`industriesItems.${index}.title`)} 
                                 placeholder="e.g. Medical Devices"
                                 className="w-full bg-transparent border-b border-white/10 p-1 text-white focus:border-[var(--accent)] focus:outline-none font-bold" 
                               />
                             </div>
                           </div>
                           
                           <div>
                             <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Description</label>
                             <textarea 
                               {...register(`industriesItems.${index}.desc`)} 
                               rows={2}
                               placeholder="Describe the industry served..."
                               className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-sm text-gray-300 focus:border-[var(--accent)] focus:outline-none" 
                             />
                           </div>
                         </div>
                       </div>
                     ))}
                     
                     {industryFields.length === 0 && (
                       <div className="text-center py-12 bg-black/20 rounded-xl border border-dashed border-white/10">
                         <p className="text-gray-500 italic">No industries added yet. Click 'Add Item' to start.</p>
                       </div>
                     )}
                   </div>
                 </div>
               </div>
             )}

             {activeTab === 'portfolioPreview' && (
               <div className="space-y-6 animate-fade-in">
                 <h2 className="text-xl font-bold text-white mb-4 border-b border-white/10 pb-2">Portfolio Preview Section</h2>
                 <div>
                   <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
                   <input {...register('portfolioPreviewTitle')} className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:border-[var(--accent)] focus:outline-none" />
                 </div>
                 <div>
                   <label className="block text-sm font-medium text-gray-300 mb-2">Subtitle</label>
                   <textarea {...register('portfolioPreviewSubtitle')} rows={3} className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:border-[var(--accent)] focus:outline-none" />
                 </div>
               </div>
             )}

             {activeTab === 'process' && (
               <div className="space-y-6 animate-fade-in">
                 <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-2">
                   <h2 className="text-xl font-bold text-white">Process Section</h2>
                 </div>
                 <div>
                   <label className="block text-sm font-medium text-gray-300 mb-2">Section Title</label>
                   <input {...register('processTitle')} className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:border-[var(--accent)] focus:outline-none" />
                 </div>

                 <div className="mt-8 space-y-6">
                   <div className="flex justify-between items-center">
                     <h3 className="text-lg font-bold text-white">Process Steps</h3>
                     <button 
                       type="button"
                       onClick={() => appendProcess({ title: '', desc: '' })}
                       className="flex items-center gap-2 text-sm bg-[var(--accent)]/10 text-[var(--accent)] px-3 py-1.5 rounded-lg hover:bg-[var(--accent)] hover:text-black transition-all font-bold"
                     >
                       <Plus size={16} /> Add Step
                     </button>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     {processFields.map((field, index) => (
                       <div key={field.id} className="bg-black/40 border border-white/5 rounded-xl p-6 relative group/item">
                         <button 
                           type="button"
                           onClick={() => removeProcess(index)}
                           className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition-colors"
                         >
                           <Trash2 size={18} />
                         </button>
                         <div className="flex items-center gap-3 mb-4">
                           <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-xs font-bold text-gray-500">{index + 1}</span>
                           <input 
                             {...register(`processSteps.${index}.title`)} 
                             placeholder="Step Title"
                             className="flex-1 bg-transparent border-b border-white/10 p-1 text-white focus:border-[var(--accent)] focus:outline-none font-bold" 
                           />
                         </div>
                         <textarea 
                           {...register(`processSteps.${index}.desc`)} 
                           placeholder="Step Description"
                           rows={2}
                           className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-sm text-gray-300 focus:border-[var(--accent)] focus:outline-none" 
                         />
                       </div>
                     ))}
                   </div>
                 </div>
               </div>
             )}

             {activeTab === 'quality' && (
               <div className="space-y-6 animate-fade-in">
                 <h2 className="text-xl font-bold text-white mb-4 border-b border-white/10 pb-2">Quality & Compliance</h2>
                 <div>
                   <label className="block text-sm font-medium text-gray-300 mb-2">Section Title</label>
                   <input {...register('qualityTitle')} className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:border-[var(--accent)] focus:outline-none" />
                 </div>
                 <div>
                   <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                   <textarea {...register('qualityDesc')} rows={5} className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:border-[var(--accent)] focus:outline-none" />
                 </div>
                 <div>
                   <label className="block text-sm font-medium text-gray-300 mb-2">Featured Image</label>
                   <div className="flex gap-4">
                     <div className="w-48 aspect-video bg-black/50 rounded-lg border border-white/10 overflow-hidden relative">
                       {watch('qualityImage') ? (
                         <img src={watch('qualityImage')} alt="Quality Preview" className="w-full h-full object-cover" />
                       ) : (
                         <div className="w-full h-full flex items-center justify-center text-gray-600">No Image</div>
                       )}
                     </div>
                     <div className="flex-1 space-y-3">
                       <input 
                         {...register('qualityImage')} 
                         placeholder="Image URL from Media Library"
                         className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-sm text-gray-400 focus:border-[var(--accent)] focus:outline-none" 
                       />
                       <button 
                         type="button"
                         onClick={() => { setCurrentPickerField('qualityImage'); setPickerOpen(true); }}
                         className="flex items-center gap-2 text-sm bg-white/5 text-white px-4 py-2 rounded-lg hover:bg-white/10 transition-all font-bold border border-white/10"
                       >
                         <ImageIcon size={18} /> Select from Media Library
                       </button>
                     </div>
                   </div>
                 </div>
               </div>
             )}

             {activeTab === 'why' && (
               <div className="space-y-6 animate-fade-in">
                 <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-2">
                   <h2 className="text-xl font-bold text-white">Why Us Section</h2>
                 </div>
                 <div>
                   <label className="block text-sm font-medium text-gray-300 mb-2">Section Title</label>
                   <input {...register('whyTitle')} className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:border-[var(--accent)] focus:outline-none" />
                 </div>

                 <div className="mt-8 space-y-6">
                   <div className="flex justify-between items-center">
                     <h3 className="text-lg font-bold text-white">Value Props</h3>
                     <button 
                       type="button"
                       onClick={() => appendWhy({ title: '', desc: '' })}
                       className="flex items-center gap-2 text-sm bg-[var(--accent)]/10 text-[var(--accent)] px-3 py-1.5 rounded-lg hover:bg-[var(--accent)] hover:text-black transition-all font-bold"
                     >
                       <Plus size={16} /> Add Item
                     </button>
                   </div>

                   <div className="space-y-4">
                     {whyFields.map((field, index) => (
                       <div key={field.id} className="bg-black/40 border border-white/5 rounded-xl p-6 relative group/item flex gap-6">
                         <div className="flex-1 space-y-4">
                           <input 
                             {...register(`whyItems.${index}.title`)} 
                             placeholder="Item Title"
                             className="w-full bg-transparent border-b border-white/10 p-1 text-white focus:border-[var(--accent)] focus:outline-none font-bold" 
                           />
                           <textarea 
                             {...register(`whyItems.${index}.desc`)} 
                             placeholder="Item Description"
                             rows={2}
                             className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-sm text-gray-300 focus:border-[var(--accent)] focus:outline-none" 
                           />
                         </div>
                         <button 
                           type="button"
                           onClick={() => removeWhy(index)}
                           className="text-gray-500 hover:text-red-500 transition-colors self-start mt-2"
                         >
                           <Trash2 size={18} />
                         </button>
                       </div>
                     ))}
                   </div>
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
                    <label className="block text-sm font-medium text-gray-300 mb-2">Role</label>
                    <input {...register('ownerRole')} className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:border-[var(--accent)] focus:outline-none" />
                  </div>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                    <textarea {...register('ownerMessage')} rows={5} className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:border-[var(--accent)] focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Portrait Image</label>
                    <div className="flex flex-col gap-3">
                      <div className="w-full aspect-[3/4] bg-black/50 rounded-lg border border-white/10 overflow-hidden">
                        {watch('ownerImage') ? (
                          <img src={watch('ownerImage')} alt="Owner" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-600">No Image</div>
                        )}
                      </div>
                      <button 
                        type="button"
                        onClick={() => { setCurrentPickerField('ownerImage'); setPickerOpen(true); }}
                        className="flex items-center justify-center gap-2 text-xs bg-white/5 text-white py-2 rounded-lg hover:bg-white/10 transition-all border border-white/10"
                      >
                        <ImageIcon size={14} /> Select Portrait
                      </button>
                    </div>
                  </div>
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

      {pickerOpen && (
        <MediaPicker 
          currentUrl={watch(currentPickerField)}
          onClose={() => setPickerOpen(false)}
          onSelect={(url) => {
            setValue(currentPickerField, url);
            setPickerOpen(false);
          }}
        />
      )}
    </div>
  )
}
