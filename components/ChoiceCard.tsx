import React from 'react';
import { Choice } from '../types';

interface ChoiceCardProps {
  choice: Choice;
  index: number;
  onSelect: () => void;
}

const ChoiceCard: React.FC<ChoiceCardProps> = ({ choice, index, onSelect }) => {
  const getAnimationClass = (visual?: string) => {
    if (visual === '🌿') return 'animate-grow';
    if (visual === '💧') return 'animate-pulse-slow';
    if (visual === '🛣️') return 'animate-float-debris';
    if (visual === '🪚') return 'animate-tree-shake-fall';
    if (visual === '🚗') return 'animate-float-debris';
    if (visual === '🏠') return 'animate-pulse';
    if (visual === '🏭') return 'animate-pollution';
    if (visual === '🔍') return 'animate-zoom-in';
    if (visual === '🥀') return 'animate-melt-ice';
    if (visual === '🌉') return 'animate-grow';
    if (visual === '🔥') return 'animate-pulse-glow';
    if (visual === '🌱') return 'animate-grow';
    if (visual === '🌊') return 'animate-float';
    if (visual === '🪸') return 'animate-pulse-slow';
    if (visual === '🎐') return 'animate-float';
    if (visual === '🛍️') return 'animate-float-debris';
    if (visual === '🗑️') return 'animate-float-debris';
    if (visual === '⚓') return 'animate-float';
    if (visual === '☀️') return 'animate-pulse-glow';
    if (visual === '🧭') return 'animate-float';
    if (visual === '🏖️') return 'animate-melt-ice';
    if (visual === '🛡️') return 'animate-pulse-glow';
    if (visual === '🕸️') return 'animate-float-debris';
    if (visual === '🚢') return 'animate-float';
    if (visual === '❄️') return 'animate-melt-ice';
    if (visual === '🐾') return 'animate-float';
    if (visual === '🫐') return 'animate-grow';
    if (visual === '🏊') return 'animate-float';
    if (visual === '⏳') return 'animate-pulse-slow';
    if (visual === '🪺') return 'animate-float';
    if (visual === '🏔️') return 'animate-float';
    if (visual === '🛢️') return 'animate-pollution';
    if (visual === '⚖️') return 'animate-pulse';
    if (visual === '☣️') return 'animate-pollution';
    if (visual === '📊') return 'animate-pulse';
    if (visual === '🌸') return 'animate-grow';
    if (visual === '🌳') return 'animate-grow';
    if (visual === '⚔️') return 'animate-pulse';
    if (visual === '🌽') return 'animate-grow';
    if (visual === '✈️') return 'animate-float';
    if (visual === '🧪') return 'animate-pollution';
    if (visual === '🏙️') return 'animate-pulse';
    if (visual === '💡') return 'animate-pulse-glow';
    if (visual === '🧱') return 'animate-pulse';
    if (visual === '🌻') return 'animate-grow';
    if (visual === '🐝') return 'animate-bee-fly-away';
    return '';
  };

  return (
    <button
      onClick={onSelect}
      className="choice-card-3d w-full text-left p-6 rounded-3xl bg-white/90 backdrop-blur-md border border-white/20 shadow-lg hover:bg-white transition-all duration-300 group flex items-center gap-6 relative overflow-hidden"
    >
      {/* Background Gradient on Hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-50 to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      {/* 3D Icon Container */}
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-stone-100 to-stone-200 flex items-center justify-center text-4xl shadow-inner relative z-10 group-hover:scale-110 transition-transform duration-300">
        <span className={`block ${getAnimationClass(choice.visual)}`}>
          {choice.visual || '✨'}
        </span>
      </div>

      {/* Text Content */}
      <div className="flex-1 relative z-10">
        <div className="flex items-center gap-3 mb-1">
          <span className="w-6 h-6 rounded-full bg-emerald-500 text-white text-xs font-black flex items-center justify-center shadow-sm">
            {String.fromCharCode(65 + index)}
          </span>
          <h3 className="font-bold text-stone-800 text-lg leading-tight group-hover:text-emerald-700 transition-colors">
            {choice.text}
          </h3>
        </div>
      </div>

      {/* Arrow Indicator */}
      <div className="relative z-10 text-stone-300 group-hover:text-emerald-500 transform group-hover:translate-x-2 transition-all duration-300 text-2xl font-black">
        ➔
      </div>
    </button>
  );
};

export default ChoiceCard;
