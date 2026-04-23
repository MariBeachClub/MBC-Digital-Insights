import React, { useState } from 'react';
import { Calendar, Filter, Share2, Download, Sparkles, ChevronDown, Check, Menu } from 'lucide-react';

interface HeaderProps {
  onMenuClick?: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [selectedRange, setSelectedRange] = useState('April 2026');

  const dateRanges = [
    { label: 'Today', value: 'Today' },
    { label: 'Yesterday', value: 'Yesterday' },
    { label: 'Last 7 Days', value: 'Last 7 Days' },
    { label: 'Last 30 Days', value: 'Last 30 Days' },
    { label: 'This Month', value: 'April 2026' },
    { label: 'Last Month', value: 'March 2026' },
  ];

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-[#EAE3D9] px-4 md:px-8 py-4 flex items-center justify-between sticky top-0 z-20 font-sans w-full">
      <div className="flex items-center gap-3 shrink-0 flex-1 min-w-0">
        {onMenuClick && (
          <button 
            onClick={onMenuClick}
            className="md:hidden p-2 -ml-2 text-[#3E1510] hover:bg-[#F9F7F4] rounded-lg transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
        )}
        <div className="flex items-center space-x-4 min-w-0">
          <h2 className="text-xl md:text-2xl font-serif font-bold text-[#3E1510] whitespace-nowrap truncate">Executive Dashboard</h2>
          <span className="px-2.5 py-1 rounded-full bg-[#F3EFE9] text-[#7A2B20] text-xs font-semibold border border-[#EAE3D9] hidden lg:flex items-center whitespace-nowrap shrink-0">
            <Sparkles className="w-3 h-3 mr-1.5 shrink-0" />
            AI Analysis Active
          </span>
        </div>
      </div>

      <div className="flex items-center space-x-2 md:space-x-4 shrink-0 flex-none ml-4">
        <div className="hidden xl:flex items-center mr-2 text-[10px] font-bold text-[#A88C87] uppercase tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-[#2E6B3B] mr-2 animate-pulse"></span>
          Last synced: Today at 08:30 AM
        </div>
        {/* Date Filter Dropdown */}
        <div className="relative shrink-0">
          <button 
            onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
            className={`flex items-center bg-white border ${isDatePickerOpen ? 'border-[#DDA77B] ring-1 ring-[#DDA77B]/20' : 'border-[#EAE3D9]'} rounded-lg px-3 py-2 text-sm font-medium text-[#5C4541] cursor-pointer hover:bg-[#F9F7F4] transition-all shadow-sm whitespace-nowrap hidden sm:flex`}
          >
            <Calendar className="w-4 h-4 mr-2 text-[#A88C87] shrink-0" />
            {selectedRange}
            <ChevronDown className={`w-4 h-4 ml-2 text-[#A88C87] transition-transform ${isDatePickerOpen ? 'rotate-180' : ''}`} />
          </button>
          
          {/* Mobile minimal date button */}
          <button 
            onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
            className={`sm:hidden flex items-center justify-center w-10 h-10 bg-white border ${isDatePickerOpen ? 'border-[#DDA77B] ring-1 ring-[#DDA77B]/20' : 'border-[#EAE3D9]'} rounded-lg hover:bg-[#F9F7F4] transition-all shadow-sm shrink-0`}
          >
            <Calendar className="w-4 h-4 text-[#5C4541]" />
          </button>

          {isDatePickerOpen && (
            <>
              {/* Invisible backdrop to dismiss dropdown */}
              <div 
                className="fixed inset-0 z-30" 
                onClick={() => setIsDatePickerOpen(false)}
              ></div>
              
              <div className="absolute top-full right-0 mt-2 w-56 bg-white border border-[#EAE3D9] rounded-xl shadow-lg z-40 overflow-hidden py-2 animate-in fade-in slide-in-from-top-2">
                {dateRanges.map((range) => (
                  <button
                    key={range.label}
                    onClick={() => {
                      setSelectedRange(range.value);
                      setIsDatePickerOpen(false);
                    }}
                    className="w-full text-left px-4 py-2.5 text-sm hover:bg-[#FDF8F3] transition-colors flex items-center justify-between group"
                  >
                    <span className={`${selectedRange === range.value ? 'font-bold text-[#7A2B20]' : 'font-medium text-[#5C4541] group-hover:text-[#3E1510]'}`}>
                      {range.label}
                    </span>
                    {selectedRange === range.value && (
                      <Check className="w-4 h-4 text-[#DDA77B]" />
                    )}
                  </button>
                ))}
                <div className="border-t border-[#EAE3D9] mt-2 pt-2 px-4 pb-1">
                  <p className="text-[10px] uppercase font-bold text-[#A88C87] tracking-wider mb-2">Custom Range</p>
                  <button className="w-full py-2 bg-[#F9F7F4] text-[#7A2B20] text-xs font-bold rounded-lg border border-[#EAE3D9] hover:bg-[#F3EFE9] transition-colors">
                    Select Dates
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Global Filter */}
        <button className="hidden md:flex items-center bg-white border border-[#EAE3D9] rounded-lg px-4 py-2 text-sm font-medium text-[#5C4541] hover:bg-[#F9F7F4] transition-colors shadow-sm whitespace-nowrap shrink-0">
          <Filter className="w-4 h-4 mr-2 text-[#A88C87] shrink-0" />
          Filter
        </button>

        <div className="hidden md:block w-px h-6 bg-[#EAE3D9] mx-1 md:mx-2 shrink-0"></div>

        {/* Actions */}
        <button className="text-[#A88C87] hover:text-[#3E1510] p-1.5 transition-colors shrink-0 hidden sm:block">
          <Share2 className="w-5 h-5 shrink-0" />
        </button>
        <button className="flex items-center bg-[#7A2B20] text-white rounded-lg px-4 py-2 text-sm font-bold hover:bg-[#5D221A] transition-colors shadow-sm whitespace-nowrap shrink-0">
          <Download className="w-4 h-4 sm:mr-2 shrink-0" />
          <span className="hidden sm:inline">Export</span>
        </button>
      </div>
    </header>
  );
}

