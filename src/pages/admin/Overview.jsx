
import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Users, FileText, Globe, Activity } from 'lucide-react'

const data = [
  { name: 'Jan', uv: 4000, pv: 2400, amt: 2400 },
  { name: 'Feb', uv: 3000, pv: 1398, amt: 2210 },
  { name: 'Mar', uv: 2000, pv: 9800, amt: 2290 },
  { name: 'Apr', uv: 2780, pv: 3908, amt: 2000 },
  { name: 'May', uv: 1890, pv: 4800, amt: 2181 },
  { name: 'Jun', uv: 2390, pv: 3800, amt: 2500 },
  { name: 'Jul', uv: 3490, pv: 4300, amt: 2100 },
]

export default function Overview() {
  const cards = [
    { title: 'Total Visitors', value: '12,345', icon: Users, change: '+12%', color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { title: 'Page Views', value: '45,678', icon: Globe, change: '+8%', color: 'text-green-500', bg: 'bg-green-500/10' },
    { title: 'RFQ Submissions', value: '123', icon: FileText, change: '+24%', color: 'text-purple-500', bg: 'bg-purple-500/10' },
    { title: 'Bounce Rate', value: '42%', icon: Activity, change: '-3%', color: 'text-orange-500', bg: 'bg-orange-500/10' },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white mb-6">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, index) => {
          const Icon = card.icon
          return (
            <div key={index} className="bg-[#0c1218] p-6 rounded-xl border border-white/10 shadow-lg hover:border-white/20 transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${card.bg}`}>
                  <Icon className={`w-6 h-6 ${card.color}`} />
                </div>
                <span className={`text-sm font-medium ${card.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                  {card.change}
                </span>
              </div>
              <div className="text-3xl font-bold text-white mb-1">{card.value}</div>
              <div className="text-sm text-gray-500">{card.title}</div>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[#0c1218] p-6 rounded-xl border border-white/10 shadow-lg">
          <h2 className="text-lg font-bold text-white mb-6">Traffic Overview</h2>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="name" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#fff' }}
                  itemStyle={{ color: '#ccc' }}
                />
                <Line type="monotone" dataKey="pv" stroke="#8884d8" strokeWidth={2} activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="uv" stroke="#82ca9d" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-[#0c1218] p-6 rounded-xl border border-white/10 shadow-lg">
          <h2 className="text-lg font-bold text-white mb-6">Top Pages</h2>
          <div className="space-y-4">
            {[
              { path: '/', views: '12k', percent: '45%' },
              { path: '/capabilities', views: '8k', percent: '30%' },
              { path: '/portfolio', views: '5k', percent: '15%' },
              { path: '/about', views: '3k', percent: '10%' },
            ].map((page, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <span className="text-sm font-medium text-gray-300">{page.path}</span>
                <div className="text-right">
                  <div className="text-sm font-bold text-white">{page.views}</div>
                  <div className="text-xs text-gray-500">{page.percent}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
