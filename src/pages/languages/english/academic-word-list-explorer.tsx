import React, { useState } from 'react';
import { Search, BookOpen, Copy, Grid, List, Moon, Sun, Volume2, ChevronRight, ChevronLeft, GraduationCap, LayoutGrid, MessageSquare } from 'lucide-react';

// --- DATA DEFINITION ---

const academicWordList = [
  {
    id: "sublist-1",
    name: "Sublist 1",
    words: [
      "analysis", "approach", "area", "assessment", "assume", "authority", "available",
      "benefit", "concept", "consistent", "constitutional", "context", "contract",
      "create", "data", "definition", "derive", "distribution", "economic", "environment",
      "established", "estimate", "evidence", "export", "factor", "financial", "formula",
      "function", "identify", "income", "indicate", "individual", "interpretation",
      "involved", "issue", "labour", "legal", "legislation", "major", "method", "occur",
      "percent", "period", "policy", "principle", "procedure", "process", "require",
      "research", "response", "role", "section", "sector", "significant", "similar",
      "source", "specific", "structure", "theory", "variable"
    ]
  },
  {
    id: "sublist-2",
    name: "Sublist 2",
    words: [
      "achieve", "acquisition", "administration", "affect", "appropriate", "aspect",
      "assistance", "category", "chapter", "commission", "community", "complex",
      "computer", "conclusion", "conduct", "consequence", "construction", "consumer",
      "credit", "cultural", "design", "distinction", "element", "equation", "evaluation",
      "feature", "final", "focus", "impact", "injury", "institute", "investment", "item",
      "journal", "maintenance", "normal", "obtain", "participation", "perceive",
      "positive", "potential", "previous", "primary", "purchase", "range", "region",
      "regulation", "relevant", "resident", "resource", "restrict", "security", "seek",
      "select", "site", "strategy", "survey", "text", "traditional", "transfer"
    ]
  },
  {
    id: "sublist-3",
    name: "Sublist 3",
    words: [
      "alternative", "circumstance", "comment", "compensation", "component", "consent",
      "considerable", "constant", "constraint", "contribution", "convention",
      "coordination", "core", "corporate", "correspond", "criteria", "deduction",
      "demonstrate", "document", "dominant", "emphasis", "ensure", "exclude", "framework",
      "fund", "illustrate", "immigration", "imply", "initial", "instance", "interaction",
      "justification", "layer", "link", "location", "maximum", "minority", "negative",
      "outcome", "partnership", "philosophy", "physical", "proportion", "publish",
      "reaction", "register", "reliance", "remove", "scheme", "sequence", "sex", "shift",
      "specify", "sufficient", "task", "technical", "technique", "technology", "validity",
      "volume"
    ]
  },
  {
    id: "sublist-4",
    name: "Sublist 4",
    words: [
      "access", "adequate", "annual", "apparent", "approximate", "attention", "attitude",
      "attribute", "civil", "code", "commitment", "communication", "concentration",
      "conference", "contrast", "cycle", "debate", "despite", "dimension", "domestic",
      "emerge", "error", "ethnic", "goal", "grant", "hence", "hypothesis",
      "implementation", "implication", "impose", "integration", "internal",
      "investigation", "job", "label", "mechanism", "obvious", "occupational", "option",
      "output", "overall", "parallel", "parameter", "phase", "predict", "principal",
      "prior", "professional", "project", "promote", "regime", "resolution", "retain",
      "series", "statistics", "status", "stress", "subsequent", "sum", "summary",
      "undertake"
    ]
  },
  {
    id: "sublist-5",
    name: "Sublist 5",
    words: [
      "academic", "adjustment", "alter", "amendment", "aware", "capacity", "challenge",
      "clause", "compound", "conflict", "consultation", "contact", "decline", "discretion",
      "draft", "enable", "energy", "enforcement", "entity", "equivalent", "evolution",
      "expansion", "exposure", "external", "facilitate", "fundamental", "generate",
      "generation", "image", "liberal", "license", "logic", "marginal", "medical",
      "mental", "modify", "monitor", "network", "notion", "objective", "orientation",
      "perspective", "precise", "prime", "psychology", "pursue", "ratio", "reject",
      "revenue", "stability", "style", "substitution", "sustainable", "symbolic", "target",
      "transition", "trend", "version", "welfare", "whereas"
    ]
  },
  {
    id: "sublist-6",
    name: "Sublist 6",
    words: [
      "abstract", "accurate", "acknowledge", "aggregate", "allocation", "assign", "attach",
      "author", "bond", "brief", "capable", "cite", "cooperative", "discrimination",
      "display", "diversity", "domain", "edition", "enhance", "estate", "exceed", "expert",
      "explicit", "federal", "fee", "flexibility", "furthermore", "gender", "ignore",
      "incentive", "incidence", "incorporate", "index", "inhibition", "initiative",
      "input", "instruction", "intelligence", "interval", "lecture", "migration",
      "minimum", "ministry", "motivation", "neutral", "nevertheless", "overseas",
      "precede", "presumption", "rational", "recovery", "reveal", "scope", "subsidiary",
      "tape", "trace", "transformation", "transport", "underlie", "utility"
    ]
  },
  {
    id: "sublist-7",
    name: "Sublist 7",
    words: [
      "adaptation", "adult", "advocate", "aid", "channel", "chemical", "classical",
      "comprehensive", "comprise", "confirm", "contrary", "convert", "couple", "decade",
      "definite", "deny", "differentiation", "disposal", "dynamic", "eliminate",
      "empirical", "equipment", "extract", "file", "finite", "foundation", "global",
      "grade", "guarantee", "hierarchical", "identical", "ideology", "infer", "innovation",
      "insert", "intervention", "isolate", "media", "mode", "paradigm", "phenomenon",
      "priority", "prohibit", "publication", "quotation", "release", "reverse",
      "simulation", "solely", "somewhat", "submit", "successive", "survive", "thesis",
      "topic", "transmission", "ultimately", "unique", "visible", "voluntary"
    ]
  },
  {
    id: "sublist-8",
    name: "Sublist 8",
    words: [
      "abandon", "accompany", "accumulation", "ambiguous", "appendix", "appreciation",
      "arbitrary", "automatically", "bias", "chart", "clarity", "commodity", "complement",
      "conformity", "contemporary", "contradiction", "crucial", "currency", "denote",
      "detect", "deviation", "displacement", "dramatic", "eventually", "exhibit",
      "exploitation", "fluctuation", "guideline", "highlight", "implicit", "induce",
      "inevitably", "infrastructure", "inspection", "intensity", "manipulation", "minimise",
      "nuclear", "offset", "paragraph", "plus", "practitioner", "predominantly", "prospect",
      "radical", "random", "reinforce", "restore", "revision", "schedule", "tension",
      "termination", "theme", "thereby", "uniform", "vehicle", "via", "virtually",
      "visual", "widespread"
    ]
  },
  {
    id: "sublist-9",
    name: "Sublist 9",
    words: [
      "accommodation", "analogous", "anticipate", "assurance", "attain", "behalf", "bulk",
      "cease", "coherence", "coincide", "commence", "concurrent", "confine", "controversy",
      "conversely", "device", "devote", "diminish", "distort", "duration", "erosion",
      "ethical", "format", "found", "incompatible", "inherent", "insight", "integral",
      "intermediate", "manual", "mature", "mediation", "medium", "military", "minimal",
      "mutual", "norm", "overlap", "passive", "portion", "preliminary", "protocol",
      "qualitative", "refine", "relax", "restraint", "revolution", "rigid", "route",
      "scenario", "sphere", "subordinate", "supplementary", "suspend", "team", "temporary",
      "trigger", "unify", "violation", "vision"
    ]
  },
  {
    id: "sublist-9-2",
    name: "Sublist 9-2",
    words: [
      "adjacent", "albeit", "assembly", "collapse", "colleague", "compile", "conceive",
      "convince", "depression", "encounter", "enormous", "forthcoming", "inclination",
      "integrity", "intrinsic", "invoke", "levy", "likewise", "nonetheless",
      "notwithstanding", "odd", "ongoing", "panel", "persistent", "pose", "reluctant",
      "so-called", "straightforward", "undergo", "whereby"
    ]
  },
  {
    id: "sublist-essay",
    name: "Essay Terms",
    words: [
      "although", "because", "conclusion paragraph", "consequently", "finally", "first",
      "for example", "however", "In conclusion", "moreover", "secondly",
      "thesis statement", "topic sentence"
    ]
  }
];

