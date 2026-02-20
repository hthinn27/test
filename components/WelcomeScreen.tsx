import React, { useState } from 'react';

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  const [showHowToPlay, setShowHowToPlay] = useState(false);

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center relative z-20 animate-fade-in">
      <div className="text-center mb-16 relative">
        <h1 className="text-6xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-br from-emerald-400 to-cyan-500 mb-6 drop-shadow-2xl tracking-tighter">
          ECOSYSTEM
        </h1>
        <p className="text-2xl md:text-3xl text-white/90 font-light tracking-[0.5em] uppercase drop-shadow-lg">
          Survival Journey
        </p>
        
        {/* Decorative elements */}
        <div className="absolute -top-20 -left-20 text-8xl animate-float opacity-30">🌿</div>
        <div className="absolute -bottom-10 -right-20 text-8xl animate-float opacity-30" style={{ animationDelay: '2s' }}>🦋</div>
      </div>

      <div className="flex flex-col items-center gap-6 w-full max-w-md px-4">
        <button 
          onClick={onStart}
          className="w-full py-6 bg-gradient-to-r from-emerald-500 to-cyan-600 rounded-2xl text-white font-black text-3xl shadow-[0_0_40px_rgba(16,185,129,0.6)] hover:shadow-[0_0_60px_rgba(16,185,129,0.8)] transition-all transform hover:scale-105 active:scale-95 animate-pulse-slow border-2 border-white/20 uppercase tracking-widest"
        >
          Start Game
        </button>

        <button 
          onClick={() => setShowHowToPlay(true)}
          className="px-8 py-3 bg-white/10 backdrop-blur-md rounded-full text-white/80 font-bold text-lg hover:bg-white/20 transition-all border border-white/10 uppercase tracking-wider"
        >
          How to Play
        </button>
      </div>

      {/* How to Play Modal */}
      {showHowToPlay && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in">
          <div className="bg-stone-900/90 border border-emerald-500/30 p-8 rounded-[2rem] max-w-lg w-full shadow-2xl relative">
            <button 
              onClick={() => setShowHowToPlay(false)}
              className="absolute top-4 right-4 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all"
            >
              ✕
            </button>
            
            <h2 className="text-3xl font-black text-emerald-400 mb-6 uppercase tracking-wide">How to Play</h2>
            
            <div className="space-y-6 text-stone-200">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center text-2xl shrink-0">🐾</div>
                <div>
                  <h3 className="font-bold text-emerald-200 text-lg">Choose Your Path</h3>
                  <p className="text-sm text-stone-400">Select an animal to experience their unique survival challenges.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center text-2xl shrink-0">🤔</div>
                <div>
                  <h3 className="font-bold text-blue-200 text-lg">Make Decisions</h3>
                  <p className="text-sm text-stone-400">Choose actions carefully. Every choice impacts the ecosystem health.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center text-2xl shrink-0">🏆</div>
                <div>
                  <h3 className="font-bold text-amber-200 text-lg">Earn Badges</h3>
                  <p className="text-sm text-stone-400">Maintain high health and biodiversity to unlock achievements.</p>
                </div>
              </div>
            </div>

            <button 
              onClick={() => setShowHowToPlay(false)}
              className="w-full mt-8 py-4 bg-emerald-600 hover:bg-emerald-500 rounded-xl text-white font-bold uppercase tracking-widest transition-all"
            >
              Got it!
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WelcomeScreen;
