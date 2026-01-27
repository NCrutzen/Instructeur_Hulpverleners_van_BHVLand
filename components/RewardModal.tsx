
import React from 'react';
import { Resource, TeamColor } from '../types';
import { RESOURCE_CONFIG, TEAMS } from '../constants';
import { X, Gift } from 'lucide-react';

interface Props {
  teamColor: TeamColor;
  resources: Resource[];
  onClose: () => void;
  source: string;
}

const RewardModal: React.FC<Props> = ({ teamColor, resources, onClose, source }) => {
  const teamConfig = TEAMS[teamColor];

  // Group resources to count them
  const groupedResources = resources.reduce((acc, res) => {
    acc[res] = (acc[res] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const totalCards = resources.length;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden transform animate-in zoom-in-95 duration-200 font-sans border-4" style={{ borderColor: teamConfig.hex }}>
        
        {/* Header */}
        <div 
          className="p-6 text-center relative"
          style={{ backgroundColor: teamConfig.hex }}
        >
          <button 
            onClick={onClose} 
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/20 hover:bg-white/30 transition-colors text-white"
          >
            <X size={20} />
          </button>
          
          <div className="inline-flex p-3 bg-white/20 rounded-2xl mb-4 text-white">
            <Gift size={32} />
          </div>
          
          <div className={teamConfig.textColor}>
            <p className="text-xs font-black opacity-80 uppercase tracking-[0.2em] mb-1">{source}</p>
            <h2 className="text-2xl font-rockwell font-black">
              Team {teamConfig.name}
            </h2>
          </div>
        </div>

        {/* Big Total Indicator */}
        <div className="bg-slate-50 py-4 border-b border-slate-100 text-center">
            <span className="text-sm font-black text-slate-400 uppercase tracking-widest block mb-1">Totaal te ontvangen:</span>
            <div className="inline-flex items-baseline gap-2">
                <span className="text-5xl font-rockwell font-black text-slate-800">{totalCards}</span>
                <span className="text-xl font-bold text-slate-500">{totalCards === 1 ? 'Kaart' : 'Kaarten'}</span>
            </div>
        </div>

        {/* Resources Grid */}
        <div className="p-6 bg-white">
          <div className="grid gap-4">
            {/* Added explicit type casting for Object.entries to fix 'unknown' type issues with 'count' */}
            {(Object.entries(groupedResources) as [string, number][]).map(([res, count], idx) => {
              const config = RESOURCE_CONFIG[res as Resource];
              const Icon = config.icon;
              return (
                <div 
                  key={`${res}-${idx}`} 
                  className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-200 shadow-sm animate-in slide-in-from-bottom-2 fade-in relative overflow-hidden"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <div 
                    className="w-14 h-14 flex items-center justify-center text-white shadow-md shrink-0"
                    style={{ 
                      backgroundColor: config.color,
                      clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
                    }}
                  >
                    <Icon size={28} strokeWidth={2.5} />
                  </div>
                  
                  <div className="flex-1">
                    <span className="text-lg font-rockwell font-black text-slate-700 block leading-tight">{config.label}</span>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Type: Grondstof</span>
                  </div>

                  {count > 1 && (
                    <div className="bg-slate-800 text-white w-10 h-10 rounded-full flex items-center justify-center font-black text-lg shadow-lg border-2 border-white">
                        {count}x
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50">
          <button 
            onClick={onClose}
            className="w-full py-4 rounded-2xl font-rockwell font-black text-white shadow-xl transition-all active:scale-95 hover:brightness-110 uppercase tracking-widest flex items-center justify-center gap-2"
            style={{ backgroundColor: teamConfig.hex }}
          >
            Kaarten zijn uitgedeeld
          </button>
        </div>

      </div>
    </div>
  );
};

export default RewardModal;
