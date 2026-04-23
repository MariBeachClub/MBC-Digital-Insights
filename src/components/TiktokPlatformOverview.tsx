import React from 'react';
import { tiktokKpis, tiktokTopVideos, tiktokAdsCampaigns } from '../utils/mockData';
import { Video, Heart, Share2, TrendingUp, Sparkles, UserPlus, PlayCircle, Flame } from 'lucide-react';

export function TiktokPlatformOverview() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pt-6 border-t border-[#EAE3D9]">
        <div>
          <h2 className="text-2xl font-serif font-bold text-[#3E1510] flex items-center">
            TikTok Performance
          </h2>
          <p className="text-sm text-[#A88C87] font-medium mt-1">Short-form video reach, virality, and Spark Ads.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Organic Video Performance */}
        <div className="lg:col-span-2 space-y-6">
          {/* Summary KPIs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white border border-[#EAE3D9] rounded-xl p-4">
              <div className="flex items-center space-x-2 text-[#A88C87] mb-2">
                <PlayCircle className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Total Views</span>
              </div>
              <p className="text-xl font-bold text-[#3E1510]">{(tiktokKpis.videoViews / 1000000).toFixed(2)}<span className="text-sm text-[#A88C87]">M</span></p>
            </div>
            <div className="bg-[#EBF4ED] border border-[#D5E6D9] rounded-xl p-4">
              <div className="flex items-center space-x-2 text-[#2E6B3B] mb-2">
                <TrendingUp className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Engagement</span>
              </div>
              <p className="text-xl font-bold text-[#14421E]">{tiktokKpis.engagementRate}%</p>
            </div>
            <div className="bg-white border border-[#EAE3D9] rounded-xl p-4">
              <div className="flex items-center space-x-2 text-[#A88C87] mb-2">
                <Share2 className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Shares</span>
              </div>
              <p className="text-xl font-bold text-[#3E1510]">{(tiktokKpis.shares / 1000).toFixed(1)}<span className="text-sm text-[#A88C87]">k</span></p>
            </div>
            <div className="bg-white border border-[#EAE3D9] rounded-xl p-4">
              <div className="flex items-center space-x-2 text-[#A88C87] mb-2">
                <UserPlus className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-wider">New Followers</span>
              </div>
              <p className="text-xl font-bold text-[#3E1510]">+{tiktokKpis.followerGrowth}</p>
            </div>
          </div>

          {/* Top Videos Table */}
          <div className="bg-white border border-[#EAE3D9] rounded-2xl overflow-hidden shadow-sm">
            <div className="px-6 py-4 border-b border-[#EAE3D9] bg-[#FDF8F3] flex justify-between items-center">
              <h3 className="font-serif font-bold text-[#3E1510] text-lg">Top Performing Videos</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-[10px] uppercase tracking-wider text-[#A88C87] bg-white border-b border-[#EAE3D9]">
                  <tr>
                    <th className="px-6 py-4 font-bold">Video Title</th>
                    <th className="px-6 py-4 font-bold text-right">Views</th>
                    <th className="px-6 py-4 font-bold text-right">Likes</th>
                    <th className="px-6 py-4 font-bold text-right">Shares</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EAE3D9]">
                  {tiktokTopVideos.map((video) => (
                    <tr key={video.id} className="hover:bg-[#F9F7F4] transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          {video.trend === 'viral' && <Flame className="w-4 h-4 text-[#A43927] mr-2" />}
                          {video.trend !== 'viral' && <Video className="w-4 h-4 text-[#A88C87] mr-2" />}
                          <span className={`${video.trend === 'viral' ? 'font-bold text-[#7A2B20]' : 'font-medium text-[#5C4541]'}`}>
                            {video.title}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right text-[#3E1510] font-bold">{(video.views / 1000).toFixed(0)}k</td>
                      <td className="px-6 py-4 text-right text-[#5C4541]">{(video.likes / 1000).toFixed(1)}k</td>
                      <td className="px-6 py-4 text-right text-[#5C4541]">{(video.shares / 1000).toFixed(1)}k</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column: Ads & Insights */}
        <div className="space-y-6">
          
          {/* AI Insight Dedicated Box */}
          <div className="bg-[#FDF8F3] border border-[#DDA77B]/40 rounded-2xl p-6 shadow-sm relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-10">
               <Video className="w-24 h-24 text-[#DDA77B]" />
             </div>
             
             <div className="relative z-10">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 rounded-full bg-[#DDA77B]/20 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-[#A43927]" />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#7A2B20]">AI Analysis</span>
                </div>
                
                <h4 className="font-serif font-bold text-lg text-[#3E1510] mb-2 leading-tight">
                  High virality driven by the "POV" format
                </h4>
                <p className="text-[#5C4541] text-sm leading-relaxed mb-4">
                  The <span className="font-semibold italic">POV: You booked a VIP Daybed</span> video alone accounted for 66% of all shares. TikTok's algorithm heavily rewarded the aspirational first-person perspective.
                </p>
                <div className="mt-4 pt-4 border-t border-[#DDA77B]/20">
                  <p className="text-[#A43927] text-xs font-bold">
                    Recommendation: Create a "POV: Sunset Cocktails" iteration and immediately boost it via Spark Ads while the visual format is trending.
                  </p>
                </div>
             </div>
          </div>

          {/* TikTok Ads Summary */}
          <div className="bg-white border border-[#EAE3D9] rounded-2xl p-6 shadow-sm">
            <div className="flex items-center space-x-2 mb-6">
              <TrendingUp className="w-5 h-5 text-[#3E1510]" />
              <h3 className="font-serif font-bold text-[#3E1510] text-lg">Active Spark Ads</h3>
            </div>
            
            <div className="space-y-4">
              {tiktokAdsCampaigns.map((ad) => (
                <div key={ad.id} className="p-3 bg-[#F9F7F4] rounded-lg border border-[#EAE3D9]/50">
                  <p className="text-sm font-bold text-[#3E1510] mb-2 truncate" title={ad.name}>{ad.name}</p>
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <p className="text-[10px] text-[#A88C87] uppercase">Spend</p>
                      <p className="text-xs font-bold text-[#7A2B20]">{(ad.spend / 1000000).toFixed(1)}M</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-[#A88C87] uppercase">Conv.</p>
                      <p className="text-xs font-bold text-[#3E1510]">{ad.conversions}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-[#A88C87] uppercase">ROAS</p>
                      <p className="text-xs font-bold text-[#2E6B3B]">{ad.roas}x</p>
                    </div>
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
