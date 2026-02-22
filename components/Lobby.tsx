import React from 'react';
import { Character, CharacterId } from '../types';
import CharacterCard from './CharacterCard';
import { CHARACTERS } from '../constants';

interface LobbyProps {
  onSelect: (id: CharacterId) => void;
  slowMode: boolean;
  setSlowMode: (val: boolean) => void;
}

const Lobby: React.FC<LobbyProps> = ({ onSelect, slowMode, setSlowMode }) => {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center relative overflow-y-auto overscroll-y-contain -webkit-overflow-scrolling-touch py-10">
      {/* Content Overlay */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 flex flex-col items-center">
        <div className="text-center mb-8 md:mb-12 animate-fade-in shrink-0">
          <h1 className="text-5xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-br from-emerald-400 to-blue-500 mb-4 drop-shadow-lg tracking-tighter">
            ECOSYSTEM
          </h1>
          <p className="text-xl md:text-3xl text-stone-300 font-light tracking-[0.3em] uppercase drop-shadow-md">
            Survival Journey
          </p>
        </div>

        {/* Settings / Options */}
        <div className="mb-10 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 flex items-center gap-6">
           <div className="flex items-center gap-3">
              <span className="text-white font-bold text-sm uppercase tracking-widest">Slow Reading Mode</span>
              <button 
                onClick={() => setSlowMode(!slowMode)}
                className={`w-14 h-7 rounded-full relative transition-colors duration-300 ${slowMode ? 'bg-emerald-500' : 'bg-stone-600'}`}
              >
                <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all duration-300 ${slowMode ? 'left-8' : 'left-1'}`} />
              </button>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full animate-slide-up pb-8">
          {(Object.values(CHARACTERS) as Character[]).map((char, index) => (
            <div 
              key={char.id} 
              className="transform transition-all duration-500 hover:-translate-y-4"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CharacterCard character={char} onSelect={onSelect} />
            </div>
          ))}
        </div>

        <div className="mt-8 md:mt-16 animate-pulse-slow shrink-0 pb-10">
          <button className="px-12 py-4 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-full text-white font-black text-xl shadow-[0_0_30px_rgba(16,185,129,0.5)] hover:shadow-[0_0_50px_rgba(16,185,129,0.8)] transition-all transform hover:scale-110 uppercase tracking-widest border border-white/20">
            Start Game
          </button>
        </div>
      </div>
    </div>
  );
};

export default Lobby;
