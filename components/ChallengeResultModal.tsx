
import React from 'react';
import { TeamColor } from '../types';
import { TEAMS } from '../constants';
import { X, Trophy, Swords, Star, AlertCircle } from 'lucide-react';

interface Props {
  challenger: {
    color: TeamColor;
    correct: boolean;
  };
  opponent: {
    color: TeamColor;
    correct: boolean;
  };
  onClose: () => void;
}

const ChallengeResultModal: React.FC<Props> = ({ challenger, opponent, onClose }) => {
  const challengerConfig = TEAMS[challenger.color];
  const opponentConfig = TEAMS[opponent.color];

  const RewardCard = ({ 
    teamName, 
    color, 
    isCorrect, 
    amount, 
    label, 
    role 
  }: { 
    teamName: string, 
    color: string, 
    isCorrect: boolean, 
    amount: number, 
    label: string,
    role: string
  }) => (
    <div 
      className={`flex-1 flex flex-col items-center justify-center p-8 rounded-3xl border-4 shadow-2xl transition-all ${
        isCorrect ? 'scale-105' : 'opacity-60 grayscale-[0.5]'
      }`}
      style={{ borderColor: color, backgroundColor: isCorrect ? `${color}10` : '#f8fafc' }}
    >
      <span className="text-[10px] font-black uppercase tracking-[0.3em] mb-4 py-1 px-3 rounded-full text-white" style={{ backgroundColor: color }}>
        {role}
      </span>
      
      <h3 className="text-2xl font-rockwell font-black mb-1" style={{ color: color }}>
        Team {teamName}
      </h3>
      
      <div className="my-8 flex flex-col items-center">
        {isCorrect ? (
          <>
            <div className="relative">
                <span className="text-8xl font-rockwell font-black leading-none" style={{ color: color }}>
                    {amount}
                </span>
                <Star className="absolute -top-4 -right-8 text-yellow-400 fill-yellow-400 animate-bounce" size={40} />
            </div>
            <span className="text-xl font-bold uppercase tracking-widest mt-2" style={{ color: color }}>
                {label}
            </span>
          </>
        ) : (
          <>
            <AlertCircle size={64} className="text-slate-300 mb-4" />
            <span className="text-5xl font-rockwell font-black text-slate-300">0</span>
            <span className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-2">Helaas!</span>
          </>
        )}
      </div>

      <div className="mt-auto pt-6 border-t border-slate-100 w-full text-center">
        <p className="text-xs font-bold text-slate-500 italic">
          {isCorrect ? 'Geef grondstofkaart(en) naar keuze' : 'Geen beloning verdiend'}
        </p>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-navy/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white rounded-[40px] shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-8 bg-slate-900 text-center relative shrink-0">
          <button 
            onClick={onClose} 
            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
          >
            <X size={24} />
          </button>
          
          <div className="inline-flex items-center gap-4 text-white mb-2">
            <Swords size={32} className="text-red-500" />
            <h2 className="text-4xl font-rockwell font-black uppercase tracking-tight">
                Resultaat Uitdaging
            </h2>
            <Trophy size={32} className="text-yellow-500" />
          </div>
          <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-xs">Overzicht voor de instructeur</p>
        </div>

        {/* Content Side-by-Side */}
        <div className="flex-1 p-10 flex flex-col md:flex-row gap-8 overflow-y-auto">
          <RewardCard 
            teamName={challengerConfig.name}
            color={challengerConfig.hex}
            isCorrect={challenger.correct}
            amount={1}
            label="Kaart"
            role="Uitdager"
          />
          
          <div className="flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 font-black italic">VS</div>
          </div>

          <RewardCard 
            teamName={opponentConfig.name}
            color={opponentConfig.hex}
            isCorrect={opponent.correct}
            amount={2}
            label="Kaarten"
            role="Tegenstander"
          />
        </div>

        {/* Footer Action */}
        <div className="p-8 bg-slate-50 text-center shrink-0 border-t border-slate-100">
          <button 
            onClick={onClose}
            className="px-12 py-4 rounded-2xl bg-slate-900 text-white font-rockwell font-black text-xl shadow-xl hover:bg-slate-800 transition-all active:scale-95"
          >
            Alle kaarten zijn uitgedeeld
          </button>
        </div>

      </div>
    </div>
  );
};

export default ChallengeResultModal;
