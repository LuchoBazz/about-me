import React, { useState, useEffect, useMemo } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { X, Info, Loader2, Globe, Sparkles, Map as MapIcon, Languages, Sun, Moon } from 'lucide-react';
import axios from 'axios';

// --- MAP UTILITIES (Projection and Native SVG Rendering) ---
// We implement a simple Mercator projection and GeoJSON conversion to SVG Path
// to avoid external dependencies like react-simple-maps or d3.

const MAP_WIDTH = 800;
const MAP_HEIGHT = 500;

const projectPoint = (lon, lat) => {
  // Simplified Mercator projection
  let x = (lon + 180) * (MAP_WIDTH / 360);
  
  // Convert latitude to radians and limit to avoid infinity at poles
  const latRad = Math.min(89, Math.max(-89, lat)) * (Math.PI / 180);
  const mercN = Math.log(Math.tan((Math.PI / 4) + (latRad / 2)));

  // Mercator projection: convert latitude (mercN) into the map's Y coordinate.
  let y = (MAP_HEIGHT / 2) - (MAP_WIDTH * mercN / (2 * Math.PI));
  
  return [x, y];
};

const createPathFromCoords = (coords) => {
  if (!coords || coords.length === 0) return "";
  
  // Coords is an array of points [lon, lat]
  const points = coords.map(pt => projectPoint(pt[0], pt[1]));
  
  if (points.length === 0) return "";

  let path = `M ${points[0][0]},${points[0][1]}`;
  for (let i = 1; i < points.length; i++) {
    path += ` L ${points[i][0]},${points[i][1]}`;
  }
  path += " Z";
  return path;
};

