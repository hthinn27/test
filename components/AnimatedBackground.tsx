import React from 'react';

interface AnimatedBackgroundProps {
  type: 'forest' | 'ocean' | 'arctic' | 'grassland' | 'urban' | 'desert';
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ type }) => {
  const getBackground = () => {
    switch (type) {
      case 'forest':
        return (
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-900 to-emerald-950 overflow-hidden">
            <div className="absolute inset-0 opacity-20 bg-[url('https://raw.githubusercontent.com/joshua-v/earth-css/master/earth.jpg')] bg-cover mix-blend-overlay"></div>
            {/* Swaying Trees (CSS Shapes) */}
            {[...Array(10)].map((_, i) => (
              <div 
                key={i}
                className="absolute bottom-0 w-0 h-0 border-l-[20px] border-r-[20px] border-b-[100px] border-l-transparent border-r-transparent border-b-emerald-800 opacity-40 transform origin-bottom animate-[tree-shake-fall_5s_ease-in-out_infinite]"
                style={{ 
                  left: `${i * 10}%`, 
                  animationDelay: `${i * 0.5}s`,
                  transform: `scale(${0.5 + Math.random()})`
                }}
              />
            ))}
            {/* Fireflies */}
            {[...Array(15)].map((_, i) => (
              <div 
                key={i}
                className="absolute w-1 h-1 bg-yellow-400 rounded-full animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDuration: `${2 + Math.random() * 3}s`
                }}
              />
            ))}
            {/* Birds */}
            {[...Array(3)].map((_, i) => (
              <div 
                key={`bird-${i}`}
                className="absolute w-4 h-2 bg-black/30 rounded-full animate-bird-fly"
                style={{
                  top: `${10 + i * 15}%`,
                  animationDelay: `${i * 5}s`,
                  animationDuration: `${15 + Math.random() * 5}s`
                }}
              />
            ))}
            {/* Falling Leaves */}
            {[...Array(10)].map((_, i) => (
              <div 
                key={`leaf-${i}`}
                className="absolute w-2 h-2 bg-emerald-400/40 rounded-tl-full rounded-br-full animate-leaf-fall"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 10}s`,
                  animationDuration: `${8 + Math.random() * 5}s`
                }}
              />
            ))}
          </div>
        );
      case 'ocean':
        return (
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900 to-blue-950 overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.2),transparent_70%)]"></div>
            {/* Bubbles */}
            {[...Array(20)].map((_, i) => (
              <div 
                key={i}
                className="absolute w-2 h-2 border border-white/30 rounded-full animate-[float_10s_linear_infinite]"
                style={{
                  left: `${Math.random() * 100}%`,
                  bottom: '-10px',
                  animationDuration: `${5 + Math.random() * 10}s`,
                  animationDelay: `${Math.random() * 5}s`
                }}
              />
            ))}
            {/* Light Rays */}
            <div className="absolute top-0 left-1/4 w-20 h-full bg-white/5 transform -skew-x-12 blur-xl"></div>
            <div className="absolute top-0 left-2/4 w-32 h-full bg-white/5 transform -skew-x-12 blur-xl"></div>
          </div>
        );
      case 'arctic':
        return (
          <div className="absolute inset-0 bg-gradient-to-b from-slate-800 to-slate-900 overflow-hidden">
            {/* Snow */}
            {[...Array(30)].map((_, i) => (
              <div 
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full animate-[float_5s_linear_infinite]"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: '-10px',
                  animationDuration: `${3 + Math.random() * 5}s`,
                  animationDelay: `${Math.random() * 5}s`
                }}
              />
            ))}
            {/* Aurora */}
            <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-r from-green-400/10 via-purple-500/10 to-blue-500/10 blur-3xl animate-pulse-slow"></div>
          </div>
        );
      case 'grassland':
      case 'urban':
        return (
          <div className="absolute inset-0 bg-gradient-to-b from-sky-900 to-stone-900 overflow-hidden">
            {/* City Silhouette / Grass */}
            <div className="absolute bottom-0 w-full h-32 bg-stone-950/50 clip-path-polygon-[0_100%,_100%_100%,_100%_80%,_0_60%]"></div>
            {/* Floating Pollen/Dust */}
            {[...Array(20)].map((_, i) => (
              <div 
                key={i}
                className="absolute w-1 h-1 bg-amber-200/50 rounded-full animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDuration: `${4 + Math.random() * 4}s`
                }}
              />
            ))}
          </div>
        );
      case 'desert':
        return (
          <div className="absolute inset-0 bg-gradient-to-b from-orange-900 to-stone-900 overflow-hidden">
            {/* Heat Haze Overlay */}
            <div className="absolute inset-0 bg-orange-500/10 mix-blend-overlay animate-pulse-slow"></div>
            {/* Dunes */}
            <div className="absolute bottom-0 w-full h-40 bg-orange-950/40 rounded-[100%] transform scale-150 translate-y-10"></div>
            <div className="absolute bottom-0 right-0 w-2/3 h-32 bg-orange-900/40 rounded-[100%] transform scale-150 translate-y-10"></div>
            {/* Dust Particles */}
            {[...Array(25)].map((_, i) => (
              <div 
                key={i}
                className="absolute w-1 h-1 bg-orange-200/40 rounded-full animate-[float_8s_linear_infinite]"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`
                }}
              />
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
