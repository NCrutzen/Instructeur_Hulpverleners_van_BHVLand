
import React from 'react';
import { TEAMS, SKILLS, QUESTIONS, DOOR_POINTS, MIN_SKILLS_REQUIRED, BUILDING_COSTS, RESOURCE_CONFIG } from '../constants';
import { TeamState, DoorState, Resource } from '../types';
import { BookOpen, AlertTriangle, Shield, Route, DoorOpen, CheckCircle2, Flame, Zap, Plus, Minus, Info, ExternalLink } from 'lucide-react';

interface Props {
  teamState: TeamState;
  onOpenSkills: () => void;
  onOpenQuestions: () => void;
  onOpenIncidentsLibrary: () => void;
  onAddIncident: () => void;
  onRemoveIncident: () => void;
  onUpdateRoute: (val: number) => void;
  onUpdateDoors: (val: number) => void;
  onUpdateExtinguishers: (val: number) => void;
  onUseExtinguisher: () => void;
}

const CostRow = ({ costs }: { costs: Array<{ resource: Resource; amount: number }> }) => (
  <div className="flex flex-wrap gap-1">
    {costs.map((c, i) => {
      const config = RESOURCE_CONFIG[c.resource];
      const Icon = config.icon;
      return (
        <div
          key={i}
          className="w-5 h-6 flex items-center justify-center text-white shadow-sm"
          style={{
            backgroundColor: config.color,
            clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
          }}
          title={`${c.amount}x ${config.label}`}
        >
          <Icon size={12} strokeWidth={2.5} />
        </div>
      );
    })}
  </div>
);

