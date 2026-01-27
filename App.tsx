
import React, { useState, useMemo } from 'react';
import { TEAMS, DOOR_POINTS, SKILLS, QUESTION_REWARDS, INCIDENT_REWARDS, EXTINGUISHER_USE_REWARDS } from './constants';
import { TeamState, TeamColor, DoorState, Resource } from './types';
import TeamCard from './components/TeamCard';
import SkillsModal from './components/SkillsModal';
import QuestionsModal from './components/QuestionsModal';
import RewardModal from './components/RewardModal';
import Leaderboard from './components/Leaderboard';
import IncidentsLibraryModal from './components/IncidentsLibraryModal';
import ChallengeResultModal from './components/ChallengeResultModal';
import { Users, LayoutDashboard, Crown, Activity, Info, BookOpen, AlertTriangle, Shield, RefreshCcw } from 'lucide-react';

const initialTeamState = (color: TeamColor): TeamState => ({
  color,
  active: false,
  completedSkills: SKILLS.reduce((acc, s) => ({ ...acc, [s.id]: [false, false, false] }), {}),
  answeredQuestions: [],
  completedIncidents: [],
  incidentCount: 0,
  routeLength: 0, 
  doors: {
    count: 0 
  },
  fireExtinguishers: 0
});

const App: React.FC = () => {
  const [view, setView] = useState<'setup' | 'dashboard'>('setup');
  
  const [teams, setTeams] = useState<Record<TeamColor, TeamState>>({
    red: initialTeamState('red'),
    green: initialTeamState('green'),
    yellow: initialTeamState('yellow'),
    orange: initialTeamState('orange'),
  });

  const [activeModal, setActiveModal] = useState<{ type: 'skills' | 'questions' | 'incidents_library', teamColor?: TeamColor } | null>(null);
  const [rewardData, setRewardData] = useState<{ 
    teamColor: TeamColor; 
    resources: Resource[];
    source: string;
  } | null>(null);

  const [challengeResult, setChallengeResult] = useState<{
    challenger: { color: TeamColor; correct: boolean };
    opponent: { color: TeamColor; correct: boolean };
  } | null>(null);

  const toggleTeamActive = (color: TeamColor) => {
    setTeams(prev => ({
      ...prev,
      [color]: { ...prev[color], active: !prev[color].active }
    }));
  };

  const handleReset = () => {
    const confirmReset = window.confirm("Weet je zeker dat je het spel wilt resetten? Alle voortgang van alle teams wordt gewist.");
    if (confirmReset) {
      // Reset alle team data
      setTeams({
        red: initialTeamState('red'),
        green: initialTeamState('green'),
        yellow: initialTeamState('yellow'),
        orange: initialTeamState('orange'),
      });
      
      // Sluit alle openstaande UI elementen
      setActiveModal(null);
      setRewardData(null);
      setChallengeResult(null);
      
      // Terug naar setup
      setView('setup');
    }
  };

  const handleToggleSkill = (teamColor: TeamColor, skillId: string, studentIndex: number | 'all') => {
    const skill = SKILLS.find(s => s.id === skillId);
    if (!skill) return;

    setTeams(prev => {
      const team = prev[teamColor];
      const currentStatus = [...team.completedSkills[skillId]];
      const wasFullyComplete = currentStatus.every(s => s === true);
      
      let nextStatus: boolean[];
      if (studentIndex === 'all') {
        const anyIncomplete = currentStatus.some(s => s === false);
        nextStatus = [anyIncomplete, anyIncomplete, anyIncomplete];
      } else {
        nextStatus = [...currentStatus];
        nextStatus[studentIndex] = !nextStatus[studentIndex];
      }

      const isNowFullyComplete = nextStatus.every(s => s === true);
      
      if (isNowFullyComplete && !wasFullyComplete) {
        setRewardData({ teamColor, resources: skill.rewards, source: skill.name });
      }

      return {
        ...prev,
        [teamColor]: {
          ...team,
          completedSkills: {
            ...team.completedSkills,
            [skillId]: nextStatus
          }
        }
      };
    });
  };

  const handleToggleQuestion = (teamColor: TeamColor, questionId: number) => {
    setTeams(prev => {
      const team = prev[teamColor];
      const hasAnswered = team.answeredQuestions.includes(questionId);
      if (!hasAnswered) {
        setRewardData({ teamColor, resources: QUESTION_REWARDS, source: 'Vraag goed beantwoord' });
      }
      return {
        ...prev,
        [teamColor]: {
          ...team,
          answeredQuestions: hasAnswered
            ? team.answeredQuestions.filter(id => id !== questionId)
            : [...team.answeredQuestions, questionId]
        }
      };
    });
  };

  const handleChallenge = (
    incidentId: number, 
    challenger: TeamColor, 
    opponent: TeamColor, 
    challengerCorrect: boolean, 
    opponentCorrect: boolean
  ) => {
    setTeams(prev => {
      const nextTeams = { ...prev };
      
      if (challengerCorrect) {
        const team = nextTeams[challenger];
        if (!team.completedIncidents.includes(incidentId)) {
          nextTeams[challenger] = {
            ...team,
            completedIncidents: [...team.completedIncidents, incidentId],
            incidentCount: team.completedIncidents.length + 1
          };
        }
      }
      
      if (opponentCorrect) {
        const team = nextTeams[opponent];
        if (!team.completedIncidents.includes(incidentId)) {
          nextTeams[opponent] = {
            ...team,
            completedIncidents: [...team.completedIncidents, incidentId],
            incidentCount: team.completedIncidents.length + 1
          };
        }
      }
      
      return nextTeams;
    });

    setChallengeResult({
      challenger: { color: challenger, correct: challengerCorrect },
      opponent: { color: opponent, correct: opponentCorrect }
    });
  };

  const handleUpdateRoute = (teamColor: TeamColor, val: number) => {
    setTeams(prev => ({ ...prev, [teamColor]: { ...prev[teamColor], routeLength: val } }));
  };

  const handleUpdateDoors = (teamColor: TeamColor, val: number) => {
    setTeams(prev => ({
      ...prev,
      [teamColor]: { 
        ...prev[teamColor], 
        doors: { count: val }
      }
    }));
  };

  const handleUpdateExtinguishers = (teamColor: TeamColor, val: number) => {
    setTeams(prev => ({ ...prev, [teamColor]: { ...prev[teamColor], fireExtinguishers: val } }));
  };

  const handleUseExtinguisher = (teamColor: TeamColor) => {
    setTeams(prev => {
      const current = prev[teamColor].fireExtinguishers;
      if (current > 0) {
        setRewardData({ 
          teamColor, 
          resources: EXTINGUISHER_USE_REWARDS, 
          source: 'Brandblusser ingezet (vraag overgeslagen)' 
        });
        return {
          ...prev,
          [teamColor]: { ...prev[teamColor], fireExtinguishers: current - 1 }
        };
      }
      return prev;
    });
  };

  const activeTeamsList = (Object.values(teams) as TeamState[]).filter(t => t.active);
  const hasActiveTeams = activeTeamsList.length > 0;

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-900">
      {/* Tablet-optimized navbar with larger touch targets */}
      <nav className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-30">
        <div className="max-w-full mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
             <div className="p-1.5 rounded-lg text-white" style={{ backgroundColor: '#002b47' }}>
                <Crown size={18} />
             </div>
             <h1 className="text-lg font-rockwell font-black tracking-tight" style={{ color: '#002b47' }}>
               BHV Land Dashboard
             </h1>
          </div>
          <div className="flex items-center gap-2">
            {view === 'dashboard' && (
              <>
                <button
                  onClick={() => setActiveModal({ type: 'incidents_library' })}
                  className="min-h-[44px] text-sm font-bold text-red-600 hover:text-red-800 transition-colors flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-50 active:bg-red-100"
                >
                  <AlertTriangle size={18} /> Incidenten
                </button>
                <button
                  onClick={() => setView('setup')}
                  className="min-h-[44px] text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors flex items-center gap-1.5 px-4 py-2 rounded-xl hover:bg-slate-100 active:bg-slate-200"
                >
                  <Users size={18} /> Teams
                </button>
              </>
            )}
            <button
              onClick={handleReset}
              className="min-h-[44px] text-sm font-bold text-red-500 hover:text-red-700 transition-colors flex items-center gap-1.5 px-4 py-2 rounded-xl hover:bg-red-50 active:bg-red-100"
            >
              <RefreshCcw size={18} /> Reset
            </button>
          </div>
        </div>
      </nav>

      {/* Tablet-optimized main content with reduced padding */}
      <main className="max-w-full mx-auto px-3 py-3">
        {view === 'setup' && (
          <div className="max-w-3xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200">
                <div className="text-center mb-6">
                <div className="inline-flex p-3 rounded-xl mb-3" style={{ backgroundColor: '#002b4715', color: '#002b47' }}>
                    <Activity size={28} />
                </div>
                <h2 className="text-2xl font-rockwell font-bold text-slate-800 mb-2">Sessie Setup</h2>
                <p className="text-slate-500 font-medium text-sm">Selecteer de deelnemende teams</p>
                </div>

                {/* Tablet optimized: 2x2 grid for teams */}
                <div className="grid grid-cols-2 gap-3">
                {(Object.keys(TEAMS) as TeamColor[]).map((color) => {
                    const config = TEAMS[color];
                    const isActive = teams[color].active;
                    return (
                    <button
                        key={color}
                        onClick={() => toggleTeamActive(color)}
                        className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all duration-200 min-h-[64px] active:scale-[0.98] ${
                        isActive
                            ? 'bg-slate-50'
                            : 'border-slate-100 bg-slate-50 opacity-60'
                        }`}
                        style={{ borderColor: isActive ? '#002b47' : '' }}
                    >
                        <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full shadow-md flex items-center justify-center text-white font-bold`} style={{ backgroundColor: config.hex }}>
                            {isActive ? <Users size={18} className={config.textColor} /> : <div className="w-2.5 h-2.5 bg-white/40 rounded-full" />}
                        </div>
                        <span className="text-lg font-rockwell font-bold text-slate-800">{config.name}</span>
                        </div>
                        <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center ${isActive ? 'border-transparent' : 'border-slate-300'}`} style={{ backgroundColor: isActive ? '#002b47' : '' }}>
                        {isActive && <Users size={14} className="text-white" />}
                        </div>
                    </button>
                    );
                })}
                </div>

                <button
                onClick={() => setView('dashboard')}
                disabled={!hasActiveTeams}
                className={`w-full mt-6 py-4 rounded-xl font-rockwell font-black text-lg shadow-lg flex items-center justify-center gap-3 transition-all min-h-[56px] active:scale-[0.98] ${
                    hasActiveTeams
                    ? 'text-white'
                    : 'bg-slate-300 text-slate-500 cursor-not-allowed'
                }`}
                style={{ backgroundColor: hasActiveTeams ? '#002b47' : '' }}
                >
                <LayoutDashboard size={22} />
                Start Overzicht
                </button>
            </div>
          </div>
        )}

        {view === 'dashboard' && (
          <div className="space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {hasActiveTeams && (
                <Leaderboard teams={activeTeamsList} />
            )}

            {/* Tablet-optimized grid: always show teams side by side */}
            <div className={`grid gap-3 ${
              activeTeamsList.length === 1 ? 'grid-cols-1 max-w-md mx-auto' :
              activeTeamsList.length === 2 ? 'grid-cols-2' :
              activeTeamsList.length === 3 ? 'grid-cols-3' :
              'grid-cols-4'
            }`}>
              {activeTeamsList.map(team => (
                <TeamCard 
                  key={team.color}
                  teamState={team}
                  onOpenSkills={() => setActiveModal({ type: 'skills', teamColor: team.color })}
                  onOpenQuestions={() => setActiveModal({ type: 'questions', teamColor: team.color })}
                  onOpenIncidentsLibrary={() => setActiveModal({ type: 'incidents_library', teamColor: team.color })}
                  onAddIncident={() => {}} 
                  onRemoveIncident={() => {}} 
                  onUpdateRoute={(val) => handleUpdateRoute(team.color, val)}
                  onUpdateDoors={(val) => handleUpdateDoors(team.color, val)}
                  onUpdateExtinguishers={(val) => handleUpdateExtinguishers(team.color, val)}
                  onUseExtinguisher={() => handleUseExtinguisher(team.color)}
                />
              ))}
            </div>

            {activeModal?.type === 'skills' && activeModal.teamColor && (
              <SkillsModal 
                isOpen={true}
                teamState={teams[activeModal.teamColor]}
                onClose={() => setActiveModal(null)}
                toggleSkill={(skillId, studentIndex) => handleToggleSkill(activeModal.teamColor!, skillId, studentIndex)}
              />
            )}

            {activeModal?.type === 'questions' && activeModal.teamColor && (
              <QuestionsModal 
                isOpen={true}
                teamState={teams[activeModal.teamColor]}
                onClose={() => setActiveModal(null)}
                toggleQuestion={(qId) => handleToggleQuestion(activeModal.teamColor!, qId)}
              />
            )}

            {activeModal?.type === 'incidents_library' && (
              <IncidentsLibraryModal 
                isOpen={true}
                onClose={() => setActiveModal(null)}
                activeTeam={activeModal.teamColor ? teams[activeModal.teamColor] : undefined}
                allTeams={teams}
                onCompleteChallenge={handleChallenge}
              />
            )}
            
            {rewardData && (
                <RewardModal 
                    teamColor={rewardData.teamColor}
                    resources={rewardData.resources}
                    source={rewardData.source}
                    onClose={() => setRewardData(null)}
                />
            )}

            {challengeResult && (
              <ChallengeResultModal 
                challenger={challengeResult.challenger}
                opponent={challengeResult.opponent}
                onClose={() => setChallengeResult(null)}
              />
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
