
export type TeamColor = 'red' | 'green' | 'yellow' | 'orange';

export type Resource = 'kennis' | 'samenwerking' | 'tijd' | 'besluitkracht' | 'materiaal' | 'keuze';

export interface Skill {
  id: string;
  name: string;
  rewards: Resource[];
}

export interface Question {
  id: number;
  category: string;
  question: string;
  answer: string;
}

export interface IncidentQuestion {
  question: string;
  options: string[];
  answer: string;
}

export interface IncidentScenario {
  id: number;
  title: string;
  scenario: string;
  questions: IncidentQuestion[];
}

export interface DoorState {
  count: number;
}

export interface TeamState {
  color: TeamColor;
  active: boolean;
  completedSkills: Record<string, boolean[]>; // Skill ID -> [student1, student2, student3]
  answeredQuestions: number[]; // List of Question IDs
  completedIncidents: number[]; // List of Incident IDs
  incidentCount: number; // Legacy/Display count
  routeLength: number;
  doors: DoorState;
  fireExtinguishers: number;
}

export interface TeamConfig {
  id: TeamColor;
  name: string;
  hex: string;
  textColor: string;
}
