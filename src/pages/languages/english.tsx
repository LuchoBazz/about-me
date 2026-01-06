import React, { useState, useEffect } from 'react';
import { Languages, CheckCircle, Circle, ArrowRight, TrendingUp, Award, RefreshCw, ChevronDown, ChevronUp, Moon, Sun } from 'lucide-react';

// Initial data based on user request (Expanded with C1 and C2)
const initialData = [
  // ... A1 to B2 Data ...
  { id: 1, level: 'A1', concept: 'Verb "to be"', description: 'Used for identity, states, and nationality.', example: '"I am a student." / "She is happy."', status: 'Learned', studies: 5 },
  { id: 2, level: 'A1', concept: 'Verb "to have"', description: 'Used for possession, relationships, and experiences.', example: '"I have a car." / "She has two brothers."', status: 'In Progress', studies: 2 },
  { id: 3, level: 'A1', concept: 'Present Simple', description: 'Used for habits and general facts.', example: '"He goes to school every day."', status: 'In Progress', studies: 2 },
  { id: 4, level: 'A2', concept: 'Past Simple', description: 'Used for actions completed in the past.', example: '"I visited the museum yesterday." / "She ate lunch."', status: 'In Progress', studies: 1 },
  { id: 5, level: 'A2', concept: 'Past Continuous', description: 'Used for actions happening at a specific moment in the past.', example: '"I was reading when you called."', status: 'In Progress', studies: 1 },
  { id: 6, level: 'A2', concept: 'Future with "going to"', description: 'Used for plans or intentions in the future.', example: '"I am going to study tonight."', status: 'In Progress', studies: 3 },
  { id: 7, level: 'B1', concept: 'Present Perfect', description: 'Actions started in past continuing to present or having effect now.', example: '"I have lived here for 3 years."', status: 'In Progress', studies: 2 },
  { id: 8, level: 'B1', concept: 'Future: "might" vs "going to"', description: 'Going to: Plans/Predictions with evidence. Might: Possibility.', example: '"I might go out" vs "It is going to rain."', status: 'In Progress', studies: 1 },
  { id: 9, level: 'B1', concept: 'Present Perfect vs Past Simple', description: 'Connection to present vs Completed in past.', example: '"I have eaten" (full now) vs "I ate" (past time).', status: 'In Progress', studies: 2 },
  { id: 10, level: 'B1', concept: 'Past Perfect', description: 'Actions completed before another action in the past.', example: '"I had already eaten when he arrived."', status: 'In Progress', studies: 1 },
  { id: 11, level: 'B1', concept: 'Future Mix', description: '"Will" (predictions), "going to" (plans), Present Continuous (arrangements).', example: '"I will study." / "I am going to visit." / "I am meeting her."', status: 'In Progress', studies: 1 },
  { id: 12, level: 'B2', concept: 'Perfect Tenses in Passive', description: 'Action in perfect tense done by someone, focus on action.', example: '"The project has been completed."', status: 'In Progress', studies: 1 },
  { id: 13, level: 'B2', concept: 'Perfect Modals', description: 'Speculation or deductions about past actions.', example: '"He must have left early."', status: 'To Learn', studies: 0 },
  { id: 14, level: 'B2', concept: 'Mixed Conditionals', description: 'Mixes two time references: past and present.', example: '"If I had studied, I would be better at math."', status: 'To Learn', studies: 0 },
  { id: 15, level: 'B2', concept: 'Advanced Relative Clauses', description: 'Provides more detailed information about a noun.', example: '"The man whose car was stolen called the police."', status: 'To Learn', studies: 0 },
  { id: 16, level: 'B2', concept: 'Expressions with "wish/if only"', description: 'Regrets, desires, or hypothetical situations.', example: '"I wish I had more time." / "If only I had known earlier."', status: 'To Learn', studies: 0 },
  // ... New C1 and C2 Data ...
  { id: 17, level: 'C1', concept: 'Inversion with Negatives', description: 'Emphasizing a negative adverbial at the start of a sentence.', example: '"Never have I seen such a beautiful view."', status: 'To Learn', studies: 0 },
  { id: 18, level: 'C1', concept: 'Cleft Sentences', description: 'Changing sentence structure to focus on specific information.', example: '"It was John who broke the window."', status: 'To Learn', studies: 0 },
  { id: 19, level: 'C1', concept: 'Subjunctive Mood', description: 'Expressing wishes, suggestions, or demands (often formal).', example: '"It is essential that he be present."', status: 'To Learn', studies: 0 },
  { id: 20, level: 'C2', concept: 'Participle Clauses', description: 'Shortening sentences by using -ing or -ed clauses.', example: '"Walking down the street, I saw an old friend."', status: 'To Learn', studies: 0 },
  { id: 21, level: 'C2', concept: 'Future in the Past', description: 'Plans or states in the past that were looking towards the future.', example: '"I was going to call you, but I forgot."', status: 'To Learn', studies: 0 },
  { id: 22, level: 'C2', concept: 'Discourse Markers', description: 'Words used to organize and manage speech/text flow.', example: '"Admittedly, it is hard. Furthermore, we lack time."', status: 'To Learn', studies: 0 },
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
  const [topics, setTopics] = useState(() => {
    // Try to load from localStorage on start
    const saved = localStorage.getItem('grammarProgress');
    // If we have saved data, we check if it has the new C1/C2 items. If not, we merge them.
    if (saved) {
      const parsed = JSON.parse(saved);
      // Simple check: if saved data has fewer items than initialData, user is missing the new updates.
      if (parsed.length < initialData.length) {
         // Create a map of existing progress
         const progressMap = new Map(parsed.map(item => [item.id, item]));
         // Return initialData but with saved progress where available
         return initialData.map(item => progressMap.get(item.id) || item);
      }
      return parsed;
    }
    return initialData;
  });

  const [expandedId, setExpandedId] = useState(null);
  
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('grammarTheme');
    return savedTheme === 'dark';
  });

  useEffect(() => {
    // Save to localStorage whenever topics change
    localStorage.setItem('grammarProgress', JSON.stringify(topics));
  }, [topics]);

  useEffect(() => {
    // Save theme preference
    localStorage.setItem('grammarTheme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  const handleStudy = (id) => {
    setTopics(prev => prev.map(topic => {
      if (topic.id === id) {
        const newStudies = Math.min(topic.studies + 1, 5);
        let newStatus = topic.status;
        
        if (newStudies === 5) newStatus = 'Learned';
        else if (newStudies > 0 && newStatus === 'To Learn') newStatus = 'In Progress';

        return { ...topic, studies: newStudies, status: newStatus };
      }
      return topic;
    }));
  };

  const handleReset = (id) => {
    if (window.confirm("Are you sure you want to reset the progress for this topic?")) {
      setTopics(prev => prev.map(topic => 
        topic.id === id ? { ...topic, studies: 0, status: 'To Learn' } : topic
      ));
    }
  };

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const getProgressPercentage = () => {
    const totalStudies = topics.length * 5;
    const currentStudies = topics.reduce((acc, curr) => acc + curr.studies, 0);
    return Math.round((currentStudies / totalStudies) * 100);
  };

  // Group by levels
  const groupedTopics = topics.reduce((acc, topic) => {
    if (!acc[topic.level]) acc[topic.level] = [];
    acc[topic.level].push(topic);
    return acc;
  }, {});

  const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

  return (
    <div className={`min-h-screen font-sans pb-20 transition-colors duration-300 ${isDarkMode ? 'bg-[#0f172a] text-slate-100' : 'bg-slate-50 text-slate-800'}`}>
      {/* Header */}
      <header className={`border-b transition-colors duration-300 ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Left: Back to Home */}
            <a 
              href="/about-me/" 
              className={`text-sm transition-colors ${isDarkMode ? 'text-slate-400 hover:text-slate-200' : 'text-slate-500 hover:text-slate-800'}`}
            >
              ← Back to Home
            </a>

            {/* Center: Title and Badge */}
            <div className="flex items-center gap-2">
              <div className="bg-indigo-600 p-2 rounded-lg">
                <Languages className="w-6 h-6 text-white" />
              </div>
              <div className="flex items-center gap-2">
                <h2 className={`text-xl font-bold leading-tight ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>English Grammar Path</h2>
                <span className={`px-2 py-0.5 rounded text-xs font-medium ${isDarkMode ? 'bg-indigo-900/30 text-indigo-300 border border-indigo-700' : 'bg-indigo-50 text-indigo-700 border border-indigo-200'}`}>
                  Personal Progress
                </span>
              </div>
            </div>

            {/* Right: Theme Toggle and Progress */}
            <div className="flex items-center gap-4">
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'bg-slate-700 hover:bg-slate-600 text-yellow-300' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'}`}
                title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <div className="flex flex-col items-end">
                <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">{getProgressPercentage()}% Mastered</span>
                <div className={`w-32 h-2 rounded-full mt-1 overflow-hidden ${isDarkMode ? 'bg-slate-700' : 'bg-slate-100'}`}>
                  <div 
                    className="h-full bg-indigo-500 transition-all duration-500 ease-out"
                    style={{ width: `${getProgressPercentage()}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        
        {/* Intro Banner */}
        <div className={`rounded-2xl p-6 mb-8 text-white shadow-lg ${isDarkMode ? 'bg-gradient-to-r from-indigo-600 to-purple-700' : 'bg-gradient-to-r from-indigo-500 to-purple-600'}`}>
          <h2 className="text-2xl font-bold mb-2">Let's reach Fluency! 🚀</h2>
          <p className="opacity-90 mb-4">
            The key is spaced repetition. Try to study each topic at least 5 times on different days to fully master it.
          </p>
          <div className="flex gap-4 text-sm font-medium">
            <div className="flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full">
              <Circle className="w-4 h-4 text-slate-300" /> To Learn
            </div>
            <div className="flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full">
              <TrendingUp className="w-4 h-4 text-yellow-300" /> In Progress
            </div>
            <div className="flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full">
              <CheckCircle className="w-4 h-4 text-green-300" /> Mastered
            </div>
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
                      relative rounded-xl border-2 transition-all duration-300 overflow-hidden
                      ${isDarkMode ? 'bg-slate-800' : 'bg-white'}
                      ${topic.status === 'Learned' 
                        ? (isDarkMode ? 'border-green-500 shadow-green-900/20 shadow-md' : 'border-green-400 shadow-green-100 shadow-md')
                        : (isDarkMode ? 'border-slate-700 shadow-sm hover:shadow-md' : 'border-slate-100 shadow-sm hover:shadow-md')}
                    `}
                  >
                    {/* Card Header */}
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <LevelBadge level={topic.level} isDarkMode={isDarkMode} />
                        {topic.status === 'Learned' && (
                          <Award className={`w-5 h-5 ${isDarkMode ? 'text-green-400' : 'text-green-500'}`} />
                        )}
                      </div>
                      
                      <h4 className={`font-bold text-lg mb-1 ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>{topic.concept}</h4>
                      
                      {/* Interactive Progress Bar */}
                      <div className="mt-3 mb-4">
                        <div className={`flex justify-between text-xs mb-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                          <span>Repetitions</span>
                          <span className="font-medium">{topic.studies} / 5</span>
                        </div>
                        <div className="flex gap-1 h-2.5">
                          {[1, 2, 3, 4, 5].map(step => (
                            <div 
                              key={step} 
                              className={`
                                flex-1 rounded-full transition-colors duration-300
                                ${step <= topic.studies 
                                  ? (topic.status === 'Learned' ? 'bg-green-500' : 'bg-indigo-500') 
                                  : (isDarkMode ? 'bg-slate-700' : 'bg-slate-100')}
                              `}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Description & Example (Collapsible) */}
                      <div 
                        className={`overflow-hidden transition-all duration-300 ${expandedId === topic.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                      >
                        <div className={`p-3 rounded-lg mb-4 text-sm ${isDarkMode ? 'bg-slate-900/50' : 'bg-slate-50'}`}>
                          <p className={`font-medium mb-1 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>Rule:</p>
                          <p className={`mb-2 leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>{topic.description}</p>
                          <p className={`font-medium mb-1 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>Example:</p>
                          <p className={`italic px-2 py-1 rounded border ${isDarkMode ? 'text-slate-400 bg-slate-800 border-slate-700' : 'text-slate-600 bg-white border-slate-200'}`}>
                            {topic.example}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Card Footer Actions */}
                    <div className={`p-3 flex items-center justify-between border-t ${isDarkMode ? 'bg-slate-900/30 border-slate-700' : 'bg-slate-50 border-slate-100'}`}>
                      <button 
                        onClick={() => toggleExpand(topic.id)}
                        className={`text-sm font-medium flex items-center gap-1 transition-colors ${isDarkMode ? 'text-slate-400 hover:text-indigo-400' : 'text-slate-500 hover:text-indigo-600'}`}
                      >
                        {expandedId === topic.id ? (
                          <>Less info <ChevronUp className="w-4 h-4" /></>
                        ) : (
                          <>View details <ChevronDown className="w-4 h-4" /></>
                        )}
                      </button>

                      <div className="flex items-center gap-2">
                        {topic.studies > 0 && topic.status !== 'Learned' && (
                           <button 
                           onClick={() => handleReset(topic.id)}
                           className={`p-2 rounded-full transition-colors ${isDarkMode ? 'text-slate-500 hover:text-red-400 hover:bg-red-900/20' : 'text-slate-400 hover:text-red-500 hover:bg-red-50'}`}
                           title="Reset progress"
                         >
                           <RefreshCw className="w-4 h-4" />
                         </button>
                        )}
                       
                        <button
                          onClick={() => handleStudy(topic.id)}
                          disabled={topic.studies >= 5}
                          className={`
                            flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm transition-all active:scale-95
                            ${topic.status === 'Learned' 
                              ? (isDarkMode ? 'bg-green-900/30 text-green-400 cursor-default' : 'bg-green-100 text-green-700 cursor-default')
                              : (isDarkMode ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-900/30' : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-200')}
                          `}
                        >
                          {topic.status === 'Learned' ? (
                            <>Completed! <CheckCircle className="w-4 h-4" /></>
                          ) : (
                            <>Study (+1) <ArrowRight className="w-4 h-4" /></>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className={`mt-12 text-center text-sm ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
          <p>Your progress is automatically saved on this device.</p>
        </div>
      </main>
    </div>
  );
}