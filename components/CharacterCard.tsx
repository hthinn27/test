
import React from 'react';
import { Character, CharacterId } from '../types';

interface CharacterCardProps {
  character: Character;
  onSelect: (id: CharacterId) => void;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character, onSelect }) => {
  return (
    <button
      onClick={() => onSelect(character.id)}
      className="bg-white rounded-3xl p-8 shadow-lg border-2 border-stone-100 hover:border-emerald-500 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl flex flex-col items-center text-center group relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 rounded-bl-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-700"></div>
      
      <div className="text-7xl mb-6 group-hover:scale-110 transition-transform duration-500 animate-float relative z-10">
        {character.icon}
      </div>
      
      <div className="relative z-10">
        <h3 className="text-2xl font-black text-emerald-900 mb-1 tracking-tight">{character.name}</h3>
        <p className="text-xs font-black text-emerald-600 mb-4 uppercase tracking-[0.2em]">{character.ecosystem}</p>
        <p className="text-stone-600 text-sm leading-relaxed font-medium">{character.description}</p>
      </div>
      
      <div className="mt-6 w-full py-3 bg-stone-50 rounded-xl text-emerald-700 font-black text-xs uppercase tracking-widest group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
        Select Species
      </div>
    </button>
  );
};

export default CharacterCard;
