import React, { useState, useEffect } from 'react';
import {
  Sun,
  Moon,
  Cpu,          // Cambiado de Microscope
  Network,      // Cambiado de Globe
  Shield,       // Cambiado de Users
  Terminal,     // Nuevo
  Award,
  BookOpen,
  Mail,
  ExternalLink,
  ArrowRight,
  GraduationCap,
  Code2
} from 'lucide-react';

const Home = () => {
  const [isDark, setIsDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Efecto para la sombra del navbar al hacer scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => setIsDark(!isDark);

  // Datos de ejemplo
  const stats = [
    { label: "Citas Totales", value: "3,100+" },
    { label: "h-index", value: "32" },
    { label: "Años de Exp.", value: "15" },
    { label: "Algoritmos", value: "12" }
  ];

  const researchAreas = [
    {
      title: "Inteligencia Artificial Generativa",
      desc: "Investigación en arquitecturas de transformers eficientes y reducción de alucinaciones en LLMs.",
      icon: <Cpu className="w-6 h-6" />,
      color: "text-blue-500"
    },
    {
      title: "Sistemas Distribuidos",
      desc: "Diseño de protocolos de consenso tolerantes a fallos para computación en la nube a gran escala.",
      icon: <Network className="w-6 h-6" />,
      color: "text-emerald-500"
    },
    {
      title: "Ciberseguridad & Privacidad",
      desc: "Métodos de encriptación homomórfica para el procesamiento seguro de datos sensibles.",
      icon: <Shield className="w-6 h-6" />,
      color: "text-purple-500"
    }
  ];

  const publications = [
    {
      year: 2024,
      title: "Optimizing Attention Mechanisms for Low-Resource Edge Devices",
      journal: "NeurIPS 2024",
      type: "Conference Paper",
      link: "#"
    },
    {
      year: 2023,
      title: "Byzantine Fault Tolerance in Asynchronous Networks: A New Paradigm",
      journal: "ACM SIGCOMM",
      type: "Journal Article",
      link: "#"
    },
    {
      year: 2023,
      title: "Zero-Knowledge Proofs for Scalable Blockchain Privacy",
      journal: "IEEE S&P (Oakland)",
      type: "Conference Paper",
      link: "#"
    }
  ];

  return (
    <div className={isDark ? "dark" : ""}>
      <div className="min-h-screen transition-colors duration-300 bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 font-sans selection:bg-blue-200 dark:selection:bg-blue-900">

        {/* --- NAVBAR --- */}
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-sm border-b border-slate-200 dark:border-slate-800' : 'bg-transparent'}`}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-lg flex items-center justify-center text-white font-mono font-bold text-xl shadow-lg shadow-indigo-500/30">
                  {`/>`}
                </div>
                <div>
                  <h1 className="font-bold text-lg leading-none tracking-tight">Luis Miguel Báez</h1>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider">Computer Scientist</span>
                </div>
              </div>

              <div className="flex items-center gap-8">
                <div className="hidden md:flex gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
                  <a href="#about" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Sobre mí</a>
                  <a href="#research" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Investigación</a>
                  <a href="#publications" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Publicaciones</a>
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
        </nav>

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

              <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-tight text-slate-900 dark:text-white">
                Arquitectura de Sistemas <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-600">
                  Inteligentes.
                </span>
              </h1>

              <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-lg">
                Explorando los límites de la computación distribuida y el aprendizaje automático. Construyendo algoritmos robustos para la próxima generación de infraestructuras digitales.
              </p>

              <div className="flex flex-wrap gap-4">
                <button className="px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold rounded-lg hover:opacity-90 transition-all flex items-center gap-2 shadow-xl shadow-slate-900/20">
                  <Terminal size={18} />
                  Ver Proyectos / GitHub
                </button>
                <button className="px-6 py-3 border border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 font-medium rounded-lg transition-all flex items-center gap-2">
                  <BookOpen size={18} />
                  Publicaciones
                </button>
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
                {/* Mock Code Editor Window */}
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-700 shadow-2xl w-3/4 max-w-sm transform -rotate-2 hover:rotate-0 transition-transform duration-500">
                  <div className="flex items-center justify-between mb-4 border-b border-slate-700 pb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="text-xs text-slate-400 font-mono">train_model.py</div>
                  </div>
                  <div className="space-y-2 font-mono text-xs">
                    <div className="text-pink-400">import <span className="text-white">torch</span></div>
                    <div className="text-pink-400">import <span className="text-white">neural_net</span> as <span className="text-blue-400">nn</span></div>
                    <br />
                    <div className="text-slate-400"># Configuración del modelo</div>
                    <div className="text-blue-300">class <span className="text-yellow-300">TransformerBlock</span>(nn.Module):</div>
                    <div className="pl-4 text-white">def <span className="text-blue-300">__init__</span>(self):</div>
                    <div className="pl-8 text-white">super().<span className="text-blue-300">__init__</span>()</div>
                    <div className="pl-8 text-white">self.attention = ...</div>
                    <br />
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
        <section id="research" className="py-24 bg-white dark:bg-slate-900 transition-colors duration-300">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Áreas de Investigación</h2>
                <p className="text-slate-600 dark:text-slate-400 max-w-xl">
                  Mi investigación aborda problemas fundamentales en la escalabilidad y seguridad de los sistemas computacionales modernos.
                </p>
              </div>
              <a href="#" className="text-indigo-600 dark:text-indigo-400 font-semibold flex items-center gap-2 hover:gap-3 transition-all">
                Ver Laboratorio <ArrowRight size={18} />
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
                        Paper en revisión {i}
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
        </section>

        {/* --- LATEST PUBLICATIONS --- */}
        <section id="publications" className="py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Publicaciones Destacadas</h2>
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
                  <a href={pub.link} className="inline-flex items-center gap-1 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline">
                    Ver en arXiv <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button className="px-8 py-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-full font-medium hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
              Ver DBLP / Google Scholar
            </button>
          </div>
        </section>

        {/* --- AWARDS & RECOGNITION (Compact) --- */}
        <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute right-0 bottom-0 w-96 h-96 bg-indigo-600 rounded-full blur-3xl"></div>
            <div className="absolute left-0 top-0 w-64 h-64 bg-pink-600 rounded-full blur-3xl"></div>
          </div>

          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Reconocimientos & Funding</h2>
                <p className="text-slate-300 mb-8 leading-relaxed">
                  Nuestra investigación en sistemas seguros y escalables cuenta con el respaldo de líderes de la industria y organismos gubernamentales.
                </p>
                <div className="flex flex-wrap gap-4">
                  {["Google Research Scholar", "NSF Career Award", "Best Paper NeurIPS '23"].map((award, i) => (
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
                    <h3 className="text-xl font-bold mb-2">Únete al Laboratorio</h3>
                    <p className="text-slate-300 text-sm mb-4">
                      Buscamos estudiantes de doctorado con sólida experiencia en C++, CUDA o pruebas formales.
                    </p>
                    <button className="text-indigo-400 font-medium hover:text-indigo-300 transition-colors flex items-center gap-2">
                      Aplicar ahora <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- FOOTER --- */}
        <footer className="py-12 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 text-center">
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
        </footer>

      </div>
    </div>
  );
};

export default Home;