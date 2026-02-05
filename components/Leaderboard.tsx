
import React from 'react';
import { TeamState } from '../types';
import { TEAMS } from '../constants';
import { Trophy, Route, DoorOpen, ShieldCheck, Crown, Award, Medal } from 'lucide-react';

interface Props {
  teams: TeamState[];
}

const Leaderboard: React.FC<Props> = ({ teams }) => {
  if (teams.length === 0) return null;

  // Bepaal de maxima voor de bonussen
  const maxRoute = Math.max(...teams.map(t => t.routeLength));
  const maxDoors = Math.max(...teams.map(t => t.doorCount));

  const teamsWithScores = teams.map(team => {
    // Punten per brandblusser (3pt elk)
    const extinguisherPoints = team.extinguisherCount * 3;

    // Bonus Punten (Titels)
    const hasLongestRoute = team.routeLength > 0 && team.routeLength === maxRoute; 
    const hasMostDoors = team.doorCount > 0 && team.doorCount === maxDoors;

    let totalScore = extinguisherPoints;
    if (hasLongestRoute) totalScore += 2;      // Langste vluchtroute = 2pt
    if (hasMostDoors) totalScore += 2;         // Meeste deuren = 2pt

    return {
      ...team,
      score: totalScore,
      stats: {
        hasLongestRoute,
        hasMostDoors,
        extinguisherPoints
      }
    };
  }).sort((a, b) => b.score - a.score);

  const highestScore = teamsWithScores[0].score;

  return (
    <div className="mb-12">
      {/* Klassement Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-gradient-to-br from-indigo-600 to-violet-700 rounded-2xl text-white shadow-xl shadow-indigo-200">
              <Trophy size={32} />
          </div>
          <div>
              <h2 className="text-3xl font-black text-slate-800 uppercase tracking-tighter leading-none font-serif">Klassement</h2>
              <p className="text-sm font-bold text-slate-400 uppercase mt-1">Strijd om de veiligheid</p>
          </div>
        </div>
        
        {/* Puntentelling Legenda */}
        <div className="flex flex-wrap gap-2">
            <div className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl shadow-sm flex items-center gap-2">
                <ShieldCheck size={14} className="text-red-500" />
                <span className="text-[10px] font-black uppercase text-slate-600">Blusser: 3pt per stuk</span>
            </div>
            <div className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl shadow-sm flex items-center gap-2">
                <Medal size={14} className="text-orange-500" />
                <span className="text-[10px] font-black uppercase text-slate-600">Langste Route: +2pt</span>
            </div>
            <div className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl shadow-sm flex items-center gap-2">
                <Medal size={14} className="text-blue-500" />
                <span className="text-[10px] font-black uppercase text-slate-600">Meeste Deuren: +2pt</span>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {teamsWithScores.map((team, index) => {
          const config = TEAMS[team.color];
          const isLeader = team.score === highestScore && team.score > 0;

          return (
            <div 
              key={team.color}
              className={`group relative flex flex-col bg-white rounded-3xl transition-all duration-500 shadow-lg ${
                isLeader 
                ? 'ring-4 ring-yellow-400 border-transparent scale-105 z-10' 
                : 'border border-slate-200 hover:border-slate-300'
              }`}
            >
                {/* Ranking Badge */}
                <div className="absolute -top-3 -left-3 w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center font-black text-lg shadow-lg z-20 font-serif">
                    {index + 1}
                </div>

                {/* Team Header */}
                <div 
                  style={{ backgroundColor: config.hex }} 
                  className="h-28 relative overflow-hidden rounded-t-[22px]"
                >
                    <div className="absolute inset-0 bg-black/5"></div>
                    <div className="absolute -bottom-4 -right-4 opacity-10 group-hover:scale-110 transition-transform duration-700">
                        <Award size={120} className={config.textColor} />
                    </div>
                    
                    <div className="relative z-10 p-5 flex justify-between items-center h-full">
                        <div className="flex flex-col">
                            <h3 className={`text-2xl font-black uppercase tracking-tighter font-serif ${config.textColor}`}>
                                {config.name}
                            </h3>
                            {isLeader && (
                                <div className={`flex items-center gap-1 mt-1 font-black text-[10px] uppercase ${config.textColor} opacity-90`}>
                                    <Crown size={12} fill="currentColor" /> Huidige Winnaar
                                </div>
                            )}
                        </div>
                        
                        <div className="flex flex-col items-center justify-center w-16 h-16 bg-white rounded-2xl shadow-xl ring-4 ring-black/5">
                            <span className="text-2xl font-black text-slate-900 leading-none font-serif">{team.score}</span>
                            <span className="text-[8px] font-black text-slate-400 uppercase mt-1">Punten</span>
                        </div>
                    </div>
                </div>

                {/* Titels & Bonussen */}
                <div className="p-5 flex-1 flex flex-col gap-4">
                    <div className="flex flex-col gap-2.5">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest text-center mb-1">Status & Titels</p>
                        
                        {/* Brandblusser Points */}
                        <div className="flex items-center justify-between px-4 py-3 rounded-2xl border bg-slate-50 border-transparent text-slate-700">
                            <div className="flex items-center gap-3">
                                <ShieldCheck size={18} className="text-red-500" />
                                <span className="text-[11px] font-black uppercase">{team.extinguisherCount}x Brandblusser</span>
                            </div>
                            <span className="font-black text-sm">+{team.stats.extinguisherPoints}</span>
                        </div>

                        {/* Langste Route Bonus */}
                        <div className={`flex items-center justify-between px-4 py-3 rounded-2xl border transition-all ${
                            team.stats.hasLongestRoute 
                            ? 'bg-orange-50 border-orange-200 text-orange-800 shadow-sm' 
                            : 'bg-slate-50 border-transparent text-slate-300'
                        }`}>
                            <div className="flex items-center gap-3">
                                <Route size={18} className={team.stats.hasLongestRoute ? 'text-orange-500' : 'text-slate-200'} />
                                <span className="text-[11px] font-black uppercase">Langste Route</span>
                            </div>
                            {team.stats.hasLongestRoute ? (
                                <span className="font-black text-sm">+2</span>
                            ) : (
                                <span className="text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                                    {team.routeLength}m
                                </span>
                            )}
                        </div>

                        {/* Meeste Deuren Bonus */}
                        <div className={`flex items-center justify-between px-4 py-3 rounded-2xl border transition-all ${
                            team.stats.hasMostDoors 
                            ? 'bg-blue-50 border-blue-200 text-blue-800 shadow-sm' 
                            : 'bg-slate-50 border-transparent text-slate-300'
                        }`}>
                            <div className="flex items-center gap-3">
                                <DoorOpen size={18} className={team.stats.hasMostDoors ? 'text-blue-500' : 'text-slate-200'} />
                                <span className="text-[11px] font-black uppercase">Meeste Deuren</span>
                            </div>
                            {team.stats.hasMostDoors ? (
                                <span className="font-black text-sm">+2</span>
                            ) : (
                                <span className="text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                                    {team.doorCount}x
                                </span>
                            )}
                        </div>
                    </div>
                </div>
                
                {/* Details Footer */}
                <div className="px-5 py-3 border-t border-slate-50 flex justify-between items-center text-[9px] font-bold text-slate-400 uppercase">
                    <span>Statistieken</span>
                    <div className="flex gap-2">
                        <span>R:{team.routeLength}</span>
                        <span>D:{team.doorCount}</span>
                        <span>B:{team.extinguisherCount}</span>
                    </div>
                </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Leaderboard;
