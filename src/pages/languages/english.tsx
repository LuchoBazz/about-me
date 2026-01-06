import React, { useState, useEffect } from 'react';
import { Languages, ChevronDown, ChevronUp, Moon, Sun, Info } from 'lucide-react';

// Static data - purely informational now
const grammarTopics = [
  { id: 1, level: 'A1', concept: 'Verb "to be"', description: 'Used for identity, states, and nationality.', example: '"I am a student." / "She is happy."' },
  { id: 2, level: 'A1', concept: 'Verb "to have"', description: 'Used for possession, relationships, and experiences.', example: '"I have a car." / "She has two brothers."' },
  { id: 3, level: 'A1', concept: 'Present Simple', description: 'Used for habits and general facts.', example: '"He goes to school every day."' },
  { id: 4, level: 'A2', concept: 'Past Simple', description: 'Used for actions completed in the past.', example: '"I visited the museum yesterday." / "She ate lunch."' },
  { id: 5, level: 'A2', concept: 'Past Continuous', description: 'Used for actions happening at a specific moment in the past.', example: '"I was reading when you called."' },
  { id: 6, level: 'A2', concept: 'Future with "going to"', description: 'Used for plans or intentions in the future.', example: '"I am going to study tonight."' },
  { id: 7, level: 'B1', concept: 'Present Perfect', description: 'Actions started in past continuing to present or having effect now.', example: '"I have lived here for 3 years."' },
  { id: 8, level: 'B1', concept: 'Future: "might" vs "going to"', description: 'Going to: Plans/Predictions with evidence. Might: Possibility.', example: '"I might go out" vs "It is going to rain."' },
  { id: 9, level: 'B1', concept: 'Present Perfect vs Past Simple', description: 'Connection to present vs Completed in past.', example: '"I have eaten" (full now) vs "I ate" (past time).' },
  { id: 10, level: 'B1', concept: 'Past Perfect', description: 'Actions completed before another action in the past.', example: '"I had already eaten when he arrived."' },
  { id: 11, level: 'B1', concept: 'Future Mix', description: '"Will" (predictions), "going to" (plans), Present Continuous (arrangements).', example: '"I will study." / "I am going to visit." / "I am meeting her."' },
  { id: 12, level: 'B2', concept: 'Perfect Tenses in Passive', description: 'Action in perfect tense done by someone, focus on action.', example: '"The project has been completed."' },
  { id: 13, level: 'B2', concept: 'Perfect Modals', description: 'Speculation or deductions about past actions.', example: '"He must have left early."' },
  { id: 14, level: 'B2', concept: 'Mixed Conditionals', description: 'Mixes two time references: past and present.', example: '"If I had studied, I would be better at math."' },
  { id: 15, level: 'B2', concept: 'Advanced Relative Clauses', description: 'Provides more detailed information about a noun.', example: '"The man whose car was stolen called the police."' },
  { id: 16, level: 'B2', concept: 'Expressions with "wish/if only"', description: 'Regrets, desires, or hypothetical situations.', example: '"I wish I had more time." / "If only I had known earlier."' },
  { id: 17, level: 'C1', concept: 'Inversion with Negatives', description: 'Emphasizing a negative adverbial at the start of a sentence.', example: '"Never have I seen such a beautiful view."' },
  { id: 18, level: 'C1', concept: 'Cleft Sentences', description: 'Changing sentence structure to focus on specific information.', example: '"It was John who broke the window."' },
  { id: 19, level: 'C1', concept: 'Subjunctive Mood', description: 'Expressing wishes, suggestions, or demands (often formal).', example: '"It is essential that he be present."' },
  { id: 20, level: 'C2', concept: 'Participle Clauses', description: 'Shortening sentences by using -ing or -ed clauses.', example: '"Walking down the street, I saw an old friend."' },
  { id: 21, level: 'C2', concept: 'Future in the Past', description: 'Plans or states in the past that were looking towards the future.', example: '"I was going to call you, but I forgot."' },
  { id: 22, level: 'C2', concept: 'Discourse Markers', description: 'Words used to organize and manage speech/text flow.', example: '"Admittedly, it is hard. Furthermore, we lack time."' },
];

