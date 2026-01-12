import React, { useMemo, useRef, useState } from 'react';
import { Search, BookOpen, X, GraduationCap, ArrowRight, MessageCircle, Layers, Type, Settings } from 'lucide-react';

type PhrasalVerbMeaning = {
  context: string;
  definition: string;
  translation: string;
};

type PhrasalVerbTense = {
  name: string;
  en: string;
  es: string;
};

type PhrasalVerbGrammarDetail = {
  label: string;
  text: string;
  translation: string;
};

type PhrasalVerbData = {
  verb: string;
  translation: string;
  level: string;
  meanings: PhrasalVerbMeaning[];
  morphology: Record<string, string>;
  tenses: PhrasalVerbTense[];
  grammar: {
    type: string;
    details: PhrasalVerbGrammarDetail[];
  };
};

type ApiResponse = { data?: PhrasalVerbData };


const phrasalVerbsList: string[] = [
  'take off',
  'give up',
  'look after',
];

const API_URL = 'https://xforce-serverless.vercel.app/api/languages/english/phrasal-verb-master';

/**
 * Component: SearchBar
 * Input principal de búsqueda.
 */
const SearchBar = ({ searchTerm, setSearchTerm }: { searchTerm: string; setSearchTerm: (value: string) => void }) => (
  <div className="relative max-w-xl mx-auto mb-10 group">
    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
      <Search className="h-5 w-5 text-indigo-400 group-focus-within:text-indigo-600 transition-colors" />
    </div>
    <input
      type="text"
      className="block w-full pl-12 pr-4 py-4 border-2 border-indigo-50 rounded-2xl leading-5 bg-white placeholder-slate-400 text-slate-700 focus:outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50 transition-all duration-300 shadow-sm hover:shadow-md"
      placeholder="Search phrasal verbs (e.g., take off)..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  </div>
);

/**
 * Component: VerbCard
 * Tarjeta individual para cada verbo.
 */
const VerbCard = ({ verb, onClick }: { verb: string; onClick: (verb: string) => void }) => (
  <div 
    onClick={() => onClick(verb)}
    className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 cursor-pointer hover:shadow-xl hover:-translate-y-1 hover:border-indigo-200 transition-all duration-300 group"
  >
    <div className="flex justify-between items-start mb-3">
      <h3 className="text-2xl font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
        {verb}
      </h3>
    </div>
    <p className="text-slate-500 mb-4 font-medium">Click to load details</p>
    
    <div className="flex items-center text-indigo-500 text-sm font-semibold mt-auto">
      <span>Learn more</span>
      <ArrowRight className="h-4 w-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
    </div>
  </div>
);

/**
 * Component: Modal
 * Vista detallada con toda la información gramatical.
 */