const TeamCard: React.FC<Props> = ({
  teamState,
  onOpenSkills,
  onOpenQuestions,
  onOpenIncidentsLibrary,
  onAddIncident,
  onRemoveIncident,
  onUpdateRoute,
  onUpdateDoors,
  onUpdateExtinguishers,
  onUseExtinguisher
}) => {
  const teamConfig = TEAMS[teamState.color];

  // Count only skills where all 3 students are checked
  const fullyCompletedSkills = (Object.values(teamState.completedSkills) as boolean[][]).filter(s => s.every(v => v === true)).length;
  const skillsProgress = Math.round((fullyCompletedSkills / SKILLS.length) * 100);
  const isSkillsComplete = fullyCompletedSkills >= MIN_SKILLS_REQUIRED;

  const questionsCount = teamState.answeredQuestions.length;
  const incidentCount = teamState.completedIncidents.length;

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200 flex flex-col h-full font-sans">
      {/* Compact Header for tablet */}
      <div
        className="p-2.5 relative overflow-hidden shrink-0"
        style={{ backgroundColor: teamConfig.hex }}
      >
        <div className="relative z-10 flex justify-between items-center">
            <h2 className={`text-lg font-rockwell font-black tracking-tight ${teamConfig.textColor}`}>
              {teamConfig.name}
            </h2>
            {incidentCount > 0 && (
                <div className="bg-white/20 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/30 text-white flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></div>
                    <span className="text-[10px] font-bold">{incidentCount} inc.</span>
                </div>
            )}
        </div>
      </div>

      {/* Compact stats row */}
      <div className="grid grid-cols-2 divide-x divide-slate-100 border-b border-slate-100 shrink-0">
        <div className="p-2 text-center">
            <p className="text-slate-500 text-[9px] font-bold uppercase tracking-wide">Vaardigheden</p>
            <div className="flex items-center justify-center gap-1">
                 <p className={`text-lg font-bold ${isSkillsComplete ? 'text-green-600' : 'text-slate-800'}`}>
                    {fullyCompletedSkills}
                 </p>
                 {isSkillsComplete && <CheckCircle2 size={14} className="text-green-500" />}
            </div>
        </div>
        <div className="p-2 text-center">
            <p className="text-slate-500 text-[9px] font-bold uppercase tracking-wide">Vragen</p>
            <p className="text-lg font-bold text-slate-800">{questionsCount}<span className="text-xs text-slate-400 font-normal">/{QUESTIONS.length}</span></p>
        </div>
      </div>

      {/* Action buttons - tablet optimized with larger touch targets */}
      <div className="p-2 space-y-2 flex-1 overflow-y-auto">
        <button
            onClick={onOpenSkills}
            className={`w-full flex items-center justify-between p-3 rounded-lg border transition-colors active:scale-[0.98] min-h-[48px] ${isSkillsComplete ? 'bg-green-50 border-green-200' : 'bg-slate-50 border-slate-200'}`}
        >
            <div className="flex items-center gap-2 w-full">
                <div className={`p-1.5 rounded-md ${isSkillsComplete ? 'bg-green-200 text-green-700' : 'bg-blue-100 text-blue-600'}`}>
                    <Shield size={16} />
                </div>
                <div className="text-left flex-1">
                    <p className={`text-sm font-bold ${isSkillsComplete ? 'text-green-800' : 'text-slate-800'}`}>
                        Vaardigheden
                    </p>
                    <div className="w-full h-1 bg-slate-200 rounded-full mt-1 overflow-hidden">
                        <div className={`h-full transition-all duration-500 ${isSkillsComplete ? 'bg-green-500' : 'bg-blue-500'}`} style={{ width: `${skillsProgress}%` }}></div>
                    </div>
                </div>
            </div>
            <span className="text-slate-400 text-lg">›</span>
        </button>

        <button
            onClick={onOpenQuestions}
            className="w-full flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200 transition-colors active:scale-[0.98] min-h-[48px]"
        >
            <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-md bg-indigo-100 text-indigo-600">
                    <BookOpen size={16} />
                </div>
                <p className="text-sm font-bold text-slate-800">Vragen</p>
            </div>
            <span className="text-slate-400 text-lg">›</span>
        </button>

        <button
            onClick={onOpenIncidentsLibrary}
            className={`w-full flex items-center justify-between p-3 rounded-lg border-2 transition-all active:scale-[0.98] min-h-[48px] ${
                incidentCount > 0 ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-200'
            }`}
        >
            <div className="flex items-center gap-2">
                <div className={`p-1.5 rounded-md transition-colors ${incidentCount > 0 ? 'bg-green-200 text-green-700' : 'bg-red-200 text-red-700'}`}>
                    <AlertTriangle size={16} />
                </div>
                <div className="text-left">
                    <p className={`text-sm font-bold ${incidentCount > 0 ? 'text-green-800' : 'text-red-800'}`}>
                        Incidenten
                    </p>
                    <p className="text-[9px] opacity-70">{incidentCount}/20</p>
                </div>
            </div>
            <div className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
                incidentCount > 0 ? 'bg-green-200 text-green-600' : 'bg-red-200 text-red-400'
            }`}>
                <Plus size={14} />
            </div>
        </button>
      </div>

      {/* Compact counters section for tablet */}
      <div className="bg-slate-50 border-t border-slate-200 shrink-0">
        {/* Route counter */}
        <div className="p-2 border-b border-slate-200">
            <div className="flex justify-between items-center mb-1">
                <label className="text-[9px] font-bold uppercase text-slate-400 flex items-center gap-1">
                    <Route size={10} /> Vluchtroute
                </label>
                <CostRow costs={BUILDING_COSTS.route} />
            </div>
            <div className="flex items-center justify-between bg-white rounded-md p-0.5 border border-slate-200">
                <button
                    onClick={() => onUpdateRoute(Math.max(0, teamState.routeLength - 1))}
                    className="w-10 h-10 flex items-center justify-center rounded hover:bg-slate-100 active:bg-slate-200 text-slate-600 font-bold text-lg"
                >-</button>
                <span className="font-mono font-bold text-xl text-slate-800">{teamState.routeLength}</span>
                <button
                    onClick={() => onUpdateRoute(teamState.routeLength + 1)}
                    className="w-10 h-10 flex items-center justify-center rounded hover:bg-slate-100 active:bg-slate-200 text-slate-600 font-bold text-lg"
                >+</button>
            </div>
        </div>

        {/* Door counter */}
        <div className="p-2 border-b border-slate-200">
            <div className="flex justify-between items-center mb-1">
                <label className="text-[9px] font-bold uppercase text-slate-400 flex items-center gap-1">
                   <DoorOpen size={10} /> Deur
                </label>
                <CostRow costs={BUILDING_COSTS.door} />
            </div>
            <div className="flex items-center justify-between bg-white rounded-md p-0.5 border border-slate-200">
                <button
                    onClick={() => onUpdateDoors(Math.max(0, teamState.doors.count - 1))}
                    className="w-10 h-10 flex items-center justify-center rounded hover:bg-slate-100 active:bg-slate-200 text-slate-600 font-bold text-lg"
                >-</button>
                <span className="font-mono font-bold text-xl text-slate-800">{teamState.doors.count}</span>
                <button
                    onClick={() => onUpdateDoors(teamState.doors.count + 1)}
                    className="w-10 h-10 flex items-center justify-center rounded hover:bg-slate-100 active:bg-slate-200 text-slate-600 font-bold text-lg"
                >+</button>
            </div>
        </div>

        {/* Extinguisher counter */}
        <div className="p-2 bg-red-50/50">
            <div className="flex justify-between items-center mb-1">
                <label className="text-[9px] font-bold uppercase text-red-400 flex items-center gap-1">
                    <Flame size={10} /> Brandblusser
                </label>
                <CostRow costs={BUILDING_COSTS.extinguisher} />
            </div>
            <div className="flex items-center justify-between bg-white rounded-md p-0.5 border border-slate-200">
                <button
                    onClick={() => onUpdateExtinguishers(Math.max(0, teamState.fireExtinguishers - 1))}
                    className="w-10 h-10 flex items-center justify-center rounded hover:bg-slate-100 active:bg-slate-200 text-slate-600 font-bold text-lg"
                >-</button>
                <span className="font-mono font-bold text-xl text-slate-800">{teamState.fireExtinguishers}</span>
                <button
                    onClick={() => onUpdateExtinguishers(teamState.fireExtinguishers + 1)}
                    className="w-10 h-10 flex items-center justify-center rounded hover:bg-slate-100 active:bg-slate-200 text-slate-600 font-bold text-lg"
                >+</button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default TeamCard;
