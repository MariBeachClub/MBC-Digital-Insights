import React from 'react';
import { ga4Kpis, ga4TopPages, ga4TrafficSources } from '../utils/mockData';
import { Globe, Users, Clock, MousePointer2, Sparkles, TrendingUp, TrendingDown, Minus, PieChart as PieChartIcon } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from 'recharts';

export function Ga4PlatformOverview() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pt-6 border-t border-[#EAE3D9]">
        <div>
          <h2 className="text-2xl font-serif font-bold text-[#3E1510] flex items-center">
            Website Performance (GA4)
          </h2>
          <p className="text-sm text-[#A88C87] font-medium mt-1">Traffic, user engagement, and acquisition on maribeachclub.com</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Traffic & Top Pages */}
        <div className="lg:col-span-2 space-y-6">
          {/* GA4 Summary KPIs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white border border-[#EAE3D9] rounded-xl p-4">
              <div className="flex items-center space-x-2 text-[#A88C87] mb-2">
                <Globe className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Sessions</span>
              </div>
              <p className="text-xl font-bold text-[#3E1510]">{ga4Kpis.sessions.toLocaleString()}</p>
            </div>
            <div className="bg-white border border-[#EAE3D9] rounded-xl p-4">
              <div className="flex items-center space-x-2 text-[#A88C87] mb-2">
                <Users className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Total Users</span>
              </div>
              <p className="text-xl font-bold text-[#3E1510]">{ga4Kpis.users.toLocaleString()}</p>
            </div>
            <div className="bg-white border border-[#EAE3D9] rounded-xl p-4">
              <div className="flex items-center space-x-2 text-[#A88C87] mb-2">
                <MousePointer2 className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Bounce Rate</span>
              </div>
              <p className="text-xl font-bold text-[#3E1510]">{ga4Kpis.bounceRate}%</p>
            </div>
            <div className="bg-[#FDF8F3] border border-[#F5E1C8] rounded-xl p-4">
              <div className="flex items-center space-x-2 text-[#A46A38] mb-2">
                <Clock className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Avg Session</span>
              </div>
              <p className="text-xl font-bold text-[#5D221A]">{ga4Kpis.avgSessionDuration}</p>
            </div>
          </div>

          {/* Top Pages Table */}
          <div className="bg-white border border-[#EAE3D9] rounded-2xl overflow-hidden shadow-sm">
            <div className="px-6 py-4 border-b border-[#EAE3D9] bg-[#FDF8F3] flex justify-between items-center">
              <h3 className="font-serif font-bold text-[#3E1510] text-lg">Top Performing Pages</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-[10px] uppercase tracking-wider text-[#A88C87] bg-white border-b border-[#EAE3D9]">
                  <tr>
                    <th className="px-6 py-4 font-bold">Page Path</th>
                    <th className="px-6 py-4 font-bold text-right">Pageviews</th>
                    <th className="px-6 py-4 font-bold text-right">Avg. Time on Page</th>
                    <th className="px-6 py-4 font-bold text-center">Trend</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EAE3D9]">
                  {ga4TopPages.map((page) => (
                    <tr key={page.id} className="hover:bg-[#F9F7F4] transition-colors">
                      <td className="px-6 py-4">
                        <p className="font-semibold text-[#5C4541]">{page.name}</p>
                        <p className="text-[11px] text-[#A88C87] font-mono mt-0.5">{page.path}</p>
                      </td>
                      <td className="px-6 py-4 text-right text-[#3E1510] font-medium">{page.views.toLocaleString()}</td>
                      <td className="px-6 py-4 text-right text-[#5C4541] font-mono text-xs">{page.avgTime}</td>
                      <td className="px-6 py-4 text-center">
                        {page.trend === 'up' && <TrendingUp className="w-4 h-4 text-[#2E6B3B] mx-auto" />}
                        {page.trend === 'down' && <TrendingDown className="w-4 h-4 text-[#A43927] mx-auto" />}
                        {page.trend === 'neutral' && <Minus className="w-4 h-4 text-[#A88C87] mx-auto" />}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column: Acquisition & Insights */}
        <div className="space-y-6">
          
          {/* AI Insight Dedicated Box */}
          <div className="bg-[#EBF4ED] border border-[#D5E6D9] rounded-2xl p-6 shadow-sm relative overflow-hidden">
             {/* Decorative element */}
             <div className="absolute top-0 right-0 p-4 opacity-10">
               <Globe className="w-24 h-24 text-[#2E6B3B]" />
             </div>
             
             <div className="relative z-10">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 rounded-full bg-[#D5E6D9] flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-[#2E6B3B]" />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#14421E]">AI Analysis</span>
                </div>
                
                <h4 className="font-serif font-bold text-lg text-[#14421E] mb-2 leading-tight">
                  VIP Daybed intent is exceptionally high
                </h4>
                <p className="text-[#2E6B3B] text-sm leading-relaxed mb-4">
                  Visitors spending time on the <span className="font-semibold">/vip-daybeds</span> page are averaging <span className="font-bold underline">03:15</span> per session. This is 140% higher than the site average, showing strong read-through rates.
                </p>
                <div className="mt-4 pt-4 border-t border-[#D5E6D9]">
                  <p className="text-[#14421E] text-xs font-bold">
                    Recommendation: Add an immediate "Chat with Concierge" auto-popup on this specific URL to capture high-intent leads faster.
                  </p>
                </div>
             </div>
          </div>

          {/* Traffic Sources Chart */}
          <div className="bg-white border border-[#EAE3D9] rounded-2xl p-6 shadow-sm flex flex-col h-[320px]">
            <div className="flex items-center space-x-2 mb-4">
              <PieChartIcon className="w-5 h-5 text-[#3E1510]" />
              <h3 className="font-serif font-bold text-[#3E1510] text-lg">Traffic by Source</h3>
            </div>
            
            <div className="flex-1 w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={ga4TrafficSources}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="users"
                    stroke="none"
                  >
                    {ga4TrafficSources.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip 
                    formatter={(value: number) => [`${value.toLocaleString()} Users`, 'Traffic']}
                    contentStyle={{ borderRadius: '8px', border: '1px solid #EAE3D9', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                </PieChart>
              </ResponsiveContainer>
              {/* Custom Legend to match aesthetic */}
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                <div className="text-center">
                  <p className="text-2xl font-bold text-[#3E1510]">{Math.round((ga4Kpis.users / 1000))}k</p>
                  <p className="text-[10px] font-bold text-[#A88C87] uppercase tracking-widest">Users</p>
                </div>
              </div>
            </div>

            <div className="mt-2 grid grid-cols-2 gap-2">
               {ga4TrafficSources.map((source, idx) => (
                 <div key={idx} className="flex items-center text-[11px] font-semibold text-[#5C4541]">
                   <div className="w-2.5 h-2.5 rounded-full mr-2" style={{ backgroundColor: source.color }}></div>
                   <span className="truncate">{source.name}</span>
                 </div>
               ))}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
