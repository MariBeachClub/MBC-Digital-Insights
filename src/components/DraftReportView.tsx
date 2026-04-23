import React from 'react';
import { FileText, Save, Download, Sparkles, Send, Presentation, Loader2 } from 'lucide-react';

export function DraftReportView() {
  const [isExporting, setIsExporting] = React.useState(false);

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      alert('Draft successfully exported to Google Slides! (Mock Action)');
    }, 2000);
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl border border-[#EAE3D9] shadow-sm overflow-hidden">
      
      {/* Draft Header */}
      <div className="flex items-center justify-between p-6 border-b border-[#EAE3D9] bg-[#FDF8F3]">
        <div>
          <h2 className="text-2xl font-serif font-bold text-[#3E1510] flex items-center">
            <FileText className="w-6 h-6 mr-3 text-[#A43927]" />
            Month-End Narrative Draft
          </h2>
          <p className="text-sm text-[#A88C87] mt-1 font-medium">Review AI-generated insights before finalizing the presentation.</p>
        </div>
        
        <div className="flex space-x-3">
          <button className="flex items-center px-4 py-2 bg-white border border-[#EAE3D9] rounded-lg text-[#5C4541] font-semibold text-sm hover:bg-[#F9F7F4] transition-colors">
            <Save className="w-4 h-4 mr-2" />
            Save Draft
          </button>
          
          <button 
            onClick={handleExport}
            disabled={isExporting}
            className="flex items-center px-4 py-2 bg-[#7A2B20] text-white rounded-lg font-bold text-sm shadow-md hover:bg-[#522019] transition-colors disabled:opacity-50"
          >
            {isExporting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Presentation className="w-4 h-4 mr-2" />}
            Export to Google Slides
          </button>
        </div>
      </div>

      {/* Editor Space */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Column: Outline/Slides */}
        <div className="w-1/4 border-r border-[#EAE3D9] bg-[#F9F7F4] overflow-y-auto hidden md:block">
          <div className="p-4 border-b border-[#EAE3D9]">
            <p className="text-[10px] font-bold text-[#A88C87] uppercase tracking-wider">Slide Outline</p>
          </div>
          <div className="space-y-1 p-2">
            {[
              { id: 1, title: 'Executive Summary', ai: true, active: true },
              { id: 2, title: 'Revenue Correlation', ai: true, active: false },
              { id: 3, title: 'Meta Ads Breakdown', ai: false, active: false },
              { id: 4, title: 'Website Behavior', ai: true, active: false },
              { id: 5, title: 'Action Items (May)', ai: true, active: false }
            ].map(slide => (
              <div 
                key={slide.id} 
                className={`p-3 rounded-lg cursor-pointer transition-colors flex items-center justify-between ${slide.active ? 'bg-white border text-[#3E1510] shadow-sm border-[#DDA77B]/50' : 'text-[#7A2B20] hover:bg-[#EAE3D9]/30'}`}
              >
                <span className="text-sm font-medium truncate pr-2">{slide.id}. {slide.title}</span>
                {slide.ai && <Sparkles className="w-3.5 h-3.5 text-[#DDA77B]" />}
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Narrative Editor */}
        <div className="flex-1 overflow-y-auto p-12 bg-white custom-scrollbar">
          <div className="max-w-2xl mx-auto space-y-8">
            
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

            {/* AI Prompter */}
            <div className="mt-12 pt-8 border-t border-[#EAE3D9]">
               <label className="text-[11px] font-bold text-[#A88C87] uppercase tracking-wider mb-3 block">Refine this narrative</label>
               <div className="relative">
                 <textarea 
                   className="w-full bg-[#FDF8F3] border border-[#EAE3D9] rounded-xl p-4 pr-12 text-sm text-[#3E1510] placeholder-[#A88C87] focus:ring-1 focus:ring-[#DDA77B] focus:border-[#DDA77B] outline-none resize-none"
                   rows={3}
                   placeholder="e.g., Make it sound more formal and focus heavily on the VIP Daybeds data..."
                 ></textarea>
                 <button className="absolute right-4 bottom-4 w-8 h-8 rounded-full bg-[#3E1510] text-[#E6DFD6] flex items-center justify-center hover:bg-[#7A2B20] transition-colors shadow-sm">
                   <Send className="w-3.5 h-3.5" />
                 </button>
               </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
