import React, { useMemo, useState } from 'react';
import { QUESTIONS, TEAMS } from '../constants';
import { TeamState, TeamColor } from '../types';
import { X, CheckCircle2, Circle, Search } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  teamState: TeamState;
  toggleQuestion: (questionId: number) => void;
}

const QuestionsModal: React.FC<Props> = ({ isOpen, onClose, teamState, toggleQuestion }) => {
  const [filter, setFilter] = useState('');
  
  if (!isOpen) return null;

  const teamConfig = TEAMS[teamState.color];

  const filteredQuestions = QUESTIONS.filter(q => 
    q.question.toLowerCase().includes(filter.toLowerCase()) || 
    q.id.toString().includes(filter)
  );

  const answeredCount = teamState.answeredQuestions.length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div 
          className="p-6 flex justify-between items-center shrink-0"
          style={{ backgroundColor: teamConfig.hex }}
        >
          <div className={teamConfig.textColor}>
            <h2 className="text-2xl font-bold">Vragen: {teamConfig.name}</h2>
            <p className="opacity-90 mt-1">{answeredCount} van de {QUESTIONS.length} beantwoord</p>
          </div>
          <button 
            onClick={onClose} 
            className={`p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors ${teamConfig.textColor}`}
          >
            <X size={24} />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-4 border-b border-slate-100 bg-slate-50">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text" 
              placeholder="Zoek vraag..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-400"
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 bg-slate-50/50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredQuestions.map((q) => {
              const isAnswered = teamState.answeredQuestions.includes(q.id);
              return (
                <button
                  key={q.id}
                  onClick={() => toggleQuestion(q.id)}
                  className={`group text-left p-4 rounded-xl border transition-all duration-200 hover:shadow-md flex items-start gap-4 ${
                    isAnswered 
                      ? 'bg-slate-100 border-slate-200 opacity-60' 
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className={`mt-0.5 shrink-0 transition-colors ${isAnswered ? 'text-green-600' : 'text-slate-300 group-hover:text-slate-400'}`}>
                    {isAnswered ? <CheckCircle2 size={24} /> : <Circle size={24} />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                        #{q.id}
                      </span>
                    </div>
                    <h3 className={`font-medium ${isAnswered ? 'line-through text-slate-500' : 'text-slate-900'}`}>
                      {q.question}
                    </h3>
                    {!isAnswered && (
                      <p className="mt-2 text-sm text-blue-600 font-medium bg-blue-50 inline-block px-2 py-1 rounded">
                        Antwoord: {q.answer}
                      </p>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionsModal;