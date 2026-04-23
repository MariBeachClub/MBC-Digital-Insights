import React from 'react';
import { FileText, Save, Download, Sparkles, Send, Presentation, Loader2, ArrowRight, LayoutTemplate, AlignLeft, RefreshCw } from 'lucide-react';

export function DraftReportView() {
  const [isExporting, setIsExporting] = React.useState(false);
  const [viewMode, setViewMode] = React.useState<'narrative' | 'slide'>('narrative');

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      alert('Draft successfully exported to Google Slides! (Mock Action)');
    }, 2000);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-200px)] min-h-[600px] bg-white rounded-2xl border border-[#EAE3D9] shadow-sm overflow-hidden">
      
      {/* Draft Header */}
      <div className="flex items-center justify-between p-6 border-b border-[#EAE3D9] bg-[#FDF8F3] shrink-0">
        <div>
          <h2 className="text-2xl font-serif font-bold text-[#3E1510] flex items-center">
            <FileText className="w-6 h-6 mr-3 text-[#A43927]" />
            Month-End Narrative Draft
          </h2>
          <p className="text-sm text-[#A88C87] mt-1 font-medium">Review AI-generated insights before finalizing the presentation.</p>
        </div>
        
        <div className="flex space-x-3 items-center">
          {/* Toggle View Mode */}
          <div className="flex items-center bg-[#FDF4E6] border border-[#F5E1C8] rounded-lg p-1 mr-4">
            <button 
              onClick={() => setViewMode('narrative')}
              className={`flex items-center px-3 py-1.5 rounded-md text-sm font-bold transition-colors ${viewMode === 'narrative' ? 'bg-white text-[#5D221A] shadow-sm' : 'text-[#A46A38] hover:text-[#5D221A]'}`}
            >
              <AlignLeft className="w-4 h-4 mr-2" />
              Narrative View
            </button>
            <button 
              onClick={() => setViewMode('slide')}
              className={`flex items-center px-3 py-1.5 rounded-md text-sm font-bold transition-colors ${viewMode === 'slide' ? 'bg-white text-[#5D221A] shadow-sm' : 'text-[#A46A38] hover:text-[#5D221A]'}`}
            >
              <LayoutTemplate className="w-4 h-4 mr-2" />
              Slide Preview
            </button>
          </div>

          <button className="flex items-center px-4 py-2 bg-white border border-[#EAE3D9] rounded-lg text-[#5C4541] font-semibold text-sm hover:bg-[#F9F7F4] transition-colors">
            <Save className="w-4 h-4 mr-2" />
            Save Draft
          </button>
        </div>
      </div>

      {/* Editor Space */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Column: Outline/Slides */}
        <div className="w-[280px] shrink-0 border-r border-[#EAE3D9] bg-[#F9F7F4] overflow-y-auto hidden md:flex flex-col">
          <div className="p-4 border-b border-[#EAE3D9] shrink-0">
            <p className="text-[10px] font-bold text-[#A88C87] uppercase tracking-wider">Slide Outline</p>
          </div>
          <div className="space-y-0.5 py-3 flex-1 overflow-y-auto flex flex-col">
            {[
              { id: 1, title: 'Executive Summary', ai: true, active: true },
              { id: 2, title: 'Revenue Correlation', ai: true, active: false },
              { id: 3, title: 'Meta Ads Breakdown', ai: false, active: false },
              { id: 4, title: 'Website Behavior', ai: true, active: false },
              { id: 5, title: 'Action Items (May)', ai: true, active: false }
            ].map(slide => (
              <div 
                key={slide.id} 
                className={`group px-4 py-3 cursor-pointer transition-colors flex items-center justify-between border-l-4 ${slide.active ? 'bg-white border-[#7A2B20]' : 'border-transparent text-[#5C4541] hover:bg-[#EAE3D9]/40'}`}
              >
                <div className="flex items-center truncate">
                  <span className={`text-sm font-bold truncate pr-2 ${slide.active ? 'text-[#3E1510]' : ''}`}>
                    {slide.id}. {slide.title}
                  </span>
                </div>
                <div className="flex items-center space-x-2 shrink-0">
                  {slide.ai && <Sparkles className="w-3.5 h-3.5 text-[#DDA77B]" />}
                  {slide.active && (
                    <button className="text-[#A46A38] hover:text-[#5D221A] transition-colors opacity-0 group-hover:opacity-100" title="Regenerate Slide">
                      <RefreshCw className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Narrative Editor */}
        <div className="flex-1 overflow-y-auto bg-white custom-scrollbar flex flex-col">
          
          <div className="flex-1 p-12">
            <div className={`max-w-3xl mx-auto space-y-8 ${viewMode === 'slide' ? 'border border-[#EAE3D9] bg-[#FDF8F3] p-12 rounded-xl shadow-inner aspect-[16/9] flex flex-col justify-center' : ''}`}>
              
              <div className="space-y-2">
                 <div className="flex items-center text-[#A43927] mb-2 font-semibold text-sm">
                   <Sparkles className="w-4 h-4 mr-1.5" />
                   AI Generated Content
                 </div>
                 <h1 className="text-4xl font-serif font-bold text-[#3E1510] border-b-2 border-transparent hover:border-[#DDA77B] cursor-text transition-colors w-full focus:outline-none" contentEditable suppressContentEditableWarning>
                   April Performance: Riding the Sunset Wave
                 </h1>
              </div>

              <div className="space-y-6 text-[#5C4541] leading-relaxed">
                 <p className="text-lg focus:outline-none hover:bg-[#F9F7F4] p-2 -mx-2 rounded transition-colors" contentEditable suppressContentEditableWarning>
                   April saw a massive <strong className="text-[#3E1510]">300% spike in digital revenue</strong> during the week of the 14th. This growth wasn't accidental; it was a direct result of our integrated content strategy synchronizing perfectly with our retargeting ad campaigns.
                 </p>

                 <ul className="list-disc pl-5 space-y-3 focus:outline-none hover:bg-[#F9F7F4] p-2 -mx-2 rounded transition-colors" contentEditable suppressContentEditableWarning>
                   <li>
                     <strong>The Catalyst:</strong> The 'Sunset Session' Instagram Reel, which naturally reached 185k organic accounts.
                   </li>
                   <li>
                     <strong>The Conversion:</strong> Our 'RET_Website_Visitors_30D' Meta ad campaign aggressively captured this intent, converting it at an astonishing 7.2x ROAS.
                   </li>
                   <li>
                     <strong>The Destination:</strong> High-intent traffic flooded the VIP Daybed page, heavily suggesting we need a frictionless checkout or rapid-response Concierge feature there for May.
                   </li>
                 </ul>
              </div>
            </div>
          </div>

          {/* AI Prompter & Export (Pinned to bottom of right column) */}
          <div className="shrink-0 p-8 border-t border-[#EAE3D9] bg-white">
             <div className="max-w-3xl mx-auto">
               <label className="text-[11px] font-bold text-[#A88C87] uppercase tracking-wider mb-2 block flex items-center">
                 <Sparkles className="w-3.5 h-3.5 mr-1.5 text-[#DDA77B]" /> 
                 Refine this narrative
               </label>
               {/* Chat-style input box */}
               <div className="flex items-end bg-[#F9F7F4] border border-[#EAE3D9] rounded-2xl p-2 focus-within:ring-2 focus-within:ring-[#DDA77B]/50 transition-all">
                 <textarea 
                   className="flex-1 bg-transparent border-none p-3 text-sm text-[#3E1510] placeholder-[#A88C87] outline-none resize-none min-h-[44px] max-h-[120px]"
                   rows={1}
                   placeholder="e.g., Make it sound more formal and focus heavily on the VIP Daybeds data..."
                 ></textarea>
                 <button className="shrink-0 w-10 h-10 ml-2 rounded-full bg-[#3E1510] text-[#E6DFD6] flex items-center justify-center hover:bg-[#7A2B20] transition-colors shadow-sm">
                   <Send className="w-4 h-4 ml-0.5" />
                 </button>
               </div>

               <div className="mt-6">
                 <button 
                  onClick={handleExport}
                  disabled={isExporting}
                  className="w-full flex items-center justify-center px-6 py-4 bg-[#7A2B20] text-white rounded-xl font-bold text-base shadow-lg hover:bg-[#522019] transition-all disabled:opacity-50 transform hover:-translate-y-0.5"
                 >
                  {isExporting ? <Loader2 className="w-5 h-5 mr-3 animate-spin" /> : <Presentation className="w-5 h-5 mr-3" />}
                  Export entire draft to Google Slides
                 </button>
               </div>
             </div>
          </div>

        </div>

      </div>
    </div>
  );
}
