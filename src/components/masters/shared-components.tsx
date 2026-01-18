import React, { useState } from 'react';
import { 
  Calendar, Clock, ExternalLink, AlertCircle, 
  ChevronDown, ChevronUp, CheckCircle, GraduationCap, 
  Globe, Banknote, Building2, BookOpen, ArrowRight, 
} from 'lucide-react';

// --- HELPER FUNCTIONS ---

export const extractDate = (dateStr: string) => {
  const match = dateStr.match(/\d{4}-\d{2}-\d{2}/);
  return match ? match[0] : null;
};

export const getDaysRemaining = (targetDateStr: string) => {
  const cleanDate = extractDate(targetDateStr);
  if (!cleanDate) return 0;
  
  const targetDate = new Date(cleanDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  targetDate.setHours(0, 0, 0, 0);
  
  // FIXED: Using .getTime() to avoid "The right-hand side of an arithmetic operation must be of type 'any', 'number', 'bigint' or an enum type"
  const diffTime = targetDate.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
};

export const formatFullDate = (dateStr: string) => {
  const cleanDate = extractDate(dateStr);
  if (!cleanDate) return dateStr;
  return new Date(cleanDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// --- SUB-COMPONENTS ---

export const Countdown = ({ days }: { days: number }) => {
  let colorClass = "text-indigo-600 bg-indigo-50 border-indigo-100";
  let text = `${days} days left`;

  if (days < 0) {
    colorClass = "text-gray-500 bg-gray-100 border-gray-200";
    text = "Deadline passed";
  } else if (days === 0) {
    colorClass = "text-red-600 bg-red-50 border-red-100 animate-pulse";
    text = "Deadline is today!";
  } else if (days <= 7) {
    colorClass = "text-white bg-blue-600 border-blue-700";
    text = `${days} days left - Urgent`;
  }

  return (
    <div className={`text-xs font-bold px-3 py-1 rounded-full border ${colorClass} inline-flex items-center gap-1.5`}>
      <Clock className="w-3.5 h-3.5" />
      {text}
    </div>
  );
};

export const TimelineItem = ({ stage, isLast }: { stage: any, isLast: boolean }) => {
  const daysLeft = getDaysRemaining(stage.deadline_date);
  const isPassed = daysLeft < 0;

  return (
    <div className="relative pl-8 sm:pl-10 pb-8 group">
      {!isLast && (
        <div className="absolute top-8 left-4 w-0.5 h-full bg-slate-200 -ml-[1px]"></div>
      )}
      <div className={`absolute left-0 top-1.5 w-8 h-8 rounded-full border-4 border-slate-50 shadow-sm flex items-center justify-center z-10 transition-colors duration-300 ${isPassed ? 'bg-slate-300' : 'bg-indigo-600'}`}>
        {isPassed ? <CheckCircle className="w-4 h-4 text-white" /> : <Calendar className="w-4 h-4 text-white" />}
      </div>
      <div className={`bg-white rounded-xl border border-slate-200 shadow-sm p-5 transition-all duration-200 hover:shadow-md hover:border-indigo-200 ${isPassed ? 'opacity-75 bg-slate-50' : ''}`}>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-4">
          <div>
            <h4 className="font-bold text-slate-800 text-lg">{stage.stage}</h4>
            <div className="text-sm text-blue-600 font-medium mt-1">{stage.applicant_type}</div>
          </div>
          <Countdown days={daysLeft} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div className="bg-slate-50 rounded-lg p-3 border border-slate-100">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Opens</span>
            <div className="text-slate-700 font-medium">{formatFullDate(stage.open_date)}</div>
          </div>
          <div className="bg-slate-50 rounded-lg p-3 border border-slate-100">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Deadline</span>
            <div className={`font-bold ${isPassed ? 'text-slate-600' : 'text-indigo-700'}`}>
              {formatFullDate(stage.deadline_date)}
            </div>
          </div>
        </div>
        {stage.requirements_notes && (
          <div className="flex items-start gap-2 text-sm text-slate-600 bg-blue-50/50 p-3 rounded-md mb-4 border border-blue-100/50">
            <AlertCircle className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
            <p>{stage.requirements_notes}</p>
          </div>
        )}
        {stage.step_urls && stage.step_urls.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {stage.step_urls.map((url: string, i: number) => (
              <a key={i} href={url} target="_blank" rel="noreferrer" className="inline-flex items-center text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors">
                Apply / View Details <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export const ProgramCard = ({ program }: { program: any }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mb-6 hover:shadow-lg transition-shadow duration-300">
      <div className="p-6 cursor-pointer border-b border-slate-100 bg-white" onClick={() => setIsOpen(!isOpen)}>
        <div className="flex justify-between items-start gap-4">
          <div className="flex gap-4 flex-1">
            <div className="hidden sm:flex bg-indigo-50 p-3 rounded-xl h-fit shrink-0">
              <GraduationCap className="w-8 h-8 text-indigo-600" />
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap gap-2 mb-2">
                {program.languages.map((lang: string, idx: number) => (
                  <span key={idx} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                    <Globe className="w-3 h-3 mr-1" />
                    {lang}
                  </span>
                ))}
              </div>
              <h3 className="font-bold text-slate-900 text-xl leading-tight mb-2">{program.program_name}</h3>
              <div className="flex items-center text-slate-500 text-sm mb-3">
                <Building2 className="w-4 h-4 mr-1.5" />
                {program.faculty_or_department}
              </div>
              <div className="flex flex-wrap gap-y-2 gap-x-4 text-sm text-slate-600">
                {program.website_urls.map((url: string, i: number) => (
                  <a key={i} href={url} target="_blank" rel="noreferrer" className="flex items-center text-blue-600 hover:text-blue-800 font-medium hover:underline" onClick={(e) => e.stopPropagation()}>
                    <ExternalLink className="w-3.5 h-3.5 mr-1" />
                    Official Website {program.website_urls.length > 1 ? i + 1 : ''}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <button className="text-slate-400 hover:text-slate-600">
            {isOpen ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="bg-slate-50/50">
          <div className="px-6 py-4 bg-indigo-50/30 border-b border-indigo-50 flex items-start sm:items-center gap-3 text-sm text-indigo-900">
            <Banknote className="w-5 h-5 text-indigo-500 shrink-0" />
            <span className="font-medium">{program.tuition_fees_approx}</span>
          </div>
          <div className="p-6">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Admission Timeline
            </h4>
            <div className="max-w-4xl">
              {program.admission_timeline.map((stage: any, idx: number) => (
                <TimelineItem key={idx} stage={stage} isLast={idx === program.admission_timeline.length - 1} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
