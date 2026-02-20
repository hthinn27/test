
export type CharacterId = 'deer' | 'turtle' | 'bear' | 'bee';

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
