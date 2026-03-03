
export type TeamColor = 'red' | 'green' | 'yellow' | 'orange';

export type Resource = 'kennis' | 'samenwerking' | 'tijd' | 'besluitkracht' | 'materiaal' | 'keuze';

export interface TeamState {
  color: TeamColor;
  active: boolean;
  incidentCount: number;
  routeLength: number;
  doorCount: number;
  extinguisherCount: number;
  // Added to support skill and question tracking in modals
  completedSkills: string[];
  answeredQuestions: number[];
}

export interface TeamConfig {
  id: TeamColor;
  name: string;
  hex: string;
  textColor: string;
}
