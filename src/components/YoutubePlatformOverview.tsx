import React from 'react';
import { youtubeKpis, youtubeVideos } from '../utils/mockData';
import { PlaySquare, Clock, Users, Activity, Sparkles, Smartphone, Video } from 'lucide-react';

export function YoutubePlatformOverview() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-serif font-bold text-[#3E1510] flex items-center">
            YouTube Studio
          </h2>
          <p className="text-sm text-[#A88C87] font-medium mt-1">Video performance, subscriber growth, and channel watch time.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[65%_1fr] gap-6">
        
        {/* Left Column: 65% Width */}
        <div className="space-y-6">
          {/* Summary KPIs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-[#EBF4ED] border border-[#D5E6D9] rounded-xl p-4">
              <div className="flex items-center space-x-2 text-[#2E6B3B] mb-2">
                <PlaySquare className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Total Views</span>
              </div>
              <p className="text-xl font-bold text-[#14421E]">{(youtubeKpis.views / 1000).toFixed(1)}<span className="text-sm text-[#2E6B3B]">k</span></p>
            </div>
            <div className="bg-white border border-[#EAE3D9] rounded-xl p-4">
              <div className="flex items-center space-x-2 text-[#A88C87] mb-2">
                <Clock className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Watch Time</span>
              </div>
              <p className="text-xl font-bold text-[#3E1510]">{(youtubeKpis.watchTime / 1000).toFixed(1)}<span className="text-sm text-[#A88C87]">k hrs</span></p>
            </div>
            <div className="bg-white border border-[#EAE3D9] rounded-xl p-4">
              <div className="flex items-center space-x-2 text-[#A88C87] mb-2">
                <Users className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Subscribers</span>
              </div>
              <p className="text-xl font-bold text-[#3E1510]">+{youtubeKpis.subscribers}</p>
            </div>
            <div className="bg-white border border-[#EAE3D9] rounded-xl p-4">
              <div className="flex items-center space-x-2 text-[#A88C87] mb-2">
                <Activity className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Avg Duration</span>
              </div>
              <p className="text-xl font-bold text-[#3E1510]">{youtubeKpis.avgViewDuration}</p>
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
                    <th className="px-6 py-4 font-bold cursor-pointer hover:bg-slate-50">Video Title</th>
                    <th className="px-6 py-4 font-bold cursor-pointer hover:bg-slate-50">Format</th>
                    <th className="px-6 py-4 font-bold text-right cursor-pointer hover:bg-slate-50">Views</th>
                    <th className="px-6 py-4 font-bold text-right cursor-pointer hover:bg-slate-50">Watch Hrs</th>
                    <th className="px-6 py-4 font-bold text-right cursor-pointer hover:bg-slate-50">Engagement</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EAE3D9]">
                  {youtubeVideos.map((video) => (
                    <tr key={video.id} className="hover:bg-[#F9F7F4] transition-colors cursor-pointer">
                      <td className="px-6 py-4">
                        <span className="font-medium text-[#5C4541] truncate max-w-[200px]" title={video.title}>{video.title}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${video.format === 'Shorts' ? 'bg-[#7A2B20]/10 text-[#7A2B20]' : 'bg-[#3E1510]/10 text-[#3E1510]'}`}>
                          {video.format === 'Shorts' ? <Smartphone className="w-3 h-3 mr-1" /> : <Video className="w-3 h-3 mr-1" />}
                          {video.format}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right text-[#3E1510] font-bold">{(video.views / 1000).toFixed(1)}k</td>
                      <td className="px-6 py-4 text-right text-[#5C4541]">{video.watchTime}</td>
                      <td className="px-6 py-4 text-right text-[#2E6B3B] font-bold">{video.engagement}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column: 35% Width */}
        <div className="space-y-6">
          
          {/* AI Insight Dedicated Box (Standardized) */}
          <div className="bg-[#FDF8F3] border border-[#DDA77B]/40 rounded-2xl p-6 shadow-sm relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-10">
               <PlaySquare className="w-24 h-24 text-[#DDA77B]" />
             </div>
             
             <div className="relative z-10">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 rounded-full bg-[#DDA77B]/20 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-[#A43927]" />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#7A2B20]">AI Analysis</span>
                </div>
                
                <h4 className="font-serif font-bold text-lg text-[#3E1510] mb-2 leading-tight">
                  Long-form drives retention, Shorts drive capture.
                </h4>
                <p className="text-[#5C4541] text-sm leading-relaxed mb-4">
                  The <span className="font-semibold italic">Sunset DJ Set</span> accounted for 76% of total watch time, cementing channel authority. However, Shorts generated 85% of the new subscribers.
                </p>
                <div className="mt-4 pt-4 border-t border-[#DDA77B]/20">
                  <p className="text-[#A43927] text-xs font-bold">
                    Recommendation: Clip the most engaged 30-second segments from the "Sunset DJ Set" and syndicate them as Shorts over the next two weeks to maximize sub conversions.
                  </p>
                </div>
             </div>
          </div>

        </div>

      </div>
    </div>
  );
}
