import React, { useState, useEffect } from 'react';
import {
  Cpu,
  Network,
  Shield,
  Terminal,
  Award,
  BookOpen,
  ExternalLink,
  ArrowRight,
  Code2,
  Download,
  Wrench,
  Brain,
  Library,
  Globe
} from 'lucide-react';
import Layout from '@theme/Layout';

const calculateDuration = (startDate: string) => {
  const start = new Date(startDate);
  const now = new Date();
  let years = now.getFullYear() - start.getFullYear();
  let months = now.getMonth() - start.getMonth();

  if (now.getDate() < start.getDate()) {
    months--;
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  const parts = [];
  if (years > 0) parts.push(`${years} yr${years > 1 ? 's' : ''}`);
  if (months > 0) parts.push(`${months} mo${months > 1 ? 's' : ''}`);

  return parts.join(' ');
};

function HomePage() {
  const [isDark, setIsDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Synchronize with Docusaurus theme
  useEffect(() => {
    const updateTheme = () => {
      const theme = document.documentElement.dataset.theme;
      setIsDark(theme === 'dark');
    };

    // Update on mount
    updateTheme();

    // Observe changes to the data-theme attribute
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });

    return () => observer.disconnect();
  }, []);

  // Navbar shadow effect on scroll
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

  // Sample data
  const stats = [
    { label: "🇪🇸🇨🇴 Spanish", value: "Native" },
    { label: "🇬🇧🇺🇸 English", value: "B1+" },
    { label: "Years of Exp.", value: `${calculateDuration('2021-07-01')}` },
  ];

  const researchAreas = [
    {
      title: "Generative Artificial Intelligence",
      desc: "Research on efficient transformer architectures and hallucination reduction in LLMs.",
      icon: <Cpu className="w-6 h-6" />,
      color: "text-blue-500"
    },
    {
      title: "Distributed Systems",
      desc: "Design of fault-tolerant consensus protocols for large-scale cloud computing.",
      icon: <Network className="w-6 h-6" />,
      color: "text-emerald-500"
    },
    {
      title: "Cybersecurity & Privacy",
      desc: "Homomorphic encryption methods for secure processing of sensitive data.",
      icon: <Shield className="w-6 h-6" />,
      color: "text-purple-500"
    }
  ];

  const experience = [
    {
      role: "Back-End Software Engineer",
      company: "Instaleap",
      period: `Oct 2022 - Present · ${calculateDuration('2022-10-26')}`,
      desc: "Back-End Engineer."
    },
    {
      role: "Back-End Software Engineer",
      company: "IBM",
      period: "Jan 2022 - Sep 2022 · 9 mos",
      desc: "Backend Software Engineer + Integration."
    },
    {
      role: "Software Engineer Intern",
      company: "IBM",
      period: "Jul 2021 - Dec 2021 · 6 mos",
      desc: "Software Engineer Intern + Integration."
    }
  ];

  const publications = [
    {
      year: 2025,
      title: "Quick Test CLI: A Cross‑Platform for Automated Testing in Competitive Programming",
      journal: "Github",
      type: "pre-print",
      link: "https://doi.org/10.5281/zenodo.17803503"
    },
    // {
    //   year: 2023,
    //   title: "Byzantine Fault Tolerance in Asynchronous Networks: A New Paradigm",
    //   journal: "ACM SIGCOMM",
    //   type: "Journal Article",
    //   link: "#"
    // },
    // {
    //   year: 2023,
    //   title: "Zero‑Knowledge Proofs for Scalable Blockchain Privacy",
    //   journal: "IEEE S&P (Oakland)",
    //   type: "Conference Paper",
    //   link: "#"
    // }
  ];

  const projects = [
    {
      title: "LuchoBazz/quicktest",
      type: "CLI / Open Source",
      desc: "Quick Test CLI: A Cross-Platform for Automated Testing in Competitive Programming",
      tags: ["Competitive Programming", "Stress Testing", "Comparative Testing", "Differential Testing", "Automated Testing", "Algorithm Validation", "Software Testing"],
      link: "https://github.com/LuchoBazz/quicktest"
    },
    {
      title: "LuchoBazz/cpp-algorithm-snippets",
      type: "Data Structures & Algorithms / Open Source",
      desc: "This repository contains templates of useful algorithms and data structures coded in C++ for use in competitive programming.",
      tags: ["C++", "Algorithms", "Data Structures", "Competitive Programming"],
      link: "https://github.com/LuchoBazz/cpp-algorithm-snippets"
    },
    {
      title: "LuchoBazz/xbitwise",
      type: "Rust Library / Open Source",
      desc: "A Rust library that extends the basic functionality of bitwise operations.",
      tags: ["Rust", "Bitwise Operations", "Bitwise", "Integer"],
      link: "https://github.com/LuchoBazz/xbitwise"
    }
  ];

  const internalTools = [
    {
      title: "Personal Toolkit",
      desc: "Collection of utilities and scripts for automation.",
      icon: <Wrench className="w-8 h-8" />,
      link: "https://luchobazz.github.io/personal-toolkit/docs/intro/",
      color: "bg-slate-600/10 dark:bg-slate-600/20",
      textColor: "text-slate-600 dark:text-slate-400"
    },
    {
      title: "Knowledge Core",
      desc: "My Knowledge Core Repo.",
      icon: <Brain className="w-8 h-8" />,
      link: "https://luchobazz.github.io/knowledge-core/docs/intro",
      color: "bg-indigo-500/10 dark:bg-indigo-500/20",
      textColor: "text-indigo-500"
    },
    {
      title: "Cpp Algorithm Snippets",
      desc: "Optimized repository of data structures and algorithms.",
      icon: <Library className="w-8 h-8" />,
      link: "https://luchobazz.github.io/cpp-algorithm-snippets/docs/intro/",
      color: "bg-orange-500/10 dark:bg-orange-500/20",
      textColor: "text-orange-500"
    }
  ];

  return (
    <Layout
      title="Home"
      description="Luis Miguel Báez - Computer Scientist"
    // noFooter={true}
    // wrapperClassName="homepage-wrapper"
    >
      <div className="min-h-screen transition-colors duration-300 bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 font-sans selection:bg-blue-200 dark:selection:bg-blue-900">

        {/* --- NAVBAR --- */}
        {/* <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-sm border-b border-slate-200 dark:border-slate-800' : 'bg-transparent'}`}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-lg flex items-center justify-center text-white font-mono font-bold text-xl shadow-lg shadow-indigo-500/30">
                  {`/>`}
                </div>
                <div>
                  <h1 className="font-bold text-lg leading-none tracking-tight">LuchoBazz</h1>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider">Systems and Computer Engineer at UNAL</span>
                </div>
              </div>

              <div className="flex items-center gap-8">
                <div className="hidden md:flex gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
                  <a href="#about" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">About Me</a>
                  <a href="#research" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Research</a>
                  <a href="#publications" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Publications</a>
                </div>
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
        </nav> */}

        {/* --- HERO SECTION --- */}
        <header className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold tracking-wider text-indigo-700 uppercase bg-indigo-50 dark:bg-indigo-900/30 dark:text-indigo-300 rounded-full border border-indigo-100 dark:border-indigo-800">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                </span>
                Open for Research Collaborations
              </div>

              <img
                src="https://i.ibb.co/ZpXwSFB7/serbia-1-removebg-preview.png"
                alt="Profile"
                className="w-32 h-auto mb-8 shadow-lg"
              />

              <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-tight text-slate-900 dark:text-white">
                Luis Miguel Báez <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-600">
                  Systems and Computer Engineer at UNAL.
                </span>
              </h1>

              <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-lg">
                I am a Systems and Computer Engineer at UNAL. I am also passionate about computer problem solving and competitive programming that I have been active in for the last 2.5 years.
              </p>

              <div className="flex flex-wrap gap-4">
                <a
                  className="px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold rounded-lg hover:opacity-90 transition-all flex items-center gap-2 shadow-xl shadow-slate-900/20"
                  href="https://github.com/LuchoBazz"
                  target="_blank"
                >
                  <Terminal size={18} />
                  View Projects / GitHub
                </a>
                <a
                  className="px-6 py-3 border border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 font-medium rounded-lg transition-all flex items-center gap-2"
                  href="https://orcid.org/0009-0008-7515-457X"
                  target="_blank"
                >
                  <BookOpen size={18} />
                  Publications
                </a>
              </div>

              {/* Stats Row */}
              <div className="pt-8 border-t border-slate-200 dark:border-slate-800 grid grid-cols-4 gap-4">
                {stats.map((stat, idx) => (
                  <div key={idx}>
                    <div className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</div>
                    <div className="text-xs text-slate-500 uppercase tracking-wide font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Abstract Visual Representation - CODE THEMED */}
            <div className="relative hidden lg:block h-[500px] w-full bg-slate-100 dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl group">
              <div className="absolute inset-0 bg-grid-slate-200 dark:bg-grid-slate-800 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]"></div>

              {/* Decorative glows */}
              <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-1/3 left-1/4 w-40 h-40 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-700"></div>

              <div className="absolute inset-0 flex items-center justify-center">
                {/* Mock Code Editor Window: Original styles intact */}
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-700 shadow-2xl w-3/4 max-w-sm transform -rotate-2 hover:rotate-0 transition-transform duration-500">

                  {/* Header */}
                  <div className="flex items-center justify-between mb-4 border-b border-slate-700 pb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="text-xs text-slate-400 font-mono">research_agent.py</div>
                  </div>

                  {/* Content: Font increased to text-xs */}
                  <div className="space-y-1 font-mono text-xs text-slate-300 overflow-x-auto">

                    {/* Imports */}
                    <div><span className="text-pink-400">from</span> dataclasses <span className="text-pink-400">import</span> dataclass, field</div>
                    <div><span className="text-pink-400">from</span> typing <span className="text-pink-400">import</span> List</div>
                    <br />

                    {/* Class Definition */}
                    <div><span className="text-yellow-300">@dataclass</span></div>
                    <div><span className="text-pink-400">class</span> <span className="text-yellow-300">ResearchAgent</span>:</div>

                    {/* Name */}
                    <div className="pl-4">
                      name: <span className="text-blue-400">str</span> = <span className="text-green-400">"Luis Miguel Báez"</span>
                    </div>

                    {/* Focus: Formatted across multiple lines */}
                    <div className="pl-4">
                      focus: <span className="text-blue-400">List</span>[<span className="text-blue-400">str</span>] = field(
                    </div>
                    <div className="pl-8">
                      default_factory=<span className="text-pink-400">lambda</span>: [
                    </div>
                    <div className="pl-12 text-green-400">"NLP", "RL", "Ethics"</div>
                    <div className="pl-8">])</div>

                    {/* Language */}
                    <div className="pl-4">
                      language: <span className="text-blue-400">str</span> = <span className="text-green-400">"Python"</span>
                    </div>

                    {/* Status */}
                    <div className="pl-4">
                      status: <span className="text-blue-400">str</span> = <span className="text-green-400">"Training..."</span>
                    </div>
                    <br />

                    {/* Method */}
                    <div className="pl-4">
                      <span className="text-pink-400">def</span> <span className="text-blue-300">__repr__</span>(self):
                    </div>
                    <div className="pl-8">
                      <span className="text-pink-400">return</span> (
                    </div>
                    <div className="pl-12 text-green-400">f"&lt;&#123;self.name&#125;\n"</div>
                    <div className="pl-12 text-green-400">f" Driving: &#123;self.focus&#125;\n"</div>
                    <div className="pl-12 text-green-400">f" Powered by &#123;self.language&#125;/&gt;"</div>
                    <div className="pl-8">)</div>

                    <div className="flex items-center gap-2 mt-4">
                      <div className="h-1 w-2 bg-white animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* --- RESEARCH AREAS --- */}
        {/* <section id="research" className="py-24 bg-white dark:bg-slate-900 transition-colors duration-300">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Research Areas</h2>
                <p className="text-slate-600 dark:text-slate-400 max-w-xl">
                  My research addresses fundamental problems in the scalability and security of modern computational systems.
                </p>
              </div>
              <a href="#" className="text-indigo-600 dark:text-indigo-400 font-semibold flex items-center gap-2 hover:gap-3 transition-all">
                View Lab <ArrowRight size={18} />
              </a>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {researchAreas.map((area, index) => (
                <div key={index} className="group relative bg-slate-50 dark:bg-slate-800/50 p-8 rounded-2xl hover:bg-white dark:hover:bg-slate-800 border border-slate-100 dark:border-slate-800 hover:border-indigo-200 dark:hover:border-indigo-800 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300">
                  <div className={`mb-6 p-3 rounded-lg bg-white dark:bg-slate-900 w-fit shadow-sm ring-1 ring-slate-200 dark:ring-slate-700 ${area.color}`}>
                    {area.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                    {area.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6">
                    {area.desc}
                  </p>
                  <ul className="space-y-2 mb-6">
                    {[1, 2].map((i) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-500">
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600"></div>
                        Paper under review {i}
                      </li>
                    ))}
                  </ul>
                  <span className="absolute bottom-8 right-8 text-slate-300 dark:text-slate-600 group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors">
                    <ArrowRight size={20} />
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section> */}

        {/* --- LATEST PUBLICATIONS --- */}
        <section id="publications" className="py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Featured Publications</h2>
            <div className="h-1 w-20 bg-indigo-600 mx-auto rounded-full"></div>
          </div>

          <div className="space-y-6">
            {publications.map((pub, index) => (
              <div key={index} className="group flex flex-col sm:flex-row gap-6 p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500/30 dark:hover:border-indigo-500/30 transition-all shadow-sm hover:shadow-md">
                <div className="sm:w-24 flex-shrink-0 flex flex-col justify-center items-center sm:items-start border-b sm:border-b-0 sm:border-r border-slate-100 dark:border-slate-800 pb-4 sm:pb-0">
                  <span className="text-3xl font-bold text-slate-200 dark:text-slate-700 group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors">
                    {pub.year}
                  </span>
                </div>
                <div className="flex-grow">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 uppercase tracking-wide">
                      {pub.type}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 leading-snug mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {pub.title}
                  </h3>
                  <div className="text-sm text-slate-600 dark:text-slate-400 font-mono text-xs mb-3">
                    {pub.journal}
                  </div>
                  <a href={pub.link} target="_blank" className="inline-flex items-center gap-1 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline">
                    View on Zenodo <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button className="px-8 py-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-full font-medium hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
              View DBLP / Google Scholar
            </button>
          </div>
        </section>

        {/* Experience Timeline */}
        <section id="experience" className={`py-20 ${isDark ? 'bg-slate-800/30' : 'bg-slate-100/50'}`}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-12 flex items-center gap-3">
              <Globe className="text-indigo-500" />
              Professional Timeline
            </h2>
            <div className="space-y-8">
              {experience.map((exp, index) => (
                <div key={index} className="relative pl-8 border-l-2 border-indigo-500/30">
                  <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 ${isDark ? 'bg-slate-900 border-indigo-500' : 'bg-white border-indigo-500'}`}></div>
                  <div className="mb-1 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <h3 className="text-lg font-bold">{exp.role}</h3>
                    <span className={`text-sm font-mono ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`}>{exp.period}</span>
                  </div>
                  <div className={`mb-2 font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{exp.company}</div>
                  <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{exp.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects/Papers */}
        <section id="projects" className="py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 flex items-center gap-3">
            <Code2 className="text-indigo-500" />
            Featured Projects
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div key={index} className={`flex flex-col h-full rounded-xl overflow-hidden border transition-all ${isDark ? 'bg-slate-900 border-slate-700 hover:border-indigo-500/50' : 'bg-white border-slate-200 hover:border-indigo-300'}`}>
                <div className="p-6 flex-1">
                  <div className="flex justify-between items-start mb-4">
                    <span className={`text-xs font-mono px-2 py-1 rounded ${isDark ? 'bg-slate-800 text-indigo-300' : 'bg-indigo-50 text-indigo-700'}`}>
                      {project.type}
                    </span>

                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Open example (opens in a new tab)"
                    >
                      <ExternalLink size={18} className="text-slate-400 hover:text-indigo-500 cursor-pointer" />
                    </a>
                  </div>
                  <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                  <p className={`text-sm mb-6 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    {project.desc}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tags.map((tag, i) => (
                      <span key={i} className={`text-xs font-mono px-2 py-1 rounded-md border ${isDark ? 'border-slate-700 text-slate-400' : 'border-slate-200 text-slate-500'}`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="tools" className="py-12 bg-slate-50 dark:bg-slate-950/50 border-y border-slate-200 dark:border-slate-800">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-10 text-center md:text-left">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2 justify-center md:justify-start">
                <Terminal size={24} className="text-slate-500" />
                Internal Tools
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-2 max-w-2xl">
                Resources and technical documentation maintained for internal and community use.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {internalTools.map((tool, index) => (
                <a
                  key={index}
                  href={tool.link}
                  target="_blank"
                  className="group block p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500 dark:hover:border-indigo-500 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className={`p-3 rounded-lg ${tool.color}`}>
                      <div className={tool.textColor}>
                        {tool.icon}
                      </div>
                    </div>
                    <ExternalLink size={16} className="text-slate-400 group-hover:text-indigo-500 transition-colors" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {tool.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {tool.desc}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* --- AWARDS & RECOGNITION (Compact) ---*/}
        <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute right-0 bottom-0 w-96 h-96 bg-indigo-600 rounded-full blur-3xl"></div>
            <div className="absolute left-0 top-0 w-64 h-64 bg-pink-600 rounded-full blur-3xl"></div>
          </div>

          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Awards</h2>
                <p className="text-slate-300 mb-8 leading-relaxed">
                  My experience includes awards and recognition from multiple institutions.
                </p>
                <div className="flex flex-wrap gap-4">
                  {["The 2021 ICPC South America-North Finals", "The 2021 ICPC Colombia - XXXV Maraton Nacional de Programacion ACIS REDIS", "2rd Place Ironhacks Competition 2018 Issued by RCODI Purdue University"].map((award, i) => (
                    <div key={i} className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
                      <Award size={16} className="text-yellow-400" />
                      <span className="text-sm font-medium">{award}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-sm">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-indigo-600 rounded-lg">
                    <Code2 size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Join the Lab</h3>
                    <p className="text-slate-300 text-sm mb-4">
                      We are looking for PhD students with strong experience in C++, CUDA, or formal testing.
                    </p>
                    <button className="text-indigo-400 font-medium hover:text-indigo-300 transition-colors flex items-center gap-2">
                      Apply Now <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- FOOTER --- */}
        {/* <footer className="py-12 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 text-center">
          <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-slate-500 text-sm">
              <p>© {new Date().getFullYear()} Luis Miguel Báez. Open Source MIT License.</p>
            </div>
            <div className="flex gap-6">
              {['GitHub', 'StackOverflow', 'LinkedIn', 'DBLP'].map((social) => (
                <a key={social} href="#" className="text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 text-sm font-medium transition-colors">
                  {social}
                </a>
              ))}
            </div>
          </div>
        </footer> */}

      </div>
    </Layout>
  );
}

export default function Home() {
  return <HomePage />;
}