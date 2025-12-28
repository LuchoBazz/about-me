import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  CalendarClock,
  Sun,
  Moon,
  Briefcase,
  Dumbbell,
  GraduationCap,
  Map,
  Languages
} from 'lucide-react';

// Simple Layout mock for preview
// In your real code, this should be: import Layout from '@theme/Layout';
const Layout = ({ children }) => <div className="w-full">{children}</div>;

function NowPage() {
  const [isDark, setIsDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Sync with the Docusaurus theme
  useEffect(() => {
    const updateTheme = () => {
      // Docusaurus stores the theme in the html data-theme attribute
      const theme = document.documentElement.dataset.theme;
      setIsDark(theme === 'dark');
    };

    // Update when the component mounts
    updateTheme();

    // Watch changes in data-theme (for example, when toggling from the Docusaurus navbar)
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });

    return () => observer.disconnect();
  }, []);

  // Add a shadow to the navbar when scrolling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const newTheme = isDark ? 'light' : 'dark';
    // Set the data-theme attribute for Docusaurus
    document.documentElement.dataset.theme = newTheme;
    setIsDark(!isDark);
  };

  // Data for the NOW section
  const nowItems = [
    {
      category: "Health",
      title: "Going to the Gym",
      subtitle: "Building strength and consistency",
      icon: <Dumbbell className="w-6 h-6" />,
      color: "text-rose-500",
      bg: "bg-rose-100 dark:bg-rose-900/30",
      startDateTime: "2025-"
    },
    {
      category: "Learning",
      title: "Studying English",
      subtitle: "Aiming for a stable B2 level",
      icon: <Languages className="w-6 h-6" />,
      color: "text-emerald-500",
      bg: "bg-emerald-100 dark:bg-emerald-900/30",
      startDateTime: "2025-"
    },
    {
      category: "Work",
      title: "Back-End Software Engineer",
      subtitle: "Working at Instaleap",
      icon: <Briefcase className="w-6 h-6" />,
      color: "text-blue-500",
      bg: "bg-blue-100 dark:bg-blue-900/30",
      startDateTime: "2025-"
    },
    {
      category: "Reading",
      title: "The Richest Man in Babylon",
      subtitle: "by George S. Clason",
      icon: <BookOpen className="w-6 h-6" />,
      color: "text-amber-500",
      bg: "bg-amber-100 dark:bg-amber-900/30",
      startDateTime: "2025-"
    },
    {
      category: "Education",
      title: "Master's Degree Scholarships",
      subtitle: "Applying to various programs",
      icon: <GraduationCap className="w-6 h-6" />,
      color: "text-purple-500",
      bg: "bg-purple-100 dark:bg-purple-900/30",
      startDateTime: "2025-"
    },
    {
      category: "Side project",
      title: "Taskon",
      subtitle: "Building an office productivity tools app",
      icon: <Briefcase className="w-6 h-6" />,
      color: "text-indigo-500",
      bg: "bg-indigo-100 dark:bg-indigo-900/30",
      startDateTime: "2025-12-20"
    },
  ];

  const activityHistoryItems = [
    {
      category: "Projects",
      title: "Archiving my Past",
      subtitle: "Organizing travel memories into a public timeline",
      icon: <Map className="w-6 h-6" />,
      color: "text-cyan-500",
      bg: "bg-cyan-100 dark:bg-cyan-900/30",
      dot: "bg-cyan-500",
      startDateLabel: "December 8, 2025",
      endDateLabel: "January 8, 2026",
      startDateTime: "2025-12-08",
      endDateTime: "2026-01-08"
    },
    {
      category: "Learning",
      title: "English Course in Malta",
      subtitle: "Immersive English learning experience",
      icon: <Languages className="w-6 h-6" />,
      color: "text-emerald-500",
      bg: "bg-emerald-100 dark:bg-emerald-900/30",
      startDateLabel: "January 27, 2025",
      endDateLabel: "August 8, 2025",
      startDateTime: "2025-01-27",
      endDateTime: "2025-08-08"
    },
    {
      category: "Competitive Programming",
      title: "Competitive Programming Training Camp",
      subtitle: "Argentina",
      icon: <GraduationCap className="w-6 h-6" />,
      color: "text-purple-500",
      bg: "bg-purple-100 dark:bg-purple-900/30",
      startDateLabel: "July 31, 2023",
      endDateLabel: "August 11, 2023",
      startDateTime: "2023-07-31",
      endDateTime: "2023-08-11"
    },
    {
      category: "Work",
      title: "Back-End Software Engineer",
      subtitle: "IBM",
      icon: <Briefcase className="w-6 h-6" />,
      color: "text-blue-500",
      bg: "bg-blue-100 dark:bg-blue-900/30",
      startDateLabel: "Jan 2022",
      endDateLabel: "Sep 2022",
      startDateTime: "2022-01-01",
      endDateTime: "2022-09-30"
    },
    {
      category: "Projects",
      title: "Quick Test CLI",
      subtitle: "Command Line Interface (CLI) for Stress Testing for Competitive Programming (At present, I only provide support)",
      icon: <BookOpen className="w-6 h-6" />,
      color: "text-indigo-500",
      bg: "bg-indigo-100 dark:bg-indigo-900/30",
      dot: "bg-indigo-500",
      startDateLabel: "May 2021",
      endDateLabel: "May 2022",
      startDateTime: "2021-05-01",
      endDateTime: "2022-05-31"
    },
    {
      category: "Work",
      title: "Software Engineer Intern",
      subtitle: "IBM",
      icon: <Briefcase className="w-6 h-6" />,
      color: "text-blue-500",
      bg: "bg-blue-100 dark:bg-blue-900/30",
      startDateLabel: "Jul 2021",
      endDateLabel: "Dec 2021",
      startDateTime: "2021-07-01",
      endDateTime: "2021-12-31"
    },
    {
      category: "Competitive Programming",
      title: "ICPC Training & Practice",
      subtitle: "Competitive programming training and Codeforces contests",
      icon: <GraduationCap className="w-6 h-6" />,
      color: "text-purple-500",
      bg: "bg-purple-100 dark:bg-purple-900/30",
      startDateLabel: "June 24, 2020",
      endDateLabel: "December 22, 2024",
      startDateTime: "2020-06-24",
      endDateTime: "2024-12-22"
    },
    {
      category: "Education",
      title: "Bachelor of Engineering (Systems and Computer Engineering)",
      subtitle: "Universidad Nacional de Colombia",
      icon: <GraduationCap className="w-6 h-6" />,
      color: "text-purple-500",
      bg: "bg-purple-100 dark:bg-purple-900/30",
      startDateLabel: "Feb 2016",
      endDateLabel: "Oct 2022",
      startDateTime: "2016-02-01",
      endDateTime: "2022-10-31"
    },
  ];

  return (
    <div className={isDark ? 'dark' : ''}>
      <Layout>
        <div className="min-h-screen flex flex-col transition-colors duration-300 bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 font-sans selection:bg-blue-200 dark:selection:bg-blue-900">

          {/* --- NAVBAR --- */}
          <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-sm border-b border-slate-200 dark:border-slate-800' : 'bg-transparent'}`}>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-20">
                <div className="flex items-center gap-4">
                  <a href="/about-me/" className="text-stone-500 hover:text-stone-800 dark:text-stone-400 dark:hover:text-stone-200 transition-colors font-serif italic text-sm">
                    ← Back to Home
                  </a>
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

              {/* Now page header */}
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
                  Last updated: December 28, 2025
                </div>
              </header>

              {/* Activities grid */}
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

              {/* Activity history / timeline */}
              <section className="mb-20" aria-label="Activity history">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">
                  Activity history
                </h2>

                <ol className="relative border-l-2 border-slate-200 dark:border-slate-800 ml-3 space-y-10">
                  {activityHistoryItems.map((item, index) => (
                    <li key={index} className="relative pl-8">
                      {/* Dot */}
                      <span
                        className={`absolute -left-[9px] top-1.5 w-5 h-5 rounded-full border-4 border-slate-50 dark:border-slate-950 ${item.dot || 'bg-slate-300 dark:bg-slate-700'}`}
                        aria-hidden="true"
                      />

                      <article className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8">
                        {/* Dates */}
                        <header className="md:w-36 flex-shrink-0">
                          <div className="text-sm font-bold text-slate-900 dark:text-slate-100">
                            <time dateTime={item.endDateTime}>{item.endDateLabel}</time>
                          </div>
                          <div className="text-xs font-mono text-slate-400 dark:text-slate-500 mt-1">
                            <time dateTime={item.startDateTime}>{item.startDateLabel}</time>
                          </div>
                        </header>

                        {/* Card */}
                        <div className="flex-grow p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500/50 dark:hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/10 transition-all duration-300 group">
                          <div className="flex items-start gap-5">
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
                        </div>
                      </article>
                    </li>
                  ))}
                </ol>
              </section>

              {/* Now page explanation */}
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
        </div>
      </Layout>
    </div>
  );
}

export default NowPage;