import React, { useState, useEffect } from 'react';
import { Scenario, Choice, CharacterId } from '../types';
import ChoiceCard from './ChoiceCard';

interface RoundProps {
  scenario: Scenario;
  onChoice: (choice: Choice) => void;
  consequence: { text: string; ripple: string; reflection: string; visual?: string; explanation: string } | null;
  onNext: () => void;
  isLastRound: boolean;
  characterId: CharacterId;
}

const Round: React.FC<RoundProps> = ({ scenario, onChoice, consequence, onNext, isLastRound, characterId }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [showChoices, setShowChoices] = useState(false);
  
  useEffect(() => {
    setDisplayedText('');
    setShowChoices(false);
    
    let i = 0;
    const fullText = scenario.narrative;
    const interval = setInterval(() => {
      setDisplayedText(fullText.substring(0, i));
      i++;
      if (i > fullText.length) {
        clearInterval(interval);
        setShowChoices(true);
      }
    }, 20);

    return () => clearInterval(interval);
  }, [scenario]);

  const getReactionClass = (visual?: string) => {
    if (visual === '🪚') return 'animate-tree-shake-fall';
    if (visual === '🛍️') return 'animate-float-debris';
    if (visual === '❄️') return 'animate-melt-ice';
    if (visual === '🧪') return 'animate-bee-fly-away';
    return 'animate-pulse-slow';
  };

  return (
    <div className="min-h-[500px] flex flex-col relative z-10">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <span className="px-4 py-2 bg-emerald-100/80 backdrop-blur-sm text-emerald-800 text-xs font-black rounded-full uppercase tracking-widest shadow-sm border border-emerald-200">
            Round {scenario.round} / 4
          </span>
          <h2 className="text-2xl md:text-3xl font-black text-stone-800 tracking-tight drop-shadow-sm">{scenario.title}</h2>
        </div>
        
        <div className="bg-white/80 backdrop-blur-md p-8 rounded-[2rem] border border-white/40 shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-100 to-blue-100 rounded-bl-full opacity-50 group-hover:scale-110 transition-transform duration-700"></div>
          <p className="text-xl md:text-2xl text-stone-700 leading-relaxed font-medium relative z-10">
            {displayedText}
            {!showChoices && <span className="typing-cursor ml-1"></span>}
          </p>
        </div>
      </div>

      {!consequence && showChoices && (
        <div className="grid grid-cols-1 gap-4 mt-auto animate-slide-up">
          {scenario.choices.map((choice, idx) => (
            <ChoiceCard 
              key={idx} 
              choice={choice} 
              index={idx} 
              onSelect={() => onChoice(choice)} 
            />
          ))}
        </div>
      )}

      {consequence && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-stone-900/90 backdrop-blur-md animate-fade-in overflow-y-auto">
          <div className="w-full min-h-screen flex flex-col items-center justify-center p-4 relative">
            
            {/* Background Animation for Consequence */}
            <div className="absolute inset-0 z-0 overflow-hidden opacity-30">
               <div className={`w-full h-full flex items-center justify-center text-[20rem] animate-pulse-slow ${getReactionClass(consequence.visual)}`}>
                  {consequence.visual || '🌍'}
               </div>
            </div>

            <div className="relative z-10 w-full max-w-3xl animate-zoom-in">
              <div className="bg-white/90 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-12 shadow-2xl border-4 border-white/20 text-center">
                
                <div className="inline-block text-8xl mb-6 filter drop-shadow-2xl animate-float">
                  {consequence.visual}
                </div>

                <h2 className="text-3xl md:text-5xl font-black text-stone-800 mb-6 leading-tight drop-shadow-sm">
                  {consequence.text}
                </h2>

                <div className="bg-stone-100/80 rounded-2xl p-6 md:p-8 mb-8 border-l-8 border-emerald-500 text-left shadow-inner">
                  <h4 className="flex items-center gap-3 text-sm font-black uppercase tracking-widest text-emerald-700 mb-3">
                    <span className="text-2xl">🎓</span> Ecological Insight
                  </h4>
                  <p className="text-stone-800 text-xl md:text-2xl font-medium leading-relaxed">
                    {consequence.explanation}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10 text-left">
                   <div className="bg-blue-50 p-5 rounded-xl border border-blue-200">
                      <span className="text-xs font-black uppercase tracking-widest text-blue-800 block mb-1">Ripple Effect</span>
                      <p className="text-blue-900 font-medium italic">{consequence.ripple}</p>
                   </div>
                   <div className="bg-amber-50 p-5 rounded-xl border border-amber-200">
                      <span className="text-xs font-black uppercase tracking-widest text-amber-800 block mb-1">Reflection</span>
                      <p className="text-stone-800 font-medium">{consequence.reflection}</p>
                   </div>
                </div>

                <button 
                  onClick={onNext}
                  className="w-full py-6 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-2xl rounded-2xl shadow-[0_10px_30px_rgba(16,185,129,0.4)] hover:shadow-[0_15px_40px_rgba(16,185,129,0.6)] transition-all transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-4 animate-pulse-slow uppercase tracking-widest border-2 border-white/20"
                >
                  {isLastRound ? 'See Final Outcome' : 'Continue Journey'} ➔
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Round;
