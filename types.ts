
export type CharacterId = 'deer' | 'turtle' | 'bear' | 'bee' | 'fox' | 'camel';

export interface QuizData {
  question: string;
  options: string[];
  correctIndex: number;
  reward: string;
}

export interface PathNode {
  id: number;
  x: number; // 0-100 percentage
  y: number; // 0-100 percentage
  type: 'normal' | 'restoration' | 'disaster' | 'knowledge' | 'funfact' | 'quiz';
  label?: string;
  next?: number[]; // IDs of possible next nodes for branching
  funFact?: string;
  quiz?: QuizData;
  npc?: string; // Emoji or icon for NPC
  dialogue?: string; // Short dialogue line for NPC
}

export interface Impact {
  health: number;
  pop: number; // Index into population levels
  bio: number; // Index into biodiversity levels
}

export interface Choice {
  text: string;
  impact: Impact;
  consequence: string;
  rippleEffect: string;
  reflectionQuestion: string;
  visual?: string; // Emoji or short description for visual illustration
  explanation: string; // New field for educational reasoning
}

export interface Scenario {
  round: number;
  title: string;
  narrative: string;
  choices: Choice[];
}

export interface Character {
  id: CharacterId;
  name: string;
  icon: string;
  ecosystem: string;
  description: string;
  initialHealth: number;
  initialPop: number;
  initialBio: number;
  path: PathNode[];
  scenarios: Scenario[];
}

export type GameStatus = 'lobby' | 'start' | 'playing' | 'end';

export const PopulationLevels = [
  'Extinct',
  'Critical',
  'Endangered',
  'Declining',
  'Stable',
  'Thriving'
];

export const BiodiversityLevels = [
  'Severely Depleted',
  'Critical',
  'Fragile',
  'Moderate',
  'High',
  'Optimal'
];
