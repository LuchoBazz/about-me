import React, { useState, useMemo } from 'react';
import { Plane, MapPin, Calendar, Globe, X, Compass, Award } from 'lucide-react';
import Layout from '@theme/Layout';

/**
 * SHIELD COLLECTION (SVGs)
 * Note: In a real app, you could import these as separate .svg files.
 * Here they are defined as components to keep it in a single file.
 */

// FIX: Added default value className='' to avoid TS error
const ShieldBase = ({ children, color, className = '' }) => (
  <svg
    viewBox="0 0 100 120"
    className={`w-full h-full drop-shadow-sm ${className}`}
    style={{ color: color }}
    fill="currentColor"
  >
    {/* Base shield shape */}
    <path d="M50 115 C20 100 5 80 5 30 L50 5 L95 30 C95 80 80 100 50 115 Z" fill="none" stroke="currentColor" strokeWidth="3" />
    <path d="M50 110 C25 95 10 75 10 32 L50 10 L90 32 C90 75 75 95 50 110 Z" fill="currentColor" opacity="0.1" />
    {children}
  </svg>
);

const Shields = {
  Castle: ({ color }) => (
    <ShieldBase color={color}>
      <path d="M30 40 L30 80 L70 80 L70 40 L60 40 L60 50 L50 50 L50 40 L40 40 L40 50 L30 50 Z M30 30 L40 30 L40 20 L30 20 Z M60 30 L70 30 L70 20 L60 20 Z" />
      <path d="M45 65 A5 5 0 0 0 55 65 L55 80 L45 80 Z" fill="white" />
    </ShieldBase>
  ),
  FleurDeLis: ({ color }) => (
    <ShieldBase color={color}>
      <path d="M50 25 C60 25 65 35 65 45 C65 60 55 70 50 85 C45 70 35 60 35 45 C35 35 40 25 50 25 Z M50 25 L50 85" stroke="currentColor" strokeWidth="2" />
      <path d="M50 60 C65 60 80 50 80 35 C80 55 65 75 52 80 M50 60 C35 60 20 50 20 35 C20 55 35 75 48 80" fill="none" stroke="currentColor" strokeWidth="3" />
      <rect x="40" y="78" width="20" height="5" />
    </ShieldBase>
  ),
  Eagle: ({ color }) => (
    <ShieldBase color={color}>
      <path d="M20 40 Q50 20 80 40 Q90 30 85 20 Q50 30 15 20 Q10 30 20 40 Z" />
      <path d="M50 40 L50 90 L70 70 M50 90 L30 70" stroke="currentColor" strokeWidth="3" />
      <circle cx="50" cy="30" r="5" />
    </ShieldBase>
  ),
  Ship: ({ color }) => (
    <ShieldBase color={color}>
      <path d="M20 60 Q50 80 80 60 L80 50 L20 50 Z" />
      <line x1="50" y1="50" x2="50" y2="20" stroke="currentColor" strokeWidth="3" />
      <path d="M50 20 L80 35 L50 45 Z" fill="currentColor" opacity="0.6" />
      <path d="M15 70 Q50 85 85 70" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 2" />
    </ShieldBase>
  ),
  Lion: ({ color }) => (
    <ShieldBase color={color}>
      <circle cx="50" cy="45" r="15" />
      <path d="M35 45 L25 55 L35 75 L65 75 L75 55 L65 45" />
      <path d="M45 50 L55 50 L50 60 Z" fill="white" />
    </ShieldBase>
  ),
  Crown: ({ color }) => (
    <ShieldBase color={color}>
      <path d="M25 50 L25 30 L40 40 L50 25 L60 40 L75 30 L75 50 Z" />
      <rect x="25" y="52" width="50" height="10" rx="2" />
      <circle cx="50" cy="20" r="3" />
      <circle cx="25" cy="25" r="3" />
      <circle cx="75" cy="25" r="3" />
    </ShieldBase>
  ),
  Tower: ({ color }) => (
    <ShieldBase color={color}>
      <rect x="35" y="30" width="30" height="50" />
      <path d="M30 30 L40 20 L50 30 L60 20 L70 30 Z" />
      <path d="M45 60 A5 5 0 0 1 55 60 L55 80 L45 80 Z" fill="white" />
    </ShieldBase>
  ),
  Star: ({ color }) => (
    <ShieldBase color={color}>
      <path d="M50 25 L57 45 L78 45 L61 57 L67 78 L50 66 L33 78 L39 57 L22 45 L43 45 Z" />
    </ShieldBase>
  )
};

