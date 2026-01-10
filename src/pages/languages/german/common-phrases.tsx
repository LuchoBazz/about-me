import React, { useState, useEffect } from 'react';
import { Copy, Check, Search, BookOpen, Globe, MessageCircle, Volume2, Moon, Sun } from 'lucide-react';

const GermanCommonPhrases = () => {
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

  const phrasesData = [
    // --- Greetings & Farewells ---
    { phrase: "Hallo", translation: "Hola", pronunciation: "Ja-lo", example: "Hallo! Wie geht's? (¡Hola! ¿Cómo estás?)" },
    { phrase: "Guten Morgen", translation: "Buenos días (mañanas)", pronunciation: "Gu-ten Mor-guen", example: "Guten Morgen, Anna. (Buenos días, Anna.)" },
    { phrase: "Guten Tag", translation: "Buenos días / Buenas tardes", pronunciation: "Gu-ten Taag", example: "Guten Tag, Herr Müller. (Buenas tardes, Sr. Müller.)" },
    { phrase: "Guten Abend", translation: "Buenas noches (al llegar)", pronunciation: "Gu-ten A-bent", example: "Guten Abend, willkommen! (¡Buenas noches, bienvenidos!)" },
    { phrase: "Gute Nacht", translation: "Buenas noches (al dormir)", pronunciation: "Gu-te Najt", example: "Ich gehe ins Bett, gute Nacht. (Me voy a la cama, buenas noches.)" },
    { phrase: "Tschüss", translation: "Adiós (Informal)", pronunciation: "Chius", example: "Wir sehen uns, Tschüss! (Nos vemos, ¡chao!)" },
    { phrase: "Auf Wiedersehen", translation: "Adiós (Formal)", pronunciation: "Auf Vi-da-ze-en", example: "Vielen Dank, auf Wiedersehen. (Muchas gracias, adiós.)" },
    { phrase: "Bis später", translation: "Hasta luego", pronunciation: "Bis shpe-ta", example: "Ich muss gehen, bis später. (Me tengo que ir, hasta luego.)" },

    // --- Courtesy ---
    { phrase: "Ja", translation: "Sí", pronunciation: "Ia", example: "Ja, bitte. (Sí, por favor.)" },
    { phrase: "Nein", translation: "No", pronunciation: "Nain", example: "Nein, danke. (No, gracias.)" },
    { phrase: "Danke", translation: "Gracias", pronunciation: "Dan-ke", example: "Danke für alles. (Gracias por todo.)" },
    { phrase: "Bitte", translation: "Por favor / De nada", pronunciation: "Bi-te", example: "Eine Pizza, bitte. (Una pizza, por favor.)" },
    { phrase: "Entschuldigung", translation: "Perdón / Disculpa", pronunciation: "Ent-shul-di-gung", example: "Entschuldigung, darf ich vorbei? (Perdón, ¿puedo pasar?)" },
    { phrase: "Es tut mir leid", translation: "Lo siento", pronunciation: "Es tut mia laid", example: "Es tut mir leid, ich habe keine Zeit. (Lo siento, no tengo tiempo.)" },
    { phrase: "Kein Problem", translation: "Ningún problema", pronunciation: "Kain Pro-blem", example: "Das ist kein Problem. (Eso no es ningún problema.)" },
    { phrase: "Gesundheit", translation: "¡Salud! (estornudo)", pronunciation: "Gue-zund-jait", example: "—Hatschi! —Gesundheit! (—¡Achís! —¡Salud!)" },

    // --- Communication ---
    { phrase: "Wie geht's?", translation: "¿Cómo estás?", pronunciation: "Vi guets?", example: "Hallo Peter, wie geht's? (Hola Peter, ¿cómo estás?)" },
    { phrase: "Mir geht es gut", translation: "Estoy bien", pronunciation: "Mia guet es gut", example: "Mir geht es gut, danke. (Estoy bien, gracias.)" },
    { phrase: "Ich heiße...", translation: "Me llamo...", pronunciation: "Ij jai-se...", example: "Ich heiße Sofia. (Me llamo Sofía.)" },
    { phrase: "Ich verstehe nicht", translation: "No entiendo", pronunciation: "Ij fea-sh-te-e nijt", example: "Entschuldigung, ich verstehe nicht. (Disculpe, no entiendo.)" },
    { phrase: "Ich weiß nicht", translation: "No lo sé", pronunciation: "Ij vais nijt", example: "Wo ist er? Ich weiß nicht. (¿Dónde está él? No lo sé.)" },
    { phrase: "Sprechen Sie Englisch?", translation: "¿Habla inglés? (Formal)", pronunciation: "Shpre-jen zi Eng-lish?", example: "Ich bin Tourist. Sprechen Sie Englisch? (Soy turista. ¿Habla inglés?)" },
    { phrase: "Sprechen Sie Spanisch?", translation: "¿Habla español? (Formal)", pronunciation: "Shpre-jen zi Shpa-nish?", example: "Sprechen Sie Spanisch? (¿Habla español?)" },
    { phrase: "Genau", translation: "Exacto / Exactamente", pronunciation: "Gue-nau", example: "Ja, das ist genau richtig. (Sí, eso es exactamente correcto.)" },

    // --- Needs & Utility ---
    { phrase: "Wo ist die Toilette?", translation: "¿Dónde está el baño?", pronunciation: "Vo ist di toa-le-te?", example: "Entschuldigung, wo ist die Toilette? (Disculpe, ¿dónde está el baño?)" },
    { phrase: "Was kostet das?", translation: "¿Cuánto cuesta eso?", pronunciation: "Vas cos-tet das?", example: "Das T-Shirt ist schön, was kostet das? (La camiseta es bonita, ¿cuánto cuesta?)" },
    { phrase: "Die Rechnung, bitte", translation: "La cuenta, por favor", pronunciation: "Di resh-nung, bi-te", example: "Herr Ober, die Rechnung, bitte. (Camarero, la cuenta por favor.)" },
    { phrase: "Einen Moment, bitte", translation: "Un momento, por favor", pronunciation: "Ai-nen mo-ment, bi-te", example: "Warten Sie einen Moment, bitte. (Espere un momento, por favor.)" },
    { phrase: "Hilfe!", translation: "¡Ayuda!", pronunciation: "Jil-fe!", example: "Hilfe! Ich brauche einen Arzt. (¡Ayuda! Necesito un médico.)" },
    { phrase: "Prost!", translation: "¡Salud! (brindis)", pronunciation: "Prost!", example: "Auf uns, Prost! (¡Por nosotros, salud!)" },
    { phrase: "Alles klar", translation: "Todo claro / De acuerdo", pronunciation: "A-les clar", example: "Okay, alles klar. Bis morgen. (Ok, todo claro. Hasta mañana.)" }
  ];

  // Function to handle voice synthesis (Text-to-Speech)
  const handleSpeak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'de-DE'; 
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
                    My German Common Phrases Hub
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
                        {item.pronunciation}
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

export default GermanCommonPhrases;