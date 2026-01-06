import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Languages, ChevronDown, Moon, Sun, Info, BookOpen, Star, Sparkles, Loader2, X } from 'lucide-react';

// Static data - purely informational now
const grammarTopics = [
  // A1
  { id: 1, level: 'A1', concept: 'Verb "to be"', description: 'Used for identity, states, and nationality.', example: '"I am a student." / "She is happy."' },
  { id: 2, level: 'A1', concept: 'Verb "to have"', description: 'Used for possession, relationships, and experiences.', example: '"I have a car." / "She has two brothers."' },
  { id: 3, level: 'A1', concept: 'Present Simple', description: 'Used for habits and general facts.', example: '"He goes to school every day."' },
  { id: 4, level: 'A1', concept: 'Present Continuous', description: 'Used for actions in progress.', example: '"I am studying English now."' },
  { id: 5, level: 'A1', concept: 'Definite & Indefinite Articles', description: '"The" for specific things, "a/an" for general things.', example: '"I have a dog. The dog is big."' },
  { id: 6, level: 'A1', concept: 'Countable & Uncountable Nouns', description: '"Some" and "any" are used for uncountable nouns.', example: '"There is some milk."' },
  { id: 7, level: 'A1', concept: 'Personal & Possessive Pronouns', description: 'Used to refer to subjects and possession.', example: '"She is my sister. Her name is Anna."' },
  { id: 8, level: 'A1', concept: 'Possessive Adjectives', description: 'Used to show ownership.', example: '"This is my book." / "Their house is big."' },
  { id: 9, level: 'A1', concept: 'Prepositions of Place & Time', description: '"In" for months/years, "on" for days, "at" for hours.', example: '"I was born in July." / "I have class at 10 AM."' },
  { id: 10, level: 'A1', concept: 'Numbers, Dates, and Time', description: 'Used to express quantities and tell time.', example: '"Today is May 5th." / "It\'s 3:30 PM."' },
  { id: 11, level: 'A1', concept: 'There is / There are', description: 'Used to indicate existence.', example: '"There is a book on the table."' },
  { id: 12, level: 'A1', concept: 'Demonstratives', description: 'Used to point out things.', example: '"This is my phone." / "Those are my shoes."' },
  { id: 13, level: 'A1', concept: 'Imperatives', description: 'Used to give command, instruction, warning, directions, or request.', example: '"Sit down." / "Close the door."' },
  { id: 14, level: 'A1', concept: 'Can / Can\'t', description: 'Used for abilities and permissions.', example: '"I can swim." / "You can\'t smoke here."' },
  { id: 15, level: 'A1', concept: 'Like + verb -ing', description: 'Expresses likes and preferences.', example: '"I like reading books."' },
  { id: 16, level: 'A1', concept: 'Basic Conjunctions', description: 'Used to connect ideas.', example: '"I like coffee, but I don\'t like tea."' },

  // A2
  { id: 17, level: 'A2', concept: 'Past Simple', description: 'Used for actions completed in the past.', example: '"I visited the museum yesterday." / "She ate lunch."' },
  { id: 18, level: 'A2', concept: 'Past Continuous', description: 'Used for actions happening at a specific moment in the past.', example: '"I was reading when you called."' },
  { id: 19, level: 'A2', concept: 'Future with "going to"', description: 'Used for plans or intentions in the future.', example: '"I am going to study tonight."' },
  { id: 20, level: 'A2', concept: 'Future with "will"', description: 'Used for predictions or spontaneous decisions.', example: '"I will call you later."' },
  { id: 21, level: 'A2', concept: 'Comparatives and Superlatives', description: 'Used for comparing things and using intensifiers.', example: '"This book is bigger." / "He is the tallest."' },
  { id: 22, level: 'A2', concept: 'Adverbs of Frequency', description: 'Used to describe how often something happens.', example: '"I always go to bed early." / "She never eats pizza."' },
  { id: 23, level: 'A2', concept: 'Object Pronouns', description: 'Used to replace objects of verbs.', example: '"I saw him yesterday." / "She helped us."' },
  { id: 24, level: 'A2', concept: 'Quantifiers: Some, Any, Much, Many, etc.', description: 'Used for expressing quantities.', example: '"I don\'t have much time." / "There are many books."' },
  { id: 25, level: 'A2', concept: 'Prepositions of Movement', description: 'Used to describe motion or direction.', example: '"She walked into the room." / "The cat jumped out of the window."' },
  { id: 26, level: 'A2', concept: 'Would like + infinitive', description: 'Used to express desires or requests.', example: '"I would like to travel."' },
  { id: 27, level: 'A2', concept: 'Basic Modal Verbs', description: 'Used to express necessity, obligation, or advice.', example: '"You should study more." / "He must go to work."' },
  { id: 28, level: 'A2', concept: 'Verbs + Infinitive or -ing', description: 'Some verbs are followed by infinitive, others by -ing.', example: '"I want to go home." / "She enjoys swimming."' },
  { id: 29, level: 'A2', concept: 'Zero and First Conditional', description: 'Used for real situations and their consequences.', example: '"If it rains, I take an umbrella." / "If you study, you will pass."' },

  // B1
  { id: 30, level: 'B1', concept: 'Present Perfect', description: 'Actions started in past continuing to present or having effect now.', example: '"I have lived here for 3 years."' },
  { id: 31, level: 'B1', concept: 'Future: "might" vs "going to"', description: 'Going to: Plans/Predictions with evidence. Might: Possibility.', example: '"It might rain." / "I am going to study."' },
  { id: 32, level: 'B1', concept: 'Present Perfect vs Past Simple', description: 'Connection to present vs Completed in past.', example: '"I have eaten" (full now) vs "I ate" (past time).' },
  { id: 33, level: 'B1', concept: 'Past Perfect', description: 'Actions completed before another action in the past.', example: '"I had already eaten when he arrived."' },
  { id: 34, level: 'B1', concept: 'Future Mix', description: 'Will (predictions), going to (plans), Present Continuous (arrangements).', example: '"I will study." / "I am meeting her tomorrow."' },
  { id: 35, level: 'B1', concept: 'Modals: Obligation & Permission', description: 'Must (obligation), have to (necessity), can\'t (prohibition).', example: '"You must finish." / "You can\'t smoke here."' },
  { id: 36, level: 'B1', concept: 'Second Conditional', description: 'Used for hypothetical situations in the present or future.', example: '"If I were rich, I would travel the world."' },
  { id: 37, level: 'B1', concept: 'Indirect Speech', description: 'Reporting what someone said without exact words.', example: '"She said she was tired."' },
  { id: 38, level: 'B1', concept: 'English Fillers', description: 'Well, You know, Like, I mean, So, Actually, Let me see.', example: '"Well, I mean, it’s actually quite good."' },
  { id: 39, level: 'B1', concept: 'Inversion for Agreement', description: 'So + auxiliary + subject / Neither + auxiliary + subject.', example: '"So do I." / "Neither can he."' },
  { id: 40, level: 'B1', concept: 'Passive Voice (Basic)', description: 'Focus on action rather than subject.', example: '"The cake was made by my mom."' },
  { id: 41, level: 'B1', concept: 'Gerund and Present Participle', description: 'Gerund for activities, participle for ongoing actions.', example: '"I saw him running."' },
  { id: 42, level: 'B1', concept: '"Used to" and "Would"', description: 'Express past habits that no longer happen.', example: '"I used to play soccer." / "I would go there every summer."' },
  { id: 43, level: 'B1', concept: 'Reported Speech', description: 'Reporting what someone else said.', example: '"He told me that he was going to the store."' },
  { id: 44, level: 'B1', concept: 'Verb Patterns', description: 'Verbs followed by infinitive vs. gerund.', example: '"I want to study." / "I enjoy studying."' },
  { id: 45, level: 'B1', concept: 'Polite Requests', description: 'Do you mind if...? / I\'d rather you didn\'t.', example: '"Do you mind if I open the window?"' },
  { id: 46, level: 'B1', concept: 'Confirming/Denying', description: 'I\'m afraid so / I\'m afraid not.', example: '"Is it closed? I\'m afraid so."' },
  { id: 47, level: 'B1', concept: 'Should have / Shouldn\'t have', description: 'Regret, criticism, or advice in the past.', example: '"I should have studied more."' },
  { id: 48, level: 'B1', concept: 'Giving Advice', description: 'Should, ought to, why don\'t you.', example: '"You should see a doctor." / "Why don\'t you talk to her?"' },
  { id: 49, level: 'B1', concept: 'Relative Pronouns and Adverbs', description: 'Used to connect clauses and provide information.', example: '"The person who called me is my friend."' },
  { id: 50, level: 'B1', concept: 'Basic Phrasal Verbs', description: 'Verbs combined with a preposition (new meaning).', example: '"Wake up", "turn on", "look for".' },

  // B2
  { id: 51, level: 'B2', concept: 'Present Perfect Continuous', description: 'Actions started in past and still continuing or just finished.', example: '"I have been working all day."' },
  { id: 52, level: 'B2', concept: '"For" and "Since"', description: 'For (period of time), Since (point in time).', example: '"For five years." / "Since 2015."' },
  { id: 53, level: 'B2', concept: 'Perfect Tenses in Passive', description: 'Action in perfect tense done by someone, focus on action.', example: '"The project has been completed."' },
  { id: 54, level: 'B2', concept: 'Perfect Modals', description: 'Speculation or deductions about past actions.', example: '"He must have left early."' },
  { id: 55, level: 'B2', concept: 'Mixed Conditionals', description: 'Mixes two time references: past and present.', example: '"If I had studied, I would be better at math."' },
  { id: 56, level: 'B2', concept: 'Advanced Relative Clauses', description: 'Provides more detailed information about a noun.', example: '"The man whose car was stolen called the police."' },
  { id: 57, level: 'B2', concept: 'Expressions with "wish/if only"', description: 'Regrets, desires, or hypothetical situations.', example: '"I wish I had more time." / "If only I had known earlier."' },
  { id: 58, level: 'B2', concept: 'Inversion (Never, Seldom, etc.)', description: 'Inversion for emphasis with negative adverbs.', example: '"Never have I seen such a beautiful sunset."' },
  { id: 59, level: 'B2', concept: 'Purpose and Result Clauses', description: 'Used to express why or the outcome of an action.', example: '"I went so that I could buy milk."' },
  { id: 60, level: 'B2', concept: 'Advanced Reported Speech', description: 'Reporting with more complex structures.', example: '"She asked me if I had finished the project."' },
  { id: 61, level: 'B2', concept: 'Complex Phrasal Verbs', description: 'Phrasal verbs with more complex meanings.', example: '"I need to give up smoking." / "We ran out of time."' },

  // C1
  { id: 62, level: 'C1', concept: 'Advanced Conditionals', description: 'Formal forms of conditionals for specific situations.', example: '"Should you need help, let me know."' },
  { id: 63, level: 'C1', concept: 'Inversion with Negatives', description: 'Emphasizing a negative adverbial at the start of a sentence.', example: '"Rarely do we see such kindness."' },
  { id: 64, level: 'C1', concept: 'Complex Indirect Speech', description: 'Reporting complicated or conditional actions.', example: '"He would have said that he was coming."' },
  { id: 65, level: 'C1', concept: 'Advanced Passive Voice', description: 'Formal reporting where the agent is less important.', example: '"The book is said to have been written by a famous author."' },
  { id: 66, level: 'C1', concept: 'Perfect and Future Modals', description: 'Speculating about past or future actions.', example: '"He must have forgotten." / "You should have told me."' },
  { id: 67, level: 'C1', concept: 'Participles in Advanced Structures', description: 'Using participles in complex sentence structures.', example: '"Having finished his work, he went home."' },
  { id: 68, level: 'C1', concept: 'Formal/Informal Connectors', description: 'Words used to connect ideas in different contexts.', example: '"Moreover, the results were unexpected." / "Nonetheless..." ' },
  { id: 69, level: 'C1', concept: 'Idioms and Colloquialisms', description: 'Phrases with non-literal interpretations.', example: '"It\'s raining cats and dogs." / "I’ve got cold feet."' },
  { id: 70, level: 'C1', concept: 'Register (Writing/Speaking)', description: 'Choice of language depending on audience.', example: 'Formal: "I would appreciate your response."' },

  // C2
  { id: 71, level: 'C2', concept: 'Mastery of All Structures', description: 'Full command, including rare and complex forms.', example: '"I would have gone if I had known."' },
  { id: 72, level: 'C2', concept: 'Agreement and Cohesion', description: 'Advanced use to create smooth, connected discourse.', example: '"The policies, which we implemented, have had an impact."' },
  { id: 73, level: 'C2', concept: 'Formal/Academic Structures', description: 'Ability to produce highly organized academic texts.', example: '"The study\'s methodology was based on comparative analysis."' },
  { id: 74, level: 'C2', concept: 'Subjunctive Mood', description: 'Expressing wishes, suggestions, or demands (often formal).', example: '"It is essential that he be present."' },
  { id: 75, level: 'C2', concept: 'Elliptical/Reduced Forms', description: 'Using compact expressions to save space/time.', example: '"Had I known, I would have acted differently."' },
  { id: 76, level: 'C2', concept: 'Advanced Idioms', description: 'Wide variety of idioms with cultural references.', example: '"To break the ice" / "A blessing in disguise".' },
  { id: 77, level: 'C2', concept: 'Verb Tense Nuances', description: 'Using tenses to convey subtle focus or meaning.', example: '"I had been waiting for hours before receiving it."' },
  { id: 78, level: 'C2', concept: 'Fluency and Precision', description: 'Ability to express oneself precisely in any setting.', example: 'Formal: "It is with great pleasure... "' },
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

const GeminiModal = ({ isOpen, onClose, topic, explanation, isLoading, isDarkMode }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div 
        className={`relative w-full max-w-2xl max-h-[80vh] overflow-hidden rounded-3xl shadow-2xl transition-all duration-300 ${
          isDarkMode ? 'bg-slate-800 border border-slate-700' : 'bg-white'
        }`}
      >
        {/* Header */}
        <div className={`flex items-center justify-between p-6 border-b ${isDarkMode ? 'border-slate-700 bg-slate-800/50' : 'border-slate-100 bg-slate-50/50'}`}>
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-2 rounded-xl">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className={`font-bold ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>
                {topic?.concept}
              </h3>
              <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                AI Detailed Explanation
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className={`p-2 rounded-xl transition-colors ${
              isDarkMode ? 'hover:bg-slate-700 text-slate-400' : 'hover:bg-slate-100 text-slate-500'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(80vh-140px)]">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12 gap-4">
              <Loader2 className="w-10 h-10 text-indigo-500 animate-spin" />
              <p className={`text-sm font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                Consulting Gemini for the best explanation...
              </p>
            </div>
          ) : (
            <div className={`prose prose-sm max-w-none ${isDarkMode ? 'prose-invert' : ''}`}>
              <div 
                className={`whitespace-pre-wrap leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}
                dangerouslySetInnerHTML={{ __html: explanation }}
              />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className={`p-4 text-center border-t ${isDarkMode ? 'border-slate-700 bg-slate-900/30' : 'border-slate-100 bg-slate-50'}`}>
          <p className="text-[10px] uppercase font-bold tracking-widest text-slate-400">
            Powered by Google Gemini AI
          </p>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [expandedId, setExpandedId] = useState(null);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [aiExplanation, setAiExplanation] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  
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

  const handleAiExplain = async (e, topic) => {
    e.stopPropagation(); // Prevents card collapse
    setSelectedTopic(topic);
    setIsAiModalOpen(true);
    setIsAiLoading(true);
    setAiExplanation('');

    try {
      const response = await axios.post('https://xforce-serverless.vercel.app/api/languages/english/grammar', {
        level: topic.level,
        concept: topic.concept,
        description: topic.description,
        example: topic.example,
        theme: isDarkMode ? 'dark' : 'light',
      });

      const htmlRaw = response.data.data || "Sorry, I couldn't generate an explanation at this moment.";
      
      // Basic formatting: replace double newlines with <br/><br/> and **bold** with <b>
      const formattedHtmlRaw = htmlRaw
        .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');

      setAiExplanation(formattedHtmlRaw);
    } catch (error) {
      console.error('AI Explanation Error:', error);
      setAiExplanation(`<b>Error:</b> ${error.message || 'Something went wrong while fetching the explanation.'}`);
    } finally {
      setIsAiLoading(false);
    }
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
              
              <div className="grid gap-6 md:grid-cols-2">
                {groupedTopics[level]?.map(topic => (
                  <div 
                    key={topic.id} 
                    onClick={() => toggleExpand(topic.id)}
                    className={`
                        group relative cursor-pointer rounded-2xl transition-all duration-300 ease-out
                        border overflow-hidden
                        ${isDarkMode 
                          ? 'bg-slate-800 border-slate-700' 
                          : 'bg-white border-slate-100'}
                        ${expandedId === topic.id 
                            ? (isDarkMode 
                                ? 'shadow-xl shadow-indigo-900/40 ring-2 ring-indigo-500 ring-offset-2 ring-offset-[#0f172a]' 
                                : 'shadow-xl shadow-indigo-100 ring-2 ring-indigo-500 ring-offset-2') 
                            : (isDarkMode
                                ? 'shadow-sm hover:shadow-lg hover:shadow-slate-900/50 hover:-translate-y-1'
                                : 'shadow-sm hover:shadow-lg hover:shadow-slate-200 hover:-translate-y-1')}
                    `}
                  >
                    <div className="p-6">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-2">
                                <LevelBadge level={topic.level} isDarkMode={isDarkMode} />
                                <button
                                    onClick={(e) => handleAiExplain(e, topic)}
                                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all duration-300 ${
                                        isDarkMode 
                                            ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 hover:bg-indigo-500/20' 
                                            : 'bg-indigo-50 text-indigo-600 border border-indigo-100 hover:bg-indigo-100'
                                    }`}
                                    title="Explain with AI"
                                >
                                    <Sparkles className="w-3 h-3" />
                                    AI Explain
                                </button>
                            </div>
                            <div className={`p-1.5 rounded-full transition-colors duration-300 ${
                              expandedId === topic.id 
                                ? (isDarkMode ? 'bg-indigo-900/40 text-indigo-400' : 'bg-indigo-50 text-indigo-600') 
                                : (isDarkMode ? 'bg-slate-900/50 text-slate-500 group-hover:bg-indigo-900/40 group-hover:text-indigo-400' : 'bg-slate-50 text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-500')
                            }`}>
                                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${expandedId === topic.id ? 'rotate-180' : ''}`} />
                            </div>
                        </div>
                        
                        <h3 className={`text-lg font-bold mb-2 transition-colors ${
                          isDarkMode 
                            ? 'text-slate-100 group-hover:text-indigo-400' 
                            : 'text-slate-900 group-hover:text-indigo-700'
                        }`}>
                            {topic.concept}
                        </h3>
                        
                        {/* Collapsible Content */}
                        <div 
                            className={`
                                grid transition-all duration-300 ease-in-out
                                ${expandedId === topic.id ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0'}
                            `}
                        >
                            <div className="overflow-hidden">
                                <div className={`space-y-4 pt-4 border-t ${isDarkMode ? 'border-slate-700' : 'border-slate-100'}`}>
                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <BookOpen className="w-4 h-4 text-indigo-400" />
                                            <span className={`text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>The Rule</span>
                                        </div>
                                        <p className={`leading-relaxed text-sm p-3 rounded-lg border ${
                                          isDarkMode 
                                            ? 'text-slate-300 bg-slate-900/50 border-slate-700' 
                                            : 'text-slate-600 bg-white border-slate-100'
                                        }`}>
                                            {topic.description}
                                        </p>
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <Star className="w-4 h-4 text-amber-400" />
                                            <span className={`text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Example</span>
                                        </div>
                                        <p className={`font-medium italic pl-4 border-l-4 py-1 ${
                                          isDarkMode 
                                            ? 'text-slate-200 border-indigo-500/50' 
                                            : 'text-slate-700 border-indigo-200'
                                        }`}>
                                            {topic.example}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Bottom colored bar accent */}
                    <div className={`h-1.5 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transform origin-left transition-transform duration-500 ${expandedId === topic.id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
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

      <GeminiModal 
        isOpen={isAiModalOpen} 
        onClose={() => setIsAiModalOpen(false)} 
        topic={selectedTopic} 
        explanation={aiExplanation} 
        isLoading={isAiLoading} 
        isDarkMode={isDarkMode} 
      />
    </div>
  );
}