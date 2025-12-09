import React, { useState } from 'react';
import { Quote, Sparkles, RefreshCw } from 'lucide-react';

// --- QUOTES DATA (BILINGUAL) ---
const quotesData = [
  {
    en: "That what you persist in doing becomes easier not that the nature of the task has changed but that your ability to do so has increased.",
    es: "Aquello que hagas con persistencia se vuelve más fácil, no porque la naturaleza de la tarea cambie, sino porque se ha incrementado tu habilidad para realizarla.",
    author: "Scott Cuttler’s mother"
  },
  {
    en: "I’m someone who doesn’t accept himself very much. So, through challenge I can find these short moments of self-acceptance, which is a very nice feeling.",
    es: "Soy alguien que no se acepta mucho a sí mismo. Por ende, a través de retos encuentro esos pequeños momentos de auto aceptación, lo cual es un sentimiento agradable.",
    author: "Nico Rosberg"
  },
  {
    en: "It has been said, 'time heals all wounds.' I do not agree. The wounds remain. In time, the mind, protecting its sanity, covers them with scar tissue and the pain lessens. But it is never gone.",
    es: "Dicen que el tiempo cura las heridas. No estoy de acuerdo. Las heridas perduran. Con el tiempo la mente, para proteger su cordura, las cubre con cicatrices, y el dolor se atenúa, pero nunca desaparecen.",
    author: "Rose Fitzgerald Kennedy"
  },
  {
    en: "Victory has a hundred fathers, but defeat is an orphan. Ask not what your country can do for you. Ask what you can do for your country.",
    es: "La victoria tiene cien padres, y la derrota es huérfana. No preguntes qué puede hacer tu país por ti. Pregunta qué puedes hacer tú por tu país.",
    author: "John F. Kennedy"
  },
  {
    en: "Life is what happens to you while you're busy making other plans.",
    es: "La vida es aquello que te pasa mientras estás ocupado haciendo otros planes.",
    author: "John Lennon"
  },
  {
    en: "Happiness = reality – expectations",
    es: "Felicidad = realidad – expectativa.",
    author: "Yuval Noah Harari"
  },
  {
    en: "Simplicity is the ultimate sophistication.",
    es: "La simplicidad es la máxima sofisticación.",
    author: "Leonardo Da Vinci"
  },
  {
    en: "Cycling is like life in many ways. But one where it resembles it closely is the fact that we carry our things with us: our successes, our failures, our debts... Everyone, in life and on the bicycle, carries themselves... We all carry our suitcase, our cross. In life and on the bicycle, the important thing is to be aware of the load.",
    es: "El ciclismo es como la vida en muchas cosas. Pero una de las que se parece mucho es en el hecho que vamos cargando con nuestras cosas: nuestros éxitos, nuestros fracasos, nuestras deudas... Todos vamos cargando con nuestra maleta, con nuestra cruz. En la vida y en la bicicleta, lo importante es ser conscientes de la carga.",
    author: "Sinar Alvarado"
  },
  {
    en: "Dogma is a belief with eyes closed.",
    es: "Dogma es una creencia con los ojos cerrados.",
    author: null
  },
  {
    en: "Confirmation bias: prioritizing information that confirms our own beliefs.",
    es: "Sesgo de confirmación: dar prioridad a la información que confirma nuestras propias creencias.",
    author: "Definition"
  },
  {
    en: "Human beings tend to overestimate the odds of failure, and underestimate the odds of success.",
    es: "El ser humano tiende a sobreestimar las probabilidades de fracaso, y subestimar las probabilidades de éxito.",
    author: null
  }
];

export const InspirationSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleRandomQuote = () => {
    setIsAnimating(true);

    // Wait for fade out
    setTimeout(() => {
      let newIndex;
      do {
        newIndex = Math.floor(Math.random() * quotesData.length);
      } while (newIndex === currentIndex && quotesData.length > 1);

      setCurrentIndex(newIndex);
      setIsAnimating(false);
    }, 300); // Duration matches CSS transition
  };

  const quote = quotesData[currentIndex];

  return (
    <section className="py-24 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-4xl mx-auto px-6 relative">

        {/* Header */}
        <div className="flex flex-col items-center mb-12 text-center">
          <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-full mb-4">
            <Sparkles size={24} className="text-indigo-600 dark:text-indigo-400" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Daily Inspiration</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-2">Fragments of thought collected over time.</p>
        </div>

        {/* Quote Card */}
        <div className="relative bg-white dark:bg-slate-900 rounded-3xl p-8 md:p-12 shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 overflow-hidden">

          {/* Decorative Quote Icon */}
          <div className="absolute top-6 left-8 opacity-10 dark:opacity-20 text-indigo-600">
            <Quote size={64} fill="currentColor" />
          </div>

          <div className={`transition-opacity duration-300 ease-in-out min-h-[200px] flex flex-col justify-center items-center ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
            <blockquote className="relative z-10 w-full max-w-3xl mx-auto text-center space-y-8">

              {/* English Version */}
              <div className="flex flex-col items-center gap-3">
                <p className="text-xl md:text-2xl font-serif italic text-slate-700 dark:text-slate-200 leading-relaxed">
                  "{quote.en}"
                </p>
                <span className="text-[10px] font-bold tracking-widest uppercase text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md">
                  English
                </span>
              </div>

              {/* Divider */}
              <div className="w-16 h-px bg-slate-200 dark:bg-slate-700 mx-auto"></div>

              {/* Spanish Version */}
              <div className="flex flex-col items-center gap-3">
                <p className="text-xl md:text-2xl font-serif italic text-slate-600 dark:text-slate-300 leading-relaxed">
                  "{quote.es}"
                </p>
                <span className="text-[10px] font-bold tracking-widest uppercase text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md">
                  Español
                </span>
              </div>

              {/* Author */}
              {quote.author && (
                <footer className="pt-4 font-sans text-sm font-bold tracking-wider uppercase text-indigo-600 dark:text-indigo-400">
                  — {quote.author}
                </footer>
              )}

            </blockquote>
          </div>

          {/* Action Button */}
          <div className="mt-10 flex justify-center">
            <button
              onClick={handleRandomQuote}
              className="group relative inline-flex items-center gap-2 px-6 py-3 bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-full font-medium transition-all duration-300 active:scale-95"
            >
              <RefreshCw
                size={16}
                className={`transition-transform duration-500 ${isAnimating ? 'rotate-180' : 'group-hover:rotate-180'}`}
              />
              <span>Inspire me again</span>
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};
