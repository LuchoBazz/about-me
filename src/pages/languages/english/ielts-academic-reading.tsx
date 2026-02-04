import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {
  BookOpen,
  Moon,
  Sun,
  Send,
  Eye,
  EyeOff,
  RefreshCw,
  CheckCircle,
  HelpCircle,
  BrainCircuit,
  GraduationCap,
  Shuffle,
  Layers,
  ChevronDown
} from 'lucide-react';

const TOPICS_DATA = {
  "Technology & AI": [
    "The Evolution of Artificial Neural Networks",
    "The Ethics of Autonomous Vehicles",
    "Quantum Computing: A New Era",
    "The History of the Internet",
    "Robotics in Modern Medicine",
    "Cybersecurity in the 21st Century",
    "The Impact of Automation on Employment",
    "Virtual Reality in Education",
    "The Future of Space Exploration",
    "Biometrics and Data Privacy",
    "Nanotechnology applications",
    "The Rise of Smart Cities",
    "Algorithms and Bias",
    "3D Printing in Construction",
    "The Psychology of Human-Computer Interaction"
  ],
  "Environment & Nature": [
    "Climate Change and Polar Ice Caps",
    "The Disappearance of Honey Bees",
    "Renewable Energy Sources: Wind and Solar",
    "Plastic Pollution in the Oceans",
    "Urban Greening and Vertical Forests",
    "The Importance of Biodiversity",
    "Water Scarcity in Arid Regions",
    "Sustainable Agriculture Practices",
    "The Phenomenon of El Niño",
    "Conservation of Endangered Species",
    "Deforestation in the Amazon",
    "The Science of Composting",
    "Geothermal Energy Potential",
    "Wildlife Migration Patterns",
    "The Role of Coral Reefs"
  ],
  "Psychology & Sociology": [
    "The Psychology of Innovation",
    "Childhood Cognitive Development",
    "The Science of Sleep and Dreams",
    "Urbanization and Mental Health",
    "The Bystander Effect Explained",
    "Memory and Mnemonics",
    "The Psychology of Color in Marketing",
    "Group Dynamics in the Workplace",
    "Language Acquisition in Children",
    "The Impact of Social Media on Behavior",
    "Introversion vs. Extroversion",
    "Decision Making Under Pressure",
    "The Placebo Effect",
    "Cultural Differences in Communication",
    "The Concept of Happiness across Cultures"
  ],
  "History & Archaeology": [
    "The Construction of the Egyptian Pyramids",
    "The Discovery of Penicillin",
    "The History of the Printing Press",
    "Viking Navigation Techniques",
    "The Industrial Revolution in Britain",
    "Preserving Ancient Manuscripts",
    "The Silk Road Trade Route",
    "The Maya Civilization's Collapse",
    "The History of Map Making",
    "Underwater Archaeology",
    "The Evolution of Writing Systems",
    "Roman Engineering Feats",
    "The History of Timekeeping",
    "Prehistoric Cave Art",
    "The Gold Rush Era"
  ],
  "Biology & Health": [
    "The Human Microbiome",
    "Circadian Rhythms and Health",
    "The Benefits of Bilingualism on the Brain",
    "Advances in Genetic Engineering",
    "Nutritional Myths and Facts",
    "The Immune System Explained",
    "Neuroplasticity in Adults",
    "The History of Vaccination",
    "Animal Intelligence and Tool Use",
    "Bioluminescence in Deep Sea Creatures",
    "The Science of Laughter",
    "Pandemics throughout History",
    "Ergonomics in the Workplace",
    "Taste Perception and Genetics",
    "Hydration and Physical Performance"
  ],
  "Economics, Business & Work": [
    "The Global Tourism Industry",
    "Microfinance in Developing Countries",
    "The Gig Economy",
    "Corporate Social Responsibility",
    "The History of Currency",
    "Supply Chain Management Challenges",
    "Remote Work Culture",
    "Consumer Behavior Patterns",
    "The Economics of Recycling",
    "Globalization and Local Markets",
    "Leadership Styles in Business",
    "The Psychology of Advertising",
    "Start-up Ecosystems",
    "International Trade Agreements",
    "The Glass Ceiling Effect"
  ],
  "General Culture, Art & Architecture": [
    "Modernist Architecture",
    "The Restoration of Renaissance Art",
    "The History of Cinema",
    "Music Therapy and its Effects",
    "Traditional Storytelling Methods",
    "The Evolution of Museums",
    "Sustainable Fashion Trends",
    "The Origin of Coffee Culture",
    "Linguistic Diversity in the World",
    "The Art of Glassblowing",
    "Urban Planning in Megacities",
    "The History of Photography",
    "Culinary Traditions and Identity",
    "The Philosophy of Stoicism",
    "Public Transport Systems of the World"
  ]
};

