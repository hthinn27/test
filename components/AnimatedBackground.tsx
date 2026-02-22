import React from 'react';

interface AnimatedBackgroundProps {
  type: 'forest' | 'ocean' | 'arctic' | 'grassland' | 'urban' | 'desert';
  health: number;
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ type, health }) => {
  const isHealthy = health > 70;
  const isCritical = health < 30;

  const getBackground = () => {
    switch (type) {
      case 'forest':
        return (
          <div className={`absolute inset-0 transition-colors duration-1000 ${isCritical ? 'bg-gradient-to-b from-stone-900 to-red-950' : 'bg-gradient-to-b from-emerald-900 to-emerald-950'} overflow-hidden`}>
            {/* Swaying Trees */}
            {[...Array(6)].map((_, i) => (
              <div 
                key={i}
                className={`absolute bottom-0 w-0 h-0 border-l-[20px] border-r-[20px] border-b-[100px] border-l-transparent border-r-transparent transition-colors duration-1000 ${isCritical ? 'border-b-stone-800 animate-[tree-shake-fall_5s_ease-in-out_infinite]' : 'border-b-emerald-800 animate-sway'} opacity-40 transform origin-bottom`}
                style={{ 
                  left: `${i * 15}%`, 
                  animationDelay: `${i * 0.5}s`,
                  transform: `scale(${0.5 + Math.random()})`,
                  willChange: 'transform'
                }}
              />
            ))}
            {/* Butterflies (Healthy) or Ash (Critical) */}
            {isHealthy ? (
              [...Array(5)].map((_, i) => (
                <div key={`butterfly-${i}`} className="absolute text-xl animate-float opacity-60" style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, animationDuration: `${3 + Math.random() * 3}s`, willChange: 'transform' }}>🦋</div>
              ))
            ) : isCritical ? (
              [...Array(10)].map((_, i) => (
                <div key={`ash-${i}`} className="absolute w-1 h-1 bg-stone-400/40 rounded-full animate-[float_5s_linear_infinite]" style={{ left: `${Math.random() * 100}%`, top: '-10px', animationDuration: `${2 + Math.random() * 3}s`, willChange: 'transform' }} />
              ))
            ) : null}
            {/* Fireflies */}
            {[...Array(8)].map((_, i) => (
              <div key={i} className="absolute w-1 h-1 bg-yellow-400 rounded-full animate-pulse" style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, animationDuration: `${2 + Math.random() * 3}s`, willChange: 'opacity' }} />
            ))}
          </div>
        );
      case 'ocean':
        return (
          <div className={`absolute inset-0 transition-colors duration-1000 ${isCritical ? 'bg-gradient-to-b from-stone-900 to-blue-950' : 'bg-gradient-to-b from-blue-900 to-blue-950'} overflow-hidden`}>
            {/* Bubbles */}
            {[...Array(10)].map((_, i) => (
              <div key={i} className={`absolute w-2 h-2 border rounded-full animate-[float_10s_linear_infinite] ${isCritical ? 'border-stone-500/30' : 'border-white/30'}`} style={{ left: `${Math.random() * 100}%`, bottom: '-10px', animationDuration: `${5 + Math.random() * 10}s`, willChange: 'transform' }} />
            ))}
            {/* Fish (Healthy) or Plastic (Critical) */}
            {isHealthy ? (
              [...Array(4)].map((_, i) => (
                <div key={`fish-${i}`} className="absolute text-2xl animate-bird-fly opacity-40" style={{ top: `${20 + i * 15}%`, animationDuration: `${10 + Math.random() * 5}s`, willChange: 'transform' }}>🐟</div>
              ))
            ) : isCritical ? (
              [...Array(8)].map((_, i) => (
                <div key={`trash-${i}`} className="absolute text-xl animate-float opacity-30" style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, willChange: 'transform' }}>🛍️</div>
              ))
            ) : null}
          </div>
        );
      case 'arctic':
        return (
          <div className={`absolute inset-0 transition-colors duration-1000 ${isCritical ? 'bg-gradient-to-b from-stone-900 to-slate-900' : 'bg-gradient-to-b from-slate-800 to-slate-900'} overflow-hidden`}>
            {/* Snow */}
            {[...Array(15)].map((_, i) => (
              <div key={i} className="absolute w-1 h-1 bg-white rounded-full animate-[float_5s_linear_infinite]" style={{ left: `${Math.random() * 100}%`, top: '-10px', animationDuration: `${3 + Math.random() * 5}s`, willChange: 'transform' }} />
            ))}
            {/* Aurora (Healthy) */}
            {isHealthy && <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-r from-green-400/10 via-purple-500/10 to-blue-500/10 blur-3xl animate-pulse-slow" style={{ willChange: 'opacity' }}></div>}
          </div>
        );
      case 'grassland':
        return (
          <div className={`absolute inset-0 transition-colors duration-1000 ${isCritical ? 'bg-gradient-to-b from-stone-900 to-amber-950' : 'bg-gradient-to-b from-emerald-800 to-emerald-950'} overflow-hidden`}>
             {/* Grass blades */}
             <div className={`absolute bottom-0 w-full h-32 transition-colors duration-1000 ${isCritical ? 'bg-stone-900/50' : 'bg-emerald-900/50'} clip-path-polygon-[0_100%,_100%_100%,_100%_80%,_0_60%]`}></div>
             {isHealthy && [...Array(8)].map((_, i) => (
                <div key={`flower-${i}`} className="absolute bottom-4 text-xl animate-breathe opacity-60" style={{ left: `${Math.random() * 100}%`, willChange: 'transform' }}>🌼</div>
             ))}
          </div>
        );
      case 'urban':
        return (
          <div className={`absolute inset-0 transition-colors duration-1000 ${isCritical ? 'bg-gradient-to-b from-stone-950 to-stone-900' : 'bg-gradient-to-b from-sky-900 to-stone-900'} overflow-hidden`}>
            {/* City Silhouette */}
            <div className="absolute bottom-0 w-full h-48 bg-stone-950/60 clip-path-polygon-[0_100%,_10%_40%,_20%_60%,_30%_30%,_40%_70%,_50%_20%,_60%_80%,_70%_40%,_80%_60%,_90%_30%,_100%_100%]"></div>
            {/* Smog (Critical) */}
            {isCritical && <div className="absolute inset-0 bg-stone-900/40 backdrop-blur-sm animate-pulse-slow" style={{ willChange: 'opacity' }}></div>}
          </div>
        );
      case 'desert':
        return (
          <div className={`absolute inset-0 transition-colors duration-1000 ${isCritical ? 'bg-gradient-to-b from-red-950 to-stone-950' : 'bg-gradient-to-b from-orange-900 to-stone-900'} overflow-hidden`}>
            <div className="absolute inset-0 bg-orange-500/10 mix-blend-overlay animate-pulse-slow" style={{ willChange: 'opacity' }}></div>
            {/* Dunes */}
            <div className={`absolute bottom-0 w-full h-40 transition-colors duration-1000 ${isCritical ? 'bg-stone-900/40' : 'bg-orange-950/40'} rounded-[100%] transform scale-150 translate-y-10`}></div>
            {/* Dust Storm (Critical) */}
            {isCritical && [...Array(15)].map((_, i) => (
               <div key={`sand-${i}`} className="absolute w-1 h-1 bg-orange-200/20 rounded-full animate-[float_2s_linear_infinite]" style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, willChange: 'transform' }} />
            ))}
          </div>
        );
      default:
        return <div className="absolute inset-0 bg-stone-900"></div>;
    }
  };

  return (
    <div className="fixed inset-0 z-[-1] transition-opacity duration-1000">
      {getBackground()}
    </div>
  );
};

export default AnimatedBackground;
