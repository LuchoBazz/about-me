import React from 'react';
import { 
  Clock, 
  School, 
  AlertCircle, 
  ArrowLeft, 
} from 'lucide-react';
import { ProgramCard } from './shared-components';

const UniversityDetails = ({ data, onBack }) => {
  const { advising_context, programs } = data;

  return (
    <div className="min-h-screen bg-slate-50 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Top Navigation */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button 
            onClick={onBack}
            className="mb-4 flex items-center text-sm text-slate-500 hover:text-indigo-600 transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4 mr-1" /> Back to Dashboard
          </button>
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-xl shadow-sm ${data.image_color}`}>
                <School className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-2xl leading-none text-slate-900">{advising_context.target_university}</h1>
                <p className="text-sm text-slate-500 mt-1 flex items-center gap-2">
                   <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-600 font-medium">
                     {advising_context.search_year} Admissions
                   </span>
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-6 text-sm border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100">
              <div className="text-right hidden sm:block">
                <div className="text-slate-400 text-xs uppercase tracking-wider font-bold">Profile</div>
                <div className="font-semibold text-slate-700">{advising_context.target_student}</div>
              </div>
              <div className="text-right hidden sm:block pl-6 border-l border-slate-200">
                <div className="text-slate-400 text-xs uppercase tracking-wider font-bold">Location</div>
                <div className="font-semibold text-slate-700">{advising_context.city}, {advising_context.country}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Intro Text */}
        <div className="mb-8 p-4 bg-indigo-50 border border-indigo-100 rounded-lg flex items-start gap-3">
           <AlertCircle className="w-5 h-5 text-indigo-600 mt-0.5 shrink-0" />
           <p className="text-indigo-900">
             Showing admission timelines for fields: <span className="font-semibold"> {advising_context.fields.join(", ")}</span>.
           </p>
        </div>

        {/* Programs List */}
        <div className="space-y-6">
          {programs.map((program, index) => (
            <ProgramCard key={index} program={program} />
          ))}
        </div>

        {/* Footer info */}
        <div className="mt-12 text-center text-sm text-slate-400 pb-10 border-t border-slate-200 pt-8">
          <p className="flex items-center justify-center gap-2 mb-2">
            <Clock className="w-4 h-4" />
            Last checked: {data.last_checked}
          </p>
          <p>
            Timelines are subject to change. Always verify with the provided official links.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UniversityDetails;