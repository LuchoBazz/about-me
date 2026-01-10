import React, { useState, useEffect } from 'react';
import { Copy, Check, Search, BookOpen, Globe, MessageCircle, Volume2, Moon, Sun } from 'lucide-react';

const RussianCommonPhrases = () => {
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
    { phrase: "Здравствуйте", translation: "Hola (Formal)", pronunciation: "Zdrást-vui-tie", example: "Здравствуйте, доктор. (Hola, doctor)" },
    { phrase: "Привет", translation: "Hola (Informal)", pronunciation: "Pri-viét", example: "Привет, друг! (¡Hola, amigo!)" },
    { phrase: "Доброе утро", translation: "Buenos días", pronunciation: "Dó-bra-ye ú-tra", example: "Доброе утро, мама. (Buenos días, mamá)" },
    { phrase: "Добрый день", translation: "Buenas tardes", pronunciation: "Dó-bri dién", example: "Добрый день! Как дела? (¡Buenas tardes! ¿Qué tal?)" },
    { phrase: "Добрый вечер", translation: "Buenas noches (Saludo)", pronunciation: "Dó-bri vié-cher", example: "Добрый вечер, всем. (Buenas noches a todos)" },
    { phrase: "Спокойной ночи", translation: "Buenas noches (Despedida/Dormir)", pronunciation: "Spa-kóy-nay nó-chi", example: "Спокойной ночи, спи хорошо. (Buenas noches, duerme bien)" },
    { phrase: "До свидания", translation: "Adiós (Formal)", pronunciation: "Da svi-dá-ni-ya", example: "Спасибо, до свидания! (¡Gracias, adiós!)" },
    { phrase: "Пока", translation: "Chao / Nos vemos", pronunciation: "Pa-ká", example: "Пока, увидимся завтра. (Chao, nos vemos mañana)" },

    // --- Courtesy ---
    { phrase: "Спасибо", translation: "Gracias", pronunciation: "Spa-sí-ba", example: "Спасибо за помощь. (Gracias por la ayuda)" },
    { phrase: "Большое спасибо", translation: "Muchas gracias", pronunciation: "Bal-shó-ye spa-sí-ba", example: "Большое спасибо за всё. (Muchas gracias por todo)" },
    { phrase: "Пожалуйста", translation: "Por favor / De nada", pronunciation: "Pa-zhál-sta", example: "Два кофе, пожалуйста. (Dos cafés, por favor)" },
    { phrase: "Не за что", translation: "No hay de qué", pronunciation: "Nié za chta", example: "—Спасибо! —Не за что. (—¡Gracias! —No hay de qué)" },
    { phrase: "Извините", translation: "Perdone / Disculpe", pronunciation: "Iz-vi-ní-tie", example: "Извините, где метро? (Disculpe, ¿dónde está el metro?)" },
    { phrase: "Простите", translation: "Lo siento / Perdón", pronunciation: "Pras-tí-tie", example: "Простите, я опоздал. (Perdón, llegué tarde)" },
    { phrase: "Да", translation: "Sí", pronunciation: "Da", example: "Да, я понимаю. (Sí, entiendo)" },
    { phrase: "Нет", translation: "No", pronunciation: "Niet", example: "Нет, спасибо. (No, gracias)" },

    // --- Communication ---
    { phrase: "Меня зовут...", translation: "Me llamo...", pronunciation: "Mi-niá za-vút...", example: "Меня зовут Хуан. (Me llamo Juan)" },
    { phrase: "Как вас зовут?", translation: "¿Cómo se llama usted?", pronunciation: "Kak vas za-vút?", example: "Привет, как вас зовут? (Hola, ¿cómo se llama?)" },
    { phrase: "Очень приятно", translation: "Mucho gusto", pronunciation: "Ó-chien pri-yát-na", example: "Меня зовут Анна, очень приятно. (Me llamo Anna, mucho gusto)" },
    { phrase: "Как дела?", translation: "¿Cómo estás?", pronunciation: "Kak di-lá?", example: "Привет! Как дела? (¡Hola! ¿Cómo estás?)" },
    { phrase: "Хорошо", translation: "Bien / Vale", pronunciation: "Ha-ra-shó", example: "Всё хорошо. (Todo bien)" },
    { phrase: "Я не понимаю", translation: "No entiendo", pronunciation: "Ya ni pa-ni-má-yu", example: "Извините, я не понимаю. (Disculpe, no entiendo)" },
    { phrase: "Вы говорите по-испански?", translation: "¿Habla usted español?", pronunciation: "Vi ga-va-rí-tie pa is-pán-ski?", example: "Я турист. Вы говорите по-испански? (Soy turista. ¿Habla español?)" },
    { phrase: "Я не говорю по-русски", translation: "No hablo ruso", pronunciation: "Ya ni ga-va-riú pa rús-ki", example: "Простите, я не говорю по-русски. (Perdón, no hablo ruso)" },

    // --- Emergency & Utility ---
    { phrase: "Где туалет?", translation: "¿Dónde está el baño?", pronunciation: "Gdié tu-a-liét?", example: "Скажите, пожалуйста, где туалет? (Dígame, por favor, ¿dónde está el baño?)" },
    { phrase: "Сколько стоит?", translation: "¿Cuánto cuesta?", pronunciation: "Skól-ka stó-it?", example: "Сколько стоит этот сувенир? (¿Cuánto cuesta este souvenir?)" },
    { phrase: "Счёт, пожалуйста", translation: "La cuenta, por favor", pronunciation: "Schiót, pa-zhál-sta", example: "Официант, счёт, пожалуйста. (Camarero, la cuenta, por favor)" },
    { phrase: "Воды, пожалуйста", translation: "Agua, por favor", pronunciation: "Va-dí, pa-zhál-sta", example: "Бутылку воды, пожалуйста. (Una botella de agua, por favor)" },
    { phrase: "Помогите!", translation: "¡Ayuda!", pronunciation: "Pa-ma-guí-tie!", example: "Помогите мне, пожалуйста! (¡Ayúdeme, por favor!)" },
    { phrase: "Я люблю тебя", translation: "Te amo", pronunciation: "Ya lyu-bliú ti-biá", example: "Мария, я люблю тебя. (María, te amo)" }
  ]

  // Function to handle voice synthesis (Text-to-Speech)
  const handleSpeak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ru-RU'; 
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
                    My Russian Common Phrases Hub
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

export default RussianCommonPhrases;