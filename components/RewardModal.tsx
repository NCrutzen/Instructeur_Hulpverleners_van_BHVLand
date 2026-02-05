
import React from 'react';
import { Resource, TeamColor } from '../types';
import { RESOURCE_CONFIG, TEAMS } from '../constants';
import { X } from 'lucide-react';

interface Props {
  teamColor: TeamColor;
  resources: Resource[];
  onClose: () => void;
  source: string;
}

const RewardModal: React.FC<Props> = ({ teamColor, resources, onClose, source }) => {
  const teamConfig = TEAMS[teamColor];

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden transform animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div 
          className="p-4 flex justify-between items-center"
          style={{ backgroundColor: teamConfig.hex }}
        >
          <div className={teamConfig.textColor}>
            <p className="text-sm font-bold opacity-90 uppercase tracking-wider">{source} voltooid</p>
            <h2 className="text-xl font-black">Ontvangen grondstoffen</h2>
          </div>
          <button 
            onClick={onClose} 
            className={`p-1.5 rounded-full bg-white/20 hover:bg-white/30 transition-colors ${teamConfig.textColor}`}
          >
            <X size={20} />
          </button>
        </div>

        {/* Resources Grid */}
        <div className="p-6 bg-slate-50">
          <div className="grid gap-3">
            {resources.map((res, idx) => {
              const config = RESOURCE_CONFIG[res];
              const Icon = config.icon;
              return (
                <div 
                  key={`${res}-${idx}`} 
                  className="flex items-center gap-4 p-3 bg-white rounded-xl border border-slate-200 shadow-sm animate-in slide-in-from-bottom-2 fade-in"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <div className={`p-3 rounded-lg ${config.color} text-white shadow-md`}>
                    <Icon size={24} />
                  </div>
                  <span className="text-lg font-bold text-slate-700">{config.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-white">
          <button 
            onClick={onClose}
            className="w-full py-3 rounded-xl font-bold text-white shadow-lg transition-transform active:scale-95"
            style={{ backgroundColor: teamConfig.hex }}
          >
            Grondstoffen uitgedeeld, ga door
          </button>
        </div>

      </div>
    </div>
  );
};

export default RewardModal;