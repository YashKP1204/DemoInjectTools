import React, { useEffect, useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Users, FileText, Globe, Activity, Loader2, Image as ImageIcon, Briefcase } from 'lucide-react'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8000'

const chartData = [
  { name: 'Jan', uv: 4000, pv: 2400 },
  { name: 'Feb', uv: 3000, pv: 1398 },
  { name: 'Mar', uv: 2000, pv: 9800 },
  { name: 'Apr', uv: 2780, pv: 3908 },
  { name: 'May', uv: 1890, pv: 4800 },
  { name: 'Jun', uv: 2390, pv: 3800 },
  { name: 'Jul', uv: 3490, pv: 4300 },
]

export default function Overview() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${API_BASE}/api/analytics`, { credentials: 'include' })
      .then(res => res.json())
      .then(res => {
        if (res.success) {
          setStats(res.data)
        }
        setLoading(false)
      })
      .catch(err => {
        console.error('Failed to fetch analytics:', err)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="p-8 text-white flex items-center justify-center min-h-[400px]">
        <div className="flex items-center gap-3 bg-[#0c1218] px-6 py-4 rounded-xl border border-white/10 shadow-2xl">
          <Loader2 className="animate-spin text-[var(--accent)]" />
          <span className="font-medium">Loading dashboard overview...</span>
        </div>
      </div>
    )
  }

  const cards = [
    { 
      title: 'Total Visitors', 
      value: stats?.visitors?.toLocaleString() || '0', 
      icon: Users, 
      change: '+12%', 
      color: 'text-blue-500', 
      bg: 'bg-blue-500/10' 
    },
    { 
      title: 'RFQ Submissions', 
      value: stats?.rfqCount?.toString() || '0', 
      icon: FileText, 
      change: '+24%', 
      color: 'text-purple-500', 
      bg: 'bg-purple-500/10' 
    },
    { 
      title: 'Media Assets', 
      value: stats?.mediaCount?.toString() || '0', 
      icon: ImageIcon, 
      change: '+5%', 
      color: 'text-green-500', 
      bg: 'bg-green-500/10' 
    },
    { 
      title: 'Portfolio Projects', 
      value: stats?.portfolioCount?.toString() || '0', 
      icon: Briefcase, 
      change: '+2', 
      color: 'text-orange-500', 
      bg: 'bg-orange-500/10' 
    },
  ]

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard Overview</h1>
          <p className="text-gray-400 text-sm mt-1">Real-time statistics for Inject Tools.</p>
        </div>
        <div className="text-xs font-medium text-[var(--accent)] bg-[var(--accent)]/10 px-3 py-1.5 rounded-full border border-[var(--accent)]/20 uppercase tracking-wider">
          Live Data
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, index) => {
          const Icon = card.icon
          return (
            <div key={index} className="bg-[#0c1218] p-6 rounded-xl border border-white/10 shadow-lg hover:border-[var(--accent)]/30 transition-all group">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${card.bg} group-hover:scale-110 transition-transform`}>
                  <Icon className={`w-6 h-6 ${card.color}`} />
                </div>
                <span className={`text-sm font-medium ${card.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                  {card.change}
                </span>
              </div>
              <div className="text-3xl font-bold text-white mb-1">{card.value}</div>
              <div className="text-sm text-gray-500 font-medium">{card.title}</div>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[#0c1218] p-6 rounded-xl border border-white/10 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-white">Traffic Overview</h2>
            <select className="bg-black/30 border border-white/10 rounded-lg text-xs text-gray-400 p-1.5 focus:outline-none focus:border-[var(--accent)]">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                <XAxis dataKey="name" stroke="#666" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                <YAxis stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111827', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Line type="monotone" dataKey="pv" stroke="var(--accent, #8884d8)" strokeWidth={3} dot={{ r: 4, fill: '#0c1218', strokeWidth: 2 }} activeDot={{ r: 6, strokeWidth: 0 }} />
                <Line type="monotone" dataKey="uv" stroke="#6366f1" strokeWidth={3} dot={{ r: 4, fill: '#0c1218', strokeWidth: 2 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-[#0c1218] p-6 rounded-xl border border-white/10 shadow-lg flex flex-col">
          <h2 className="text-lg font-bold text-white mb-6">Top Performing Pages</h2>
          <div className="space-y-3 flex-grow">
            {(stats?.topPages || [
              { path: '/', views: '12k', percent: '45%' },
              { path: '/capabilities', views: '8k', percent: '30%' },
              { path: '/portfolio', views: '5k', percent: '15%' },
              { path: '/about', views: '3k', percent: '10%' },
            ]).map((page, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-transparent hover:border-white/10 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[var(--accent)] shadow-[0_0_8px_var(--accent)]"></div>
                  <span className="text-sm font-medium text-gray-300">{page.path}</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-white">{page.views}</div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-tighter">{page.percent || 'N/A'}</div>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-6 w-full py-3 bg-white/5 hover:bg-white/10 text-gray-400 text-sm font-bold rounded-xl border border-white/5 transition-all">
            View All Analytics
          </button>
        </div>
      </div>
    </div>
  )
}