const vocabularyData = [
  {
    "headword": "Analyze",
    "overall_translation": "Analizar",
    "word_family": {
      "verbs": [
        { "term": "Analyze", "translation": "Analizar", "example": "In my opinion, we need to analyze how social media affects us." }
      ],
      "nouns": [
        { "term": "Analysis", "translation": "Análisis", "example": "After a quick analysis, I realized moving abroad was best." },
        { "term": "Analyst", "translation": "Analista", "example": "To be a data analyst, you need to love numbers." }
      ],
      "adjectives": [
        { "term": "Analytical", "translation": "Analítico", "example": "I'm not very analytical; I follow my gut feeling." }
      ],
      "adverbs": [
        { "term": "Analytically", "translation": "Analíticamente", "example": "Thinking analytically makes the solution clearer." }
      ]
    }
  }
];

// --- COMPONENTS ---

const CategoryBadge = ({ type }) => {
  const colors = {
    verbs: "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/50 dark:text-blue-200 dark:border-blue-700",
    nouns: "bg-rose-100 text-rose-800 border-rose-200 dark:bg-rose-900/50 dark:text-rose-200 dark:border-rose-700",
    adjectives: "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/50 dark:text-amber-200 dark:border-amber-700",
    adverbs: "bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/50 dark:text-emerald-200 dark:border-emerald-700"
  };

  const labels = {
    verbs: "Verb",
    nouns: "Noun",
    adjectives: "Adjective",
    adverbs: "Adverb"
  };

  return (
    <span className={`px-2 py-0.5 text-xs font-semibold rounded-md border ${colors[type] || "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"}`}>
      {labels[type] || type}
    </span>
  );
};