const visitedPlaces = [
  { id: 1, city: 'Cordoba', country: 'Argentina', date: '2023-07-30', color: '#7c2d12', icon: 'Tower', desc: 'History and culture in the heart of Argentina.' },
  { id: 2, city: 'Buenos Aires', country: 'Argentina', date: '2023-07-31', color: '#1e3a8a', icon: 'Eagle', desc: 'Tango, steak, and the vibrant streets of Palermo.' },
  { id: 3, city: 'Madrid', country: 'Spain', date: '2025-01-23', color: '#b91c1c', icon: 'Crown', desc: 'Returning to the vibrant energy of the Spanish capital.' },
  { id: 4, city: 'Valletta', country: 'Malta', date: '2025-01-26', color: '#c2410c', icon: 'Castle', desc: 'The fortress city, a masterpiece of the Baroque.' },
  { id: 5, city: 'Gzira', country: 'Malta', date: '2025-01-25', color: '#047857', icon: 'Ship', desc: 'Views of Manoel Island and the yacht marina.' },
  { id: 6, city: 'Sliema', country: 'Malta', date: '2025-01-25', color: '#0f172a', icon: 'Star', desc: 'Bustling promenade and rocky beaches.' },
  { id: 7, city: 'Rome', country: 'Italy', date: '2025-06-22', color: '#be185d', icon: 'Eagle', desc: 'The Eternal City. Pizza, pasta, and history.' },
  { id: 8, city: 'Vatican City', country: 'Vatican', date: '2025-06-23', color: '#d97706', icon: 'Crown', desc: 'St. Peter\'s Basilica and the heart of the Catholic Church.' },
  { id: 9, city: 'Milan', country: 'Italy', date: '2025-06-26', color: '#4338ca', icon: 'FleurDeLis', desc: 'Fashion capital and the magnificent Duomo.' },
  { id: 10, city: 'Belgrade', country: 'Serbia', date: '2025-08-09', color: '#b45309', icon: 'Castle', desc: 'Where the Sava meets the Danube.' },
  { id: 11, city: 'Novi Sad', country: 'Serbia', date: '2025-08-12', color: '#15803d', icon: 'Tower', desc: 'The Athens of Serbia, relaxed and charming.' },
  { id: 12, city: 'Budapest', country: 'Hungary', date: '2025-08-13', color: '#7f1d1d', icon: 'Crown', desc: 'The Pearl of the Danube. Thermal baths and ruin bars.' },
];

/**
 * UI COMPONENTS
 */

const Stamp = ({ place, onClick, style }) => {
  const IconComponent = Shields[place.icon] || Shields.Star;

  return (
    <div
      onClick={() => onClick(place)}
      className="group relative cursor-pointer transition-transform hover:scale-105 duration-300"
      style={style}
    >
      <div className="w-24 h-28 md:w-32 md:h-36 relative flex flex-col items-center justify-center p-2">
        {/* Poorly printed ink effect */}
        <div className="absolute inset-0 border-4 border-dashed opacity-30 rounded-lg"
          style={{ borderColor: place.color }}></div>

        {/* The Shield */}
        <div className="w-16 h-16 md:w-20 md:h-20 mb-1 opacity-90 mix-blend-multiply group-hover:opacity-100 transition-opacity">
          <IconComponent color={place.color} />
        </div>

        {/* Stamp text */}
        <div className="text-center">
          <span className="block font-serif font-bold text-xs uppercase tracking-wider opacity-80 mix-blend-multiply"
            style={{ color: place.color }}>
            {place.city}
          </span>
          <span className="block font-sans text-[10px] uppercase opacity-60"
            style={{ color: place.color }}>
            {place.date}
          </span>
        </div>
      </div>
    </div>
  );
};

