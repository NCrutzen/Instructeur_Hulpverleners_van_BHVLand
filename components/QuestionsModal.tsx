
import React, { useMemo, useState } from 'react';
import { QUESTIONS, TEAMS } from '../constants';
import { TeamState, TeamColor, Question } from '../types';
import { X, CheckCircle2, Circle, Search, HeartPulse, AlertCircle, Eye, Bandage, Flame } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  teamState: TeamState;
  toggleQuestion: (questionId: number) => void;
}

const CategoryIcon = ({ category }: { category: string }) => {
  switch (category) {
    case 'Spoedeisende Eerste Hulp': return <HeartPulse size={14} />;
    case 'Interne noodsituaties': return <AlertCircle size={14} />;
    case 'Botten, gewrichten en oogzorg': return <Eye size={14} />;
    case 'Verdieping wondzorg & verbandleer': return <Bandage size={14} />;
    case 'Brandpreventie & gebouwgebonden Voorzieningen': return <Flame size={14} />;
    default: return null;
  }
};

const CategoryHeaderColor = (category: string) => {
  switch (category) {
    case 'Spoedeisende Eerste Hulp': return 'bg-red-100 text-red-700 border-red-200';
    case 'Interne noodsituaties': return 'bg-orange-100 text-orange-700 border-orange-200';
    case 'Botten, gewrichten en oogzorg': return 'bg-blue-100 text-blue-700 border-blue-200';
    case 'Verdieping wondzorg & verbandleer': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
    case 'Brandpreventie & gebouwgebonden Voorzieningen': return 'bg-slate-100 text-slate-700 border-slate-200';
    default: return 'bg-slate-100 text-slate-700 border-slate-200';
  }
};

const QuestionsModal: React.FC<Props> = ({ isOpen, onClose, teamState, toggleQuestion }) => {
  const [filter, setFilter] = useState('');

  if (!isOpen) return null;

  const teamConfig = TEAMS[teamState.color];

  const filteredQuestions = QUESTIONS.filter(q =>
    q.question.toLowerCase().includes(filter.toLowerCase()) ||
    q.id.toString().includes(filter) ||
    q.category.toLowerCase().includes(filter.toLowerCase())
  );

  // Group questions by category
  const groupedQuestions = useMemo(() => {
    const groups: Record<string, Question[]> = {};
    filteredQuestions.forEach(q => {
      if (!groups[q.category]) groups[q.category] = [];
      groups[q.category].push(q);
    });
    return groups;
  }, [filteredQuestions]);

  const answeredCount = teamState.answeredQuestions.length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-6xl overflow-hidden flex flex-col max-h-[95vh]">

        {/* Compact Header for tablet */}
        <div
          className="p-3 flex justify-between items-center shrink-0"
          style={{ backgroundColor: teamConfig.hex }}
        >
          <div className={teamConfig.textColor}>
            <h2 className="text-lg font-rockwell font-bold">Vragen: {teamConfig.name}</h2>
            <p className="opacity-90 text-sm font-sans">{answeredCount}/{QUESTIONS.length} beantwoord</p>
          </div>
          <button
            onClick={onClose}
            className={`p-2 rounded-full bg-white/20 active:bg-white/40 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center ${teamConfig.textColor}`}
          >
            <X size={20} />
          </button>
        </div>

        {/* Compact Search Bar */}
        <div className="p-2 border-b border-slate-100 bg-slate-50 font-sans shrink-0">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Zoek vraag..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-400 text-sm"
            />
          </div>
        </div>

        {/* Content - optimized for tablet */}
        <div className="flex-1 overflow-y-auto p-3 bg-slate-50/50 font-sans">
          <div className="space-y-4">
            {(Object.entries(groupedQuestions) as [string, Question[]][]).map(([category, questions]) => (
              <div key={category} className="space-y-2">
                <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-black text-[10px] uppercase tracking-wider ${CategoryHeaderColor(category)}`}>
                  <CategoryIcon category={category} />
                  <span className="truncate">{category}</span>
                  <span className="ml-auto opacity-60">({questions.length})</span>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
                  {questions.map((q) => {
                    const isAnswered = teamState.answeredQuestions.includes(q.id);
                    return (
                      <button
                        key={q.id}
                        onClick={() => toggleQuestion(q.id)}
                        className={`text-left p-2.5 rounded-lg border transition-all duration-200 flex items-start gap-2 min-h-[60px] active:scale-[0.98] ${
                          isAnswered
                            ? 'bg-slate-100 border-slate-200 opacity-60'
                            : 'bg-white border-slate-200'
                        }`}
                      >
                        <div className={`mt-0.5 shrink-0 transition-colors ${isAnswered ? 'text-green-600' : 'text-slate-300'}`}>
                          {isAnswered ? <CheckCircle2 size={20} /> : <Circle size={20} />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1 mb-0.5">
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-500">
                              #{q.id}
                            </span>
                          </div>
                          <h3 className={`text-xs font-medium leading-snug line-clamp-2 ${isAnswered ? 'line-through text-slate-500' : 'text-slate-800'}`}>
                            {q.question}
                          </h3>
                          {!isAnswered && (
                            <div className="mt-1.5 p-1.5 bg-blue-50 rounded border border-blue-100">
                              <p className="text-[9px] text-blue-600 font-medium leading-snug line-clamp-2">
                                {q.answer}
                              </p>
                            </div>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

            {Object.keys(groupedQuestions).length === 0 && (
              <div className="text-center py-10">
                <p className="text-slate-400 font-medium text-sm">Geen vragen gevonden.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionsModal;