const WordCard = ({ item }) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-4 hover:shadow-md transition-all duration-200 group">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h4 className="text-lg font-bold text-slate-800 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            {item.term}
          </h4>
          <p className="text-slate-500 dark:text-slate-400 font-medium italic">{item.translation}</p>
        </div>
      </div>
      
      <div className="mt-3 bg-slate-50 dark:bg-slate-900/50 p-3 rounded-md border border-slate-100 dark:border-slate-700/50">
        <div className="flex gap-2 items-start">
          <MessageSquare className="w-4 h-4 text-slate-400 dark:text-slate-500 mt-1 flex-shrink-0" />
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            "{item.example}"
          </p>
        </div>
      </div>
    </div>
  );
};

const WordChip = ({ word, searchTerm, isDarkMode, onClick }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(word);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  // Highlighting logic
  const isMatch = searchTerm && word.toLowerCase().includes(searchTerm.toLowerCase());

  // Dynamic classes based on theme
  const getThemeClasses = () => {
    if (isMatch) {
      return isDarkMode
        ? 'bg-yellow-900/50 text-yellow-200 border-yellow-700 ring-2 ring-yellow-600 ring-offset-1 ring-offset-slate-900'
        : 'bg-yellow-100 text-yellow-900 border-yellow-300 ring-2 ring-yellow-400 ring-offset-1';
    }
    return isDarkMode
      ? 'bg-slate-700 text-slate-300 border-slate-600 hover:border-indigo-400 hover:text-indigo-300 hover:bg-slate-600'
      : 'bg-white text-slate-700 border-slate-200 hover:border-indigo-300 hover:shadow-sm hover:text-indigo-600';
  };

  return (
    <button
      onClick={onClick}
      className={`
        group relative px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 border
        ${getThemeClasses()}
      `}
      title="Click to view details"
    >
      <div className="flex items-center gap-2">
        {word}
        <Copy 
          size={12} 
          className="opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-slate-400 hover:text-indigo-500" 
          onClick={handleCopy}
        />
      </div>

      {/* Copied Tooltip */}
      <div className={`
        absolute -top-8 left-1/2 transform -translate-x-1/2 
        text-xs py-1 px-2 rounded 
        transition-opacity duration-200 pointer-events-none z-20
        ${copied ? 'opacity-100' : 'opacity-0'}
        ${isDarkMode ? 'bg-slate-100 text-slate-900' : 'bg-black text-white'}
      `}>
        Copied!
      </div>
    </button>
  );
};