const Modal = ({
  verbName,
  verbData,
  isLoading,
  error,
  onClose,
  onRetry,
}: {
  verbName: string | null;
  verbData: PhrasalVerbData | null;
  isLoading: boolean;
  error: string | null;
  onClose: () => void;
  onRetry: () => void;
}) => {
  if (!verbName) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
        style={{ animation: 'fadeIn 0.2s ease-out' }}
      ></div>

      {/* Modal Content */}
      <div 
        className="relative bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col"
        style={{ animation: 'modalPop 0.3s cubic-bezier(0.16, 1, 0.3, 1)' }}
      >
        <style>
          {`
            @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
            @keyframes modalPop { 
              from { opacity: 0; transform: scale(0.96) translateY(10px); } 
              to { opacity: 1; transform: scale(1) translateY(0); } 
            }
          `}
        </style>
        
        {/* Header (Sticky) */}
        <div className="sticky top-0 bg-white/90 backdrop-blur-md z-10 px-8 py-6 border-b border-slate-100 flex justify-between items-start">
          <div>
            <h2 className="text-4xl font-extrabold text-slate-800 tracking-tight">{verbData?.verb ?? verbName}</h2>
            <p className="text-lg text-indigo-600 font-medium mt-1">{verbData?.translation ?? (isLoading ? 'Loading…' : '')}</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-red-500 transition-colors focus:outline-none"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-8 space-y-8 bg-slate-50/50">

          {/* Loading / Error */}
          {(isLoading || error || !verbData) && (
            <section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              {isLoading && (
                <div className="text-slate-600">
                  <p className="font-semibold">Loading details…</p>
                  <p className="text-sm text-slate-400 mt-1">Fetching data from the API for “{verbName}”.</p>
                </div>
              )}

              {!isLoading && error && (
                <div className="text-slate-700">
                  <p className="font-semibold text-red-600">Could not load this phrasal verb.</p>
                  <p className="text-sm text-slate-500 mt-1">{error}</p>
                  <div className="mt-4 flex gap-3">
                    <button
                      onClick={onRetry}
                      className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors"
                    >
                      Retry
                    </button>
                    <button
                      onClick={onClose}
                      className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-semibold hover:bg-slate-200 transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
            </section>
          )}

          {!verbData ? null : (
            <>
          
          {/* Section 1: Meanings */}
          <section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <div className="flex items-center mb-4 text-indigo-600">
              <BookOpen className="h-6 w-6 mr-2" />
              <h3 className="text-xl font-bold uppercase tracking-wider text-xs">Meanings & Definitions</h3>
            </div>
            <div className="space-y-4">
              {verbData.meanings.map((meaning, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-indigo-100 transition-colors">
                  <div className="sm:w-32 flex-shrink-0">
                    <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 rounded-lg text-xs font-bold uppercase tracking-wide">
                      {meaning.context}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="text-slate-800 font-medium text-lg mb-1">{meaning.definition}</p>
                    <p className="text-slate-500 italic">{meaning.translation}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Section 2: Morphology */}
            <section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <div className="flex items-center mb-4 text-emerald-600">
                <Type className="h-6 w-6 mr-2" />
                <h3 className="text-xl font-bold uppercase tracking-wider text-xs">Morphology</h3>
              </div>
              <div className="space-y-3">
                {Object.entries(verbData.morphology).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center py-2 border-b border-slate-50 last:border-0">
                    <span className="text-slate-400 capitalize text-sm font-medium">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                    <span className="text-slate-800 font-bold">{String(value)}</span>
                  </div>
                ))}
              </div>
            </section>

             {/* Section 3: Grammar */}
             <section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <div className="flex items-center mb-4 text-orange-600">
                <Settings className="h-6 w-6 mr-2" />
                <h3 className="text-xl font-bold uppercase tracking-wider text-xs">Grammar Rules</h3>
              </div>
              
              <div className="mb-4">
                <span className="text-sm text-slate-400 font-medium uppercase">Type</span>
                <p className="text-lg font-bold text-slate-800">{verbData.grammar.type}</p>
              </div>

              <div className="space-y-3">
                {verbData.grammar.details.map((rule, idx) => (
                  <div key={idx} className="bg-orange-50 p-4 rounded-xl border border-orange-100">
                    <div className="flex items-start gap-3">
                      <div className="mt-1">
                        <div className="h-2 w-2 rounded-full bg-orange-400"></div>
                      </div>
                      <div>
                        <p className="text-slate-800 font-medium">{rule.text}</p>
                        <p className="text-slate-500 text-sm mt-1 italic">{rule.translation}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Section 4: Tenses & Usage */}
          <section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
             <div className="flex items-center mb-6 text-purple-600">
                <Layers className="h-6 w-6 mr-2" />
                <h3 className="text-xl font-bold uppercase tracking-wider text-xs">Tenses & Examples</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {verbData.tenses.map((tense, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-50 hover:bg-white hover:shadow-md border border-slate-100 transition-all duration-200">
                    <span className="text-xs font-bold text-purple-600 uppercase tracking-wide mb-2 block">
                      {tense.name}
                    </span>
                    <p className="text-slate-800 font-medium mb-1">{tense.en}</p>
                    <p className="text-slate-500 text-sm">{tense.es}</p>
                  </div>
                ))}
              </div>
          </section>

          </>
          )}

        </div>
      </div>
    </div>
  );
};

/**
 * Main Application Component
 */
const PhrasalVerbMaster = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedVerbName, setSelectedVerbName] = useState<string | null>(null);
  const [selectedVerbData, setSelectedVerbData] = useState<PhrasalVerbData | null>(null);
  const [isLoadingVerb, setIsLoadingVerb] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  const verbCacheRef = useRef<Map<string, PhrasalVerbData>>(new Map());
  const requestControllerRef = useRef<AbortController | null>(null);

  const fetchVerbDetails = async (verb: string) => {
    const normalized = verb.trim();
    if (!normalized) return;

    const cached = verbCacheRef.current.get(normalized.toLowerCase());
    if (cached) {
      setSelectedVerbData(cached);
      setLoadError(null);
      setIsLoadingVerb(false);
      return;
    }

    if (requestControllerRef.current) {
      requestControllerRef.current.abort();
    }

    const controller = new AbortController();
    requestControllerRef.current = controller;

    setIsLoadingVerb(true);
    setLoadError(null);
    setSelectedVerbData(null);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ verb: normalized }),
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status} ${response.statusText}`);
      }

      const json = (await response.json()) as ApiResponse;
      if (!json?.data) {
        throw new Error('Invalid API response: missing `data`.');
      }

      verbCacheRef.current.set(normalized.toLowerCase(), json.data);
      setSelectedVerbData(json.data);
    } catch (err) {
      if ((err as Error)?.name === 'AbortError') return;
      setLoadError((err as Error)?.message ?? 'Unknown error');
    } finally {
      setIsLoadingVerb(false);
    }
  };

  const openVerb = (verb: string) => {
    setSelectedVerbName(verb);
    fetchVerbDetails(verb);
  };

  const closeModal = () => {
    setSelectedVerbName(null);
    setSelectedVerbData(null);
    setIsLoadingVerb(false);
    setLoadError(null);
    if (requestControllerRef.current) {
      requestControllerRef.current.abort();
      requestControllerRef.current = null;
    }
  };

  // Filter logic
  const filteredVerbs = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return phrasalVerbsList;
    return phrasalVerbsList.filter((verb) => verb.toLowerCase().includes(term));
  }, [searchTerm]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20">
      
      {/* Header Section */}
      <div className="bg-indigo-600 text-white pt-16 pb-24 px-6 rounded-b-[3rem] shadow-lg mb-[-3rem]">
        <div className="max-w-4xl mx-auto">
          {/* Back to Home Link */}
          <div className="mb-2">
            <a href="/about-me/" className="text-stone-200 hover:text-white dark:text-stone-300 dark:hover:text-white transition-colors font-serif italic text-sm">
              ← Back to Home
            </a>
          </div>
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-indigo-500 p-3 rounded-2xl shadow-inner">
                <GraduationCap className="h-10 w-10 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
              Phrasal Verb Master
            </h1>
            <p className="text-indigo-100 text-lg max-w-2xl mx-auto">
              Explore definitions, morphology, and usage examples to boost your English skills.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Search Bar Component */}
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        {/* Results Grid */}
        {filteredVerbs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVerbs.map((verb) => (
              <VerbCard 
                key={verb}
                verb={verb}
                onClick={openVerb}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 opacity-60">
            <MessageCircle className="h-16 w-16 mx-auto mb-4 text-slate-300" />
            <p className="text-xl font-medium text-slate-500">No phrasal verbs found.</p>
            <p className="text-slate-400">Try searching for "take off" or "give up"</p>
          </div>
        )}
      </div>

      {/* Modal Overlay */}
      {selectedVerbName && (
        <Modal 
          verbName={selectedVerbName}
          verbData={selectedVerbData}
          isLoading={isLoadingVerb}
          error={loadError}
          onClose={closeModal}
          onRetry={() => {
            if (selectedVerbName) fetchVerbDetails(selectedVerbName);
          }}
        />
      )}
      
      {/* Footer */}
      <div className="mt-20 text-center text-slate-400 text-sm pb-8">
        <p>© {new Date().getFullYear()} Phrasal Verb Learning. Designed for Students.</p>
      </div>
    </div>
  );
};

export default PhrasalVerbMaster;