const PassportDetails = ({ place, onClose }) => {
  if (!place) return null;
  const IconComponent = Shields[place.icon] || Shields.Star;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={onClose}>
      <div
        className="bg-[#fdfbf7] w-full max-w-md rounded-lg shadow-2xl overflow-hidden border border-stone-200 transform transition-all scale-100"
        onClick={e => e.stopPropagation()}
        style={{
          backgroundImage: 'radial-gradient(#e7e5e4 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}
      >
        {/* "Visa" Header */}
        <div className="bg-stone-800 text-stone-100 p-4 flex justify-between items-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="w-20 h-20 border-4 border-white rounded-full absolute -top-4 -right-4"></div>
            <div className="w-40 h-40 border border-white rounded-full absolute -bottom-10 -left-10"></div>
          </div>

          <div className="flex items-center gap-2 z-10">
            <Globe size={18} />
            <h3 className="font-mono text-lg tracking-widest uppercase">VISA ENTRY</h3>
          </div>
          <button onClick={onClose} className="hover:bg-stone-700 p-1 rounded-full z-10">
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 relative">
          {/* Large faded background stamp */}
          <div className="absolute right-4 bottom-4 w-40 h-40 opacity-5 pointer-events-none">
            <IconComponent color={place.color} />
          </div>

          <div className="flex gap-6">
            <div className="flex-shrink-0">
              <div className="w-24 h-24 rounded-full border-4 border-double border-stone-300 flex items-center justify-center bg-white shadow-inner">
                <div className="w-16 h-16">
                  <IconComponent color={place.color} />
                </div>
              </div>
            </div>

            <div className="flex-1 space-y-3">
              <div>
                <p className="text-xs text-stone-500 uppercase font-bold tracking-wider">City</p>
                <p className="font-serif text-2xl text-stone-800 font-bold">{place.city}</p>
              </div>

              <div>
                <p className="text-xs text-stone-500 uppercase font-bold tracking-wider">Country</p>
                <div className="flex items-center gap-2 text-stone-700 font-medium">
                  <MapPin size={14} />
                  {place.country}
                </div>
              </div>

              <div>
                <p className="text-xs text-stone-500 uppercase font-bold tracking-wider">Date</p>
                <div className="flex items-center gap-2 text-stone-700 font-mono text-sm">
                  <Calendar size={14} />
                  {place.date}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-stone-300 border-dashed">
            <p className="text-xs text-stone-500 uppercase font-bold tracking-wider mb-2">Traveler Notes</p>
            <p className="font-serif italic text-stone-700 leading-relaxed">
              "{place.desc}"
            </p>
          </div>
        </div>

        {/* Barcode style footer */}
        <div className="bg-stone-200 p-2 font-mono text-[10px] text-stone-500 overflow-hidden whitespace-nowrap tracking-[0.3em] opacity-60">
          P&lt;{place.country.substring(0, 3).toUpperCase()}{place.city.substring(0, 3).toUpperCase()}&lt;&lt;{place.id}2834723947&lt;&lt;&lt;
        </div>
      </div>
    </div>
  );
};

export default function TravelPassport() {
  const [selectedPlace, setSelectedPlace] = useState(null);

  // Generate random styles (rotation) only once to avoid jitter on render
  const stampsWithStyles = useMemo(() => {
    return visitedPlaces.map(place => ({
      ...place,
      style: {
        transform: `rotate(${Math.floor(Math.random() * 20) - 10}deg)`,
      }
    }));
  }, []);

  const uniqueCountries = new Set(visitedPlaces.map(place => place.country)).size;

  return (
    <Layout
      title="Travel Passport"
    >
      <div className="passport-wrapper">
        <nav className="absolute top-4 left-4 z-50">
          <a href="/about-me/" className="text-stone-500 hover:text-stone-800 dark:text-stone-400 dark:hover:text-stone-200 transition-colors font-serif italic text-sm">
            ← Back to Home
          </a>
        </nav>
        <div className="min-h-screen bg-stone-100 dark:bg-[#0f172a] py-8 px-4 font-sans selection:bg-amber-200 selection:text-amber-900">

          {/* Main Container (The Passport) */}
          <div className="max-w-5xl mx-auto bg-[#f4f1ea] rounded-[20px] shadow-2xl overflow-hidden min-h-[800px] flex flex-col md:flex-row relative">

            {/* Spine / Left Sidebar (User Info) */}
            <div className="bg-[#050817] text-[#a8a29e] w-full md:w-64 p-8 flex flex-col border-r-4 border-[#292524] relative shadow-[10px_0_20px_rgba(0,0,0,0.2)] z-10">
              <div className="mb-10 text-center">
                <div className="w-20 h-20 mx-auto border-2 border-[#a8a29e] rounded-full flex items-center justify-center mb-4">
                  <Plane size={32} />
                </div>
                <h1 className="font-serif text-base text-[#e7e5e4] tracking-widest uppercase mb-1">Passport</h1>
                <p className="text-xs tracking-[0.2em] opacity-60">CITIZEN OF THE WORLD</p>
              </div>

              <div className="space-y-6 flex-1">
                <div>
                  <p className="text-[10px] uppercase tracking-wider mb-1">Document No.</p>
                  <p className="font-mono text-sm text-white">BC-*******5</p>
                </div>

                <div>
                  <p className="text-[10px] uppercase tracking-wider mb-1">Stats</p>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <div className="bg-stone-800 p-2 rounded text-center">
                      <Award size={16} className="mx-auto mb-1 text-amber-600" />
                      <span className="block text-lg font-bold text-white">{visitedPlaces.length}</span>
                      <span className="text-[9px]">Cities</span>
                    </div>
                    <div className="bg-stone-800 p-2 rounded text-center">
                      <Compass size={16} className="mx-auto mb-1 text-blue-500" />
                      <span className="block text-lg font-bold text-white">{uniqueCountries}</span>
                      <span className="text-[9px]">Countries</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-auto pt-8 border-t border-stone-800 text-center">
                <p className="font-serif italic text-xs">"Travel is the only thing you buy that makes you richer."</p>
              </div>
            </div>

            {/* Stamps Page (Main Content) */}
            <div className="flex-1 p-8 md:p-12 relative overflow-hidden">
              {/* Subtle background texture */}
              <div className="absolute inset-0 opacity-40 pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(#d6d3d1 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>

              {/* Decorative coffee stain (Pure CSS) */}
              <div className="absolute top-10 right-20 w-32 h-32 rounded-full border-[12px] border-[#e7e5e4] opacity-40 blur-sm pointer-events-none mix-blend-multiply transform rotate-45"></div>

              <header className="mb-10 border-b-2 border-double border-stone-300 pb-4 flex justify-between items-end relative z-10">
                <div>
                  <h2 className="text-3xl font-serif text-stone-800 font-bold uppercase tracking-wide">Visas & Stamps</h2>
                  <p className="text-stone-500 text-sm mt-1 font-serif italic">Official Travel History</p>
                </div>
                <div className="hidden md:block text-right">
                  <p className="font-mono text-xs text-stone-400">PAGE 14-15</p>
                </div>
              </header>

              {/* Stamps Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8 relative z-10">
                {stampsWithStyles.map((place) => (
                  <Stamp
                    key={place.id}
                    place={place}
                    onClick={setSelectedPlace}
                    style={place.style}
                  />
                ))}

                {/* Empty space "coming soon" */}
                <div className="border-2 border-dashed border-stone-300 rounded-lg flex items-center justify-center min-h-[140px] opacity-50">
                  <span className="text-stone-400 font-serif italic text-sm text-center px-4">Next destination...</span>
                </div>
              </div>
            </div>
          </div>

          {/* Details Modal */}
          {selectedPlace && (
            <PassportDetails place={selectedPlace} onClose={() => setSelectedPlace(null)} />
          )}
        </div>
      </div>
    </Layout>
  );
}