const GroupCard = ({ group, searchTerm, isDarkMode, onWordClick }) => {
  // Filter words if searching, otherwise show all
  const filteredWords = searchTerm
    ? group.words.filter(w => w.toLowerCase().includes(searchTerm.toLowerCase()))
    : group.words;

  // Don't render empty groups during search
  if (searchTerm && filteredWords.length === 0) return null;

  return (
    <div className={`
      rounded-xl shadow-sm border overflow-hidden flex flex-col h-full hover:shadow-md transition-all duration-300
      ${isDarkMode
        ? 'bg-slate-800 border-slate-700 hover:border-indigo-900'
        : 'bg-white border-slate-200 hover:border-indigo-100'
      }
    `}>
      <div className={`
        px-5 py-4 flex justify-between items-center border-b
        ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-100'}
      `}>
        <div className="flex items-center gap-2">
          <div className={`
            p-1.5 rounded-md 
            ${isDarkMode ? 'bg-indigo-900/50 text-indigo-400' : 'bg-indigo-100 text-indigo-600'}
          `}>
            <BookOpen size={16} />
          </div>
          <h3 className={`font-bold text-lg ${isDarkMode ? 'text-slate-100' : 'text-slate-800'}`}>
            {group.name}
          </h3>
        </div>
        <span className={`
          text-xs font-semibold px-2 py-1 rounded-full
          ${isDarkMode ? 'bg-slate-700 text-slate-400' : 'bg-slate-200 text-slate-600'}
        `}>
          {filteredWords.length} words
        </span>
      </div>

      <div className={`p-5 ${isDarkMode ? 'bg-slate-800' : 'bg-white'}`}>
        <div className="flex flex-wrap gap-2">
          {filteredWords.map((word) => (
            <WordChip
              key={word}
              word={word}
              searchTerm={searchTerm}
              isDarkMode={isDarkMode}
              onClick={() => onWordClick(word)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const WordDetailView = ({ onClose, isDarkMode, onToggleTheme }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('all');

  const currentWord = vocabularyData[currentIndex];
  const { word_family } = currentWord;
  const categories = ['verbs', 'nouns', 'adjectives', 'adverbs'];
  
  const handleNext = () => {
    if (currentIndex < vocabularyData.length - 1) setCurrentIndex(prev => prev + 1);
  };

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(prev => prev - 1);
  };

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className={`w-full min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <div className="w-full min-h-screen bg-slate-50 dark:bg-slate-900 font-sans text-slate-900 dark:text-slate-100 transition-colors duration-300 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          
          {/* Header Navigation */}
          <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
            <button 
              onClick={onClose}
              className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors font-semibold"
            >
              <ChevronLeft className="w-5 h-5" />
              Back to List
            </button>
            
            <div className="flex items-center gap-4 ml-auto">
              {/* Dark Mode Toggle */}
              <button
                onClick={onToggleTheme}
                className="p-2 rounded-full bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 shadow-sm border border-slate-200 dark:border-slate-700 transition-all"
                aria-label="Toggle Dark Mode"
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              <div className="h-6 w-px bg-slate-300 dark:bg-slate-700 hidden sm:block"></div>

              <div className="flex gap-2">
                <button 
                  onClick={handlePrev} 
                  disabled={currentIndex === 0}
                  className="p-2 rounded-full hover:bg-white dark:hover:bg-slate-800 hover:shadow-sm disabled:opacity-30 disabled:hover:bg-transparent text-slate-600 dark:text-slate-300 transition-all"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="py-2 px-3 text-sm font-medium text-slate-400 dark:text-slate-500">
                  {currentIndex + 1} / {vocabularyData.length}
                </span>
                <button 
                  onClick={handleNext} 
                  disabled={currentIndex === vocabularyData.length - 1}
                  className="p-2 rounded-full hover:bg-white dark:hover:bg-slate-800 hover:shadow-sm disabled:opacity-30 disabled:hover:bg-transparent text-slate-600 dark:text-slate-300 transition-all"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Main Headword Card */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden mb-8 relative transition-colors duration-300">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
            
            <div className="p-8 md:p-10 text-center">
              <div className="inline-flex items-center justify-center p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-full mb-4 text-indigo-600 dark:text-indigo-400">
                <GraduationCap className="w-8 h-8" />
              </div>
              
              <h2 className="text-5xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight mb-2">
                {currentWord.headword}
              </h2>
              
              <div className="flex items-center justify-center gap-3 mb-6">
                <span className="text-2xl text-slate-500 dark:text-slate-400 font-light border-b border-slate-200 dark:border-slate-700 pb-0.5">
                  {currentWord.overall_translation}
                </span>
                <button 
                  onClick={() => speak(currentWord.headword)}
                  className="p-2 rounded-full bg-slate-100 dark:bg-slate-700 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  aria-label="Listen to pronunciation"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex border-t border-slate-100 dark:border-slate-700 overflow-x-auto">
              <button
                onClick={() => setActiveTab('all')}
                className={`flex-1 py-4 px-6 text-sm font-semibold whitespace-nowrap transition-colors border-b-2 ${
                  activeTab === 'all' 
                    ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400 bg-indigo-50/50 dark:bg-indigo-900/20' 
                    : 'border-transparent text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 hover:text-slate-700 dark:hover:text-slate-200'
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <LayoutGrid className="w-4 h-4" />
                  All Forms
                </div>
              </button>
              {categories.map(cat => (
                word_family[cat] && word_family[cat].length > 0 && (
                  <button
                    key={cat}
                    onClick={() => setActiveTab(cat)}
                    className={`flex-1 py-4 px-6 text-sm font-semibold capitalize whitespace-nowrap transition-colors border-b-2 ${
                      activeTab === cat
                        ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400 bg-indigo-50/50 dark:bg-indigo-900/20' 
                        : 'border-transparent text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 hover:text-slate-700 dark:hover:text-slate-200'
                    }`}
                  >
                    {cat}
                  </button>
                )
              ))}
            </div>
          </div>

          {/* Word Family Content */}
          <div className="space-y-8">
            {categories.map((category) => {
              const items = word_family[category];
              const isVisible = (activeTab === 'all' || activeTab === category) && items && items.length > 0;

              if (!isVisible) return null;

              return (
                <div 
                  key={category} 
                  className="animate-fadeIn"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <CategoryBadge type={category} />
                    <div className="h-px bg-slate-200 dark:bg-slate-700 flex-grow"></div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {items.map((item, idx) => (
                      <WordCard key={`${category}-${idx}`} item={item} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer info */}
          <div className="mt-12 text-center text-slate-400 dark:text-slate-600 text-sm">
            <p>Vocabulary Set • {vocabularyData.length} Headwords</p>
          </div>

        </div>
      </div>
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeIn {
            animation: fadeIn 0.5s ease-out forwards;
          }
        `}
      </style>
    </div>
  );
};

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedWord, setSelectedWord] = useState(null);

  // Calculate total stats
  const totalWords = academicWordList.reduce((acc, group) => acc + group.words.length, 0);
  const displayedWords = searchTerm
    ? academicWordList.reduce((acc, group) => acc + group.words.filter(w => w.toLowerCase().includes(searchTerm.toLowerCase())).length, 0)
    : totalWords;

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  if (selectedWord) {
    return (
      <WordDetailView 
        onClose={() => setSelectedWord(null)} 
        isDarkMode={isDarkMode} 
        onToggleTheme={toggleTheme}
      />
    );
  }

  return (
    <div className={`min-h-screen font-sans pb-20 transition-colors duration-300 ${isDarkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>

      {/* Header Section */}
      <div className={`
        border-b sticky top-0 z-10 shadow-sm transition-colors duration-300
        ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}
      `}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">

            {/* Title */}
            <div>
              <h1 className={`text-2xl font-bold flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                <span className="bg-indigo-600 text-white p-2 rounded-lg">AWL</span>
                Academic Word List Explorer
              </h1>
              <p className={`text-sm mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                Visualizing {totalWords} essential academic vocabulary terms
              </p>
            </div>

            {/* Controls */}
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              {/* Search Bar */}
              <div className="relative group w-full sm:w-80">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={18} className={`${isDarkMode ? 'text-slate-500' : 'text-slate-400'} group-focus-within:text-indigo-500`} />
                </div>
                <input
                  type="text"
                  placeholder="Search for a word..."
                  className={`
                    block w-full pl-10 pr-3 py-2.5 border rounded-lg leading-5 sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200
                    ${isDarkMode
                      ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500 focus:bg-slate-800 focus:border-indigo-500'
                      : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400 focus:bg-white focus:border-indigo-500'
                    }
                  `}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                  >
                    x
                  </button>
                )}
              </div>

              <div className="flex gap-3">
                {/* View Toggle (Hidden on small mobile) */}
                <div className={`hidden sm:flex p-1 rounded-lg border ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-100 border-slate-200'}`}>
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-md transition-all ${viewMode === 'grid'
                      ? (isDarkMode ? 'bg-slate-700 text-indigo-400 shadow' : 'bg-white shadow text-indigo-600')
                      : (isDarkMode ? 'text-slate-500 hover:bg-slate-700' : 'text-slate-500 hover:bg-slate-200')}`}
                  >
                    <Grid size={18} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-md transition-all ${viewMode === 'list'
                      ? (isDarkMode ? 'bg-slate-700 text-indigo-400 shadow' : 'bg-white shadow text-indigo-600')
                      : (isDarkMode ? 'text-slate-500 hover:bg-slate-700' : 'text-slate-500 hover:bg-slate-200')}`}
                  >
                    <List size={18} />
                  </button>
                </div>

                {/* Theme Toggle Button */}
                <button
                  onClick={toggleTheme}
                  className={`
                    p-2.5 rounded-lg border transition-all duration-200 flex items-center justify-center
                    ${isDarkMode
                      ? 'bg-slate-800 border-slate-700 text-yellow-400 hover:bg-slate-700'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-indigo-600'
                    }
                  `}
                  title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                >
                  {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>
              </div>
            </div>
          </div>

          {/* Active Search Stats */}
          {searchTerm && (
            <div className={`
              mt-4 flex items-center gap-2 text-sm w-fit px-3 py-1 rounded-full border
              ${isDarkMode
                ? 'bg-indigo-900/30 text-indigo-300 border-indigo-800'
                : 'bg-indigo-50 text-indigo-600 border-indigo-100'
              }
            `}>
              <Search size={14} />
              <span>Found <strong>{displayedWords}</strong> matches for "{searchTerm}"</span>
            </div>
          )}
        </div>
      </div>

      {/* Main Content Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className={`
          grid gap-6 
          ${viewMode === 'grid'
            ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3'
            : 'grid-cols-1 max-w-4xl mx-auto'
          }
        `}>
          {academicWordList.map((group) => (
            <GroupCard
              key={group.id}
              group={group}
              searchTerm={searchTerm}
              isDarkMode={isDarkMode}
              onWordClick={setSelectedWord}
            />
          ))}

          {searchTerm && displayedWords === 0 && (
            <div className={`col-span-full py-20 text-center ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${isDarkMode ? 'bg-slate-800' : 'bg-slate-100'}`}>
                <Search size={32} />
              </div>
              <p className="text-lg">No words found matching "{searchTerm}"</p>
              <button
                onClick={() => setSearchTerm('')}
                className="mt-4 text-indigo-600 font-medium hover:underline"
              >
                Clear Search
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className={`
        border-t mt-auto py-8 transition-colors duration-300
        ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}
      `}>
        <div className={`max-w-7xl mx-auto px-4 text-center text-sm ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
          <p>Academic Word List Visualization</p>
        </div>
      </footer>
    </div>
  );
}