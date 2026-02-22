import React, { useState, useEffect } from 'react';
import { Character, CharacterId, GameStatus, PopulationLevels, BiodiversityLevels, PathNode } from './types';
import { CHARACTERS } from './constants';
import ProgressBar from './components/ProgressBar';
import Round from './components/Round';
import Ending from './components/Ending';
import Lobby from './components/Lobby';
import AnimatedBackground from './components/AnimatedBackground';
import BadgeNotification from './components/BadgeNotification';
import WelcomeScreen from './components/WelcomeScreen';
import GameBoard from './components/GameBoard';
import QuizModal from './components/QuizModal';
import { motion, AnimatePresence } from 'motion/react';

const App: React.FC = () => {
  const [status, setStatus] = useState<GameStatus>('lobby');
  const [selectedCharId, setSelectedCharId] = useState<CharacterId | null>(null);
  const [slowMode, setSlowMode] = useState(false);
  const [health, setHealth] = useState(100);
  const [score, setScore] = useState(0);
  const [popIndex, setPopIndex] = useState(5);
  const [bioIndex, setBioIndex] = useState(5);
  const [roundIndex, setRoundIndex] = useState(0);
  const [pathIndex, setPathIndex] = useState(0);
  const [isMoving, setIsMoving] = useState(false);
  const [consequence, setConsequence] = useState<{ text: string; ripple: string; reflection: string; visual?: string; explanation: string } | null>(null);
  const [activeBadge, setActiveBadge] = useState<string | null>(null);
  const [scoreChange, setScoreChange] = useState<{ val: number; id: number } | null>(null);
  const [showMiniMap, setShowMiniMap] = useState(false);
  const [milestoneMessage, setMilestoneMessage] = useState<string | null>(null);
  const [activeNode, setActiveNode] = useState<PathNode | null>(null);
  const [npcReaction, setNpcReaction] = useState<'happy' | 'sad' | 'neutral' | null>(null);
  const [earnedBadges, setEarnedBadges] = useState<string[]>([]);

  const resetGame = () => {
    setStatus('lobby');
    setSelectedCharId(null);
    setHealth(100);
    setScore(0);
    setPopIndex(5);
    setBioIndex(5);
    setRoundIndex(0);
    setPathIndex(0);
    setConsequence(null);
    setActiveBadge(null);
    setScoreChange(null);
    setIsMoving(false);
    setShowMiniMap(false);
    setMilestoneMessage(null);
    setActiveNode(null);
    setNpcReaction(null);
    setEarnedBadges([]);
  };

  const handleStartGame = () => {
    setStatus('start');
  };

  const handleCharSelect = (id: CharacterId) => {
    const char = CHARACTERS[id];
    setSelectedCharId(id);
    setHealth(char.initialHealth);
    setPopIndex(char.initialPop);
    setBioIndex(char.initialBio);
    setStatus('playing');
    setPathIndex(0);
  };

  const handleNodeClick = (node: PathNode) => {
    if (node.funFact || node.quiz) {
      setActiveNode(node);
    }
  };

  const handleReward = (reward: string) => {
    setScore(prev => prev + 500);
    setScoreChange({ val: 500, id: Date.now() });
    setActiveBadge(reward);
    setEarnedBadges(prev => [...new Set([...prev, reward])]);
    setNpcReaction('happy');
    setTimeout(() => setNpcReaction(null), 3000);
    setTimeout(() => setActiveNode(null), 2000);
  };

  const handleChoice = (choice: any) => {
    const healthImpact = choice.impact.health;
    const newHealth = Math.max(0, Math.min(100, health + healthImpact));
    setHealth(newHealth);
    setPopIndex(prev => Math.max(0, Math.min(5, prev + choice.impact.pop)));
    setBioIndex(prev => Math.max(0, Math.min(5, prev + choice.impact.bio)));
    
    // Score Calculation logic
    let points = 0;
    if (healthImpact > 0) points += 100;
    else if (healthImpact === 0) points += 50;
    else points -= 50;
    
    if (choice.impact.pop > 0) points += 50;
    if (choice.impact.bio > 0) points += 50;

    setScore(prev => Math.max(0, prev + points));
    setScoreChange({ val: points, id: Date.now() });

    // NPC Reaction Logic
    if (healthImpact > 0) setNpcReaction('happy');
    else if (healthImpact < 0) setNpcReaction('sad');
    else setNpcReaction('neutral');
    
    setTimeout(() => setNpcReaction(null), 3000);

    setConsequence({
      text: choice.consequence,
      ripple: choice.rippleEffect,
      reflection: choice.reflectionQuestion,
      visual: choice.visual,
      explanation: choice.explanation
    });

    // Movement Logic
    setIsMoving(true);
    const char = CHARACTERS[selectedCharId!];
    const currentNode = char.path[pathIndex];
    
    // Branching Logic
    let nextNodeId = currentNode.id + 1; // Default fallback
    if (currentNode.next && currentNode.next.length > 0) {
      if (currentNode.next.length === 1) {
        nextNodeId = currentNode.next[0];
      } else {
        // Branch based on choice impact (Good -> 0, Bad -> 1)
        // Assuming index 0 is the "better" or "standard" path, and 1 is "worse" or "alternative"
        // In my constants: Node 2 -> [3, 4]. 3 is Chainsaw Ridge (Normal), 4 is Polluted Creek (Disaster).
        // Actually, both seem bad, but let's assume 0 is the default path.
        // Let's use healthImpact to decide.
        const branchIndex = healthImpact >= 0 ? 0 : 1;
        nextNodeId = currentNode.next[branchIndex] !== undefined ? currentNode.next[branchIndex] : currentNode.next[0];
      }
    }
    
    // Find index of the next node ID
    const nextPathIndex = char.path.findIndex(n => n.id === nextNodeId);
    const finalPathIndex = nextPathIndex !== -1 ? nextPathIndex : Math.min(char.path.length - 1, pathIndex + 1);

    setTimeout(() => {
      setPathIndex(finalPathIndex);
      setIsMoving(false);
      
      // Milestone Check
      if (finalPathIndex > 0 && finalPathIndex % 3 === 0) {
         setMilestoneMessage(`Milestone Reached: Node ${finalPathIndex}!`);
         setTimeout(() => setMilestoneMessage(null), 3000);
      }

      // Special Node Effects
      const landedNode = char.path[finalPathIndex];
      if (landedNode.type === 'restoration') {
        setHealth(prev => Math.min(100, prev + 10));
        setScore(prev => prev + 200);
        setScoreChange({ val: 200, id: Date.now() + 1 });
      } else if (landedNode.type === 'disaster') {
        setHealth(prev => Math.max(0, prev - 15));
        setScore(prev => Math.max(0, prev - 100));
        setScoreChange({ val: -100, id: Date.now() + 1 });
      } else if (landedNode.type === 'knowledge') {
        setScore(prev => prev + 300);
        setScoreChange({ val: 300, id: Date.now() + 1 });
      } else if (landedNode.type === 'quiz' || landedNode.type === 'funfact') {
        // Auto-open quiz/fact if landed on? Or wait for user click?
        // User asked for "Click/tap nodes to see details".
        // But "Special nodes trigger a fun fact popup".
        // Let's auto-trigger it for better engagement.
        setActiveNode(landedNode);
      }
    }, 1500); // Increased delay to allow walking animation to finish

    // Badge Logic
    if (newHealth >= 90 && roundIndex === 0) {
      if (selectedCharId === 'deer') setActiveBadge('Forest Guardian');
      if (selectedCharId === 'turtle') setActiveBadge('Ocean Protector');
      if (selectedCharId === 'bear') setActiveBadge('Arctic Defender');
      if (selectedCharId === 'bee') setActiveBadge('Pollinator Pal');
    }
    if (newHealth >= 95 && roundIndex === 2) {
      setActiveBadge('Eco-Warrior');
    }
  };

  const nextRound = () => {
    if (selectedCharId && roundIndex < CHARACTERS[selectedCharId].scenarios.length - 1) {
      setRoundIndex(prev => prev + 1);
      setConsequence(null);
    } else {
      if (health >= 80) setActiveBadge('Climate Hero');
      setStatus('end');
    }
  };

  const getBackgroundType = () => {
    if (status === 'lobby' || status === 'start') return 'forest';
    if (!selectedCharId) return 'forest';
    
    const char = CHARACTERS[selectedCharId];
    
    // Dynamic progression based on round/story
    if (char.id === 'deer') {
      if (roundIndex === 1) return 'urban';
      if (roundIndex === 2) return 'urban';
      if (roundIndex === 3) return 'desert';
      return 'forest';
    }
    if (char.id === 'turtle') {
      if (roundIndex === 2) return 'desert';
      return 'ocean';
    }
    if (char.id === 'bear') {
      if (roundIndex >= 2) return 'ocean';
      return 'arctic';
    }
    if (char.id === 'bee') {
      if (roundIndex === 1) return 'grassland';
      if (roundIndex === 2) return 'urban';
      return 'grassland';
    }
    if (char.id === 'fox') {
      if (roundIndex >= 2) return 'forest';
      return 'urban';
    }
    if (char.id === 'camel') {
      return 'desert';
    }
    return 'forest';
  };

  return (
    <div className="h-screen w-screen overflow-hidden font-sans text-stone-800 flex flex-col relative">
      <AnimatedBackground type={getBackgroundType()} health={health} />
      
      {activeBadge && (
        <BadgeNotification badge={activeBadge} onClose={() => setActiveBadge(null)} />
      )}

      {/* Score Change Floating Animation */}
      {scoreChange && (
        <div 
          key={scoreChange.id}
          className={`fixed top-24 right-10 z-[60] text-4xl font-black animate-[float_1s_ease-out_forwards] ${scoreChange.val >= 0 ? 'text-emerald-400' : 'text-red-400'} drop-shadow-md pointer-events-none`}
          onAnimationEnd={() => setScoreChange(null)}
        >
          {scoreChange.val > 0 ? '+' : ''}{scoreChange.val}
          {/* Simple Particles for Positive Score */}
          {scoreChange.val > 0 && [...Array(6)].map((_, i) => (
             <motion.div 
               key={i} 
               initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
               animate={{ opacity: 0, scale: 1.5, x: (Math.random() - 0.5) * 60, y: (Math.random() - 0.5) * 60 }}
               transition={{ duration: 0.8, ease: "easeOut" }}
               className="absolute top-1/2 left-1/2 w-2 h-2 bg-yellow-300 rounded-full"
             />
          ))}
        </div>
      )}

      {/* Milestone Popup */}
      <AnimatePresence>
        {milestoneMessage && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.8 }}
            className="fixed top-32 left-1/2 -translate-x-1/2 z-[65] bg-gradient-to-r from-amber-400 to-orange-500 text-white px-6 py-3 rounded-full shadow-xl border-2 border-white/30 flex items-center gap-3"
          >
            <span className="text-2xl animate-bounce">🚩</span>
            <div className="flex flex-col">
              <span className="font-black uppercase tracking-widest text-sm md:text-base">{milestoneMessage}</span>
              <span className="text-[10px] font-bold opacity-90">Keep going! Ecosystem is evolving.</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mini Map Modal */}
      <AnimatePresence>
        {showMiniMap && selectedCharId && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm overflow-y-auto"
            onClick={() => setShowMiniMap(false)}
          >
            <div className="flex min-h-full items-center justify-center p-4">
              <div 
                className="bg-white/90 rounded-3xl p-6 w-full max-w-md shadow-2xl border-4 border-emerald-500 my-8" 
                onClick={e => e.stopPropagation()}
              >
                 <h3 className="text-xl font-black uppercase text-stone-700 mb-4 text-center">Journey Map</h3>
                 <div className="grid grid-cols-3 gap-4 max-h-[60vh] overflow-y-auto custom-scrollbar">
                    {CHARACTERS[selectedCharId].path.map((node, i) => (
                      <div key={i} className={`flex flex-col items-center p-2 rounded-xl ${i === pathIndex ? 'bg-emerald-100 border-2 border-emerald-400' : 'bg-stone-100'}`}>
                         <span className="text-2xl mb-1">{i === pathIndex ? '📍' : i < pathIndex ? '✅' : node.npc ? node.npc : '⭕'}</span>
                         <span className="text-[10px] font-bold uppercase text-center leading-tight">{node.label}</span>
                      </div>
                    ))}
                 </div>
                 <button onClick={() => setShowMiniMap(false)} className="mt-6 w-full py-3 bg-stone-800 text-white font-bold rounded-xl uppercase">Close Map</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quiz / Fun Fact Modal */}
      <AnimatePresence>
        {activeNode && (
          <QuizModal 
            node={activeNode} 
            onClose={() => setActiveNode(null)} 
            onReward={handleReward}
          />
        )}
      </AnimatePresence>

      {status === 'lobby' && (
        <div className="flex-1 flex items-center justify-center z-10">
           <WelcomeScreen onStart={handleStartGame} />
        </div>
      )}

      {status === 'start' && (
        <div className="flex-1 w-full z-10 overflow-y-auto overscroll-y-contain -webkit-overflow-scrolling-touch">
           <Lobby onSelect={handleCharSelect} slowMode={slowMode} setSlowMode={setSlowMode} />
        </div>
      )}

      {status === 'playing' && selectedCharId && (
        <div className="flex flex-col h-full w-full relative z-10">
          {/* TOP ZONE: Header & Stats - Fixed Height */}
          <div className="flex-none z-30 px-4 py-2 bg-gradient-to-b from-black/60 to-transparent">
             <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
                {/* Health Bar */}
                <div className="flex-1 max-w-xs">
                   <div className="flex justify-between items-center mb-1">
                      <span className="text-[10px] font-black uppercase text-white tracking-widest drop-shadow-md">Ecosystem Health</span>
                      <span className="text-xs font-bold text-white drop-shadow-md">{health}%</span>
                   </div>
                   <ProgressBar value={health} />
                </div>

                {/* Score & Mini Map Button */}
                <div className="flex items-center gap-3">
                   {earnedBadges.length > 0 && (
                     <motion.div 
                       key={earnedBadges.length}
                       initial={{ scale: 1.2, filter: 'brightness(1.5)' }}
                       animate={{ scale: 1, filter: 'brightness(1)' }}
                       className="bg-amber-500/80 text-white px-3 py-1 md:px-4 md:py-2 rounded-full font-black text-sm md:text-lg shadow-lg border border-white/20 flex items-center gap-2 backdrop-blur-md"
                     >
                       <span>🎖️</span> {earnedBadges.length}
                     </motion.div>
                   )}
                   <motion.div 
                     key={score}
                     initial={{ scale: 1.2, filter: 'brightness(1.5)' }}
                     animate={{ scale: 1, filter: 'brightness(1)' }}
                     className="bg-stone-900/80 text-white px-3 py-1 md:px-4 md:py-2 rounded-full font-black text-sm md:text-lg shadow-lg border border-white/20 flex items-center gap-2 backdrop-blur-md"
                   >
                     <span>🏆</span> {score}
                   </motion.div>
                   <button 
                     onClick={() => setShowMiniMap(true)}
                     className="w-8 h-8 md:w-10 md:h-10 bg-emerald-500 hover:bg-emerald-400 text-white rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110 border-2 border-white/30"
                   >
                     🗺️
                   </button>
                </div>
             </div>
          </div>

          {/* CENTER ZONE: Game Board - Flexible Height */}
          <div className="flex-1 min-h-0 relative z-10 w-full max-w-5xl mx-auto px-4 py-2 flex flex-col justify-center">
             <div className="w-full h-full relative bg-white/5 backdrop-blur-[2px] rounded-3xl border border-white/10 shadow-inner overflow-hidden">
                <GameBoard 
                  path={CHARACTERS[selectedCharId].path}
                  currentNodeIndex={pathIndex}
                  characterIcon={CHARACTERS[selectedCharId].icon}
                  isMoving={isMoving}
                  health={health}
                  locationName={CHARACTERS[selectedCharId].path[pathIndex]?.label}
                  onNodeClick={handleNodeClick}
                  npcReaction={npcReaction}
                />
             </div>
          </div>

          {/* BOTTOM ZONE: Question & Interaction - Auto Height with Max Limit */}
          <div className="flex-none z-30 w-full bg-gradient-to-t from-black/80 via-black/40 to-transparent pt-4 pb-6 px-4">
             <div className="max-w-3xl mx-auto">
                <Round 
                  scenario={CHARACTERS[selectedCharId].scenarios[roundIndex]}
                  onChoice={handleChoice}
                  consequence={consequence}
                  onNext={nextRound}
                  isLastRound={roundIndex === CHARACTERS[selectedCharId].scenarios.length - 1}
                  characterId={selectedCharId}
                  slowMode={slowMode}
                />
             </div>
          </div>
        </div>
      )}

      {status === 'end' && selectedCharId && (
        <div className="flex-1 z-10 overflow-y-auto">
          <Ending 
            health={health} 
            char={CHARACTERS[selectedCharId]} 
            onRestart={resetGame}
            score={score}
          />
        </div>
      )}
    </div>
  );
};

export default App;
