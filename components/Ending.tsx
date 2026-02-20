
import React, { useEffect, useState } from 'react';
import { Character } from '../types';

interface EndingProps {
  health: number;
  char: Character;
  onRestart: () => void;
}

const Ending: React.FC<EndingProps> = ({ health, char, onRestart }) => {
  const isSustainable = health >= 80;
  const isStruggling = health >= 50 && health < 80;
  const isCollapse = health < 50;

  const getTheme = () => {
    if (isSustainable) return { 
      bg: 'bg-emerald-50', 
      text: 'text-emerald-900', 
      title: 'Sustainable Recovery', 
      accent: 'bg-emerald-600',
      border: 'border-emerald-200',
      icon: '✨',
      type: 'recovery'
    };
    if (isStruggling) return { 
      bg: 'bg-amber-50', 
      text: 'text-amber-900', 
      title: 'Struggling Survival', 
      accent: 'bg-amber-600',
      border: 'border-amber-200',
      icon: '⚠️',
      type: 'struggling'
    };
    return { 
      bg: 'bg-red-50', 
      text: 'text-red-900', 
      title: 'Ecosystem Collapse', 
      accent: 'bg-red-600',
      border: 'border-red-200',
      icon: '🥀',
      type: 'collapse'
    };
  };

  const theme = getTheme();

  const getMessage = () => {
    if (isSustainable) return `I am the ${char.name}. Thanks to wise human choices and conservation efforts, our ${char.ecosystem} is breathing again. My cubs will have a home, and the balance of life is restored. We are flourishing.`;
    if (isStruggling) return `I am the ${char.name}. Life is hard now. Our home is fragmented, and we constantly look for food and safety. We are still here, but for how long? We need more help to survive.`;
    return `I am the ${char.name}. The silence in our ${char.ecosystem} is heavy. The trees are gone, the waters are dark, and my herd has vanished. Our ancient world has broken apart. Is it too late?`;
  };

  return (
    <div className="w-full space-y-8 animate-fade-in relative z-10">
      <div className={`${theme.bg} ${theme.text} p-8 md:p-12 rounded-[3rem] shadow-2xl border-4 ${theme.border} relative overflow-hidden backdrop-blur-md bg-opacity-90`}>
        
        {/* Animated Background for Ending */}
        <div className="absolute inset-0 z-0 overflow-hidden opacity-20 pointer-events-none">
           <div className={`w-full h-full flex items-center justify-center text-[15rem] animate-pulse-slow`}>
              {theme.icon}
           </div>
        </div>

        <div className="text-center mb-10 relative z-10">
          <div className="text-8xl mb-6 animate-float inline-block filter drop-shadow-2xl">{char.icon}</div>
          <h2 className="text-4xl md:text-6xl font-black mb-4 uppercase tracking-tighter leading-none drop-shadow-sm">
            {theme.title}
          </h2>
          
          <div className="flex justify-center gap-4 mb-8">
             <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/60 backdrop-blur-sm rounded-full text-lg font-black animate-pulse shadow-sm border border-white/40">
               <span>Health: {health}%</span>
             </div>
          </div>
        </div>
        
        <div className="bg-white/60 backdrop-blur-xl p-8 md:p-10 rounded-[2.5rem] mb-10 relative z-10 border border-white/40 shadow-xl">
          <p className="text-xl md:text-3xl italic leading-relaxed text-center font-bold max-w-3xl mx-auto text-stone-800">
            "{getMessage()}"
          </p>
        </div>

        <div className="flex justify-center relative z-10">
          <button 
            onClick={onRestart}
            className={`${theme.accent} hover:brightness-110 text-white font-black py-6 px-16 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.2)] transition-all transform hover:scale-105 active:scale-95 text-2xl flex items-center gap-4 border-4 border-white/20 uppercase tracking-widest`}
          >
            <span>🔄</span> Play Again
          </button>
        </div>
      </div>

      <div className="bg-white/90 backdrop-blur-xl rounded-[2.5rem] p-10 shadow-xl border-4 border-white/50">
        <h3 className="text-3xl font-black text-stone-800 mb-8 flex items-center gap-3">
          <span className="bg-stone-100 p-2 rounded-xl">👩‍🏫</span>
          Learning Reflection
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <section>
              <h4 className="text-xs font-black uppercase tracking-widest text-emerald-600 mb-3">Critical Thinking</h4>
              <ul className="space-y-4">
                {[
                  "What was the most difficult choice you had to make?",
                  "How did human activity directly impact your animal's health?",
                  "What could humans have done differently to prevent collapse?"
                ].map((q, i) => (
                  <li key={i} className="flex gap-3 text-stone-700 font-medium leading-tight">
                    <span className="text-emerald-500 font-black">0{i+1}.</span>
                    {q}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <div className="bg-stone-50 p-6 rounded-3xl border border-stone-100">
            <h4 className="text-xs font-black uppercase tracking-widest text-blue-600 mb-4">Real-World Conservation</h4>
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-2xl shadow-sm">
                <span className="font-bold text-stone-800 block mb-1">Wildlife Corridors</span>
                <p className="text-sm text-stone-500 leading-snug">Bridges and tunnels help animals safely cross human-made barriers like roads.</p>
              </div>
              <div className="bg-white p-4 rounded-2xl shadow-sm">
                <span className="font-bold text-stone-800 block mb-1">Sustainable Laws</span>
                <p className="text-sm text-stone-500 leading-snug">Banning harmful chemicals and protecting habitats can reverse ecosystem decline.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ending;