const generateIELTSContent = async (topic, category) => {
  try {
    const response = await axios.post('https://xforce-serverless.vercel.app/api/languages/english/ielts-reading', {
      topic,
      category
    });

    const resultText = response.data.data;

    if (!resultText) throw new Error("No content generated");

    const parts = resultText.split("|||SECTION_BREAK|||");

    return {
      passage: parts[0] || "Error: Could not parse passage.",
      questions: parts[1] || resultText
    };

  } catch (error) {
    console.error("Generation failed:", error);
    throw error;
  }
};

const Header = ({ isDark, toggleTheme }) => (
  <header className={`sticky top-0 z-50 border-b transition-colors duration-300 ${isDark ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200'}`}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div className={`p-2 rounded-lg ${isDark ? 'bg-indigo-500/20 text-indigo-400' : 'bg-indigo-100 text-indigo-600'}`}>
          <GraduationCap size={24} />
        </div>
        <h1 className={`text-xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
          IELTS <span className="text-indigo-500">Master</span>
        </h1>
      </div>
      <button
        onClick={toggleTheme}
        className={`p-2 rounded-full transition-all duration-300 ${isDark ? 'bg-slate-800 text-yellow-400 hover:bg-slate-700' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
        aria-label="Toggle theme"
      >
        {isDark ? <Sun size={20} /> : <Moon size={20} />}
      </button>
    </div>
  </header>
);

const EmptyState = ({ isDark }) => (
  <div className="flex flex-col items-center justify-center py-20 text-center px-4">
    <div className={`p-6 rounded-full mb-6 ${isDark ? 'bg-slate-800/50' : 'bg-indigo-50'}`}>
      <BrainCircuit size={48} className={isDark ? 'text-indigo-400' : 'text-indigo-600'} />
    </div>
    <h2 className={`text-3xl font-bold mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>
      Select a Topic
    </h2>
    <p className={`max-w-lg text-lg mb-8 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
      Choose a category and topic above, or pick a random one to start your IELTS Academic Reading practice.
    </p>
  </div>
);

const MarkdownRenderer = ({ content, isDark, isSerif = false }) => {
  const formatText = (text) => {
    if (!text) return null;
    return text.split('\n').map((line, index) => {
      if (line.startsWith('### ')) return <h3 key={index} className="text-lg font-bold mt-6 mb-3 text-indigo-500">{line.replace('### ', '')}</h3>;
      if (line.startsWith('## ')) return <h2 key={index} className="text-xl font-bold mt-8 mb-4 border-b pb-2 border-indigo-500/30">{line.replace('## ', '')}</h2>;
      if (line.startsWith('**Paragraph')) return <h4 key={index} className="text-md font-bold mt-6 mb-2 text-indigo-400 uppercase tracking-wider">{line.replace(/\*/g, '')}</h4>;

      const parts = line.split(/(\*\*.*?\*\*)/g);

      if (line.trim().startsWith('* ')) {
        return (
          <li key={index} className="ml-4 mb-2 list-disc list-inside">
            {parts.map((part, i) =>
              part.startsWith('**') ? <strong key={i}>{part.replace(/\*\*/g, '')}</strong> : part
            )}
          </li>
        );
      }

      if (line.trim() === '') return <div key={index} className="h-4"></div>;

      return (
        <p key={index} className={`mb-4 leading-relaxed ${isSerif ? 'font-serif text-lg' : 'text-base'}`}>
          {parts.map((part, i) =>
            part.startsWith('**') ? <strong key={i} className={isDark ? 'text-indigo-300' : 'text-indigo-700'}>{part.replace(/\*\*/g, '')}</strong> : part
          )}
        </p>
      );
    });
  };
  return <div className={`prose max-w-none ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{formatText(content)}</div>;
};

export default function IELTSApp() {
  const { siteConfig } = useDocusaurusContext();

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [showAnswers, setShowAnswers] = useState(false);
  const [error, setError] = useState("");

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setSelectedTopic("");
  };

  const pickRandomTopic = () => {
    const categories = Object.keys(TOPICS_DATA);
    const randomCat = categories[Math.floor(Math.random() * categories.length)];
    const topics = TOPICS_DATA[randomCat];
    const randomTop = topics[Math.floor(Math.random() * topics.length)];

    setSelectedCategory(randomCat);
    setSelectedTopic(randomTop);
  };

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!selectedTopic) return;

    setLoading(true);
    setError("");
    setContent(null);
    setShowAnswers(false);

    try {
      const data = await generateIELTSContent(selectedTopic, selectedCategory);
      setContent(data);
    } catch (err) {
      setError("Failed to generate content. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 font-sans ${isDark ? 'bg-slate-950' : 'bg-slate-50'}`}>

      <Header isDark={isDark} toggleTheme={() => setIsDark(!isDark)} />

      <main className="flex-1 flex flex-col max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 gap-6 h-[calc(100vh-64px)] overflow-hidden">

        <div className="flex-none flex flex-col md:flex-row gap-4 items-end md:items-center bg-transparent">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-4xl">
            <div className="relative group">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                <Layers size={18} />
              </div>
              <select
                value={selectedCategory}
                onChange={handleCategoryChange}
                className={`w-full appearance-none pl-10 pr-8 py-3 rounded-xl border-2 outline-none transition-all cursor-pointer ${isDark
                  ? 'bg-slate-800 border-slate-700 text-white focus:border-indigo-500'
                  : 'bg-white border-slate-200 text-slate-900 focus:border-indigo-500 shadow-sm'
                  }`}
              >
                <option value="" disabled>Select Category</option>
                {Object.keys(TOPICS_DATA).map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                <ChevronDown size={16} />
              </div>
            </div>

            <div className="relative">
              <select
                value={selectedTopic}
                onChange={(e) => setSelectedTopic(e.target.value)}
                disabled={!selectedCategory}
                className={`w-full appearance-none pl-4 pr-8 py-3 rounded-xl border-2 outline-none transition-all cursor-pointer ${isDark
                  ? 'bg-slate-800 border-slate-700 text-white disabled:opacity-50 disabled:cursor-not-allowed focus:border-indigo-500'
                  : 'bg-white border-slate-200 text-slate-900 disabled:opacity-50 disabled:cursor-not-allowed focus:border-indigo-500 shadow-sm'
                  }`}
              >
                <option value="" disabled>
                  {selectedCategory ? "Select Topic" : "Select a category first"}
                </option>
                {selectedCategory && TOPICS_DATA[selectedCategory].map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                <ChevronDown size={16} />
              </div>
            </div>
          </div>

          <div className="flex gap-2 w-full md:w-auto">
            <button
              onClick={pickRandomTopic}
              className={`p-3 rounded-xl transition-all border-2 ${isDark
                ? 'bg-slate-800 border-slate-700 text-indigo-400 hover:bg-slate-700 hover:text-white'
                : 'bg-white border-slate-200 text-indigo-600 hover:bg-indigo-50'
                }`}
              title="Pick Random Topic"
            >
              <Shuffle size={20} />
            </button>

            <button
              onClick={handleGenerate}
              disabled={loading || !selectedTopic}
              className={`flex-1 px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all whitespace-nowrap ${loading || !selectedTopic
                ? 'bg-slate-600 cursor-not-allowed opacity-50 text-white'
                : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/20 active:scale-95'
                }`}
            >
              {loading ? <RefreshCw className="animate-spin" size={20} /> : <Send size={20} />}
              <span>{loading ? 'Generating...' : 'Generate Test'}</span>
            </button>
          </div>
        </div>

        {error && (
          <div className="flex-none text-red-500 text-center bg-red-500/10 py-2 rounded-lg border border-red-500/20">
            {error}
          </div>
        )}

        {!content && !loading ? (
          <EmptyState isDark={isDark} />
        ) : loading ? (
          <div className="flex-1 flex flex-col items-center justify-center space-y-4 animate-pulse">
            <div className={`h-4 w-48 rounded ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`}></div>
            <div className={`h-2 w-64 rounded ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`}></div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col lg:flex-row gap-6 min-h-0 overflow-hidden pb-4">

            <div className={`flex-1 flex flex-col rounded-2xl border shadow-xl overflow-hidden ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
              }`}>
              <div className={`px-6 py-3 border-b flex items-center justify-between ${isDark ? 'border-slate-800 bg-slate-800/50' : 'border-slate-100 bg-slate-50'}`}>
                <div className="flex items-center gap-2">
                  <BookOpen size={18} className="text-indigo-500" />
                  <span className={`font-semibold text-sm uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    Reading Passage
                  </span>
                </div>
                <div className={`text-xs px-2 py-1 rounded ${isDark ? 'bg-indigo-500/10 text-indigo-400' : 'bg-indigo-100 text-indigo-600'}`}>
                  {selectedCategory || "Academic"}
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-6 lg:p-8 custom-scrollbar">
                <h2 className={`text-2xl font-bold mb-6 font-serif ${isDark ? 'text-white' : 'text-slate-900'}`}>{selectedTopic}</h2>
                <MarkdownRenderer content={content.passage} isDark={isDark} isSerif={true} />
              </div>
            </div>

            <div className={`flex-1 flex flex-col rounded-2xl border shadow-xl overflow-hidden ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
              }`}>
              <div className={`px-6 py-3 border-b flex items-center justify-between ${isDark ? 'border-slate-800 bg-slate-800/50' : 'border-slate-100 bg-slate-50'}`}>
                <div className="flex items-center gap-2">
                  <HelpCircle size={18} className="text-indigo-500" />
                  <span className={`font-semibold text-sm uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    Questions
                  </span>
                </div>
                <button
                  onClick={() => setShowAnswers(!showAnswers)}
                  className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg transition-colors ${showAnswers
                    ? 'bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20'
                    : 'bg-slate-500/10 text-slate-500 hover:bg-slate-500/20'
                    }`}
                >
                  {showAnswers ? <><EyeOff size={14} /> Hide Answers</> : <><Eye size={14} /> Show Answers</>}
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 lg:p-8 relative custom-scrollbar">
                <MarkdownRenderer content={content.questions} isDark={isDark} isSerif={false} />

                {!showAnswers && (
                  <div className={`mt-8 p-4 rounded-xl border flex items-center justify-between ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-indigo-50 border-indigo-100'
                    }`}>
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full ${isDark ? 'bg-slate-700 text-slate-400' : 'bg-white text-slate-400'}`}>
                        <EyeOff size={20} />
                      </div>
                      <div>
                        <p className={`font-medium ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>Answers are hidden</p>
                        <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Finish the test before peeking!</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowAnswers(true)}
                      className="text-sm font-semibold text-indigo-500 hover:text-indigo-400"
                    >
                      Reveal Now
                    </button>
                  </div>
                )}

                {showAnswers && (
                  <div className="mt-8 pt-8 border-t border-dashed border-indigo-500/30 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="flex items-center gap-2 mb-4 text-emerald-500">
                      <CheckCircle size={20} />
                      <h3 className="font-bold text-lg">Answer Key & Glossary</h3>
                    </div>
                    <p className={`text-sm italic mb-4 ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
                      Review your answers against the key below.
                    </p>
                  </div>
                )}
              </div>
            </div>

          </div>
        )}
      </main>

      <style>{`
          .custom-scrollbar::-webkit-scrollbar {
            width: 8px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: ${isDark ? '#1e293b' : '#f1f5f9'}; 
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: ${isDark ? '#334155' : '#cbd5e1'}; 
            border-radius: 4px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: ${isDark ? '#475569' : '#94a3b8'}; 
          }
        `}</style>
    </div>
  );
}
