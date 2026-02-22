import React, { useState } from 'react';
import { motion } from 'motion/react';
import { PathNode, QuizData } from '../types';

interface QuizModalProps {
  node: PathNode;
  onClose: () => void;
  onReward?: (reward: string) => void;
}

const QuizModal: React.FC<QuizModalProps> = ({ node, onClose, onReward }) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleOptionClick = (index: number) => {
    if (selectedOption !== null) return; // Prevent multiple clicks
    setSelectedOption(index);
    
    if (node.quiz) {
      const correct = index === node.quiz.correctIndex;
      setIsCorrect(correct);
      if (correct && onReward) {
        onReward(node.quiz.reward);
      }
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[120] bg-black/80 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div className="flex min-h-full items-center justify-center p-4">
        <motion.div 
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          className="bg-white rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl border-4 border-blue-400 relative overflow-hidden my-8"
          onClick={e => e.stopPropagation()}
        >
          {/* Background Decoration */}
        <div className="absolute top-0 right-0 p-4 opacity-5 text-9xl pointer-events-none">
           {node.type === 'quiz' ? '❓' : '💡'}
        </div>

        <div className="relative z-10">
          <div className="flex justify-between items-center mb-4">
            <span className={`px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full ${node.quiz ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'}`}>
              {node.quiz ? 'Pop Quiz' : 'Fun Fact'}
            </span>
            <button onClick={onClose} className="w-8 h-8 flex items-center justify-center bg-stone-100 hover:bg-stone-200 rounded-full text-stone-500 font-bold">✕</button>
          </div>

          <h3 className="text-xl font-black text-stone-800 mb-2">{node.label}</h3>
          
          {node.funFact && (
            <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 mb-4">
              <p className="text-stone-800 font-medium leading-relaxed">
                {node.funFact}
              </p>
            </div>
          )}

          {node.quiz && (
            <div className="space-y-4">
              <p className="text-lg font-bold text-stone-800">{node.quiz.question}</p>
              <div className="grid gap-2">
                {node.quiz.options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleOptionClick(idx)}
                    disabled={selectedOption !== null}
                    className={`w-full p-3 rounded-xl text-left font-bold transition-all border-2 
                      ${selectedOption === null 
                        ? 'bg-stone-50 border-stone-200 hover:bg-blue-50 hover:border-blue-300 text-stone-600' 
                        : selectedOption === idx 
                          ? (isCorrect ? 'bg-green-100 border-green-500 text-green-800' : 'bg-red-100 border-red-500 text-red-800')
                          : (idx === node.quiz.correctIndex && selectedOption !== null ? 'bg-green-100 border-green-500 text-green-800' : 'opacity-50')
                      }
                    `}
                  >
                    {option}
                    {selectedOption === idx && (
                      <span className="float-right">
                        {isCorrect ? '✅' : '❌'}
                      </span>
                    )}
                  </button>
                ))}
              </div>
              
              {isCorrect !== null && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-3 rounded-xl text-center font-black uppercase tracking-widest ${isCorrect ? 'bg-green-500 text-white' : 'bg-stone-200 text-stone-500'}`}
                >
                  {isCorrect ? `Correct! Earned: ${node.quiz.reward}` : 'Try again next time!'}
                </motion.div>
              )}
            </div>
          )}

          {!node.quiz && (
            <button onClick={onClose} className="w-full mt-4 py-3 bg-stone-800 text-white font-bold rounded-xl uppercase tracking-widest">
              Got it!
            </button>
          )}
        </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default QuizModal;
