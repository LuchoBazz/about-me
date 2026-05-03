import React, { useState, useEffect } from 'react';
import {
  Moon,
  Sun,
  Search,
  Volume2,
  X,
  BookOpen,
  Link as LinkIcon,
  ArrowLeftRight,
  Network,
  MessageSquare,
  Zap,
  Quote
} from 'lucide-react';

// Mock Data for Vocabulary Words
const vocabularyData = [
  {
    id: 1,
    word: "tired",
    definition: "In need of sleep or rest; weary.",
    collocations: ["dead tired", "dog tired", "tired out", "feel tired"],
    synonyms: ["weary", "sleepy", "drained"],
    antonyms: ["energetic", "refreshed", "awake"],
    wordFamily: { noun: "tiredness", adjective: "tired / tiring", adverb: "tiredly" },
    register: { formal: "fatigued", informal: "beat", slang: "wiped out" },
    extremeAdjective: ["exhausted", "shattered", "drained"],
    commonUses: ["I was so tired after the long flight.", "She is tired of hearing the same excuses.", "The baby is getting tired and needs a nap."]
  },
  {
    id: 2,
    word: "angry",
    definition: "Having a strong feeling of or showing annoyance, displeasure, or hostility.",
    collocations: ["get angry", "angrily deny", "angry mob", "make someone angry"],
    synonyms: ["mad", "annoyed", "irritated"],
    antonyms: ["calm", "pleased", "peaceful"],
    wordFamily: { noun: "anger", adjective: "angry", adverb: "angrily" },
    register: { formal: "indignant", informal: "ticked off", slang: "pissed off" },
    extremeAdjective: ["furious", "livid", "incensed"],
    commonUses: ["He was really angry about the mistake.", "Please don't get angry with me.", "The angry customer demanded a refund."]
  },
  {
    id: 3,
    word: "cold",
    definition: "Of or at a low or relatively low temperature.",
    collocations: ["bitterly cold", "catch a cold", "stone cold", "freezing cold"],
    synonyms: ["chilly", "cool", "frosty"],
    antonyms: ["hot", "warm", "boiling"],
    wordFamily: { noun: "coldness", adjective: "cold", adverb: "coldly" },
    register: { formal: "frigid", informal: "chilly", slang: "bricked" },
    extremeAdjective: ["freezing", "frigid", "bitter"],
    commonUses: ["It's freezing cold outside today.", "My hands are so cold.", "He gave me a cold, hard look."]
  },
  {
    id: 4,
    word: "hungry",
    definition: "Feeling or displaying the need for food.",
    collocations: ["go hungry", "hungry for", "feel hungry", "get hungry"],
    synonyms: ["peckish", "empty", "ravenous"],
    antonyms: ["full", "stuffed", "satiated"],
    wordFamily: { noun: "hunger", adjective: "hungry", adverb: "hungrily" },
    register: { formal: "famished", informal: "starving", slang: "hangry" },
    extremeAdjective: ["starving", "famished", "ravenous"],
    commonUses: ["I'm getting really hungry, let's eat.", "The stray dog looked very hungry.", "She is hungry for success in her career."]
  },
  {
    id: 5,
    word: "small",
    definition: "Of a size that is less than normal or usual.",
    collocations: ["small number", "small amount", "too small", "small proportion"],
    synonyms: ["little", "tiny", "miniature"],
    antonyms: ["large", "big", "huge"],
    wordFamily: { noun: "smallness", adjective: "small", adverb: "smally (rare)" },
    register: { formal: "diminutive", informal: "teeny", slang: "pint-sized" },
    extremeAdjective: ["microscopic", "minuscule", "infinitesimal"],
    commonUses: ["They live in a relatively small house.", "Only a small number of people attended.", "I just have a small problem to solve."]
  },
  {
    id: 6,
    word: "good",
    definition: "To be desired or approved of; of high quality.",
    collocations: ["it's a good thing", "good for you", "have a good time", "do a good job"],
    synonyms: ["excellent", "superb", "satisfactory"],
    antonyms: ["bad", "poor", "unpleasant"],
    wordFamily: { noun: "goodness", adjective: "good", adverb: "well" },
    register: { formal: "favorable", informal: "nice", slang: "awesome" },
    extremeAdjective: ["fantastic", "superb", "wonderful"],
    commonUses: ["He did a good job on the project.", "We had a good time at the party.", "This is a good book to read."]
  },
  {
    id: 7,
    word: "bad",
    definition: "Of poor quality or low standard; not such as to be hoped for or desired.",
    collocations: ["too bad", "feel bad", "bad luck", "in a bad way"],
    synonyms: ["awful", "terrible", "poor"],
    antonyms: ["good", "excellent", "pleasant"],
    wordFamily: { noun: "badness", adjective: "bad", adverb: "badly" },
    register: { formal: "detrimental", informal: "nasty", slang: "sucks" },
    extremeAdjective: ["horrible", "atrocious", "terrible"],
    commonUses: ["I have some bad news for you.", "The weather was really bad yesterday.", "It's a bad idea to go out in the storm."]
  }
];

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedWord, setSelectedWord] = useState(null);

  // Toggle Body Scroll when Modal is open
  useEffect(() => {
    if (selectedWord) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedWord]);

  // Filter words based on search
  const filteredWords = vocabularyData.filter((item) =>
    item.word.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Text-to-Speech Function
  const playAudio = (e, word) => {
    e.stopPropagation(); // Prevent card click event from opening the modal
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = 'en-US';
      utterance.rate = 0.9; // Slightly slower for better pronunciation clarity
      window.speechSynthesis.speak(utterance);
    } else {
      console.warn("Text-to-speech is not supported in this browser.");
    }
  };

  return (
    <div className={`${isDarkMode ? 'dark' : ''} font-sans`}>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 transition-colors duration-300">

        {/* Header Navigation */}
        <header className="sticky top-0 z-10 bg-white dark:bg-slate-800 shadow-sm border-b border-slate-200 dark:border-slate-700 px-4 py-4 sm:px-6">
          <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">

            <div className="flex items-center gap-2">
              <div className="bg-indigo-600 p-2 rounded-lg text-white">
                <BookOpen size={24} />
              </div>
              <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-500 dark:from-indigo-400 dark:to-violet-300">
                VocabBuilder
              </h1>
            </div>

            <div className="flex items-center w-full sm:w-auto gap-3">
              {/* Search Bar */}
              <div className="relative w-full sm:w-72 flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="text"
                  placeholder="Search a word..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-700 border-none rounded-full focus:ring-2 focus:ring-indigo-500 text-sm outline-none transition-all dark:text-white placeholder-slate-500 dark:placeholder-slate-400"
                />
              </div>

              {/* Theme Toggle */}
              {/* <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 rounded-full bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
                aria-label="Toggle Dark Mode"
              >
                {isDarkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-slate-600" />}
              </button> */}
            </div>
          </div>
        </header>

        {/* Main Content: Word Grid */}
        <main className="max-w-5xl mx-auto px-4 py-8 sm:px-6">
          {filteredWords.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filteredWords.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedWord(item)}
                  className="group bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md hover:border-indigo-300 dark:hover:border-indigo-500 cursor-pointer transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h2 className="text-2xl font-bold capitalize text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {item.word}
                      </h2>
                      <button
                        onClick={(e) => playAudio(e, item.word)}
                        className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-slate-700 dark:hover:text-indigo-400 rounded-full transition-colors"
                        title="Listen to pronunciation"
                      >
                        <Volume2 size={20} />
                      </button>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-2">
                      {item.definition}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700 text-xs font-medium text-slate-400 flex items-center justify-between">
                    <span>Click to explore 6 methods</span>
                    <span className="text-indigo-500 dark:text-indigo-400 group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-200 dark:bg-slate-800 mb-4">
                <Search size={32} className="text-slate-400" />
              </div>
              <h3 className="text-xl font-medium text-slate-900 dark:text-white">No words found</h3>
              <p className="text-slate-500 dark:text-slate-400 mt-2">Try searching for a different word.</p>
            </div>
          )}
        </main>

        {/* Word Detail Modal */}
        {selectedWord && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity">
            <div
              className="bg-white dark:bg-slate-800 rounded-3xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-700 animate-in fade-in zoom-in duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-700 flex items-start justify-between bg-slate-50 dark:bg-slate-800/50">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h2 className="text-3xl font-extrabold capitalize text-slate-900 dark:text-white">
                      {selectedWord.word}
                    </h2>
                    <button
                      onClick={(e) => playAudio(e, selectedWord.word)}
                      className="p-2 text-indigo-600 bg-indigo-100 dark:bg-indigo-500/20 dark:text-indigo-300 hover:bg-indigo-200 dark:hover:bg-indigo-500/40 rounded-full transition-colors"
                      title="Play Audio"
                    >
                      <Volume2 size={20} />
                    </button>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400">
                    {selectedWord.definition}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedWord(null)}
                  className="p-2 text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Modal Scrollable Content (The 5 Learning Methods) */}
              <div className="flex-1 min-h-0 p-6 pb-12 overflow-y-auto custom-scrollbar flex flex-col gap-6">

                {/* Method 1: Collocations */}
                <div className="bg-emerald-50 dark:bg-emerald-950/30 rounded-2xl p-5 border border-emerald-100 dark:border-emerald-900/50">
                  <div className="flex items-center gap-2 mb-3 text-emerald-800 dark:text-emerald-400 font-semibold">
                    <LinkIcon size={18} />
                    <h3>1. Common Collocations</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedWord.collocations.map((col, idx) => (
                      <span key={idx} className="px-3 py-1.5 bg-white dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 rounded-lg text-sm border border-emerald-200 dark:border-emerald-800/50">
                        {col}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Method 2: Synonyms & Antonyms */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-blue-50 dark:bg-blue-950/30 rounded-2xl p-5 border border-blue-100 dark:border-blue-900/50">
                    <div className="flex items-center gap-2 mb-3 text-blue-800 dark:text-blue-400 font-semibold">
                      <ArrowLeftRight size={18} />
                      <h3>2. Synonyms</h3>
                    </div>
                    <ul className="list-disc list-inside text-sm text-slate-700 dark:text-slate-300 space-y-1">
                      {selectedWord.synonyms.map((syn, idx) => (
                        <li key={idx} className="capitalize">{syn}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-rose-50 dark:bg-rose-950/30 rounded-2xl p-5 border border-rose-100 dark:border-rose-900/50">
                    <div className="flex items-center gap-2 mb-3 text-rose-800 dark:text-rose-400 font-semibold">
                      <ArrowLeftRight size={18} />
                      <h3>Antonyms</h3>
                    </div>
                    <ul className="list-disc list-inside text-sm text-slate-700 dark:text-slate-300 space-y-1">
                      {selectedWord.antonyms.map((ant, idx) => (
                        <li key={idx} className="capitalize">{ant}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Method 3: Word Family */}
                <div className="bg-indigo-50 dark:bg-indigo-950/30 rounded-2xl p-5 border border-indigo-100 dark:border-indigo-900/50">
                  <div className="flex items-center gap-2 mb-4 text-indigo-800 dark:text-indigo-400 font-semibold">
                    <Network size={18} />
                    <h3>3. Word Family</h3>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                    {Object.entries(selectedWord.wordFamily).map(([partOfSpeech, word]) => (
                      <div key={partOfSpeech} className="bg-white dark:bg-indigo-900/40 p-3 rounded-xl border border-indigo-200 dark:border-indigo-800/50">
                        <span className="block text-xs uppercase tracking-wider text-indigo-500 dark:text-indigo-400 mb-1 font-bold">{partOfSpeech}</span>
                        <span className="text-slate-800 dark:text-slate-200 font-medium">{word}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Method 4: Register (Formal vs Informal) */}
                <div className="bg-amber-50 dark:bg-amber-950/30 rounded-2xl p-5 border border-amber-100 dark:border-amber-900/50">
                  <div className="flex items-center gap-2 mb-4 text-amber-800 dark:text-amber-400 font-semibold">
                    <MessageSquare size={18} />
                    <h3>4. Language Register</h3>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    {Object.entries(selectedWord.register).map(([level, term]) => (
                      <div key={level} className="flex-1 bg-white dark:bg-amber-900/40 p-3 rounded-xl border border-amber-200 dark:border-amber-800/50 flex flex-col justify-center">
                        <span className="text-xs uppercase font-bold text-amber-600 dark:text-amber-500 mb-1">{level}</span>
                        <span className="text-slate-800 dark:text-slate-200 font-medium capitalize">{term}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Method 5: Extreme Adjectives */}
                <div className="shrink-0 bg-violet-50 dark:bg-violet-950/30 rounded-2xl p-5 border border-violet-100 dark:border-violet-900/50 relative overflow-hidden">
                  <div className="absolute right-[-10px] top-[-10px] opacity-10 text-violet-500">
                    <Zap size={100} />
                  </div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-2 text-violet-800 dark:text-violet-400 font-semibold">
                      <Zap size={18} />
                      <h3>5. Extreme Adjective</h3>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                      Instead of saying "very {selectedWord.word}", you can say:
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {selectedWord.extremeAdjective.map((adj, index) => (
                        <div key={index} className="inline-block bg-violet-600 text-white px-5 py-2 rounded-xl text-lg font-bold shadow-md shadow-violet-200 dark:shadow-none">
                          {adj}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Method 6: Common Uses (In Context) */}
                <div className="shrink-0 bg-cyan-50 dark:bg-cyan-950/30 rounded-2xl p-5 border border-cyan-100 dark:border-cyan-900/50">
                  <div className="flex items-center gap-2 mb-3 text-cyan-800 dark:text-cyan-400 font-semibold">
                    <Quote size={18} />
                    <h3>6. Common Uses (In Context)</h3>
                  </div>
                  <div className="flex flex-col gap-3">
                    {selectedWord.commonUses.map((use, idx) => (
                      <div key={idx} className="bg-white dark:bg-cyan-900/40 p-3 rounded-xl border border-cyan-200 dark:border-cyan-800/50 text-sm text-slate-700 dark:text-slate-300 italic shadow-sm">
                        "{use}"
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}