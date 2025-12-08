import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Zap,
  TrendingUp,
  Globe,
  CalendarClock,
  Sun,
  Moon,
  ArrowLeft
} from 'lucide-react';

// Simulación simple de Layout para el preview
// En tu código real, esto sería: import Layout from '@theme/Layout';
const Layout = ({ children }) => <div className="w-full">{children}</div>;

function NowPage() {
  const [isDark, setIsDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Sincronización de tema (Simulada)
  useEffect(() => {
    // En Docusaurus real, verificarías document.documentElement.dataset.theme
  }, []);

  // Efecto de sombra en Navbar al hacer scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  // Datos de la sección NOW
  const nowItems = [
    {
      category: "Reading",
      title: "Designing Data-Intensive Applications",
      subtitle: "by Martin Kleppmann",
      icon: <BookOpen className="w-6 h-6" />,
      color: "text-blue-500",
      bg: "bg-blue-100 dark:bg-blue-900/30"
    },
    {
      category: "Building",
      title: "Improving Quick Test CLI",
      subtitle: "Adding support for Rust & Python",
      icon: <Zap className="w-6 h-6" />,
      color: "text-amber-500",
      bg: "bg-amber-100 dark:bg-amber-900/30"
    },
    {
      category: "Learning",
      title: "Rust Async Runtime",
      subtitle: "Deep diving into Tokio",
      icon: <TrendingUp className="w-6 h-6" />,
      color: "text-emerald-500",
      bg: "bg-emerald-100 dark:bg-emerald-900/30"
    },
    {
      category: "Planning",
      title: "Trip to Japan",
      subtitle: "Autumn 2025",
      icon: <Globe className="w-6 h-6" />,
      color: "text-rose-500",
      bg: "bg-rose-100 dark:bg-rose-900/30"
    }
  ];

  return (
    <div className={isDark ? 'dark' : ''}>
      <Layout>
        <div className="min-h-screen flex flex-col transition-colors duration-300 bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 font-sans selection:bg-blue-200 dark:selection:bg-blue-900">

          {/* --- NAVBAR --- */}
          <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-sm border-b border-slate-200 dark:border-slate-800' : 'bg-transparent'}`}>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-20">
                <div className="flex items-center gap-3">
                  <a href="/" className="group flex items-center gap-3 hover:opacity-80 transition-opacity">
                    <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-lg flex items-center justify-center text-white font-mono font-bold text-xl shadow-lg shadow-indigo-500/30">
                      {`/>`}
                    </div>
                    <div>
                      <h1 className="font-bold text-lg leading-none tracking-tight">LuchoBazz</h1>
                      <span className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider group-hover:text-indigo-500 transition-colors">Back to Home</span>
                    </div>
                  </a>
                </div>

                <div className="flex items-center gap-4">
                  <button
                    onClick={toggleTheme}
                    className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors border border-transparent hover:border-slate-300 dark:hover:border-slate-700"
                    aria-label="Toggle Dark Mode"
                  >
                    {isDark ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} className="text-slate-600" />}
                  </button>
                </div>
              </div>
            </div>
          </nav>

          {/* --- MAIN CONTENT --- */}
          <main className="flex-grow pt-32 pb-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">

              {/* Header de la página Now */}
              <header className="mb-16">
                <div className="inline-flex items-center gap-2 mb-6 text-indigo-600 dark:text-indigo-400 font-medium">
                  <CalendarClock size={20} />
                  <span>Now Page</span>
                </div>

                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6">
                  What I'm doing now
                </h1>

                <div className="prose prose-slate dark:prose-invert max-w-2xl">
                  <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                    This is a snapshot of my current focus, inspirations, and priorities.
                    Unlike the "About" page which lists what I've done, this page tracks what I'm doing
                    <em> right now</em>.
                  </p>
                </div>

                <div className="mt-6 flex items-center gap-2 text-xs font-mono text-slate-400 bg-slate-100 dark:bg-slate-900 w-fit px-3 py-1 rounded-full border border-slate-200 dark:border-slate-800">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                  Last updated: December 8, 2025
                </div>
              </header>

              {/* Grid de Actividades */}
              <div className="grid md:grid-cols-2 gap-6 mb-20">
                {nowItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-5 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500/50 dark:hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/10 transition-all duration-300 group"
                  >
                    <div className={`p-4 rounded-xl flex-shrink-0 ${item.bg} ${item.color} group-hover:scale-110 transition-transform duration-300`}>
                      {item.icon}
                    </div>
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
                        {item.category}
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 leading-tight mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-base text-slate-600 dark:text-slate-400">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Explicación Now Page */}
              <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl p-8 border border-indigo-100 dark:border-indigo-800/50 text-center md:text-left flex flex-col md:flex-row items-center gap-6">
                <div className="flex-grow">
                  <h3 className="text-lg font-bold text-indigo-900 dark:text-indigo-300 mb-2">Inspired by the "Now" Movement</h3>
                  <p className="text-sm text-indigo-800/80 dark:text-indigo-300/70 mb-0">
                    This page was inspired by Derek Sivers and the nownownow.com project. It serves as a public declaration of priorities and a reminder to stay focused.
                  </p>
                </div>
                <a
                  href="https://nownownow.com/about"
                  target="_blank"
                  rel="noreferrer"
                  className="flex-shrink-0 px-5 py-2.5 bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 font-semibold text-sm rounded-lg border border-indigo-200 dark:border-indigo-800 hover:border-indigo-500 transition-all shadow-sm"
                >
                  Learn more
                </a>
              </div>

            </div>
          </main>

          {/* --- FOOTER --- */}
          <footer className="py-8 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
            <div className="max-w-4xl mx-auto px-4 text-center">
              <div className="text-slate-500 text-sm">
                <p>© {new Date().getFullYear()} Luis Miguel Báez.</p>
                <div className="mt-2 flex justify-center gap-4">
                  <a href="/" className="hover:text-indigo-600 transition-colors">Home</a>
                  <span className="text-slate-300">•</span>
                  <a href="#" className="hover:text-indigo-600 transition-colors">Twitter</a>
                  <span className="text-slate-300">•</span>
                  <a href="#" className="hover:text-indigo-600 transition-colors">GitHub</a>
                </div>
              </div>
            </div>
          </footer>

        </div>
      </Layout>
    </div>
  );
}

export default NowPage;