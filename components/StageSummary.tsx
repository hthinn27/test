import React from 'react';
import { motion } from 'motion/react';
import { Choice, Scenario } from '../types';

interface StageSummaryProps {
  scenario: Scenario;
  selectedChoice: Choice;
  onNext: () => void;
  isLastRound: boolean;
}

const StageSummary: React.FC<StageSummaryProps> = ({ scenario, selectedChoice, onNext, isLastRound }) => {
  // Find the "best" choice (highest health impact) to compare against
  const bestChoice = scenario.choices.reduce((prev, current) => 
    (current.impact.health > prev.impact.health) ? current : prev
  );

  const isBestChoice = selectedChoice === bestChoice;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-stone-900/95 backdrop-blur-xl p-4 overflow-y-auto"
    >
      <div className="w-full max-w-4xl bg-white rounded-[2rem] shadow-2xl border-4 border-white/10 flex flex-col md:flex-row md:max-h-[90vh] overflow-hidden md:overflow-visible h-auto">
        
        {/* Left Panel: What Happened */}
        <div className="flex-1 p-6 md:p-8 bg-stone-50 border-r border-stone-200 flex flex-col relative overflow-y-auto md:overflow-hidden min-h-[300px]">
           <div className="absolute top-0 right-0 p-4 opacity-10 text-9xl pointer-events-none select-none">
             {selectedChoice.visual}
           </div>
           
           <h3 className="text-sm font-black uppercase tracking-widest text-stone-500 mb-2">Your Choice</h3>
           <h2 className="text-2xl font-black text-stone-800 mb-4 leading-tight">{selectedChoice.text}</h2>
           
           <div className={`bg-white p-4 rounded-xl shadow-sm border-2 ${selectedChoice.impact.health >= 0 ? 'border-emerald-200' : 'border-red-200'} mb-4 relative z-10`}>
             <p className="text-stone-700 font-medium">{selectedChoice.consequence}</p>
           </div>

           <div className="mt-auto space-y-3 relative z-10">
              <div className="flex items-center gap-3 text-sm font-bold text-stone-600">
                 <span className={`p-2 rounded-lg ${selectedChoice.impact.health >= 0 ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                   Health: {selectedChoice.impact.health > 0 ? '+' : ''}{selectedChoice.impact.health}
                 </span>
                 <span className="text-xs uppercase tracking-wider opacity-70">Ecosystem Impact</span>
              </div>
              
              <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                <span className="text-[10px] font-black uppercase text-blue-800 block mb-1">Ripple Effect</span>
                <p className="text-blue-900 text-xs italic">{selectedChoice.rippleEffect}</p>
              </div>
           </div>
        </div>

        {/* Right Panel: Analysis / Better Outcome */}
        <div className="flex-1 p-6 md:p-8 bg-white flex flex-col relative overflow-y-auto md:overflow-y-auto custom-scrollbar h-full max-h-[60vh] md:max-h-none">
           <h3 className="text-sm font-black uppercase tracking-widest text-emerald-600 mb-2">
             {isBestChoice ? 'Perfect Decision!' : 'The Better Path'}
           </h3>
           
           {!isBestChoice && (
             <div className="mb-6 p-4 bg-emerald-50 rounded-xl border-2 border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.1)]">
               <div className="flex items-center gap-2 mb-2">
                 <span className="text-lg">🌟</span>
                 <span className="text-xs font-bold uppercase text-emerald-800">Alternative Choice</span>
               </div>
               <p className="text-sm text-emerald-900 font-black mb-1">"{bestChoice.text}"</p>
               <p className="text-xs text-emerald-700 font-medium">Consequence: {bestChoice.consequence}</p>
               <div className="mt-2 text-[10px] font-black text-emerald-600 uppercase tracking-widest">
                 Potential Health: +{bestChoice.impact.health}
               </div>
             </div>
           )}

           {isBestChoice && (
             <div className="mb-6 p-4 bg-emerald-500 text-white rounded-xl border-2 border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.4)]">
               <div className="flex items-center gap-2 mb-2">
                 <span className="text-lg">🏆</span>
                 <span className="text-xs font-bold uppercase">Optimal Outcome</span>
               </div>
               <p className="text-sm font-bold">You identified the most sustainable action for this ecosystem!</p>
             </div>
           )}

           <div className="space-y-4">
             <div>
               <h4 className="text-xs font-black uppercase text-stone-400 mb-1">Ecological Insight</h4>
               <p className="text-stone-700 text-sm leading-relaxed">
                 {selectedChoice.explanation}
               </p>
             </div>

             <div>
               <h4 className="text-xs font-black uppercase text-stone-400 mb-1">Reflection</h4>
               <p className="text-stone-600 text-sm italic border-l-2 border-stone-300 pl-3">
                 "{selectedChoice.reflectionQuestion}"
               </p>
             </div>
           </div>

           <button 
             onClick={onNext}
             className="mt-8 w-full py-4 bg-stone-900 hover:bg-stone-800 text-white font-black text-lg rounded-xl shadow-lg transition-colors flex items-center justify-center gap-2 uppercase tracking-widest shrink-0"
           >
             {isLastRound ? 'Finish Journey' : 'Next Stage'} ➔
           </button>
        </div>

      </div>
    </motion.div>
  );
};

export default StageSummary;