const LevelBadge = ({ level, isDarkMode }) => {
  const lightColors = {
    A1: 'bg-green-100 text-green-800 border-green-200',
    A2: 'bg-blue-100 text-blue-800 border-blue-200',
    B1: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    B2: 'bg-purple-100 text-purple-800 border-purple-200',
    C1: 'bg-orange-100 text-orange-800 border-orange-200',
    C2: 'bg-rose-100 text-rose-800 border-rose-200',
  };
  
  const darkColors = {
    A1: 'bg-green-900/30 text-green-300 border-green-700',
    A2: 'bg-blue-900/30 text-blue-300 border-blue-700',
    B1: 'bg-indigo-900/30 text-indigo-300 border-indigo-700',
    B2: 'bg-purple-900/30 text-purple-300 border-purple-700',
    C1: 'bg-orange-900/30 text-orange-300 border-orange-700',
    C2: 'bg-rose-900/30 text-rose-300 border-rose-700',
  };
  
  const colors = isDarkMode ? darkColors : lightColors;
  
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${colors[level] || (isDarkMode ? 'bg-gray-800' : 'bg-gray-100')}`}>
      {level}
    </span>
  );
};

export default function App() {
  const [expandedId, setExpandedId] = useState(null);
  
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('grammarTheme');
      return savedTheme === 'dark';
    }
    return false;
  });

  useEffect(() => {
    // Save theme preference
    if (typeof window !== 'undefined') {
      localStorage.setItem('grammarTheme', isDarkMode ? 'dark' : 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // Group by levels
  const groupedTopics = grammarTopics.reduce((acc, topic) => {
    if (!acc[topic.level]) acc[topic.level] = [];
    acc[topic.level].push(topic);
    return acc;
  }, {});

  const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

  return (
    <div className={`min-h-screen font-sans pb-20 transition-colors duration-300 ${isDarkMode ? 'bg-[#0f172a] text-slate-100' : 'bg-slate-50 text-slate-800'}`}>
      {/* Header */}
      <header className={`border-b transition-colors duration-300 ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            {/* Left: Back to Home */}
            <a 
              href="/about-me/" 
              className={`text-sm transition-colors mr-4 ${isDarkMode ? 'text-slate-400 hover:text-slate-200' : 'text-slate-500 hover:text-slate-800'}`}
            >
              ← Back to Home
            </a>
            <div className="bg-indigo-600 p-2 rounded-lg">
            <Languages className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className={`text-xl font-bold leading-tight ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>My English Grammar Reference</h3>
            </div>
          </div>
          
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'bg-slate-700 hover:bg-slate-600 text-yellow-300' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'}`}
            title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        
        {/* Intro Banner */}
        <div className={`rounded-2xl p-6 mb-8 text-white shadow-lg flex items-start gap-4 ${isDarkMode ? 'bg-gradient-to-r from-indigo-600 to-purple-700' : 'bg-gradient-to-r from-indigo-500 to-purple-600'}`}>
          <div className="bg-white/20 p-2 rounded-full hidden sm:block">
            <Info className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-2">English Grammar Cheat Sheet</h2>
            <p className="opacity-90">
              A quick reference guide for all major grammar concepts from beginner to proficient levels. Click on any topic to see rules and examples.
            </p>
          </div>
        </div>

        {/* Content by Level */}
        <div className="space-y-8">
          {levels.map(level => (
            <div key={level}>
              <h3 className={`text-lg font-bold mb-4 flex items-center gap-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                Level {level}
                <span className={`h-px flex-1 ml-2 ${isDarkMode ? 'bg-slate-700' : 'bg-slate-200'}`}></span>
              </h3>
              
              <div className="grid gap-4 md:grid-cols-2">
                {groupedTopics[level]?.map(topic => (
                  <div 
                    key={topic.id} 
                    className={`
                      relative rounded-xl border transition-all duration-300 overflow-hidden
                      ${isDarkMode ? 'bg-slate-800 border-slate-700 shadow-sm hover:shadow-md' : 'bg-white border-slate-200 shadow-sm hover:shadow-md'}
                    `}
                  >
                    {/* Card Header */}
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <LevelBadge level={topic.level} isDarkMode={isDarkMode} />
                      </div>
                      
                      <h4 className={`font-bold text-lg mb-1 ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>{topic.concept}</h4>
                      
                      {/* Description & Example (Collapsible) */}
                      <div 
                        className={`overflow-hidden transition-all duration-300 ${expandedId === topic.id ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}
                      >
                        <div className={`p-4 rounded-lg text-sm border ${isDarkMode ? 'bg-slate-900/50 border-slate-700' : 'bg-slate-50 border-slate-100'}`}>
                          <p className={`font-medium mb-1 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>Rule:</p>
                          <p className={`mb-3 leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>{topic.description}</p>
                          <p className={`font-medium mb-1 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>Example:</p>
                          <p className={`italic px-3 py-2 rounded border ${isDarkMode ? 'text-slate-400 bg-slate-800 border-slate-700' : 'text-slate-600 bg-white border-slate-200'}`}>
                            {topic.example}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Card Footer Actions */}
                    <div className={`p-2 flex items-center justify-center border-t ${isDarkMode ? 'bg-slate-900/30 border-slate-700' : 'bg-slate-50 border-slate-100'}`}>
                      <button 
                        onClick={() => toggleExpand(topic.id)}
                        className={`w-full text-sm font-medium flex items-center justify-center gap-1 py-1 transition-colors ${isDarkMode ? 'text-slate-400 hover:text-indigo-400' : 'text-slate-500 hover:text-indigo-600'}`}
                      >
                        {expandedId === topic.id ? (
                          <>Close <ChevronUp className="w-4 h-4" /></>
                        ) : (
                          <>View Details <ChevronDown className="w-4 h-4" /></>
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className={`mt-12 text-center text-sm ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
          <p>Complete Grammar Overview • A1-C2</p>
        </div>
      </main>
    </div>
  );
}