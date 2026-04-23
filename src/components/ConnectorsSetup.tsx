import React, { useState } from 'react';
import { Share2, Globe, Video, Megaphone, Search, PlaySquare, Mail, Store, AlertCircle, CheckCircle2, ChevronRight, Activity, Sparkles, Instagram } from 'lucide-react';

const connectorCategories = [
  {
    title: 'Google Ecosystem',
    connectors: [
      { id: 'ga4', name: 'Google Analytics 4', icon: Globe, status: 'connected', lastSync: 'Today at 08:30 AM', desc: 'Website traffic, user behavior, and e-commerce events' },
      { id: 'gsc', name: 'Search Console', icon: Search, status: 'connected', lastSync: 'Yesterday', desc: 'Organic search performance and ranking keywords' },
      { id: 'gads', name: 'Google Ads', icon: Megaphone, status: 'connected', lastSync: '2 hours ago', desc: 'PPC campaigns, conversion tracking, and spend' },
      { id: 'youtube', name: 'YouTube', icon: PlaySquare, status: 'connected', lastSync: 'Today at 08:30 AM', desc: 'Video views, watch time, and subscriber growth' },
      { id: 'gmb', name: 'Google My Business', icon: Store, status: 'pending', lastSync: null, desc: 'Local search presence, profile views, and reviews' },
    ]
  },
  {
    title: 'Paid Social',
    connectors: [
      { id: 'meta_ads', name: 'Meta Ads', icon: Share2, status: 'connected', lastSync: '1 hour ago', desc: 'Facebook and Instagram ad performance and ROAS' },
      { id: 'tiktok_ads', name: 'TikTok Ads', icon: Video, status: 'connected', lastSync: '3 hours ago', desc: 'ByteDance ad network metrics and Conversions' },
    ]
  },
  {
    title: 'Organic Social',
    connectors: [
      { id: 'instagram', name: 'Instagram', icon: Instagram, status: 'not_connected', lastSync: null, desc: 'Feed posts, Reels, and follower growth' },
      { id: 'tiktok_org', name: 'TikTok Organic', icon: Video, status: 'connected', lastSync: 'Today at 08:30 AM', desc: 'Short-form video virality and engagement' },
    ]
  },
  {
    title: 'Email',
    connectors: [
      { id: 'klaviyo', name: 'Klaviyo', icon: Mail, status: 'not_connected', lastSync: null, desc: 'Email campaigns, automation flows, and subscriber lists' },
    ]
  },
  {
    title: 'Custom',
    connectors: [
      { id: 'mari_ai', name: 'Mari AI Concierge', icon: Sparkles, status: 'connected', lastSync: 'Live', desc: 'Chatbot queries, VIP bookings, reservations' },
    ]
  }
];

export function ConnectorsSetup() {
  const [syncing, setSyncing] = useState(false);

  // Count connected
  const allConnectors = connectorCategories.flatMap(c => c.connectors);
  const connectedCount = allConnectors.filter(c => c.status === 'connected').length;
  const totalCount = allConnectors.length;

  const handleSync = () => {
    setSyncing(true);
    setTimeout(() => {
      setSyncing(false);
    }, 2000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12 pt-6">
      {/* Header section with Sync button */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#EAE3D9] pb-6 gap-4">
        <div>
          <h2 className="text-3xl font-serif font-bold text-[#3E1510] flex items-center">
            Connectors Setup
          </h2>
          <p className="text-[#A88C87] mt-2 font-medium max-w-xl">
            Manage your data sources. Connect platforms to automatically sync marketing data into your executive narratives and dashboards.
          </p>
        </div>
        <div className="flex flex-col items-start sm:items-end shrink-0">
          <div className="flex items-center space-x-2 text-sm font-bold text-[#5C4541] mb-3 bg-[#FDF8F3] border border-[#F5E1C8] px-3 py-1.5 rounded-full shadow-sm">
            <Activity className="w-4 h-4 text-[#2E6B3B]" />
            <span>Health: {connectedCount}/{totalCount} Connected</span>
          </div>
          <button 
            onClick={handleSync}
            disabled={syncing}
            className="w-full sm:w-auto px-6 py-2.5 bg-[#3E1510] text-[#E6DFD6] rounded-lg font-bold text-sm shadow hover:bg-[#522019] transition-colors disabled:opacity-50 flex items-center justify-center"
          >
            {syncing ? (
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-[#BD9D98]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            ) : (
              <Activity className="w-4 h-4 mr-2 text-[#BD9D98]" />
            )}
            {syncing ? 'Syncing all...' : 'Sync All Data'}
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className="space-y-10 mt-8">
        {connectorCategories.map((category) => (
          <div key={category.title} className="space-y-4">
            <h3 className="text-xl font-bold font-serif text-[#5C4541] px-2">{category.title}</h3>
            <div className="bg-white border border-[#EAE3D9] rounded-2xl shadow-sm overflow-hidden flex flex-col divide-y divide-[#EAE3D9]">
              {category.connectors.map((connector) => {
                const Icon = connector.icon;
                return (
                  <div key={connector.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[#F9F7F4] transition-colors group">
                    
                    <div className="flex items-start sm:items-center space-x-4">
                      <div className="w-12 h-12 rounded-xl bg-[#FDF8F3] border border-[#F5E1C8] flex items-center justify-center shrink-0 shadow-sm group-hover:bg-white transition-colors">
                        <Icon className="w-6 h-6 text-[#7A2B20]" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2 flex-wrap gap-y-1">
                          <h4 className="font-bold text-[#3E1510] text-base">{connector.name}</h4>
                          {/* Badges */}
                          {connector.status === 'connected' && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-[#EBF4ED] text-[#2E6B3B] uppercase tracking-wider border border-[#D5E6D9]">
                              <CheckCircle2 className="w-3 h-3 mr-1" /> Connected
                            </span>
                          )}
                          {connector.status === 'pending' && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-[#FFF9E6] text-[#B8860B] uppercase tracking-wider border border-[#F5E1C8]">
                              <AlertCircle className="w-3 h-3 mr-1" /> Pending Approval
                            </span>
                          )}
                          {connector.status === 'not_connected' && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-[#F5F5F5] text-[#808080] uppercase tracking-wider border border-[#E0E0E0]">
                              Not Connected
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-[#5C4541] mt-1 lg:pr-4">{connector.desc}</p>
                        
                        {connector.status === 'connected' && connector.lastSync && (
                          <p className="text-xs text-[#A88C87] mt-1.5 font-medium flex items-center">
                            Last synced: {connector.lastSync}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="shrink-0 flex items-center w-full sm:w-auto pl-16 sm:pl-0">
                      {connector.status === 'connected' ? (
                        <button className="w-full sm:w-auto px-4 py-2 bg-white border border-[#EAE3D9] shadow-sm rounded-lg text-[#5C4541] font-bold text-sm hover:bg-[#FDF8F3] hover:text-[#3E1510] transition-colors whitespace-nowrap">
                          Manage
                        </button>
                      ) : (
                        <button className="w-full sm:w-auto flex items-center justify-center px-4 py-2 bg-[#FDF8F3] border border-[#DDA77B] shadow-sm text-[#7A2B20] rounded-lg font-bold text-sm hover:bg-[#F5E1C8] transition-colors whitespace-nowrap">
                          Connect <ChevronRight className="w-4 h-4 ml-1" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
