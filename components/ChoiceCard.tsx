import React from 'react';
import { Choice } from '../types';

interface ChoiceCardProps {
  choice: Choice;
  index: number;
  onSelect: () => void;
}

const ChoiceCard: React.FC<ChoiceCardProps> = ({ choice, index, onSelect }) => {
  return (
    <button
      onClick={onSelect}
      className="choice-card-3d w-full text-left p-4 rounded-xl bg-stone-800 hover:bg-stone-700 border border-stone-600 hover:border-emerald-500 shadow-lg transition-all duration-200 group flex items-center gap-4 relative overflow-hidden active:scale-[0.98]"
    >
      {/* Background Gradient on Hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/20 to-blue-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      {/* 3D Icon Container */}
      <div className="w-12 h-12 rounded-lg bg-stone-700 flex items-center justify-center text-2xl shadow-inner relative z-10 shrink-0 border border-stone-600">
        <span className="block">
          {choice.visual || '✨'}
        </span>
      </div>

      {/* Text Content */}
      <div className="flex-1 relative z-10 min-w-0">
        <div className="flex items-center gap-3 mb-1">
          <span className="w-5 h-5 rounded-full bg-emerald-600 text-white text-[10px] font-black flex items-center justify-center shadow-sm shrink-0">
            {String.fromCharCode(65 + index)}
          </span>
          <h3 className="font-bold text-stone-100 text-sm md:text-base leading-tight group-hover:text-emerald-400 transition-colors">
            {choice.text}
          </h3>
        </div>
      </div>

      {/* Arrow Indicator */}
      <div className="relative z-10 text-stone-500 group-hover:text-emerald-400 transform group-hover:translate-x-1 transition-all duration-300 text-xl font-black shrink-0">
        ➔
      </div>
    </button>
  );
};

export default ChoiceCard;
