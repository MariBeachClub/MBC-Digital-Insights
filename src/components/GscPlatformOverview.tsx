import React from 'react';
import { gscKpis, gscQueries } from '../utils/mockData';
import { Search, MousePointerClick, Eye, Target, Sparkles, TrendingUp, ArrowUpRight } from 'lucide-react';

export function GscPlatformOverview() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pt-6 border-t border-[#EAE3D9]">
        <div>
          <h2 className="text-2xl font-serif font-bold text-[#3E1510] flex items-center">
            Google Search Console
          </h2>
          <p className="text-sm text-[#A88C87] font-medium mt-1">Organic search performance, ranking keywords, and CTR analysis.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Organic Queries & Overview */}
        <div className="lg:col-span-2 space-y-6">
          {/* Summary KPIs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white border border-[#EAE3D9] rounded-xl p-4">
              <div className="flex items-center space-x-2 text-[#A88C87] mb-2">
                <MousePointerClick className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Total Clicks</span>
              </div>
              <p className="text-xl font-bold text-[#3E1510]">{(gscKpis.clicks / 1000).toFixed(1)}<span className="text-sm text-[#A88C87]">k</span></p>
            </div>
            <div className="bg-white border border-[#EAE3D9] rounded-xl p-4">
              <div className="flex items-center space-x-2 text-[#A88C87] mb-2">
                <Eye className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Impressions</span>
              </div>
              <p className="text-xl font-bold text-[#3E1510]">{(gscKpis.impressions / 1000).toFixed(1)}<span className="text-sm text-[#A88C87]">k</span></p>
            </div>
            <div className="bg-[#EBF4ED] border border-[#D5E6D9] rounded-xl p-4">
              <div className="flex items-center space-x-2 text-[#2E6B3B] mb-2">
                <TrendingUp className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Avg. CTR</span>
              </div>
              <p className="text-xl font-bold text-[#14421E]">{gscKpis.avgCtr}%</p>
            </div>
            <div className="bg-white border border-[#EAE3D9] rounded-xl p-4">
              <div className="flex items-center space-x-2 text-[#A88C87] mb-2">
                <Target className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Avg. Position</span>
              </div>
              <p className="text-xl font-bold text-[#3E1510]">{gscKpis.avgPosition}</p>
            </div>
          </div>

          {/* Top Queries Table */}
          <div className="bg-white border border-[#EAE3D9] rounded-2xl overflow-hidden shadow-sm">
            <div className="px-6 py-4 border-b border-[#EAE3D9] bg-[#FDF8F3] flex justify-between items-center">
              <h3 className="font-serif font-bold text-[#3E1510] text-lg">Top Organic Queries</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-[10px] uppercase tracking-wider text-[#A88C87] bg-white border-b border-[#EAE3D9]">
                  <tr>
                    <th className="px-6 py-4 font-bold">Query</th>
                    <th className="px-6 py-4 font-bold text-right">Clicks</th>
                    <th className="px-6 py-4 font-bold text-right">Impressions</th>
                    <th className="px-6 py-4 font-bold text-right">CTR</th>
                    <th className="px-6 py-4 font-bold text-right">Position</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EAE3D9]">
                  {gscQueries.map((item) => (
                    <tr key={item.id} className="hover:bg-[#F9F7F4] transition-colors">
                      <td className="px-6 py-4">
                        <span className="font-medium text-[#5C4541] truncate max-w-[200px] block" title={item.query}>
                          {item.query}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right text-[#3E1510] font-bold">{(item.clicks / 1000).toFixed(1)}k</td>
                      <td className="px-6 py-4 text-right text-[#A88C87]">{(item.impressions / 1000).toFixed(1)}k</td>
                      <td className="px-6 py-4 text-right text-[#2E6B3B] font-bold">{item.ctr}%</td>
                      <td className="px-6 py-4 text-right text-[#5C4541]">
                        <div className="flex items-center justify-end">
                          <span className={`w-2 h-2 rounded-full mr-2 ${item.position <= 3 ? 'bg-[#2E6B3B]' : item.position <= 10 ? 'bg-[#DDA77B]' : 'bg-slate-300'}`}></span>
                          {item.position}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column: AI Insights & Opportunities */}
        <div className="space-y-6">
          
          {/* AI Insight Dedicated Box */}
          <div className="bg-[#FDF8F3] border border-[#DDA77B]/40 rounded-2xl p-6 shadow-sm relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-10">
               <Search className="w-24 h-24 text-[#DDA77B]" />
             </div>
             
             <div className="relative z-10">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 rounded-full bg-[#DDA77B]/20 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-[#A43927]" />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#7A2B20]">AI Analysis</span>
                </div>
                
                <h4 className="font-serif font-bold text-lg text-[#3E1510] mb-2 leading-tight">
                  "Bali Daybeds" is a missed opportunity
                </h4>
                <p className="text-[#5C4541] text-sm leading-relaxed mb-4">
                  A high-intent keyword, <span className="font-semibold italic">"bali daybeds"</span>, generates 22,000 monthly impressions, but we rank on position 8.4 with a low CTR of 3.86%. 
                </p>
                <div className="mt-4 pt-4 border-t border-[#DDA77B]/20">
                  <p className="text-[#A43927] text-xs font-bold">
                    Recommendation: Create a dedicated SEO landing page specifically matching search intent for "Best VIP Daybeds in Bali" to climb into the top 3 and capture this free traffic.
                  </p>
                </div>
             </div>
          </div>

          {/* Quick Stats / Opportunities Widget */}
          <div className="bg-white border border-[#EAE3D9] rounded-2xl p-6 shadow-sm">
            <div className="flex items-center space-x-2 mb-6">
              <ArrowUpRight className="w-5 h-5 text-[#3E1510]" />
              <h3 className="font-serif font-bold text-[#3E1510] text-lg">Growth Targets</h3>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 bg-[#F9F7F4] rounded-lg border border-[#EAE3D9]/50">
                <p className="text-[10px] text-[#A88C87] uppercase font-bold tracking-wider mb-1">Keywords on Page 2</p>
                <p className="text-2xl font-serif font-bold text-[#3E1510]">24</p>
                <p className="text-xs text-[#5C4541] mt-1">Queries ranking pos. 11-20 showing potential.</p>
              </div>
              <div className="p-4 bg-[#F9F7F4] rounded-lg border border-[#EAE3D9]/50">
                <p className="text-[10px] text-[#A88C87] uppercase font-bold tracking-wider mb-1">Brand vs Non-Brand Clicks</p>
                <div className="flex items-center justify-between mt-1">
                  <p className="text-sm font-bold text-[#3E1510]">Brand: 78%</p>
                  <p className="text-sm font-bold text-[#7A2B20]">Non-Brand: 22%</p>
                </div>
                <div className="w-full h-2 bg-[#EAE3D9] rounded-full mt-2 overflow-hidden flex">
                  <div className="h-full bg-[#3E1510] w-[78%]"></div>
                  <div className="h-full bg-[#7A2B20] w-[22%]"></div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
