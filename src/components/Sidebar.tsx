import React, { useState } from 'react';
import { Home, BarChart2, PieChart, MessageSquare, FileText, Settings, Navigation, ChevronLeft, ChevronRight, Globe } from 'lucide-react';

interface SidebarProps {
  setActiveTab?: (tab: 'executive' | 'meta' | 'ga4' | 'tiktok' | 'gads' | 'gsc' | 'youtube' | 'draft') => void;
}

export function Sidebar({ setActiveTab }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={`${isCollapsed ? 'w-20' : 'w-64'} transition-all duration-300 bg-[#3E1510] text-[#E6DFD6] flex flex-col min-h-screen relative font-sans shrink-0`}>
      
      {/* Collapse Toggle Button */}
      <button 
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-8 bg-white text-[#3E1510] rounded-full p-1 border border-[#EAE3D9] shadow-md z-[60] hover:bg-[#F9F7F4] transition-colors"
      >
        {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
      </button>

      {/* Branding */}
      <div className={`p-6 border-b border-[#522019] flex items-center ${isCollapsed ? 'justify-center p-4' : 'justify-center'}`}>
        {!isCollapsed ? (
          <div className="flex flex-col items-center w-full">
             <img 
               src="/mari-logo-white.png" 
               alt="Mari Beach Club" 
               className="h-10 w-auto object-contain mb-2"
               onError={(e) => {
                 // Fallback
                 e.currentTarget.style.display = 'none';
                 if (e.currentTarget.nextElementSibling) {
                   (e.currentTarget.nextElementSibling as HTMLElement).style.display = 'block';
                 }
               }}
             />
             <div className="hidden text-center">
                <h1 className="text-white font-serif font-bold text-3xl leading-tight tracking-wide">MARI</h1>
                <p className="text-[10px] text-[#DDA77B] uppercase tracking-widest leading-none mt-1">Beach Club Bali</p>
             </div>
          </div>
        ) : (
          <div className="w-10 h-10 rounded-full bg-[#E6DFD6] flex items-center justify-center shrink-0 shadow-sm mx-auto">
            <h1 className="text-[#3E1510] font-serif font-bold text-xl leading-tight tracking-wide">M</h1>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-6 space-y-2 overflow-hidden">
        <p className={`text-[10px] font-semibold text-[#A88C87] uppercase tracking-widest mb-3 ${isCollapsed ? 'text-center truncate px-0' : 'px-3'}`}>
          {isCollapsed ? 'Dash' : 'Dashboards'}
        </p>
        
        <button onClick={() => setActiveTab && setActiveTab('executive')} className={`w-full flex items-center ${isCollapsed ? 'justify-center px-0 py-3' : 'px-3 py-2.5'} bg-[#522019] text-white rounded-lg group transition-colors`} title="Executive Dashboard">
          <Home className={`w-5 h-5 ${!isCollapsed && 'mr-3'}`} />
          {!isCollapsed && <span className="font-medium text-sm whitespace-nowrap">Executive Dashboard</span>}
        </button>
        
        {/* We map the other sidebar items to the closest connector for demo purposes */}
        <button onClick={() => setActiveTab && setActiveTab('meta')} className={`w-full flex items-center ${isCollapsed ? 'justify-center px-0 py-3' : 'px-3 py-2.5'} hover:bg-[#522019]/50 text-left rounded-lg group transition-colors`} title="Revenue & Meta Ads">
          <BarChart2 className={`w-5 h-5 text-[#A88C87] group-hover:text-[#E6DFD6] ${!isCollapsed && 'mr-3'}`} />
          {!isCollapsed && <span className="font-medium text-sm whitespace-nowrap">Meta Ads & Organic</span>}
        </button>

        <button onClick={() => setActiveTab && setActiveTab('ga4')} className={`w-full flex items-center ${isCollapsed ? 'justify-center px-0 py-3' : 'px-3 py-2.5'} hover:bg-[#522019]/50 text-left rounded-lg group transition-colors`} title="Website & GA4">
          <Globe className={`w-5 h-5 text-[#A88C87] group-hover:text-[#E6DFD6] ${!isCollapsed && 'mr-3'}`} />
          {!isCollapsed && <span className="font-medium text-sm whitespace-nowrap">Website (GA4)</span>}
        </button>

        <button className={`w-full flex items-center ${isCollapsed ? 'justify-center px-0 py-3' : 'px-3 py-2.5'} hover:bg-[#522019]/50 text-left rounded-lg group transition-colors`} title="Brand Mentions">
          <MessageSquare className={`w-5 h-5 text-[#A88C87] group-hover:text-[#E6DFD6] ${!isCollapsed && 'mr-3'}`} />
          {!isCollapsed && <span className="font-medium text-sm whitespace-nowrap">Brand Mentions</span>}
        </button>

        <div className="pt-8 pb-2">
          <p className={`text-[10px] font-semibold text-[#A88C87] uppercase tracking-widest mb-3 ${isCollapsed ? 'text-center truncate px-0' : 'px-3'}`}>
            {isCollapsed ? 'Rep' : 'Reporting'}
          </p>
          <button onClick={() => setActiveTab && setActiveTab('draft')} className={`w-full flex items-center ${isCollapsed ? 'justify-center px-0 py-3' : 'px-3 py-2.5'} hover:bg-[#522019]/50 text-left rounded-lg group transition-colors relative`} title="Month-End Draft">
            <FileText className={`w-5 h-5 text-[#DDA77B] ${!isCollapsed && 'mr-3'}`} />
            {!isCollapsed && <span className="font-medium text-sm text-[#E6DFD6] whitespace-nowrap">Month-End Draft</span>}
            {!isCollapsed && <span className="absolute right-3 w-2 h-2 rounded-full bg-[#DDA77B]"></span>}
            {isCollapsed && <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#DDA77B]"></span>}
          </button>
        </div>
      </nav>

      {/* User / Settings / Credits */}
      <div className={`p-4 border-t border-[#522019] space-y-4 overflow-hidden ${isCollapsed ? 'text-center' : ''}`}>
        <a href="#" className={`flex items-center ${isCollapsed ? 'justify-center px-0' : 'px-3'} py-2 hover:bg-[#522019]/50 rounded-lg transition-colors text-sm text-[#A88C87] hover:text-[#E6DFD6]`} title="Connectors Setup">
          <Settings className={`w-5 h-5 ${!isCollapsed && 'mr-3'}`} />
          {!isCollapsed && <span className="whitespace-nowrap">Connectors Setup</span>}
        </a>
        
        {/* ImmerShift Footer Credit */}
        {!isCollapsed && (
          <div className="px-3 pt-2 text-[10px] text-[#A88C87] border-t border-[#522019]/50 leading-relaxed whitespace-nowrap">
            <p>Powered by <strong className="text-[#DDA77B]">ImmerShift</strong></p>
            <p>Developer: Enos</p>
          </div>
        )}
      </div>
    </div>
  );
}
