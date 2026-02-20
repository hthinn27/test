import React, { useState } from 'react';
import { Character, CharacterId, GameStatus, PopulationLevels, BiodiversityLevels } from './types';
import { CHARACTERS } from './constants';
import ProgressBar from './components/ProgressBar';
import Round from './components/Round';
import Ending from './components/Ending';
import Lobby from './components/Lobby';
import AnimatedBackground from './components/AnimatedBackground';
import BadgeNotification from './components/BadgeNotification';
import WelcomeScreen from './components/WelcomeScreen';

const App: React.FC = () => {
  const [status, setStatus] = useState<GameStatus>('lobby');
  const [selectedCharId, setSelectedCharId] = useState<CharacterId | null>(null);
  const [health, setHealth] = useState(100);
  const [score, setScore] = useState(0);
  const [popIndex, setPopIndex] = useState(5);
  const [bioIndex, setBioIndex] = useState(5);
  const [roundIndex, setRoundIndex] = useState(0);
  const [consequence, setConsequence] = useState<{ text: string; ripple: string; reflection: string; visual?: string; explanation: string } | null>(null);
  const [activeBadge, setActiveBadge] = useState<string | null>(null);
  const [scoreChange, setScoreChange] = useState<{ val: number; id: number } | null>(null);

  const resetGame = () => {
    setStatus('lobby');
    setSelectedCharId(null);
    setHealth(100);
    setScore(0);
    setPopIndex(5);
    setBioIndex(5);
    setRoundIndex(0);
    setConsequence(null);
    setActiveBadge(null);
    setScoreChange(null);
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

    setConsequence({
      text: choice.consequence,
      ripple: choice.rippleEffect,
      reflection: choice.reflectionQuestion,
      visual: choice.visual,
      explanation: choice.explanation
    });

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
      if (roundIndex === 1) return 'urban'; // Chainsaws/Roads
      if (roundIndex === 2) return 'urban'; // Industrial
      if (roundIndex === 3) return 'desert'; // Wildfire/Crisis
      return 'forest';
    }
    if (char.id === 'turtle') {
      if (roundIndex === 2) return 'desert'; // Bleaching/Warming (metaphorical heat)
      return 'ocean';
    }
    if (char.id === 'bear') {
      if (roundIndex >= 2) return 'ocean'; // Melting ice -> more water
      return 'arctic';
    }
    if (char.id === 'bee') {
      if (roundIndex === 1) return 'grassland'; // Monoculture
      if (roundIndex === 2) return 'urban'; // Urban Hive
      return 'grassland';
    }
    return 'forest';
  };

  return (
    <div className="min-h-screen relative overflow-hidden font-sans text-stone-800">
      <AnimatedBackground type={getBackgroundType()} />
      
      {activeBadge && (
        <BadgeNotification badge={activeBadge} onClose={() => setActiveBadge(null)} />
      )}

      {/* Score Change Floating Animation */}
      {scoreChange && (
        <div 
          key={scoreChange.id}
          className={`fixed top-24 right-10 z-50 text-4xl font-black animate-[float_1s_ease-out_forwards] ${scoreChange.val >= 0 ? 'text-emerald-400' : 'text-red-400'} drop-shadow-md`}
          onAnimationEnd={() => setScoreChange(null)}
        >
          {scoreChange.val > 0 ? '+' : ''}{scoreChange.val}
        </div>
      )}

      <div className="max-w-5xl mx-auto px-4 py-8 min-h-screen flex flex-col items-center justify-center relative z-10">
        
        {status === 'lobby' && (
          <WelcomeScreen onStart={handleStartGame} />
        )}

        {status === 'start' && (
          <div className="w-full animate-slide-up">
             <Lobby onSelect={handleCharSelect} />
          </div>
        )}

        {status === 'playing' && selectedCharId && (
          <div className="w-full bg-white/60 backdrop-blur-xl rounded-[3rem] p-6 md:p-10 shadow-2xl border border-white/40 animate-slide-up">
            {/* Status Bar */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 bg-white/50 rounded-3xl p-6 border border-white/50 shadow-inner items-center">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-stone-500 tracking-widest block">Ecosystem Health</label>
                <ProgressBar value={health} />
              </div>
              
              <div className="flex flex-col items-center justify-center">
                 <div className="bg-stone-800 text-white px-6 py-2 rounded-full font-black text-xl shadow-lg border border-stone-600 flex items-center gap-2">
                   <span>🏆</span> {score}
                 </div>
              </div>

              <div className="flex flex-col justify-end items-end md:items-start">
                <label className="text-[10px] font-black uppercase text-stone-500 tracking-widest block mb-1">Biodiversity</label>
                <div className={`font-black text-xl tracking-tight ${bioIndex < 2 ? 'text-red-600' : bioIndex < 4 ? 'text-amber-600' : 'text-emerald-600'}`}>
                  🌿 {BiodiversityLevels[bioIndex]}
                </div>
              </div>
            </div>

            {/* Current Round */}
            <Round 
              scenario={CHARACTERS[selectedCharId].scenarios[roundIndex]}
              onChoice={handleChoice}
              consequence={consequence}
              onNext={nextRound}
              isLastRound={roundIndex === CHARACTERS[selectedCharId].scenarios.length - 1}
              characterId={selectedCharId}
            />
          </div>
        )}

        {status === 'end' && selectedCharId && (
          <Ending 
            health={health} 
            char={CHARACTERS[selectedCharId]} 
            onRestart={resetGame}
            score={score}
          />
        )}
        
        {status !== 'lobby' && (
          <footer className="mt-12 text-center text-white/60 text-xs font-bold uppercase tracking-widest animate-fade-in drop-shadow-md">
            <p>&copy; 2026 Ecosystem Survival Education Project</p>
          </footer>
        )}
      </div>
    </div>
  );
};

export default App;
