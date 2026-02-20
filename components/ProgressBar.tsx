
import React from 'react';

interface ProgressBarProps {
  value: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ value }) => {
  const getColor = () => {
    if (value > 75) return 'from-emerald-400 via-emerald-500 to-emerald-600';
    if (value > 45) return 'from-amber-400 via-amber-500 to-amber-600';
    return 'from-red-400 via-red-500 to-red-600';
  };

  return (
    <div className="w-full bg-stone-200/50 backdrop-blur-sm rounded-full h-6 overflow-hidden border border-stone-300/50 shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)] relative group">
      <div 
        className={`h-full transition-all duration-1000 ease-out bg-gradient-to-r ${getColor()} relative shadow-[0_0_10px_rgba(255,255,255,0.3)]`}
        style={{ width: `${value}%` }}
      >
        {/* Shine effect */}
        <div className="absolute top-0 left-0 w-full h-1/2 bg-white/30 rounded-t-full"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10"></div>
        
        {/* Pulse animation */}
        <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
      </div>
      
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span className="text-[10px] font-black text-white drop-shadow-md uppercase tracking-widest group-hover:scale-110 transition-transform">
          {value}% Health
        </span>
      </div>
    </div>
  );
};

export default ProgressBar;
