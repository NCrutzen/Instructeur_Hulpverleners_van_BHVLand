import React from 'react';
import { SKILLS, TEAMS } from '../constants';
import { TeamState, TeamColor } from '../types';
import { X, Check } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  teamState: TeamState;
  toggleSkill: (skillId: string) => void;
}

const SkillsModal: React.FC<Props> = ({ isOpen, onClose, teamState, toggleSkill }) => {
  if (!isOpen) return null;

  const teamConfig = TEAMS[teamState.color];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div 
          className="p-6 flex justify-between items-center"
          style={{ backgroundColor: teamConfig.hex }}
        >
          <h2 className={`text-2xl font-bold ${teamConfig.textColor}`}>
            Vaardigheden: {teamConfig.name}
          </h2>
          <button 
            onClick={onClose} 
            className={`p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors ${teamConfig.textColor}`}
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto">
          <div className="space-y-3">
            {SKILLS.map((skill) => {
              const isChecked = teamState.completedSkills.includes(skill.id);
              return (
                <button
                  key={skill.id}
                  onClick={() => toggleSkill(skill.id)}
                  className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all duration-200 ${
                    isChecked 
                      ? 'border-green-500 bg-green-50' 
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <span className={`font-medium text-lg ${isChecked ? 'text-green-800' : 'text-slate-700'}`}>
                    {skill.name}
                  </span>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    isChecked ? 'bg-green-500 border-green-500' : 'border-slate-300'
                  }`}>
                    {isChecked && <Check size={16} className="text-white" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end">
          <button 
            onClick={onClose}
            className="px-6 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 font-medium transition-colors"
          >
            Sluiten
          </button>
        </div>
      </div>
    </div>
  );
};

export default SkillsModal;