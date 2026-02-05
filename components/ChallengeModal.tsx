
import React, { useState } from 'react';
import { TeamState, TeamColor, Resource } from '../types';
import { TEAMS, CHALLENGE_INCIDENTS, RESOURCE_CONFIG } from '../constants';
import { X, Sword, Check, UserPlus, Trophy, AlertCircle, Star, HelpCircle } from 'lucide-react';

interface Props {
  challenger: TeamState;
  activeTeams: TeamState[];
  onClose: () => void;
  onComplete: (challengerCorrect: boolean, opponentCorrect: boolean, opponentColor: TeamColor) => void;
}

const ChallengeModal: React.FC<Props> = ({ challenger, activeTeams, onClose, onComplete }) => {
  const [step, setStep] = useState<'choose' | 'question' | 'result'>('choose');
  const [opponentColor, setOpponentColor] = useState<TeamColor | null>(null);
  const [challengerCorrect, setChallengerCorrect] = useState<boolean>(false);
  const [opponentCorrect, setOpponentCorrect] = useState<boolean>(false);
  
  // Select a random incident
  const incident = React.useMemo(() => 
    CHALLENGE_INCIDENTS[Math.floor(Math.random() * CHALLENGE_INCIDENTS.length)],
  []);

  const challengerConfig = TEAMS[challenger.color];
  const opponents = activeTeams.filter(t => t.color !== challenger.color);

  const handleFinish = () => {
    if (opponentColor) {
      onComplete(challengerCorrect, opponentCorrect, opponentColor);
    }
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden transform animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-slate-900 p-6 flex justify-between items-center border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-500 rounded-lg text-white">
              <Sword size={24} />
            </div>
            <div>
              <h2 className="text-xl font-black text-white uppercase tracking-tighter">Team Uitdaging</h2>
              <p className="text-slate-400 text-xs font-bold uppercase">Duel om grondstoffen</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-white/10 text-slate-400 transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="p-8 max-h-[80vh] overflow-y-auto">
          {step === 'choose' && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-slate-800">Wie daag je uit?</h3>
                <p className="text-slate-500">Kies een team om de strijd mee aan te gaan.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {opponents.length > 0 ? opponents.map(team => (
                  <button
                    key={team.color}
                    onClick={() => {
                      setOpponentColor(team.color);
                      setStep('question');
                    }}
                    className="flex items-center gap-4 p-5 rounded-2xl border-2 border-slate-100 hover:border-indigo-500 hover:bg-indigo-50 transition-all group text-left"
                  >
                    <div className="w-12 h-12 rounded-full shadow-inner flex items-center justify-center" style={{ backgroundColor: TEAMS[team.color].hex }}>
                       <UserPlus size={24} className={TEAMS[team.color].textColor} />
                    </div>
                    <div>
                      <span className="block text-lg font-black text-slate-800 uppercase tracking-tight">Team {TEAMS[team.color].name}</span>
                      <span className="text-xs font-bold text-slate-400 uppercase">Uitdagen</span>
                    </div>
                  </button>
                )) : (
                  <div className="col-span-full p-8 text-center bg-slate-100 rounded-2xl text-slate-400 italic">
                    Geen andere actieve teams beschikbaar...
                  </div>
                )}
              </div>
            </div>
          )}

          {step === 'question' && opponentColor && (
            <div className="space-y-6">
              <div className="p-5 bg-amber-50 rounded-2xl border-2 border-amber-100">
                <div className="flex items-center gap-3 mb-2">
                  <AlertCircle className="text-amber-600" size={20} />
                  <h4 className="font-black text-amber-900 uppercase text-sm">Incident Scenario</h4>
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-1">{incident.title}</h3>
                <p className="text-slate-700 leading-relaxed italic">"{incident.scenario}"</p>
              </div>

              {/* CHALLENGER QUESTION */}
              <div className="p-5 rounded-2xl border-2 border-slate-100 bg-slate-50 relative">
                <div className="absolute -top-3 left-4 px-3 py-1 bg-white border border-slate-200 rounded-full flex items-center gap-2">
                   <div className="w-3 h-3 rounded-full" style={{ backgroundColor: challengerConfig.hex }}></div>
                   <span className="text-[10px] font-black uppercase text-slate-600">Vraag 1: Uitdager ({challengerConfig.name})</span>
                </div>
                <div className="space-y-4 pt-2">
                  <h4 className="font-bold text-slate-800">{incident.q1.question}</h4>
                  <div className="grid grid-cols-1 gap-2">
                    {incident.q1.options.map((opt, i) => (
                      <div key={i} className={`p-2.5 rounded-xl border text-sm font-medium ${opt === incident.q1.correctAnswer ? 'border-green-300 bg-green-100/50 text-green-800' : 'border-slate-200 bg-white text-slate-500'}`}>
                        <span className="mr-2 opacity-50">{String.fromCharCode(65 + i)})</span> {opt}
                      </div>
                    ))}
                  </div>
                  <button 
                    onClick={() => setChallengerCorrect(!challengerCorrect)}
                    className={`w-full py-3 rounded-xl border-2 flex items-center justify-center gap-2 transition-all ${challengerCorrect ? 'bg-green-600 border-green-600 text-white shadow-lg' : 'border-slate-300 bg-white text-slate-400'}`}
                  >
                    {challengerCorrect ? <Check size={20} /> : null}
                    {challengerCorrect ? 'Correct beantwoord' : 'Markeer als Correct'}
                  </button>
                </div>
              </div>

              {/* OPPONENT QUESTION */}
              <div className="p-5 rounded-2xl border-2 border-slate-100 bg-slate-50 relative">
                <div className="absolute -top-3 left-4 px-3 py-1 bg-white border border-slate-200 rounded-full flex items-center gap-2">
                   <div className="w-3 h-3 rounded-full" style={{ backgroundColor: TEAMS[opponentColor].hex }}></div>
                   <span className="text-[10px] font-black uppercase text-slate-600">Vraag 2: Uitgedaagde ({TEAMS[opponentColor].name})</span>
                </div>
                <div className="space-y-4 pt-2">
                  <h4 className="font-bold text-slate-800">{incident.q2.question}</h4>
                  <div className="grid grid-cols-1 gap-2">
                    {incident.q2.options.map((opt, i) => (
                      <div key={i} className={`p-2.5 rounded-xl border text-sm font-medium ${opt === incident.q2.correctAnswer ? 'border-green-300 bg-green-100/50 text-green-800' : 'border-slate-200 bg-white text-slate-500'}`}>
                        <span className="mr-2 opacity-50">{String.fromCharCode(65 + i)})</span> {opt}
                      </div>
                    ))}
                  </div>
                  <button 
                    onClick={() => setOpponentCorrect(!opponentCorrect)}
                    className={`w-full py-3 rounded-xl border-2 flex items-center justify-center gap-2 transition-all ${opponentCorrect ? 'bg-green-600 border-green-600 text-white shadow-lg' : 'border-slate-300 bg-white text-slate-400'}`}
                  >
                    {opponentCorrect ? <Check size={20} /> : null}
                    {opponentCorrect ? 'Correct beantwoord' : 'Markeer als Correct'}
                  </button>
                </div>
              </div>

              <button
                onClick={() => setStep('result')}
                className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl"
              >
                Resultaat Bekijken
              </button>
            </div>
          )}

          {step === 'result' && opponentColor && (
            <div className="space-y-8 py-4">
              <div className="text-center">
                <div className="inline-block p-4 bg-yellow-100 rounded-full text-yellow-600 mb-4 animate-bounce">
                  <Trophy size={48} />
                </div>
                <h3 className="text-3xl font-black text-slate-800 uppercase">Strijd Voltooid!</h3>
                <p className="text-slate-500">Beloon de teams voor hun inzet.</p>
              </div>

              <div className="grid gap-4">
                {/* Challenger Reward Display */}
                <div className={`p-4 rounded-2xl border-2 flex items-center justify-between ${challengerCorrect ? 'border-green-200 bg-green-50' : 'border-slate-100 bg-slate-50 opacity-60'}`}>
                  <div className="flex items-center gap-4">
                     <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold" style={{ backgroundColor: challengerConfig.hex }}>{challengerConfig.name[0]}</div>
                     <div>
                       <span className="block font-black text-slate-800 uppercase text-xs">Team {challengerConfig.name} (Uitdager)</span>
                       <span className="text-xs font-bold text-slate-500">{challengerCorrect ? 'Vraag 1 correct' : 'Vraag 1 fout'}</span>
                     </div>
                  </div>
                  {challengerCorrect && (
                    <div className="flex items-center gap-2 bg-yellow-400 px-3 py-1 rounded-full text-[10px] font-black text-yellow-900">
                      <Star size={12} fill="currentColor" />
                      1x KEUZE KAART
                    </div>
                  )}
                </div>

                {/* Opponent Reward Display */}
                <div className={`p-4 rounded-2xl border-2 flex items-center justify-between ${opponentCorrect ? 'border-green-200 bg-green-50' : 'border-slate-100 bg-slate-50 opacity-60'}`}>
                  <div className="flex items-center gap-4">
                     <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold" style={{ backgroundColor: TEAMS[opponentColor].hex }}>{TEAMS[opponentColor].name[0]}</div>
                     <div>
                       <span className="block font-black text-slate-800 uppercase text-xs">Team {TEAMS[opponentColor].name} (Uitgedaagde)</span>
                       <span className="text-xs font-bold text-slate-500">{opponentCorrect ? 'Vraag 2 correct' : 'Vraag 2 fout'}</span>
                     </div>
                  </div>
                  {opponentCorrect && (
                    <div className="flex items-center gap-2 bg-yellow-400 px-4 py-2 rounded-full text-xs font-black text-yellow-900 shadow-md">
                      <Star size={14} fill="currentColor" />
                      2x KEUZE KAARTEN
                    </div>
                  )}
                </div>
              </div>

              <button
                onClick={handleFinish}
                className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black uppercase hover:bg-indigo-700 shadow-xl transition-all"
              >
                Sluiten & Incidenten Verwerken
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChallengeModal;
