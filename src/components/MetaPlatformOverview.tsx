import React from 'react';
import { metaAdsCampaigns, metaOrganicPosts } from '../utils/mockData';
import { Facebook, Instagram, MousePointerClick, TrendingUp, Sparkles, ArrowUpRight, Target, Users } from 'lucide-react';

export function MetaPlatformOverview() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-serif font-bold text-[#3E1510] flex items-center">
            Meta Ecosystem Breakdown
          </h2>
          <p className="text-sm text-[#A88C87] font-medium mt-1">Ads & Organic performance across Facebook and Instagram</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Ads Performance */}
        <div className="lg:col-span-2 space-y-6">
          {/* Ads Summary KPIs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white border border-[#EAE3D9] rounded-xl p-4">
              <div className="flex items-center space-x-2 text-[#A88C87] mb-2">
                <Facebook className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Ad Spend</span>
              </div>
              <p className="text-xl font-bold text-[#3E1510]">IDR 18.2<span className="text-sm text-[#A88C87]">M</span></p>
            </div>
            <div className="bg-white border border-[#EAE3D9] rounded-xl p-4">
              <div className="flex items-center space-x-2 text-[#A88C87] mb-2">
                <Target className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Conversions</span>
              </div>
              <p className="text-xl font-bold text-[#3E1510]">83</p>
            </div>
            <div className="bg-white border border-[#EAE3D9] rounded-xl p-4">
              <div className="flex items-center space-x-2 text-[#A88C87] mb-2">
                <MousePointerClick className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Avg CPC</span>
              </div>
              <p className="text-xl font-bold text-[#3E1510]">IDR 2.1<span className="text-sm text-[#A88C87]">k</span></p>
            </div>
            <div className="bg-[#EBF4ED] border border-[#D5E6D9] rounded-xl p-4">
              <div className="flex items-center space-x-2 text-[#2E6B3B] mb-2">
                <TrendingUp className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Ad ROAS</span>
              </div>
              <p className="text-xl font-bold text-[#14421E]">4.2x</p>
            </div>
          </div>

          {/* Campaign Table */}
          <div className="bg-white border border-[#EAE3D9] rounded-2xl overflow-hidden shadow-sm">
            <div className="px-6 py-4 border-b border-[#EAE3D9] bg-[#FDF8F3] flex justify-between items-center">
              <h3 className="font-serif font-bold text-[#3E1510] text-lg">Top Performing Campaigns</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-[10px] uppercase tracking-wider text-[#A88C87] bg-white border-b border-[#EAE3D9]">
                  <tr>
                    <th className="px-6 py-4 font-bold">Campaign Name</th>
                    <th className="px-6 py-4 font-bold">Spend</th>
                    <th className="px-6 py-4 font-bold">Conv.</th>
                    <th className="px-6 py-4 font-bold">Cost / Conv</th>
                    <th className="px-6 py-4 font-bold">ROAS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EAE3D9]">
                  {metaAdsCampaigns.map((camp) => (
                    <tr key={camp.id} className="hover:bg-[#F9F7F4] transition-colors">
                      <td className="px-6 py-4 font-medium text-[#5C4541]">
                        <div className="flex items-center">
                          <div className={`w-1.5 h-1.5 rounded-full mr-2 ${camp.status === 'Active' ? 'bg-[#DDA77B]' : 'bg-slate-300'}`}></div>
                          {camp.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-[#7A2B20]">{(camp.spend / 1000000).toFixed(1)}M</td>
                      <td className="px-6 py-4 text-[#3E1510] font-medium">{camp.conversions}</td>
                      <td className="px-6 py-4 text-[#5C4541]">IDR {(camp.costPerConv / 1000).toFixed(1)}k</td>
                      <td className="px-6 py-4 text-[#2E6B3B] font-bold">{camp.roas}x</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column: Organic & Insights */}
        <div className="space-y-6">
          
          {/* AI Insight Dedicated Box */}
          <div className="bg-[#FDF8F3] border border-[#DDA77B]/40 rounded-2xl p-6 shadow-sm relative overflow-hidden">
             {/* Decorative element */}
             <div className="absolute top-0 right-0 p-4 opacity-10">
               <Instagram className="w-24 h-24 text-[#DDA77B]" />
             </div>
             
             <div className="relative z-10">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 rounded-full bg-[#DDA77B]/20 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-[#A43927]" />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#7A2B20]">AI Analysis</span>
                </div>
                
                <h4 className="font-serif font-bold text-lg text-[#3E1510] mb-2 leading-tight">
                  Retargeting is driving 65% of Ad Revenue
                </h4>
                <p className="text-[#5C4541] text-sm leading-relaxed mb-4">
                  The <span className="font-semibold px-1 bg-white rounded border border-[#EAE3D9]">RET_Website_Visitors_30D</span> campaign is drastically outperforming cold targeting with a 7.2x ROAS.
                </p>
                <div className="mt-4 pt-4 border-t border-[#DDA77B]/20">
                  <p className="text-[#A43927] text-xs font-bold flex items-center">
                    <ArrowUpRight className="w-3.5 h-3.5 mr-1" />
                    Recommendation: Shift 20% of budget from Awareness to Retargeting for May.
                  </p>
                </div>
             </div>
          </div>

          {/* Top Organic Posts */}
          <div className="bg-white border border-[#EAE3D9] rounded-2xl p-6 shadow-sm">
            <div className="flex items-center space-x-2 mb-6">
              <Instagram className="w-5 h-5 text-[#3E1510]" />
              <h3 className="font-serif font-bold text-[#3E1510] text-lg">Top Organic Content</h3>
            </div>
            
            <div className="space-y-4">
              {metaOrganicPosts.map((post) => (
                <div key={post.id} className="flex justify-between items-center group cursor-pointer p-2 -mx-2 rounded-lg hover:bg-[#F9F7F4] transition-colors">
                  <div>
                    <p className="text-sm font-semibold text-[#3E1510] group-hover:text-[#7A2B20] transition-colors">{post.title}</p>
                    <p className="text-[11px] text-[#A88C87] uppercase tracking-wider mt-0.5">{post.format}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-[#5C4541] flex items-center justify-end">
                      {post.reach >= 1000 ? (post.reach/1000).toFixed(0) + 'k' : post.reach} <Users className="w-3.5 h-3.5 ml-1.5 text-[#A88C87]" />
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
