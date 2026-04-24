import React, { useState } from 'react';
import { FileText, Save, Download, Sparkles, Send, Presentation, Loader2, ArrowRight, LayoutTemplate, AlignLeft, RefreshCw, Copy, Check } from 'lucide-react';

export function DraftReportView() {
  const [isExporting, setIsExporting] = useState(false);
  const [viewMode, setViewMode] = useState<'narrative' | 'slide'>('narrative');
  const [isCopied, setIsCopied] = useState(false);
  const [activeSlide, setActiveSlide] = useState(1);

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      alert('Draft successfully exported to Google Slides! (Mock Action)');
    }, 2000);
  };

  const handleCopy = () => {
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const outlineSlides = [
    { id: 1, title: 'Executive Summary', ai: true },
    { id: 2, title: 'Revenue Correlation', ai: true },
    { id: 3, title: 'Meta Ads Breakdown', ai: false },
    { id: 4, title: 'Website Behavior', ai: true },
    { id: 5, title: 'Action Items (May)', ai: true }
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-200px)] min-h-[700px] bg-white rounded-2xl border border-[#EAE3D9] shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
      
      {/* Draft Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 md:p-8 border-b border-[#EAE3D9] bg-[#FDF8F3] shrink-0 gap-4">
        <div>
          <h2 className="text-2xl lg:text-3xl font-serif font-bold text-[#3E1510] flex items-center tracking-tight">
            <span className="bg-white p-2 rounded-xl shadow-sm border border-[#EAE3D9] mr-4">
              <FileText className="w-6 h-6 text-[#A43927]" />
            </span>
            Month-End Narrative Draft
          </h2>
          <p className="text-sm text-[#A88C87] mt-2 font-medium max-w-xl leading-relaxed">
            Review the AI-synthesized qualitative analysis before finalizing. Content is fully editable.
          </p>
        </div>
        
        <div className="flex space-x-3 items-center w-full sm:w-auto">
          {/* Toggle View Mode */}
          <div className="flex items-center bg-[#EAE3D9]/40 border border-[#EAE3D9] rounded-xl p-1 w-full sm:w-auto">
            <button 
              onClick={() => setViewMode('narrative')}
              className={`flex-1 sm:flex-none flex items-center justify-center px-4 py-2 rounded-lg text-sm font-bold transition-all ${viewMode === 'narrative' ? 'bg-white text-[#3E1510] shadow-sm' : 'text-[#A88C87] hover:text-[#5C4541]'}`}
            >
              <AlignLeft className="w-4 h-4 mr-2" />
              Document
            </button>
            <button 
              onClick={() => setViewMode('slide')}
              className={`flex-1 sm:flex-none flex items-center justify-center px-4 py-2 rounded-lg text-sm font-bold transition-all ${viewMode === 'slide' ? 'bg-white text-[#3E1510] shadow-sm' : 'text-[#A88C87] hover:text-[#5C4541]'}`}
            >
              <LayoutTemplate className="w-4 h-4 mr-2" />
              Slides
            </button>
          </div>
        </div>
      </div>

      {/* Editor Space */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Column: Outline/Slides */}
        <div className="w-[280px] lg:w-[320px] shrink-0 border-r border-[#EAE3D9] bg-[#FDF8F3]/50 overflow-y-auto hidden md:flex flex-col">
          <div className="p-6 border-b border-[#EAE3D9] shrink-0 bg-white/50 backdrop-blur-sm sticky top-0 z-10">
            <p className="text-[11px] font-bold text-[#A88C87] uppercase tracking-widest flex items-center justify-between">
              Report Outline
              <Sparkles className="w-3.5 h-3.5 text-[#DDA77B]" />
            </p>
          </div>
          <div className="space-y-1 py-4 px-2 flex-1 overflow-y-auto custom-scrollbar">
            {outlineSlides.map(slide => (
              <div 
                key={slide.id} 
                onClick={() => setActiveSlide(slide.id)}
                className={`group px-4 py-3 rounded-xl cursor-pointer transition-all flex items-center justify-between ${activeSlide === slide.id ? 'bg-white shadow-sm border border-[#EAE3D9]' : 'border border-transparent text-[#7A2B20] hover:bg-[#F9F7F4]'}`}
              >
                <div className="flex items-center min-w-0 pr-3">
                  <div className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold mr-3 shrink-0 ${activeSlide === slide.id ? 'bg-[#FDF8F3] text-[#A43927]' : 'bg-[#EAE3D9]/50 text-[#A88C87]'}`}>
                    {slide.id}
                  </div>
                  <span className={`text-sm font-semibold truncate ${activeSlide === slide.id ? 'text-[#3E1510]' : 'text-[#7A2B20]'}`}>
                    {slide.title}
                  </span>
                </div>
                <div className="flex items-center space-x-2 shrink-0">
                  {activeSlide === slide.id && slide.ai && (
                    <button className="text-[#A46A38] hover:text-[#A43927] transition-colors p-1.5 rounded-md hover:bg-[#FDF8F3] opacity-0 group-hover:opacity-100" title="Regenerate Section">
                      <RefreshCw className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Narrative Editor */}
        <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col bg-[#F9F7F4]">
          
          {/* Main Paper Area */}
          <div className="flex-1 p-6 md:p-12 lg:p-16 flex justify-center">
            
            <div className={`bg-white shadow-xl shadow-black/[0.03] border border-[#EAE3D9] w-full max-w-[850px] mx-auto rounded-xl transition-all duration-300 ${viewMode === 'slide' ? 'aspect-[16/9] flex flex-col justify-center p-12 md:p-16 lg:p-24' : 'p-10 md:p-16 min-h-full'}`}>
              
              <div className="flex justify-between items-start mb-10 group/header">
                <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-[#FDF8F3] border border-[#F5E1C8] text-[#A43927] font-semibold text-[11px] uppercase tracking-widest">
                  <Sparkles className="w-3 h-3" />
                  <span>AI Drafted Content</span>
                </div>
                {viewMode === 'narrative' && (
                  <button 
                    onClick={handleCopy}
                    className="opacity-0 group-hover/header:opacity-100 transition-opacity flex items-center space-x-2 px-3 py-1.5 rounded-lg text-[#7A2B20] hover:bg-[#FDF8F3] hover:text-[#A43927] text-xs font-bold"
                  >
                    {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{isCopied ? 'Copied' : 'Copy text'}</span>
                  </button>
                )}
              </div>

              {/* Editable Content Space (Changes based on active slide) */}
              <div key={activeSlide} className="space-y-8 outline-none animate-in fade-in slide-in-from-bottom-2 duration-300">
                <h1 
                  className={`font-serif font-bold text-[#3E1510] leading-tight outline-none focus:bg-[#FDF8F3]/50 rounded-lg -ml-4 p-4 transition-colors ${viewMode === 'slide' ? 'text-4xl md:text-5xl lg:text-6xl text-center' : 'text-3xl md:text-4xl'}`} 
                  contentEditable 
                  suppressContentEditableWarning
                >
                  {outlineSlides.find(s => s.id === activeSlide)?.title || 'Draft Content'}
                </h1>

                <div className={`text-[#5C4541] outline-none focus:bg-[#FDF8F3]/50 rounded-lg -ml-4 p-4 transition-colors ${viewMode === 'slide' ? 'text-xl md:text-2xl text-center font-medium opacity-90' : 'text-base md:text-lg leading-relaxed space-y-6 font-serif'}`} contentEditable suppressContentEditableWarning>
                  {activeSlide === 1 && (
                    <>
                      <p>
                        April saw a massive <strong className="text-[#3E1510]">300% spike in digital revenue</strong> during the week of the 14th. This growth wasn't accidental; it was a direct result of our integrated content strategy synchronizing perfectly with our retargeting campaigns.
                      </p>

                      <ul className={`list-disc pl-5 space-y-4 marker:text-[#DDA77B] ${viewMode === 'slide' ? 'text-left inline-block mt-8 text-lg font-sans' : 'font-sans'}`}>
                        <li>
                          <strong className="text-[#3E1510]">The Catalyst:</strong> The 'Sunset Session' TikTok and Instagram Reel format organically reached over 1.4 million combined accounts.
                        </li>
                        <li>
                          <strong className="text-[#3E1510]">The Conversion:</strong> Our 'RET_Website_Visitors_30D' Meta ad campaign captured this intent aggressively, returning an astonishing 7.2x ROAS.
                        </li>
                        <li>
                          <strong className="text-[#3E1510]">The Destination:</strong> High-intent traffic flooded the VIP Daybed page (averaging 3:15 time-on-page), suggesting we need a frictionless Checkout or auto-Concierge chat trigger active there for May.
                        </li>
                      </ul>
                    </>
                  )}
                  {activeSlide === 2 && (
                    <p>There is a strong correlation between our boosted Facebook presence and the surge in high-value VIP daybed bookings on April 14th. Return on Ad Spend (ROAS) hit exceptional levels during this narrow window, indicating highly aligned messaging.</p>
                  )}
                  {activeSlide === 3 && (
                    <p>Meta Ads breakdown is pending data ingestion from the Facebook Marketing API integration. Please switch to the Meta module to review the live campaign status.</p>
                  )}
                  {activeSlide === 4 && (
                    <p>Website bounce rates plummeted on mobile devices during our promotional push. A notable 65% of all converted traffic originated from TikTok, skipping the homepage entirely and landing directly on the booking engine via Linktree.</p>
                  )}
                  {activeSlide === 5 && (
                    <ul className={`list-disc pl-5 space-y-4 marker:text-[#DDA77B] ${viewMode === 'slide' ? 'text-left inline-block mt-8 text-lg font-sans' : 'font-sans'}`}>
                      <li>Double-down on short-form vertical video highlighting the Sunset view.</li>
                      <li>Allocate 20% more budget to the 30-day Retargeting audience.</li>
                      <li>Launch the auto-chat concierge feature on the Daybed reservation page.</li>
                    </ul>
                  )}
                </div>
              </div>

            </div>
          </div>

          {/* AI Prompter & Export Fixed Base */}
          <div className="shrink-0 border-t border-[#EAE3D9] bg-white sticky bottom-0 z-20 shadow-[0_-4px_20px_rgb(0,0,0,0.03)]">
             <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center p-4 md:p-6 gap-6">
               
               {/* Chat-style input box */}
               <div className="flex-1 w-full bg-[#FDF8F3] border border-[#EAE3D9] rounded-2xl p-2 focus-within:ring-2 focus-within:ring-[#DDA77B]/50 transition-all shadow-inner">
                 <div className="flex items-end">
                   <textarea 
                     className="flex-1 bg-transparent border-none p-3 text-sm text-[#3E1510] placeholder-[#A88C87] outline-none resize-none min-h-[44px] max-h-[120px] custom-scrollbar"
                     rows={1}
                     placeholder="Ask AI to refine logic, make it more formal, or summarize differently..."
                   ></textarea>
                   <button className="shrink-0 w-10 h-10 ml-2 rounded-xl bg-[#3E1510] text-[#E6DFD6] flex items-center justify-center hover:bg-[#7A2B20] transition-transform active:scale-95 shadow-sm" title="Send instruction">
                     <Sparkles className="w-4 h-4" />
                   </button>
                 </div>
               </div>

               <div className="w-full md:w-auto shrink-0 flex items-center space-x-3">
                 <button className="hidden md:flex items-center px-4 py-3 bg-white border border-[#EAE3D9] rounded-xl text-[#5C4541] font-bold text-sm hover:bg-[#F9F7F4] transition-colors shadow-sm">
                   <Save className="w-4 h-4 mr-2" />
                   Save
                 </button>
                 <button 
                  onClick={handleExport}
                  disabled={isExporting}
                  className="w-full md:w-auto flex items-center justify-center px-6 py-3.5 bg-[#7A2B20] text-white rounded-xl font-bold text-sm shadow-md shadow-[#7A2B20]/20 hover:bg-[#522019] transition-all disabled:opacity-50 transform hover:-translate-y-0.5"
                 >
                  {isExporting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Presentation className="w-4 h-4 mr-2" />}
                  Export to Slides
                 </button>
               </div>

             </div>
          </div>

        </div>

      </div>
    </div>
  );
}
