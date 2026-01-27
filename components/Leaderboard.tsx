
import React from 'react';
import { TeamState, DoorState } from '../types';
import { TEAMS, DOOR_POINTS, SKILLS, QUESTIONS } from '../constants';
import { Trophy, Route, DoorOpen, Star, CheckCircle2, Shield, BookOpen, AlertTriangle, Flame } from 'lucide-react';

interface Props {
  teams: TeamState[];
}

const calculateDoorPoints = (doors: DoorState) => {
  return doors.count * DOOR_POINTS;
};

const Leaderboard: React.FC<Props> = ({ teams }) => {
  if (teams.length === 0) return null;

  const activeRouteLengths = teams.map(t => t.routeLength);
  const maxRoute = Math.max(...activeRouteLengths);
  const minRoute = Math.min(...activeRouteLengths);

  const activeDoorPoints = teams.map(t => calculateDoorPoints(t.doors));
  const maxDoorPoints = Math.max(...activeDoorPoints);
  const minDoorPoints = Math.min(...activeDoorPoints);

  const activeExtinguishers = teams.map(t => t.fireExtinguishers);
  const maxExtinguishers = Math.max(...activeExtinguishers);
  const minExtinguishers = Math.min(...activeExtinguishers);

  const teamsWithScores = teams.map(team => {
    let score = 0;

    // Skill counts only as finished if all 3 students have it
    const skillCount = (Object.values(team.completedSkills) as boolean[][]).filter(s => s.every(v => v === true)).length;

    const doorPoints = calculateDoorPoints(team.doors);

    // 1. Minimaal 5 vaardigheden = 2 punten
    const hasBaseSkills = skillCount >= 5;

    // 2. Incidenten = 0 punten (verwijderd op verzoek)
    const incidentPoints = 0;

    // 3. Bonus: Langste route = 2 punten
    const hasLongestRoute = teams.length > 1
      ? (maxRoute > minRoute && team.routeLength === maxRoute)
      : (team.routeLength > 2);

    // 4. Bonus: Meeste deuren = 2 punten
    const hasBestDoors = teams.length > 1
      ? (maxDoorPoints > minDoorPoints && doorPoints === maxDoorPoints)
      : (doorPoints > 2);

    // 5. Bonus: Meeste brandblussers = 3 punten
    const hasMostExtinguishers = teams.length > 1
      ? (maxExtinguishers > minExtinguishers && team.fireExtinguishers === maxExtinguishers)
      : (team.fireExtinguishers > 0);

    // Score berekening
    if (hasBaseSkills) score += 2;
    if (hasLongestRoute) score += 2;
    if (hasBestDoors) score += 2;
    if (hasMostExtinguishers) score += 3;
    score += incidentPoints;

    return {
      ...team,
      skillCount,
      score,
      bonus: {
        longestRoute: hasLongestRoute,
        bestDoors: hasBestDoors,
        baseSkills: hasBaseSkills,
        mostExtinguishers: hasMostExtinguishers
      }
    };
  }).sort((a, b) => b.score - a.score);

  return (
    <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden font-sans">
      {/* Compact header for tablet */}
      <div className="px-3 py-2 text-white flex items-center justify-between" style={{ backgroundColor: '#002b47' }}>
        <div className="flex items-center gap-2">
          <Trophy className="text-yellow-400" size={20} />
          <h2 className="text-base font-rockwell font-black uppercase tracking-tight">Klassement</h2>
        </div>
        <span className="text-[9px] opacity-60 italic">Blussers: 3pt | Route/Deur: 2pt | 5+ Vaardigh: 2pt</span>
      </div>

      {/* Compact table for tablet landscape */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              <th className="px-2 py-2 text-[9px] font-black uppercase text-slate-400 w-12">#</th>
              <th className="px-2 py-2 text-[9px] font-black uppercase text-slate-400">Team</th>
              <th className="px-2 py-2 text-[9px] font-black uppercase text-slate-400 text-center">Vaard.</th>
              <th className="px-2 py-2 text-[9px] font-black uppercase text-slate-400 text-center">Vragen</th>
              <th className="px-2 py-2 text-[9px] font-black uppercase text-slate-400 text-center">Inc.</th>
              <th className="px-2 py-2 text-[9px] font-black uppercase text-slate-400">Bonussen</th>
              <th className="px-2 py-2 text-[9px] font-black uppercase text-slate-400 text-right">Score</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {teamsWithScores.map((team, idx) => {
              const teamConfig = TEAMS[team.color];
              return (
                <tr key={team.color} className="hover:bg-slate-50 transition-colors">
                  <td className="px-2 py-2">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center font-black text-xs ${
                      idx === 0 ? 'bg-yellow-400 text-yellow-900' :
                      idx === 1 ? 'bg-slate-300 text-slate-700' :
                      idx === 2 ? 'bg-orange-300 text-orange-900' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {idx + 1}
                    </div>
                  </td>
                  <td className="px-2 py-2">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: teamConfig.hex }}></div>
                      <span className="font-rockwell font-black text-slate-800 uppercase text-sm">{teamConfig.name}</span>
                    </div>
                  </td>
                  <td className="px-2 py-2 text-center">
                    <span className={`font-bold ${team.bonus.baseSkills ? 'text-green-600' : 'text-slate-700'}`}>
                      {team.skillCount}
                    </span>
                    <span className="text-[9px] text-slate-400">/{SKILLS.length}</span>
                  </td>
                  <td className="px-2 py-2 text-center">
                    <span className="font-bold text-slate-700">{team.answeredQuestions.length}</span>
                  </td>
                  <td className="px-2 py-2 text-center">
                    <span className="font-bold text-slate-400">{team.incidentCount}</span>
                  </td>
                  <td className="px-2 py-2">
                    <div className="flex gap-1">
                      {team.bonus.longestRoute && (
                        <div className="p-1 rounded bg-orange-100 text-orange-600" title="Langste Vluchtroute (+2pt)">
                          <Route size={14} />
                        </div>
                      )}
                      {team.bonus.bestDoors && (
                        <div className="p-1 rounded bg-blue-100 text-blue-600" title="Meeste Deuren (+2pt)">
                          <DoorOpen size={14} />
                        </div>
                      )}
                      {team.bonus.baseSkills && (
                        <div className="p-1 rounded bg-green-100 text-green-600" title="Minimaal 5 vaardigheden (+2pt)">
                          <Shield size={14} />
                        </div>
                      )}
                      {team.bonus.mostExtinguishers && (
                        <div className="p-1 rounded bg-red-100 text-red-600" title="Meeste Brandblussers (+3pt)">
                          <Flame size={14} />
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-2 py-2 text-right">
                    <span className="text-xl font-black text-slate-800">{team.score}</span>
                    <span className="text-[9px] font-bold text-slate-400 ml-0.5">pt</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;