// --- MAIN COMPONENT ---
export default function CulturalExplorer() {
  const { siteConfig } = useDocusaurusContext();

  const [countries, setCountries] = useState([]);
  const [mapLoading, setMapLoading] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [fact, setFact] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [tooltipContent, setTooltipContent] = useState("");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [language, setLanguage] = useState("en");
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);

  // API Key Configuration
  const apiKey = (siteConfig.customFields?.geminiApiKey as string | undefined) ?? "";

  // Sync with the Docusaurus theme (same approach as src/pages/now.tsx)
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

  const toggleTheme = () => {
    const newTheme = isDark ? 'light' : 'dark';
    document.documentElement.dataset.theme = newTheme;
    setIsDark(!isDark);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const languages = {
    en: "English",
    es: "Spanish",
    de: "German",
    ru: "Russian"
  };

  // Load map data (GeoJSON)
  useEffect(() => {
    // We use a public low-resolution GeoJSON for better performance
    fetch("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson")
      .then(response => response.json())
      .then(data => {
        // Process GeoJSON to SVG paths once
        const paths = data.features.map((feature, index) => {
          const type = feature.geometry.type;
          const coords = feature.geometry.coordinates;
          let d = "";

          if (type === "Polygon") {
            // The first ring is the exterior
            d = createPathFromCoords(coords[0]);
          } else if (type === "MultiPolygon") {
            // Join all polygons
            d = coords.map(poly => createPathFromCoords(poly[0])).join(" ");
          }

          return {
            id: feature.id || index,
            name: feature.properties.name,
            d: d
          };
        }).filter(c => c.d.length > 0); // Filter invalid geometries

        setCountries(paths);
        setMapLoading(false);
      })
      .catch(err => {
        console.error("Error loading map:", err);
        setMapLoading(false);
      });
  }, []);

  const handleMouseMove = (event) => {
    // Update position only if a tooltip is active for performance
    if (tooltipContent) {
      setMousePosition({ x: event.clientX, y: event.clientY });
    }
  };

  const fetchCountryFact = async (countryName: string) => {
    setLoading(true);
    setFact("");
    setError("");
    
    try {
      const response = await axios.post(
        'https://xforce-serverless.vercel.app/api/apps/cultural-explorer',
        {
          countryName: countryName,
          language: languages[language] ?? "English",
        }
      );

      const generatedText = response.data.data;
      
      setFact(generatedText ? generatedText : "Sorry, I couldn't find a fun fact at this moment.");
      setLoading(false);

    } catch (err) {
      setError("There was a problem connecting with the virtual guide. Please try again.");
      setLoading(false);
    }
  };

  const handleCountryClick = (country) => {
    setSelectedCountry(country.name);
    fetchCountryFact(country.name);
  };

  const closeModal = () => {
    setSelectedCountry(null);
    setFact("");
    setError("");
  };

  return (
    <div className={isDark ? 'dark' : ''}>
      <div 
        className="min-h-screen bg-white text-slate-900 dark:bg-slate-900 dark:text-slate-100 font-sans overflow-hidden selection:bg-indigo-500 selection:text-white flex flex-col"
        onMouseMove={handleMouseMove}
      >
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-sm border-b border-slate-200 dark:border-slate-800' : 'bg-transparent'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
              <div className="flex items-center gap-4">
                <a href="/about-me/" className="text-stone-500 hover:text-stone-800 dark:text-stone-400 dark:hover:text-stone-200 transition-colors font-serif italic text-sm">
                  ← Back to Home
                </a>

                <div className="hidden sm:flex items-center gap-3">
                  <div className="p-2 bg-indigo-600 rounded-lg shadow-lg shadow-indigo-500/20">
                    <Globe className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-base md:text-lg font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
                      Cultural Explorer
                    </h3>
                  </div>
                </div>

                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors border border-transparent hover:border-slate-300 dark:hover:border-slate-700"
                  aria-label="Toggle Dark Mode"
                >
                  {isDark ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} className="text-slate-600" />}
                </button>
              </div>

              <div className="flex items-center gap-4">
                <div className="relative group">
                  <div className="flex items-center bg-white/70 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200 dark:border-slate-700 rounded-lg px-2 py-1.5 focus-within:border-indigo-500 transition-colors">
                    <Languages className="w-4 h-4 text-slate-500 dark:text-slate-400 mr-2" />
                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="bg-transparent text-sm text-slate-800 dark:text-slate-200 focus:outline-none cursor-pointer appearance-none pr-4"
                      style={{ backgroundImage: 'none' }}
                    >
                      <option value="en" className="bg-white dark:bg-slate-800">English</option>
                      <option value="es" className="bg-white dark:bg-slate-800">Español</option>
                      <option value="de" className="bg-white dark:bg-slate-800">Deutsch</option>
                      <option value="ru" className="bg-white dark:bg-slate-800">Русский</option>
                    </select>
                  </div>
                </div>

                <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-white/60 dark:bg-slate-800/50 backdrop-blur-sm rounded-full border border-slate-200 dark:border-slate-700">
                  <Sparkles className="w-4 h-4 text-yellow-400" />
                  <span className="text-xs font-medium text-slate-600 dark:text-slate-300">Powered by Gemini 2.5</span>
                </div>
              </div>
            </div>
          </div>
        </nav>

      {/* Custom Tooltip */}
      {tooltipContent && !selectedCountry && (
        <div 
          className="fixed z-50 pointer-events-none px-3 py-1.5 bg-slate-800 text-white text-sm rounded shadow-xl border border-slate-700 transform -translate-x-1/2 -translate-y-full mt-[-15px] whitespace-nowrap"
          style={{ left: mousePosition.x, top: mousePosition.y }}
        >
          {tooltipContent}
        </div>
      )}

      {/* Map Container */}
      <div className="flex-1 w-full h-full flex items-center justify-center bg-slate-900 pt-16 px-4 pb-4 overflow-hidden relative">
        {mapLoading ? (
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-10 h-10 text-indigo-500 animate-spin" />
            <p className="text-slate-400 text-sm animate-pulse">Loading world cartography...</p>
          </div>
        ) : (
          <div className="w-full h-full max-w-7xl flex items-center justify-center">
            {/* SVG MAP */}
            <svg 
              viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`} 
              className="w-full h-auto max-h-[80vh] drop-shadow-2xl"
              style={{ filter: 'drop-shadow(0 0 20px rgba(79, 70, 229, 0.1))' }}
            >
              <defs>
                <linearGradient id="oceanGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#0f172a" />
                  <stop offset="100%" stopColor="#1e293b" />
                </linearGradient>
              </defs>
              
              {/* Ocean Background (Optional, but gives context) */}
              <rect width={MAP_WIDTH} height={MAP_HEIGHT} fill="transparent" />

              {/* Countries */}
              <g className="transition-all duration-500 ease-in-out">
                {countries.map((country) => {
                   const isSelected = selectedCountry === country.name;
                   return (
                    <path
                      key={country.id}
                      d={country.d}
                      className={`
                        transition-all duration-300 ease-out cursor-pointer outline-none
                        ${isSelected ? 'fill-indigo-600 stroke-indigo-400 stroke-1' : 'fill-slate-800 stroke-slate-700 stroke-[0.5]'}
                        hover:fill-indigo-500 hover:stroke-indigo-300
                      `}
                      onMouseEnter={() => setTooltipContent(country.name)}
                      onMouseLeave={() => setTooltipContent("")}
                      onClick={() => handleCountryClick(country)}
                    />
                  );
                })}
              </g>
            </svg>
          </div>
        )}
      </div>

      {/* Floating Instructions */}
      {!selectedCountry && !mapLoading && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce opacity-70 pointer-events-none">
          <span className="text-sm text-slate-400 bg-slate-900/80 px-3 py-1 rounded-full backdrop-blur-sm">Click on a country</span>
          <MapIcon className="w-5 h-5 text-indigo-400" />
        </div>
      )}

      {/* Modal / Overlay */}
      {selectedCountry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm transition-all duration-300">
          <div className="absolute inset-0" onClick={closeModal}></div>

          <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
            
            <div className="h-24 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 relative">
              <button 
                onClick={closeModal}
                className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full backdrop-blur-md transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute -bottom-8 left-6">
                <div className="h-16 w-16 bg-slate-800 rounded-xl border-4 border-slate-900 flex items-center justify-center shadow-lg">
                  <span className="text-3xl animate-bounce">
                    🌍
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-10 px-6 pb-6">
              <h2 className="text-2xl font-bold text-white mb-1">
                {selectedCountry}
              </h2>
              <div className="flex items-center gap-2 mb-4">
                <span className="px-2 py-0.5 rounded text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  General Culture
                </span>
                {loading && (
                  <span className="text-xs text-slate-400 animate-pulse">
                    Consulting Gemini...
                  </span>
                )}
              </div>

              <div className="min-h-[100px] bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
                {loading ? (
                  <div className="flex flex-col items-center justify-center h-full gap-3 py-4">
                    <Loader2 className="w-8 h-8 text-indigo-400 animate-spin" />
                    <p className="text-sm text-slate-400">Discovering secrets...</p>
                  </div>
                ) : error ? (
                  <div className="text-center py-2">
                    <p className="text-red-400 text-sm mb-2">{error}</p>
                    <button 
                      onClick={() => fetchCountryFact(selectedCountry)}
                      className="text-xs text-indigo-300 hover:text-indigo-200 underline"
                    >
                      Try again
                    </button>
                  </div>
                ) : (
                  <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                    <div className="flex gap-3">
                      <Info className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-1" />
                      <p className="text-slate-300 leading-relaxed text-sm md:text-base">
                        {fact}
                      </p>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <button 
                        onClick={() => navigator.clipboard.writeText(`${selectedCountry}: ${fact}`)}
                        className="text-xs text-slate-500 hover:text-white transition-colors flex items-center gap-1 group"
                      >
                         <span className="group-hover:underline">Copy fact</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}