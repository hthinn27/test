import React, { useState, useEffect } from 'react';
import { Scenario, Choice, CharacterId } from '../types';
import ChoiceCard from './ChoiceCard';
import StageSummary from './StageSummary';
import { motion, AnimatePresence } from 'motion/react';

interface RoundProps {
  scenario: Scenario;
  onChoice: (choice: Choice) => void;
  consequence: { text: string; ripple: string; reflection: string; visual?: string; explanation: string } | null;
  onNext: () => void;
  isLastRound: boolean;
  characterId: CharacterId;
  slowMode?: boolean;
}

const Round: React.FC<RoundProps> = ({ scenario, onChoice, consequence, onNext, isLastRound, characterId, slowMode }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [showChoices, setShowChoices] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [selectedChoiceIndex, setSelectedChoiceIndex] = useState<number | null>(null);
  
  useEffect(() => {
    setDisplayedText('');
    setShowChoices(false);
    setShowReview(false);
    setSelectedChoiceIndex(null);
    
    let i = 0;
    const fullText = scenario.narrative;
    const typingSpeed = slowMode ? 60 : 30;
    
    const interval = setInterval(() => {
      setDisplayedText(fullText.substring(0, i));
      i++;
      if (i > fullText.length) {
        clearInterval(interval);
        // Delay before showing choices to allow reading time
        setTimeout(() => {
          setShowChoices(true);
        }, slowMode ? 2000 : 1000);
      }
    }, typingSpeed);

    return () => clearInterval(interval);
  }, [scenario, slowMode]);

  const handleChoiceSelect = (choice: Choice, index: number) => {
    setSelectedChoiceIndex(index);
    onChoice(choice);
  };

  return (
    <div className="flex flex-col relative z-10 w-full max-h-[40vh] md:max-h-[50vh]">
      <div className="mb-2 shrink-0">
        <div className="flex justify-between items-center mb-1">
          <span className="px-3 py-1 bg-emerald-100/90 backdrop-blur-sm text-emerald-800 text-[10px] font-black rounded-full uppercase tracking-widest shadow-sm border border-emerald-200">
            Round {scenario.round} / 4
          </span>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white/90 backdrop-blur-xl p-4 md:p-6 rounded-[1.5rem] border-2 border-white/50 shadow-2xl relative overflow-hidden group"
        >
          <h2 className="text-lg md:text-xl font-black text-stone-800 mb-1 leading-tight">{scenario.title}</h2>
          <div className="overflow-y-auto max-h-[100px] md:max-h-[120px] custom-scrollbar pr-2">
            <p className="text-sm md:text-base text-stone-700 leading-relaxed font-medium relative z-10">
              {displayedText}
              {!showChoices && <span className="typing-cursor ml-1"></span>}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Review Question Overlay */}
      <AnimatePresence>
        {showReview && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] bg-black/80 backdrop-blur-md flex items-center justify-center p-6"
            onClick={() => setShowReview(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl p-6 md:p-8 max-w-lg w-full shadow-2xl border-4 border-emerald-500 relative"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-black uppercase tracking-widest text-emerald-600 bg-emerald-100 px-3 py-1 rounded-full">
                  Review Question
                </span>
                <button 
                  onClick={() => setShowReview(false)}
                  className="w-8 h-8 flex items-center justify-center bg-stone-100 hover:bg-stone-200 rounded-full text-stone-500 font-bold transition-colors"
                >
                  ✕
                </button>
              </div>
              
              <h3 className="text-2xl font-black text-stone-800 mb-4 leading-tight">{scenario.title}</h3>
              <p className="text-lg text-stone-700 leading-relaxed font-medium">
                {scenario.narrative}
              </p>
              
              <button 
                onClick={() => setShowReview(false)}
                className="mt-8 w-full py-3 bg-stone-800 hover:bg-stone-700 text-white font-bold rounded-xl uppercase tracking-widest shadow-lg transition-transform active:scale-95"
              >
                Return to Choices
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {!consequence && showChoices && (
        <div className="fixed bottom-0 left-0 w-full z-[50] bg-stone-900/95 backdrop-blur-xl border-t border-white/10 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] animate-slide-up">
          <div className="max-w-3xl mx-auto px-4 py-4 md:py-6">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-white text-sm font-black uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Choose your action
              </h3>
              
              <button 
                onClick={() => setShowReview(true)}
                className="px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white text-[10px] font-bold uppercase tracking-widest rounded-full border border-stone-600 transition-all flex items-center gap-1"
              >
                <span>↺</span> Review
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[40vh] overflow-y-auto custom-scrollbar pb-safe">
              {scenario.choices.map((choice, idx) => (
                <ChoiceCard 
                  key={idx} 
                  choice={choice} 
                  index={idx} 
                  onSelect={() => handleChoiceSelect(choice, idx)} 
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {consequence && selectedChoiceIndex !== null && (
        <StageSummary 
          scenario={scenario}
          selectedChoice={scenario.choices[selectedChoiceIndex]}
          onNext={onNext}
          isLastRound={isLastRound}
        />
      )}
    </div>
  );
};

export default Round;
