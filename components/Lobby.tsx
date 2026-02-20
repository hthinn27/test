import React from 'react';
import { Character, CharacterId } from '../types';
import CharacterCard from './CharacterCard';
import { CHARACTERS } from '../constants';

interface LobbyProps {
  onSelect: (id: CharacterId) => void;
}

const Lobby: React.FC<LobbyProps> = ({ onSelect }) => {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      {/* Content Overlay */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 flex flex-col items-center">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-br from-emerald-400 to-blue-500 mb-4 drop-shadow-lg tracking-tighter">
            ECOSYSTEM
          </h1>
          <p className="text-xl md:text-3xl text-stone-300 font-light tracking-[0.3em] uppercase drop-shadow-md">
            Survival Journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full animate-slide-up">
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

        <div className="mt-16 animate-pulse-slow">
          <button className="px-12 py-4 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-full text-white font-black text-xl shadow-[0_0_30px_rgba(16,185,129,0.5)] hover:shadow-[0_0_50px_rgba(16,185,129,0.8)] transition-all transform hover:scale-110 uppercase tracking-widest border border-white/20">
            Start Game
          </button>
        </div>
      </div>
    </div>
  );
};

export default Lobby;
