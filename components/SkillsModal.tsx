
import React from 'react';
import { SKILLS, TEAMS } from '../constants';
import { TeamState, TeamColor } from '../types';
import { X, Check, Users } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  teamState: TeamState;
  toggleSkill: (skillId: string, studentIndex: number | 'all') => void;
}

const SkillsModal: React.FC<Props> = ({ isOpen, onClose, teamState, toggleSkill }) => {
  if (!isOpen) return null;

  const teamConfig = TEAMS[teamState.color];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col max-h-[95vh]">

        {/* Compact Header for tablet */}
        <div
          className="p-3 flex justify-between items-center shrink-0"
          style={{ backgroundColor: teamConfig.hex }}
        >
          <div className={teamConfig.textColor}>
            <h2 className="text-lg font-rockwell font-bold">
              Vaardigheden: {teamConfig.name}
            </h2>
          </div>
          <button
            onClick={onClose}
            className={`p-2 rounded-full bg-white/20 active:bg-white/40 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center ${teamConfig.textColor}`}
          >
            <X size={20} />
          </button>
        </div>

        {/* Content - optimized for tablet with 2 columns */}
        <div className="p-3 overflow-y-auto font-sans bg-slate-50 flex-1">
          <div className="grid grid-cols-2 gap-2">
            {SKILLS.map((skill) => {
              const status = teamState.completedSkills[skill.id] || [false, false, false];
              const isFullyChecked = status.every(s => s === true);

              return (
                <div
                  key={skill.id}
                  className={`flex items-center justify-between p-2.5 rounded-lg border-2 transition-all duration-200 ${
                    isFullyChecked
                      ? 'border-green-500 bg-green-50'
                      : 'border-slate-200 bg-white'
                  }`}
                >
                  <div className="flex-1 min-w-0 mr-2">
                    <span className={`font-bold text-sm leading-tight block truncate ${isFullyChecked ? 'text-green-800' : 'text-slate-700'}`}>
                        {skill.name}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    {[0, 1, 2].map((idx) => (
                        <button
                            key={idx}
                            onClick={() => toggleSkill(skill.id, idx)}
                            className={`w-9 h-9 rounded-full border-2 flex items-center justify-center text-[10px] font-black transition-all active:scale-95 ${
                                status[idx]
                                    ? 'bg-blue-500 border-blue-500 text-white'
                                    : 'bg-white border-slate-200 text-slate-400'
                            }`}
                            title={`Cursist ${idx + 1}`}
                        >
                            C{idx + 1}
                        </button>
                    ))}

                    <button
                      onClick={() => toggleSkill(skill.id, 'all')}
                      className={`w-16 h-9 rounded-lg font-black text-[10px] uppercase flex items-center justify-center gap-1 transition-all active:scale-95 ml-1 ${
                        isFullyChecked
                          ? 'bg-green-600 text-white'
                          : 'bg-slate-100 text-slate-400'
                      }`}
                    >
                      {isFullyChecked ? <Check size={12} /> : <Users size={12} />}
                      {isFullyChecked ? 'Klaar' : 'Alle'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Compact Footer */}
        <div className="p-2 border-t border-slate-100 bg-white flex justify-end items-center font-sans shrink-0">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-slate-900 text-white rounded-lg font-bold transition-all active:scale-95 min-h-[44px]"
          >
            Sluiten
          </button>
        </div>
      </div>
    </div>
  );
};

export default SkillsModal;
