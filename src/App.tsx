import React, { useState, useEffect, useRef } from 'react';
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
import { ConnectorsSetup } from './components/ConnectorsSetup';
import { Settings } from './components/Settings';
import { LayoutDashboard, Share2, Globe, FileText, Video, Search, PlaySquare, Megaphone, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { auth, onAuthStateChanged } from './lib/firebase';
import { Login } from './components/Login';
import { useDateRange } from './contexts/DateContext';
import { useGA4Data, useGSCData, useYouTubeData } from './hooks/useRealData';

function App() {
  type TabType = 'executive' | 'meta' | 'ga4' | 'tiktok' | 'gads' | 'gsc' | 'youtube' | 'draft' | 'connectors' | 'settings';
  const [activeTab, setActiveTab] = useState<TabType>('executive');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  const { overview: ga4Overview } = useGA4Data();
  const { overview: gscOverview } = useGSCData();
  const { overview: youtubeOverview } = useYouTubeData();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Simple placeholder for platforms not fully built out yet
  const PlaceholderView = ({ title, icon: Icon }: { title: string; icon: React.ElementType }) => (
    <div className="flex flex-col items-center justify-center p-20 text-[#A88C87] bg-white border border-[#EAE3D9] rounded-2xl border-dashed">
      <Icon className="w-16 h-16 mb-4 text-[#DDA77B]/50" />
      <h2 className="text-2xl font-serif font-bold text-[#3E1510] mb-2">{title} coming soon</h2>
      <p className="text-center max-w-md text-sm">We are connecting the mock data and layout for this platform structure. It will be added to your checklist!</p>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F9F7F4]">
        <Loader2 className="w-8 h-8 text-[#7A2B20] animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <Login />;
  }

  return (
    <div className="flex min-h-screen bg-[#F9F7F4] font-sans text-[#3E1510]">
      <Sidebar 
        activeTab={activeTab}
        setActiveTab={setActiveTab} 
        isMobileOpen={isMobileSidebarOpen} 
        onCloseMobile={() => setIsMobileSidebarOpen(false)} 
      />
      
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <Header onMenuClick={() => setIsMobileSidebarOpen(true)} />
        
        {/* Removed Tab Navigation Menu as per user request to use Sidebar only */}

        <div className="flex-1 overflow-y-auto layout-content relative">
          <div className="p-4 md:p-8 pb-32">
            <div className="max-w-6xl mx-auto space-y-8">
              
              {/* TAB CONTENT: Executive Overview */}
              {activeTab === 'executive' && (
                <>
                  {/* Top Stat Cards as a single full-width layout */}
                  <div className="bg-white border border-[#EAE3D9] rounded-2xl shadow-sm flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-[#EAE3D9] overflow-hidden">
                    <div className="p-6 flex-1 hover:bg-[#F9F7F4] hover:border-l-4 hover:border-l-[#7A2B20] transition-all duration-200 relative group">
                      <p className="text-[11px] font-bold text-[#A88C87] uppercase tracking-wider mb-2">Total Website Sessions</p>
                      <div className="flex items-end justify-between">
                        <h3 className="text-3xl font-bold tracking-tight text-[#3E1510]">
                          {ga4Overview ? ga4Overview.sessions.toLocaleString() : '-'}
                        </h3>
                        {ga4Overview && (
                           <div className="px-2.5 py-1 bg-[#EBF4ED] text-[#2E6B3B] text-[11px] font-bold rounded uppercase tracking-wider border border-[#D5E6D9]">LIVE</div>
                        )}
                      </div>
                    </div>
                    
                    <div className="p-6 flex-1 hover:bg-[#F9F7F4] hover:border-l-4 hover:border-l-[#DDA77B] transition-all duration-200 relative group">
                      <p className="text-[11px] font-bold text-[#A88C87] uppercase tracking-wider mb-2">Search Impressions</p>
                      <div className="flex items-end justify-between">
                        <h3 className="text-3xl font-bold tracking-tight text-[#3E1510]">
                           {gscOverview ? (gscOverview.impressions >= 1000 ? (gscOverview.impressions / 1000).toFixed(1) : gscOverview.impressions) : '-'}
                           {gscOverview && gscOverview.impressions >= 1000 && <span className="text-xl text-[#A88C87] font-medium">k</span>}
                        </h3>
                        {gscOverview && (
                           <div className="px-2.5 py-1 bg-[#EBF4ED] text-[#2E6B3B] text-[11px] font-bold rounded uppercase tracking-wider border border-[#D5E6D9]">LIVE</div>
                        )}
                      </div>
                    </div>

                    <div className="p-6 flex-1 hover:bg-[#F9F7F4] hover:border-l-4 hover:border-l-[#2E6B3B] transition-all duration-200 relative group">
                      <p className="text-[11px] font-bold text-[#A88C87] uppercase tracking-wider mb-2">YouTube Views</p>
                      <div className="flex items-end justify-between">
                        <h3 className="text-3xl font-bold tracking-tight text-[#3E1510]">
                           {youtubeOverview ? youtubeOverview.views.toLocaleString() : '-'}
                        </h3>
                        {youtubeOverview && (
                           <div className="px-2.5 py-1 bg-[#EBF4ED] text-[#2E6B3B] text-[11px] font-bold rounded uppercase tracking-wider border border-[#D5E6D9]">LIVE</div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Main AI Chart */}
                  <div className="relative">
                    <RevenueChart />
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

            {/* TAB CONTENT: TikTok */}
            {activeTab === 'tiktok' && <TiktokPlatformOverview />}

            {/* TAB CONTENT: Google Ads */}
            {activeTab === 'gads' && <GadsPlatformOverview />}

            {/* TAB CONTENT: Google Search Console */}
            {activeTab === 'gsc' && <GscPlatformOverview />}

            {/* TAB CONTENT: YouTube */}
            {activeTab === 'youtube' && <YoutubePlatformOverview />}

            {/* TAB CONTENT: Connectors Setup */}
            {activeTab === 'connectors' && <ConnectorsSetup />}

            {/* TAB CONTENT: Settings */}
            {activeTab === 'settings' && <Settings />}

          </div>
        </div>
        </div>
        
        {/* Sticky Footer: Draft Report Alert - shown when on Executive tab */}
        {activeTab === 'executive' && (
          <div className="bg-[#4A1A14] border-t-2 border-[#DDA77B]/50 shrink-0 shadow-[0_-10px_40px_rgba(62,21,16,0.15)] relative overflow-hidden">
            {/* Decorative background element */}
            <div className="absolute right-0 top-0 w-64 h-full bg-white opacity-5 transform skew-x-12 translate-x-10 pointer-events-none"></div>
            
            <div className="max-w-6xl mx-auto px-4 sm:px-8 py-4 sm:py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="relative z-10">
                <h3 className="text-lg md:text-xl font-serif font-bold text-white mb-1 flex items-center">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#DDA77B] mr-3 animate-pulse"></span>
                  Month-End Draft Ready for Review
                </h3>
                <p className="text-[#E6DFD6] text-xs md:text-sm font-medium w-full lg:max-w-xl">
                  Intelligence has woven the narrative from the gathered moments of April.
                </p>
              </div>
              <button 
                onClick={() => setActiveTab('draft')}
                className="relative z-10 shrink-0 bg-[#F9F7F4] text-[#3E1510] px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg text-sm font-bold shadow hover:bg-white transition-colors"
                style={{
                  boxShadow: '0 4px 0 #EAE3D9',
                  transform: 'translateY(0)',
                }}
                onMouseDown={(e) => {
                   e.currentTarget.style.boxShadow = '0 0px 0 #EAE3D9';
                   e.currentTarget.style.transform = 'translateY(4px)';
                }}
                onMouseUp={(e) => {
                   e.currentTarget.style.boxShadow = '0 4px 0 #EAE3D9';
                   e.currentTarget.style.transform = 'translateY(0)';
                }}
                onMouseLeave={(e) => {
                   e.currentTarget.style.boxShadow = '0 4px 0 #EAE3D9';
                   e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                Review & Edit Draft
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
