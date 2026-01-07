import React, { useState, useEffect } from 'react';
import { Copy, Check, Search, BookOpen, Globe, MessageCircle, Volume2, Moon, Sun } from 'lucide-react';

const EnglishCommonPhrases = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [isDark, setIsDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Sync with the Docusaurus theme
  useEffect(() => {
    const updateTheme = () => {
      const theme = document.documentElement.dataset.theme;
      setIsDark(theme === 'dark');
    };

    updateTheme();

    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });

    return () => observer.disconnect();
  }, []);

  // Add shadow to header when scrolling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const newTheme = isDark ? 'light' : 'dark';
    document.documentElement.dataset.theme = newTheme;
    setIsDark(!isDark);
  };

  // Data provided by the user
  const phrasesData = [
    { phrase: "For Real", translation: "De verdad / En serio", usage: "US", example: "Are you for real? That sounds unbelievable!" },
    { phrase: "Go Ahead", translation: "Adelante / Procede", usage: "UK/US", example: "Go ahead and have a seat while I get the tea." },
    { phrase: "By the Way", translation: "Por cierto / A propósito", usage: "UK/US", example: "By the way, did you hear about the new café in town?" },
    { phrase: "That's why", translation: "Por eso / Es por eso que", usage: "UK/US", example: "He forgot to set the alarm, that's why he was late." },
    { phrase: "Just in case", translation: "Por si acaso", usage: "UK/US", example: "Take an umbrella just in case it rains." },
    { phrase: "In spite of", translation: "A pesar de", usage: "UK/US", example: "In spite of the bad weather, we went for a walk." },
    { phrase: "That being said", translation: "Dicho esto / Habiendo dicho eso", usage: "UK/US", example: "That being said, I still think we should be cautious." },
    { phrase: "Unless", translation: "A menos que / A no ser que", usage: "UK/US", example: "You won't pass the exam unless you study." },
    { phrase: "Whatever", translation: "Lo que sea / Da igual", usage: "UK/US", example: "Do whatever you think is best." },
    { phrase: "Whenever", translation: "Cuando sea / Siempre que", usage: "UK/US", example: "Come and visit me whenever you like." },
    { phrase: "Wherever", translation: "Donde sea / En cualquier lugar", usage: "UK/US", example: "I'll go wherever you want to go." },
    { phrase: "Whoever", translation: "Quien sea / Cualquiera que", usage: "UK/US", example: "Whoever arrives first gets the best seat." },
    { phrase: "Whichever", translation: "Cualquiera (de opciones)", usage: "UK/US", example: "You can take whichever book you prefer." },
    { phrase: "However", translation: "Sin embargo / De cualquier modo", usage: "UK/US", example: "However hard I try, I can't seem to understand it." },
    { phrase: "Anywhere", translation: "En cualquier parte", usage: "UK/US", example: "You can sit anywhere you like." },
    { phrase: "So Much", translation: "Tanto / Mucho", usage: "UK/US", example: "I love this book so much!" },
    { phrase: "When I was younger", translation: "Cuando era más joven", usage: "UK/US", example: "When I was younger, I used to play outside all day." },
    { phrase: "Straightforward", translation: "Directo / Claro", usage: "UK/US", example: "The instructions were quite straightforward." },
    { phrase: "Good night, sleep well", translation: "Buenas noches, duerme bien", usage: "UK/US", example: "Good night, sleep well. See you in the morning." },
    { phrase: "Have a good day", translation: "Que tengas un buen día", usage: "US", example: "Hope you have a good day at work!" },
    { phrase: "Take care", translation: "Cuídate", usage: "UK/US", example: "Take care and see you soon!" },
    { phrase: "Do you mind if ...?", translation: "¿Te importa si...?", usage: "UK/US", example: "Do you mind if I open the window?" },
    { phrase: "I have no idea", translation: "No tengo ni idea", usage: "UK/US", example: "I have no idea where he went." },
    { phrase: "I don't know anything about that", translation: "No sé nada sobre eso", usage: "UK/US", example: "I don't know anything about that topic." },
    { phrase: "By the time", translation: "Para cuando", usage: "UK/US", example: "By the time we arrived, the film had already started." },
    { phrase: "Over time", translation: "Con el tiempo / A lo largo del tiempo", usage: "UK/US", example: "Over time, things will get better." },
    { phrase: "Oh my gosh! / Oh my God!", translation: "¡Dios mío! / ¡Madre mía!", usage: "US", example: "Oh my gosh! I can't believe it!" },
    { phrase: "Once again", translation: "Una vez más", usage: "UK/US", example: "Could you explain that once again, please?" },
    { phrase: "For the Record", translation: "Para que conste / Para que lo sepas", usage: "UK/US", example: "For the record, I never agreed to this plan." }
  ].reverse();

  // Function to handle voice synthesis (Text-to-Speech)
  const handleSpeak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US'; 
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Your browser does not support text-to-speech.");
    }
  };

  const handleCopy = (text: string, index: number) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Copy error', err);
    }
    document.body.removeChild(textArea);
  };

  const filteredPhrases = phrasesData.filter(item => 
    item.phrase.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.translation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={isDark ? 'dark' : ''}>
      <div className="min-h-screen font-sans transition-colors duration-300 pb-12 bg-slate-50 dark:bg-[#0f172a] text-slate-800 dark:text-slate-100 selection:bg-indigo-100 dark:selection:bg-indigo-500 selection:text-indigo-900 dark:selection:text-white">
        
        {/* Header Section */}
        <div className={`shadow-sm border-b sticky top-0 z-10 transition-all duration-300
          bg-white dark:bg-[#0f172a] border-slate-200 dark:border-slate-700
          ${scrolled ? 'shadow-md' : ''}`}
        >
          <div className="max-w-6xl mx-auto px-4 py-4 md:py-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <a 
                  href="/about-me/" 
                  className="text-sm font-serif italic transition-colors text-stone-500 hover:text-stone-800 dark:text-slate-400 dark:hover:text-slate-200"
                >
                  ← Back to Home
                </a>
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors border border-transparent hover:border-slate-300 dark:hover:border-slate-700"
                  aria-label="Toggle Dark Mode"
                >
                  {isDark ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} className="text-slate-600" />}
                </button>
                <div className="bg-indigo-600 p-2 rounded-lg text-white">
                  <BookOpen size={24} />
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-bold transition-colors duration-300 text-slate-900 dark:text-white">
                    My English Common Phrases Hub
                  </h2>
                </div>
              </div>

              {/* Controls Container */}
              <div className="flex items-center gap-3 w-full md:w-auto">
                {/* Search Bar */}
                <div className="relative flex-grow md:flex-grow-0 md:w-80">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search size={18} className="text-slate-400 dark:text-slate-500" />
                  </div>
                  <input
                    type="text"
                    placeholder="Buscar frase..."
                    className="block w-full pl-10 pr-3 py-2 border rounded-lg leading-5 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150 ease-in-out
                      bg-slate-50 dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white placeholder-slate-400 focus:bg-white dark:focus:bg-slate-700 focus:border-indigo-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="max-w-6xl mx-auto px-4 py-8">
          
          {/* Stats */}
          <div className="mb-6 text-sm font-medium transition-colors duration-300 text-slate-500 dark:text-slate-400">
            Showing {filteredPhrases.length} of {phrasesData.length} expressions
          </div>

          {filteredPhrases.length === 0 ? (
            <div className="text-center py-20 rounded-xl shadow-sm border border-dashed transition-colors duration-300
              bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700">
              <p className="text-lg text-slate-400 dark:text-slate-500">
                No results found for "{searchTerm}"
              </p>
              <button 
                onClick={() => setSearchTerm('')}
                className="mt-4 text-indigo-500 hover:text-indigo-400 font-medium"
              >
                Clear search
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPhrases.map((item, index) => (
                <div 
                  key={index} 
                  className="group rounded-xl border shadow-sm hover:shadow-md transition-all duration-300 flex flex-col overflow-hidden
                    bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-indigo-200 dark:hover:border-indigo-500/50"
                >
                  {/* Card Header */}
                  <div className="p-5 border-b transition-colors duration-300
                    bg-gradient-to-r from-slate-50 to-white dark:from-slate-800/50 dark:to-slate-800/50 border-slate-100 dark:border-slate-700"
                  >
                    <div className="flex justify-between items-start gap-3">
                      <h3 className="text-xl font-bold leading-tight transition-colors duration-300 text-indigo-900 dark:text-indigo-300">
                        {item.phrase}
                      </h3>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <button
                          onClick={() => handleSpeak(item.phrase)}
                          className="p-2 rounded-full border shadow-sm transition-all duration-200
                            bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-slate-600"
                          title="Escuchar frase"
                        >
                          <Volume2 size={18} />
                        </button>
                        <button
                          onClick={() => handleCopy(item.phrase, index)}
                          className={`p-2 rounded-full transition-all duration-200 border shadow-sm
                            ${copiedIndex === index 
                              ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 border-green-200 dark:border-green-800 scale-110' 
                              : 'bg-white dark:bg-slate-700 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-slate-600 border-slate-200 dark:border-slate-600'
                            }
                          `}
                          title="Copiar frase"
                        >
                          {copiedIndex === index ? <Check size={18} /> : <Copy size={18} />}
                        </button>
                      </div>
                    </div>
                    
                    <div className="mt-2 flex items-center gap-2">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border
                        bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-600"
                      >
                        <Globe size={10} className="mr-1" />
                        {item.usage}
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 flex-grow flex flex-col justify-between">
                    {/* Translation */}
                    <div className="mb-4">
                      <p className="text-sm font-semibold uppercase tracking-wide mb-1 text-slate-400 dark:text-slate-500">
                        Significado
                      </p>
                      <p className="text-lg font-medium transition-colors duration-300 text-slate-800 dark:text-slate-200">
                        {item.translation}
                      </p>
                    </div>

                    {/* Example */}
                    <div className="rounded-lg p-3 border transition-colors duration-300
                      bg-indigo-50/50 dark:bg-indigo-900/20 border-indigo-100/50 dark:border-indigo-800/50"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-start gap-2">
                          <MessageCircle size={16} className="mt-1 flex-shrink-0 text-indigo-400" />
                          <p className="text-sm italic leading-relaxed transition-colors duration-300 text-indigo-900 dark:text-indigo-200">
                            "{item.example}"
                          </p>
                        </div>
                        <button
                          onClick={() => handleSpeak(item.example)}
                          className="p-1 rounded-full transition-colors flex-shrink-0
                            text-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-300 hover:bg-indigo-200 dark:hover:bg-indigo-800/50"
                          title="Escuchar ejemplo"
                        >
                          <Volume2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EnglishCommonPhrases;