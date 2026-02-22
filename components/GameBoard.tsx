import React, { useMemo, useState, useEffect } from 'react';
import { PathNode } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface GameBoardProps {
  path: PathNode[];
  currentNodeIndex: number;
  characterIcon: string;
  isMoving: boolean;
  health: number;
  locationName?: string;
  onNodeClick?: (node: PathNode) => void;
  npcReaction?: 'happy' | 'sad' | 'neutral' | null;
}

const GameBoard: React.FC<GameBoardProps> = ({ path, currentNodeIndex, characterIcon, isMoving, health, locationName, onNodeClick, npcReaction }) => {
  const [camera, setCamera] = useState({ x: 0, y: 0, zoom: 60 });
  const [isDragging, setIsDragging] = useState(false);
  
  const [activeDialogue, setActiveDialogue] = useState<{id: number, text: string} | null>(null);

  const getAnimationClass = (icon: string) => {
    if (['🐟', '🐠', '🐡', '🦈', '🐳', '🐋', '🐬', '🦭', '🐢', '🦀', '🐙', '🦑', '🦞', '🦐'].includes(icon)) return 'animate-swim';
    if (['🦅', '🦉', '🐦', '🦆', '🦢', '🦜', '🦩', '🦚', '🦃', '🐓', '🐣', '🐤', '🐥', '🐝', '🦋', '🦇'].includes(icon)) return 'animate-fly-hover';
    return 'animate-bounce-slow';
  };

  // Dynamic Camera Focus (Auto-center on current node)
  useEffect(() => {
    const currentNode = path.find(n => n.id === currentNodeIndex) || path[0];
    const zoomLevel = 60; 
    const minX = Math.max(0, Math.min(100 - zoomLevel, currentNode.x - zoomLevel / 2));
    const minY = Math.max(0, Math.min(100 - zoomLevel, currentNode.y - zoomLevel / 2));
    
    setCamera({ x: minX, y: minY, zoom: zoomLevel });
  }, [currentNodeIndex, path]);

  const handlePointerDown = (e: React.PointerEvent) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    setIsDragging(true);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    e.currentTarget.releasePointerCapture(e.pointerId);
    setIsDragging(false);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    
    // Convert pixel movement to SVG coordinate movement
    // SVG is 100x100 units. Container size varies.
    // We approximate sensitivity.
    const sensitivity = camera.zoom / 500; 
    const dx = e.movementX * sensitivity;
    const dy = e.movementY * sensitivity;

    setCamera(prev => ({
      ...prev,
      x: Math.max(-20, Math.min(120 - prev.zoom, prev.x - dx)),
      y: Math.max(-20, Math.min(120 - prev.zoom, prev.y - dy))
    }));
  };

  const handleZoom = (delta: number) => {
    setCamera(prev => {
      const newZoom = Math.max(20, Math.min(100, prev.zoom + delta));
      // Adjust x/y to keep center? For simplicity, just clamp.
      return {
        ...prev,
        zoom: newZoom,
        x: Math.max(-20, Math.min(120 - newZoom, prev.x)),
        y: Math.max(-20, Math.min(120 - newZoom, prev.y))
      };
    });
  };

  // Generate the SVG path string for the curved nature trail (supports branching)
  const pathString = useMemo(() => {
    if (path.length < 2) return '';
    
    let d = '';
    
    path.forEach(node => {
      if (node.next && node.next.length > 0) {
        node.next.forEach(nextId => {
          const nextNode = path.find(n => n.id === nextId);
          if (nextNode) {
            const midX = (node.x + nextNode.x) / 2;
            const midY = (node.y + nextNode.y) / 2;
            
            // Add some randomness to the control point
            const seed = node.id * nextNode.id;
            const randomOffset = (Math.sin(seed) * 10); 
            
            const cpX = midX + randomOffset;
            const cpY = midY - randomOffset;
            
            d += `M ${node.x} ${node.y} Q ${cpX} ${cpY} ${nextNode.x} ${nextNode.y} `;
          }
        });
      }
    });
    return d;
  }, [path]);

  const currentNode = path.find(n => n.id === currentNodeIndex) || path[0];
  const isHealthy = health > 70;
  const isCritical = health < 30;
  const viewBoxString = `${camera.x} ${camera.y} ${camera.zoom} ${camera.zoom}`;

  return (
    <div className="relative w-full h-full bg-white/10 backdrop-blur-sm rounded-3xl border-2 border-white/20 overflow-hidden shadow-inner touch-none">
      
      {/* Zoom Controls */}
      <div className="absolute top-4 right-4 z-50 flex flex-col gap-2">
        <button onClick={() => handleZoom(-10)} className="w-8 h-8 bg-stone-800/80 text-white rounded-full flex items-center justify-center font-bold shadow-lg border border-white/20 active:scale-95">
          +
        </button>
        <button onClick={() => handleZoom(10)} className="w-8 h-8 bg-stone-800/80 text-white rounded-full flex items-center justify-center font-bold shadow-lg border border-white/20 active:scale-95">
          -
        </button>
      </div>

      {/* Location Label */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={locationName}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="absolute top-4 left-1/2 -translate-x-1/2 z-40 bg-stone-900/80 backdrop-blur-md px-6 py-2 rounded-full border border-white/20 shadow-xl pointer-events-none"
        >
          <span className="text-white font-black uppercase tracking-[0.2em] text-sm md:text-base flex items-center gap-2">
            📍 {locationName || 'Unknown Territory'}
          </span>
        </motion.div>
      </AnimatePresence>

      {/* Nature Trail SVG */}
      <motion.svg 
        className="absolute inset-0 w-full h-full cursor-move"
        viewBox={viewBoxString}
        preserveAspectRatio="xMidYMid slice"
        animate={{ viewBox: viewBoxString }}
        transition={{ duration: isDragging ? 0 : 1.5, ease: "easeInOut" }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        {/* Environmental Aura (Static Glow) */}
        <defs>
          <radialGradient id="auraGradient">
            <stop offset="0%" stopColor={isHealthy ? "#10b981" : isCritical ? "#ef4444" : "#f59e0b"} stopOpacity="0.4" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>
        </defs>
        <motion.circle 
          cx={currentNode.x} 
          cy={currentNode.y} 
          r="30" 
          fill="url(#auraGradient)" 
          opacity="0.5"
        />

        {/* Path Background Shadow/Outline */}
        <motion.path
          d={pathString}
          fill="none"
          stroke="rgba(0,0,0,0.2)"
          strokeWidth="8"
          strokeLinecap="round"
        />

        {/* Base Path Line */}
        <motion.path
          d={pathString}
          fill="none"
          stroke="white"
          strokeWidth="4"
          strokeLinecap="round"
          strokeOpacity="0.4"
          className="drop-shadow-md"
        />
        
        {/* Nodes */}
        {path.map((node) => {
          const isActive = node.id === currentNodeIndex;
          const isVisited = node.id <= currentNodeIndex; 
          
          return (
            <g key={node.id} onClick={() => onNodeClick && onNodeClick(node)} style={{ cursor: 'pointer' }}>
               {/* Node Circle */}
               <motion.circle
                 cx={node.x}
                 cy={node.y}
                 r={isActive ? 6 : 3}
                 fill={isVisited ? (isHealthy ? '#10b981' : isCritical ? '#ef4444' : '#f59e0b') : '#e5e7eb'}
                 stroke="white"
                 strokeWidth={isActive ? 2 : 0.5}
                 className="drop-shadow-md"
               />
               
               {/* NPC Icon */}
               {node.npc && (
                 <foreignObject x={node.x - 10} y={node.y - 25} width="20" height="30" className="overflow-visible pointer-events-auto">
                    <div className="relative flex flex-col items-center justify-end h-full w-full">
                      {/* Dialogue Bubble */}
                      <AnimatePresence>
                        {activeDialogue?.id === node.id && (
                           <motion.div
                             initial={{ opacity: 0, y: 5, scale: 0.8 }}
                             animate={{ opacity: 1, y: 0, scale: 1 }}
                             exit={{ opacity: 0, scale: 0.8 }}
                             className="absolute bottom-full mb-1 bg-white text-stone-800 text-[3px] font-bold px-2 py-1 rounded shadow-lg whitespace-nowrap z-50 border border-stone-200 pointer-events-none select-none"
                           >
                             {activeDialogue.text}
                             <div className="absolute top-full left-1/2 -translate-x-1/2 border-[3px] border-transparent border-t-white" />
                           </motion.div>
                        )}
                      </AnimatePresence>

                      <motion.div 
                        className={`text-[0.8rem] flex items-center justify-center filter drop-shadow-lg cursor-pointer ${getAnimationClass(node.npc)}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (node.dialogue) {
                            setActiveDialogue({ id: node.id, text: node.dialogue });
                            setTimeout(() => setActiveDialogue(null), 4000);
                          }
                          if (onNodeClick) onNodeClick(node);
                        }}
                        whileTap={{ scale: 0.9 }}
                      >
                        {/* Reaction Overlay */}
                        {isActive && npcReaction === 'happy' && <div className="absolute -top-2 right-0 text-[0.5rem] animate-bounce">❤️</div>}
                        {isActive && npcReaction === 'sad' && <div className="absolute -top-2 right-0 text-[0.5rem] animate-pulse">💧</div>}
                        
                        {node.npc}
                      </motion.div>
                    </div>
                 </foreignObject>
               )}

               {/* Special Node Indicator (Quiz/Fact) */}
               {(node.funFact || node.quiz) && !isActive && (
                 <motion.circle 
                    cx={node.x + 3} cy={node.y - 3} r="1.5" fill="#3b82f6" 
                 />
               )}
               
               {/* Active Indicator */}
               {isActive && (
                 <foreignObject x={node.x - 10} y={node.y - 15} width="20" height="20" className="pointer-events-none">
                    <div className="flex justify-center items-center w-full h-full">
                       <div className="text-[0.5rem]">📍</div>
                    </div>
                 </foreignObject>
               )}
            </g>
          );
        })}
      </motion.svg>

      {/* Animal Player Character (Inside SVG to match coordinate system) */}
      <motion.svg 
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox={viewBoxString}
        preserveAspectRatio="xMidYMid slice"
        animate={{ viewBox: viewBoxString }}
        transition={{ duration: isDragging ? 0 : 1.5, ease: "easeInOut" }}
      >
        <foreignObject 
          x={currentNode.x - 5} 
          y={currentNode.y - 8} 
          width="10" 
          height="10"
          className="overflow-visible"
        >
          <motion.div
            className={`w-full h-full flex items-center justify-center text-[0.5rem] md:text-[0.8rem] relative
              ${isMoving ? 'animate-walk' : 'animate-breathe'}
            `}
            initial={false}
            animate={{
              x: 0, 
            }}
            transition={{
              type: "spring",
              stiffness: 50,
              damping: 15,
            }}
          >
            <div className="text-4xl filter drop-shadow-2xl relative z-50">
              {characterIcon}
              
              {/* Glowing Ring */}
              <div className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-2 bg-black/20 blur-sm rounded-[100%]`} />
              <div className={`absolute -inset-2 rounded-full border-2 border-white/50 animate-ping opacity-20`} />
            </div>
            
            {/* Footstep Particles */}
            {isMoving && (
               <div className="absolute bottom-0 left-1/2 w-1 h-1 bg-white/50 rounded-full animate-ping" />
            )}
          </motion.div>
        </foreignObject>
      </motion.svg>
    </div>
  );
};

export default GameBoard;
