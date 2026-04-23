import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { RevenueChart } from './components/RevenueChart';
import { MetaPlatformOverview } from './components/MetaPlatformOverview';
import { Ga4PlatformOverview } from './components/Ga4PlatformOverview';
import { DraftReportView } from './components/DraftReportView';
import { TiktokPlatformOverview } from './components/TiktokPlatformOverview';
import { GadsPlatformOverview } from './components/GadsPlatformOverview';
import { GscPlatformOverview } from './components/GscPlatformOverview';
import { YoutubePlatformOverview } from './components/YoutubePlatformOverview';
import { LayoutDashboard, Share2, Globe, FileText, Video, Search, PlaySquare, Megaphone } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState<'executive' | 'meta' | 'ga4' | 'tiktok' | 'gads' | 'gsc' | 'youtube' | 'draft'>('executive');

  // Simple placeholder for platforms not fully built out yet
  const PlaceholderView = ({ title, icon: Icon }: { title: string; icon: React.ElementType }) => (
    <div className="flex flex-col items-center justify-center p-20 text-[#A88C87] bg-white border border-[#EAE3D9] rounded-2xl border-dashed">
      <Icon className="w-16 h-16 mb-4 text-[#DDA77B]/50" />
      <h2 className="text-2xl font-serif font-bold text-[#3E1510] mb-2">{title} coming soon</h2>
      <p className="text-center max-w-md text-sm">We are connecting the mock data and layout for this platform structure. It will be added to your checklist!</p>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-[#F9F7F4] font-sans text-[#3E1510]">
      <Sidebar setActiveTab={setActiveTab} />
      
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <Header />
        
        {/* Tab Navigation Menu */}
        <div className="bg-white border-b border-[#EAE3D9] px-8 pt-4 overflow-x-auto custom-scrollbar">
          <div className="max-w-7xl mx-auto flex space-x-8 min-w-max">
            <button 
              onClick={() => setActiveTab('executive')}
              className={`flex items-center space-x-2 pb-4 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${activeTab === 'executive' ? 'border-[#3E1510] text-[#3E1510]' : 'border-transparent text-[#A88C87] hover:text-[#5C4541]'}`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Executive Overview</span>
            </button>
            <button 
              onClick={() => setActiveTab('meta')}
              className={`flex items-center space-x-2 pb-4 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${activeTab === 'meta' ? 'border-[#3E1510] text-[#3E1510]' : 'border-transparent text-[#A88C87] hover:text-[#5C4541]'}`}
            >
              <Share2 className="w-4 h-4" />
              <span>Meta Ecosystem</span>
            </button>
            <button 
              onClick={() => setActiveTab('ga4')}
              className={`flex items-center space-x-2 pb-4 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${activeTab === 'ga4' ? 'border-[#3E1510] text-[#3E1510]' : 'border-transparent text-[#A88C87] hover:text-[#5C4541]'}`}
            >
              <Globe className="w-4 h-4" />
              <span>Website (GA4)</span>
            </button>
            <button 
              onClick={() => setActiveTab('tiktok')}
              className={`flex items-center space-x-2 pb-4 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${activeTab === 'tiktok' ? 'border-[#3E1510] text-[#3E1510]' : 'border-transparent text-[#A88C87] hover:text-[#5C4541]'}`}
            >
              <Video className="w-4 h-4" />
              <span>TikTok</span>
            </button>
            <button 
              onClick={() => setActiveTab('gads')}
              className={`flex items-center space-x-2 pb-4 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${activeTab === 'gads' ? 'border-[#3E1510] text-[#3E1510]' : 'border-transparent text-[#A88C87] hover:text-[#5C4541]'}`}
            >
              <Megaphone className="w-4 h-4" />
              <span>Google Ads</span>
            </button>
            <button 
              onClick={() => setActiveTab('gsc')}
              className={`flex items-center space-x-2 pb-4 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${activeTab === 'gsc' ? 'border-[#3E1510] text-[#3E1510]' : 'border-transparent text-[#A88C87] hover:text-[#5C4541]'}`}
            >
              <Search className="w-4 h-4" />
              <span>Search Console</span>
            </button>
            <button 
              onClick={() => setActiveTab('youtube')}
              className={`flex items-center space-x-2 pb-4 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${activeTab === 'youtube' ? 'border-[#3E1510] text-[#3E1510]' : 'border-transparent text-[#A88C87] hover:text-[#5C4541]'}`}
            >
              <PlaySquare className="w-4 h-4" />
              <span>YouTube</span>
            </button>
            <div className="border-l border-[#EAE3D9] mx-2 h-6 self-start mt-1"></div>
            <button 
              onClick={() => setActiveTab('draft')}
              className={`flex items-center space-x-2 pb-4 border-b-2 font-bold text-sm transition-colors whitespace-nowrap ${activeTab === 'draft' ? 'border-[#A43927] text-[#A43927]' : 'border-transparent text-[#7A2B20] hover:text-[#A43927]'}`}
            >
              <FileText className="w-4 h-4" />
              <span>Review Draft</span>
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-8 layout-content">
          <div className="max-w-6xl mx-auto space-y-8">
            
            {/* TAB CONTENT: Executive Overview */}
            {activeTab === 'executive' && (
              <>
                {/* Top Stat Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white border border-[#EAE3D9] rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                    <p className="text-[11px] font-bold text-[#A88C87] uppercase tracking-wider mb-2">Total Digital Revenue</p>
                    <div className="flex items-end justify-between">
                      <h3 className="text-3xl font-bold tracking-tight text-[#3E1510]">IDR 169.5<span className="text-xl text-[#A88C87] font-medium">M</span></h3>
                      <div className="px-2.5 py-1 bg-[#EBF4ED] text-[#2E6B3B] text-[11px] font-bold rounded uppercase tracking-wider border border-[#D5E6D9]">+12%</div>
                    </div>
                  </div>
                  
                  <div className="bg-white border border-[#EAE3D9] rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                    <p className="text-[11px] font-bold text-[#A88C87] uppercase tracking-wider mb-2">Total Content Reach</p>
                    <div className="flex items-end justify-between">
                      <h3 className="text-3xl font-bold tracking-tight text-[#3E1510]">545<span className="text-xl text-[#A88C87] font-medium">k</span></h3>
                      <div className="px-2.5 py-1 bg-[#FDF4E6] text-[#A46A38] text-[11px] font-bold rounded uppercase tracking-wider border border-[#F5E1C8]">+340%</div>
                    </div>
                  </div>

                  <div className="bg-white border border-[#EAE3D9] rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                    <p className="text-[11px] font-bold text-[#A88C87] uppercase tracking-wider mb-2">Brand Mentions</p>
                    <div className="flex items-end justify-between">
                      <h3 className="text-3xl font-bold tracking-tight text-[#3E1510]">1,005</h3>
                      <div className="px-2.5 py-1 bg-[#EBF4ED] text-[#2E6B3B] text-[11px] font-bold rounded uppercase tracking-wider border border-[#D5E6D9]">+8%</div>
                    </div>
                  </div>
                </div>

                {/* Main AI Chart */}
                <div className="relative">
                  {/* Note about AI Hover */}
                  <div className="absolute -top-3.5 right-6 bg-[#3E1510] text-[#E6DFD6] text-[11px] uppercase tracking-wide font-bold px-4 py-1.5 rounded shadow-lg z-10 flex items-center animate-bounce border border-[#522019]">
                    ✨ Hover over the peak for AI Analysis
                  </div>
                  
                  <RevenueChart />
                </div>
                
                {/* Draft Report Alert */}
                <div className="bg-gradient-to-r from-[#4A1A14] to-[#7A2B20] rounded-2xl p-7 shadow-lg text-white flex items-center justify-between border border-[#3E1510]/50 relative overflow-hidden">
                  {/* Decorative background element */}
                  <div className="absolute right-0 top-0 w-64 h-full bg-white opacity-5 transform skew-x-12 translate-x-10"></div>
                  
                  <div className="relative z-10">
                    <h3 className="text-xl font-serif font-bold mb-1.5 flex items-center">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#DDA77B] mr-3 animate-pulse"></span>
                      Month-End Draft Ready for Review
                    </h3>
                    <p className="text-[#E6DFD6] text-sm/relaxed max-w-2xl font-light">
                      The AI has generated the narrative analysis based on April's aggregated data across all connected platforms. Review and edit the insights before sending to Management.
                    </p>
                  </div>
                  <button className="relative z-10 bg-[#F9F7F4] text-[#3E1510] px-6 py-3 rounded-lg text-sm font-bold shadow-sm hover:bg-white transition-colors border-b-4 border-[#EAE3D9] active:border-b-0 active:translate-y-1">
                    Review & Edit Draft
                  </button>
                </div>
              </>
            )}

            {/* TAB CONTENT: Meta */}
            {activeTab === 'meta' && (
              <MetaPlatformOverview />
            )}

            {/* TAB CONTENT: GA4 */}
            {activeTab === 'ga4' && (
              <Ga4PlatformOverview />
            )}

            {/* TAB CONTENT: Month-End Draft View */}
            {activeTab === 'draft' && (
              <DraftReportView />
            )}

            {/* TAB CONTENT: Placeholder for incomplete connectors */}
            {activeTab === 'tiktok' && <TiktokPlatformOverview />}
            {activeTab === 'gads' && <GadsPlatformOverview />}
            {activeTab === 'gsc' && <GscPlatformOverview />}
            {activeTab === 'youtube' && <YoutubePlatformOverview />}

          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
