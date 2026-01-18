import React, { useState } from 'react';
import { 
  School, BookOpen, ArrowRight, MapPin, LayoutGrid 
} from 'lucide-react';
import UniversityDetails from './university-details';

import { allUniversities } from './data';

const UniversityDashboard = ({ onSelectUniversity }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">University Admissions Dashboard</h1>
        <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-500">
          Track deadlines and requirements for Master's programs across Europe.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {allUniversities.map((uni) => (
          <div 
            key={uni.advising_context.target_university.replace(" ", "-").toLowerCase()} 
            onClick={() => onSelectUniversity(uni)}
            className="group bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col"
          >
            {/* Card Header Color */}
            <div className={`h-24 bg-blue-600 relative overflow-hidden`}>
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
              <School className="absolute bottom-4 left-4 text-white w-10 h-10 drop-shadow-md" />
            </div>

            {/* Card Body */}
            <div className="p-6 flex-1 flex flex-col">
              <h2 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                {uni.advising_context.target_university}
              </h2>
              
              <div className="flex items-center text-slate-500 text-sm mb-4">
                <MapPin className="w-4 h-4 mr-1" />
                {uni.advising_context.city}, {uni.advising_context.country}
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {uni.advising_context.fields.slice(0, 3).map((field, i) => (
                  <span key={i} className="px-2 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-md">
                    {field}
                  </span>
                ))}
                {uni.advising_context.fields.length > 3 && (
                  <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-md">
                    +{uni.advising_context.fields.length - 3}
                  </span>
                )}
              </div>

              <div className="mt-auto border-t border-slate-100 pt-4 flex items-center justify-between text-sm">
                <div className="flex items-center text-slate-500">
                   <BookOpen className="w-4 h-4 mr-1.5" />
                   {uni.programs.length} Programs
                </div>
                <div className="flex items-center text-blue-600 font-semibold group-hover:translate-x-1 transition-transform">
                  View Details <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function App() {
  const [currentView, setCurrentView] = useState('dashboard'); // 'dashboard' or 'details'
  const [selectedUniversity, setSelectedUniversity] = useState(null);

  const handleSelectUniversity = (university) => {
    setSelectedUniversity(university);
    setCurrentView('details');
    window.scrollTo(0, 0);
  };

  const handleBackToDashboard = () => {
    setSelectedUniversity(null);
    setCurrentView('dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Navbar Global */}
      <div className="bg-slate-900 text-white p-4 shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center gap-2 cursor-pointer" onClick={handleBackToDashboard}>
          <LayoutGrid className="w-6 h-6 text-blue-400" />
          <span className="font-bold text-lg tracking-tight">My University Tracker</span>
        </div>
      </div>

      {currentView === 'dashboard' ? (
        <UniversityDashboard onSelectUniversity={handleSelectUniversity} />
      ) : (
        <UniversityDetails data={selectedUniversity} onBack={handleBackToDashboard} />
      )}
    </div>
  );
}