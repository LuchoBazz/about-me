import React, { useMemo, useRef, useState } from 'react';
import { Search, BookOpen, X, GraduationCap, ArrowRight, MessageCircle, Layers, Type, Settings } from 'lucide-react';

type PhrasalVerbMeaning = {
  context: string;
  definition: string;
  translation: string;
};

type PhrasalVerbTense = {
  name: string;
  en: string;
  es: string;
};

type PhrasalVerbGrammarDetail = {
  label: string;
  text: string;
  translation: string;
};

type PhrasalVerbData = {
  verb: string;
  translation: string;
  level: string;
  meanings: PhrasalVerbMeaning[];
  morphology: Record<string, string>;
  tenses: PhrasalVerbTense[];
  grammar: {
    type: string;
    details: PhrasalVerbGrammarDetail[];
  };
};

type ApiResponse = { data?: PhrasalVerbData };


type PhrasalVerbListItem = {
  verb: string;
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
};

const phrasalVerbsList = ([
  { "verb": "come in", "level": "A1" },
  { "verb": "get up", "level": "A1" },
  { "verb": "go out", "level": "A1" },
  { "verb": "sit down", "level": "A1" },
  { "verb": "stand up", "level": "A1" },
  { "verb": "wake up", "level": "A1" },
  { "verb": "clean up", "level": "A2" },
  { "verb": "come back", "level": "A2" },
  { "verb": "come on", "level": "A2" },
  { "verb": "eat out", "level": "A2" },
  { "verb": "fill in", "level": "A2" },
  { "verb": "find out", "level": "A2" },
  { "verb": "get back", "level": "A2" },
  { "verb": "get off", "level": "A2" },
  { "verb": "get on", "level": "A2" },
  { "verb": "give back", "level": "A2" },
  { "verb": "go away", "level": "A2" },
  { "verb": "go back", "level": "A2" },
  { "verb": "go out", "level": "A2" },
  { "verb": "grow up", "level": "A2" },
  { "verb": "lie down", "level": "A2" },
  { "verb": "look for", "level": "A2" },
  { "verb": "pick up", "level": "A2" },
  { "verb": "put on", "level": "A2" },
  { "verb": "sit down", "level": "A2" },
  { "verb": "take off", "level": "A2" },
  { "verb": "throw away", "level": "A2" },
  { "verb": "try on", "level": "A2" },
  { "verb": "turn off", "level": "A2" },
  { "verb": "turn on", "level": "A2" },
  { "verb": "write down", "level": "A2" },
  { "verb": "ask for", "level": "B1" },
  { "verb": "break down", "level": "B1" },
  { "verb": "bring back", "level": "B1" },
  { "verb": "call back", "level": "B1" },
  { "verb": "carry on", "level": "B1" },
  { "verb": "check in", "level": "B1" },
  { "verb": "check out", "level": "B1" },
  { "verb": "come along", "level": "B1" },
  { "verb": "come down", "level": "B1" },
  { "verb": "come from", "level": "B1" },
  { "verb": "come out", "level": "B1" },
  { "verb": "come round", "level": "B1" },
  { "verb": "cut off", "level": "B1" },
  { "verb": "deal with", "level": "B1" },
  { "verb": "fall over", "level": "B1" },
  { "verb": "fill up", "level": "B1" },
  { "verb": "get in", "level": "B1" },
  { "verb": "get into", "level": "B1" },
  { "verb": "get out", "level": "B1" },
  { "verb": "get out of", "level": "B1" },
  { "verb": "get together", "level": "B1" },
  { "verb": "give away", "level": "B1" },
  { "verb": "give up", "level": "B1" },
  { "verb": "go down", "level": "B1" },
  { "verb": "go off", "level": "B1" },
  { "verb": "go on", "level": "B1" },
  { "verb": "go up", "level": "B1" },
  { "verb": "hang up", "level": "B1" },
  { "verb": "hold on", "level": "B1" },
  { "verb": "keep in", "level": "B1" },
  { "verb": "keep on", "level": "B1" },
  { "verb": "keep up", "level": "B1" },
  { "verb": "knock down", "level": "B1" },
  { "verb": "look after", "level": "B1" },
  { "verb": "look at", "level": "B1" },
  { "verb": "look forward to", "level": "B1" },
  { "verb": "look out", "level": "B1" },
  { "verb": "look round", "level": "B1" },
  { "verb": "look up", "level": "B1" },
  { "verb": "move in", "level": "B1" },
  { "verb": "move out", "level": "B1" },
  { "verb": "pass on", "level": "B1" },
  { "verb": "pay back", "level": "B1" },
  { "verb": "plug in", "level": "B1" },
  { "verb": "put away", "level": "B1" },
  { "verb": "put back", "level": "B1" },
  { "verb": "put down", "level": "B1" },
  { "verb": "put off", "level": "B1" },
  { "verb": "put out", "level": "B1" },
  { "verb": "put up", "level": "B1" },
  { "verb": "ring back", "level": "B1" },
  { "verb": "run out", "level": "B1" },
  { "verb": "run out of", "level": "B1" },
  { "verb": "send back", "level": "B1" },
  { "verb": "set off", "level": "B1" },
  { "verb": "set up", "level": "B1" },
  { "verb": "shut down", "level": "B1" },
  { "verb": "sign up", "level": "B1" },
  { "verb": "sleep in", "level": "B1" },
  { "verb": "slow down", "level": "B1" },
  { "verb": "sort out", "level": "B1" },
  { "verb": "stay up", "level": "B1" },
  { "verb": "switch off", "level": "B1" },
  { "verb": "switch on", "level": "B1" },
  { "verb": "take away", "level": "B1" },
  { "verb": "take back", "level": "B1" },
  { "verb": "take out", "level": "B1" },
  { "verb": "take up", "level": "B1" },
  { "verb": "throw out", "level": "B1" },
  { "verb": "turn down", "level": "B1" },
  { "verb": "turn up", "level": "B1" },
  { "verb": "wash up", "level": "B1" },
  { "verb": "work out", "level": "B1" },
  { "verb": "account for", "level": "B2" },
  { "verb": "act up", "level": "B2" },
  { "verb": "add up", "level": "B2" },
  { "verb": "aim at", "level": "B2" },
  { "verb": "allow for", "level": "B2" },
  { "verb": "answer back", "level": "B2" },
  { "verb": "ask out", "level": "B2" },
  { "verb": "back down", "level": "B2" },
  { "verb": "back up", "level": "B2" },
  { "verb": "bank on", "level": "B2" },
  { "verb": "be down", "level": "B2" },
  { "verb": "be into", "level": "B2" },
  { "verb": "be off", "level": "B2" },
  { "verb": "be out", "level": "B2" },
  { "verb": "be over", "level": "B2" },
  { "verb": "be up", "level": "B2" },
  { "verb": "beat up", "level": "B2" },
  { "verb": "blend in", "level": "B2" },
  { "verb": "blow up", "level": "B2" },
  { "verb": "book up", "level": "B2" },
  { "verb": "break away", "level": "B2" },
  { "verb": "break in", "level": "B2" },
  { "verb": "break into", "level": "B2" },
  { "verb": "break off", "level": "B2" },
  { "verb": "break out", "level": "B2" },
  { "verb": "break up", "level": "B2" },
  { "verb": "brighten up", "level": "B2" },
  { "verb": "bring about", "level": "B2" },
  { "verb": "bring down", "level": "B2" },
  { "verb": "bring forward", "level": "B2" },
  { "verb": "bring in", "level": "B2" },
  { "verb": "bring out", "level": "B2" },
  { "verb": "bring up", "level": "B2" },
  { "verb": "brush up", "level": "B2" },
  { "verb": "build up", "level": "B2" },
  { "verb": "bump into", "level": "B2" },
  { "verb": "burn down", "level": "B2" },
  { "verb": "burst out", "level": "B2" },
  { "verb": "butt in", "level": "B2" },
  { "verb": "call for", "level": "B2" },
  { "verb": "call in", "level": "B2" },
  { "verb": "call off", "level": "B2" },
  { "verb": "call on", "level": "B2" },
  { "verb": "calm down", "level": "B2" },
  { "verb": "care for", "level": "B2" },
  { "verb": "carry out", "level": "B2" },
  { "verb": "catch on", "level": "B2" },
  { "verb": "catch up", "level": "B2" },
  { "verb": "cheat on", "level": "B2" },
  { "verb": "check up on", "level": "B2" },
  { "verb": "cheer up", "level": "B2" },
  { "verb": "chop up", "level": "B2" },
  { "verb": "clean out", "level": "B2" },
  { "verb": "clear up", "level": "B2" },
  { "verb": "close down", "level": "B2" },
  { "verb": "come across", "level": "B2" },
  { "verb": "come down with", "level": "B2" },
  { "verb": "come forward", "level": "B2" },
  { "verb": "come off", "level": "B2" },
  { "verb": "come over", "level": "B2" },
  { "verb": "come up", "level": "B2" },
  { "verb": "come up against", "level": "B2" },
  { "verb": "come up with", "level": "B2" },
  { "verb": "cool down", "level": "B2" },
  { "verb": "count on", "level": "B2" },
  { "verb": "cover up", "level": "B2" },
  { "verb": "crack down", "level": "B2" },
  { "verb": "cross out", "level": "B2" },
  { "verb": "cut back", "level": "B2" },
  { "verb": "cut down", "level": "B2" },
  { "verb": "cut out", "level": "B2" },
  { "verb": "die out", "level": "B2" },
  { "verb": "do up", "level": "B2" },
  { "verb": "do without", "level": "B2" },
  { "verb": "drag on", "level": "B2" },
  { "verb": "draw up", "level": "B2" },
  { "verb": "dress up", "level": "B2" },
  { "verb": "drink up", "level": "B2" },
  { "verb": "drive off", "level": "B2" },
  { "verb": "drop by", "level": "B2" },
  { "verb": "drop in", "level": "B2" },
  { "verb": "drop off", "level": "B2" },
  { "verb": "drop out", "level": "B2" },
  { "verb": "dry up", "level": "B2" },
  { "verb": "end up", "level": "B2" },
  { "verb": "face up to", "level": "B2" },
  { "verb": "fall apart", "level": "B2" },
  { "verb": "fall behind", "level": "B2" },
  { "verb": "fall for", "level": "B2" },
  { "verb": "fall out", "level": "B2" },
  { "verb": "fall through", "level": "B2" },
  { "verb": "feed up", "level": "B2" },
  { "verb": "feel up to", "level": "B2" },
  { "verb": "figure out", "level": "B2" },
  { "verb": "fit in", "level": "B2" },
  { "verb": "fix up", "level": "B2" },
  { "verb": "follow up", "level": "B2" },
  { "verb": "get across", "level": "B2" },
  { "verb": "get along", "level": "B2" },
  { "verb": "get at", "level": "B2" },
  { "verb": "get away", "level": "B2" },
  { "verb": "get away with", "level": "B2" },
  { "verb": "get by", "level": "B2" },
  { "verb": "get down", "level": "B2" },
  { "verb": "get over", "level": "B2" },
  { "verb": "get round", "level": "B2" },
  { "verb": "get through", "level": "B2" },
  { "verb": "get to", "level": "B2" },
  { "verb": "give in", "level": "B2" },
  { "verb": "give off", "level": "B2" },
  { "verb": "give out", "level": "B2" },
  { "verb": "go ahead", "level": "B2" },
  { "verb": "go along with", "level": "B2" },
  { "verb": "go for", "level": "B2" },
  { "verb": "go on with", "level": "B2" },
  { "verb": "go over", "level": "B2" },
  { "verb": "go through", "level": "B2" },
  { "verb": "go with", "level": "B2" },
  { "verb": "go without", "level": "B2" },
  { "verb": "grow apart", "level": "B2" },
  { "verb": "hand down", "level": "B2" },
  { "verb": "hand in", "level": "B2" },
  { "verb": "hand out", "level": "B2" },
  { "verb": "hang around", "level": "B2" },
  { "verb": "hang on", "level": "B2" },
  { "verb": "hang out", "level": "B2" },
  { "verb": "head for", "level": "B2" },
  { "verb": "hear from", "level": "B2" },
  { "verb": "heat up", "level": "B2" },
  { "verb": "hit it off", "level": "B2" },
  { "verb": "hold back", "level": "B2" },
  { "verb": "hold up", "level": "B2" },
  { "verb": "hook up", "level": "B2" },
  { "verb": "hurry up", "level": "B2" },
  { "verb": "join in", "level": "B2" },
  { "verb": "keep away", "level": "B2" },
  { "verb": "keep down", "level": "B2" },
  { "verb": "keep off", "level": "B2" },
  { "verb": "keep out", "level": "B2" },
  { "verb": "keep up with", "level": "B2" },
  { "verb": "kick off", "level": "B2" },
  { "verb": "knock out", "level": "B2" },
  { "verb": "lay off", "level": "B2" },
  { "verb": "lead to", "level": "B2" },
  { "verb": "leave out", "level": "B2" },
  { "verb": "let down", "level": "B2" },
  { "verb": "let off", "level": "B2" },
  { "verb": "let out", "level": "B2" },
  { "verb": "light up", "level": "B2" },
  { "verb": "line up", "level": "B2" },
  { "verb": "live on", "level": "B2" },
  { "verb": "live up to", "level": "B2" },
  { "verb": "lock up", "level": "B2" },
  { "verb": "look back", "level": "B2" },
  { "verb": "look down on", "level": "B2" },
  { "verb": "look in", "level": "B2" },
  { "verb": "look into", "level": "B2" },
  { "verb": "look over", "level": "B2" },
  { "verb": "look through", "level": "B2" },
  { "verb": "look up to", "level": "B2" },
  { "verb": "make for", "level": "B2" },
  { "verb": "make into", "level": "B2" },
  { "verb": "make off", "level": "B2" },
  { "verb": "make out", "level": "B2" },
  { "verb": "make up", "level": "B2" },
  { "verb": "make up for", "level": "B2" },
  { "verb": "mess up", "level": "B2" },
  { "verb": "miss out", "level": "B2" },
  { "verb": "mix up", "level": "B2" },
  { "verb": "name after", "level": "B2" },
  { "verb": "narrow down", "level": "B2" },
  { "verb": "nod off", "level": "B2" },
  { "verb": "note down", "level": "B2" },
  { "verb": "open up", "level": "B2" },
  { "verb": "opt out", "level": "B2" },
  { "verb": "own up", "level": "B2" },
  { "verb": "pack up", "level": "B2" },
  { "verb": "pass away", "level": "B2" },
  { "verb": "pass out", "level": "B2" },
  { "verb": "pay off", "level": "B2" },
  { "verb": "pick on", "level": "B2" },
  { "verb": "pick out", "level": "B2" },
  { "verb": "pile up", "level": "B2" },
  { "verb": "play down", "level": "B2" },
  { "verb": "point out", "level": "B2" },
  { "verb": "pop in", "level": "B2" },
  { "verb": "pour down", "level": "B2" },
  { "verb": "print out", "level": "B2" },
  { "verb": "pull down", "level": "B2" },
  { "verb": "pull in", "level": "B2" },
  { "verb": "pull off", "level": "B2" },
  { "verb": "pull out", "level": "B2" },
  { "verb": "pull over", "level": "B2" },
  { "verb": "put across", "level": "B2" },
  { "verb": "put aside", "level": "B2" },
  { "verb": "put forward", "level": "B2" },
  { "verb": "put through", "level": "B2" },
  { "verb": "put up with", "level": "B2" },
  { "verb": "read out", "level": "B2" },
  { "verb": "rely on", "level": "B2" },
  { "verb": "result in", "level": "B2" },
  { "verb": "rip off", "level": "B2" },
  { "verb": "rub out", "level": "B2" },
  { "verb": "rule out", "level": "B2" },
  { "verb": "run across", "level": "B2" },
  { "verb": "run away", "level": "B2" },
  { "verb": "run down", "level": "B2" },
  { "verb": "run into", "level": "B2" },
  { "verb": "run over", "level": "B2" },
  { "verb": "save up", "level": "B2" },
  { "verb": "see off", "level": "B2" },
  { "verb": "see through", "level": "B2" },
  { "verb": "sell out", "level": "B2" },
  { "verb": "send off", "level": "B2" },
  { "verb": "set out", "level": "B2" },
  { "verb": "settle down", "level": "B2" },
  { "verb": "show off", "level": "B2" },
  { "verb": "show up", "level": "B2" },
  { "verb": "shut up", "level": "B2" },
  { "verb": "sign in", "level": "B2" },
  { "verb": "sleep over", "level": "B2" },
  { "verb": "slip up", "level": "B2" },
  { "verb": "speak up", "level": "B2" },
  { "verb": "speed up", "level": "B2" },
  { "verb": "split up", "level": "B2" },
  { "verb": "stand by", "level": "B2" },
  { "verb": "stand for", "level": "B2" },
  { "verb": "stand out", "level": "B2" },
  { "verb": "start out", "level": "B2" },
  { "verb": "stay away", "level": "B2" },
  { "verb": "step down", "level": "B2" },
  { "verb": "stick to", "level": "B2" },
  { "verb": "stick up for", "level": "B2" },
  { "verb": "stop over", "level": "B2" },
  { "verb": "sum up", "level": "B2" },
  { "verb": "take after", "level": "B2" },
  { "verb": "take apart", "level": "B2" },
  { "verb": "take down", "level": "B2" },
  { "verb": "take in", "level": "B2" },
  { "verb": "take on", "level": "B2" },
  { "verb": "take over", "level": "B2" },
  { "verb": "take to", "level": "B2" },
  { "verb": "talk into", "level": "B2" },
  { "verb": "talk over", "level": "B2" },
  { "verb": "tear up", "level": "B2" },
  { "verb": "tell apart", "level": "B2" },
  { "verb": "tell off", "level": "B2" },
  { "verb": "think over", "level": "B2" },
  { "verb": "think up", "level": "B2" },
  { "verb": "throw up", "level": "B2" },
  { "verb": "tidy up", "level": "B2" },
  { "verb": "tire out", "level": "B2" },
  { "verb": "track down", "level": "B2" },
  { "verb": "try out", "level": "B2" },
  { "verb": "turn away", "level": "B2" },
  { "verb": "turn back", "level": "B2" },
  { "verb": "turn into", "level": "B2" },
  { "verb": "turn out", "level": "B2" },
  { "verb": "turn over", "level": "B2" },
  { "verb": "turn to", "level": "B2" },
  { "verb": "use up", "level": "B2" },
  { "verb": "walk out", "level": "B2" },
  { "verb": "warm up", "level": "B2" },
  { "verb": "watch out", "level": "B2" },
  { "verb": "wear off", "level": "B2" },
  { "verb": "wear out", "level": "B2" },
  { "verb": "wipe out", "level": "B2" },
  { "verb": "wrap up", "level": "B2" },
  { "verb": "write back", "level": "B2" },
  { "verb": "write off", "level": "B2" },
  { "verb": "zoom in", "level": "B2" }
] as PhrasalVerbListItem[]).sort((a, b) => {
  const levelOrder = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  const levelDiff = levelOrder.indexOf(a.level) - levelOrder.indexOf(b.level);
  if (levelDiff !== 0) return levelDiff;
  return a.verb.localeCompare(b.verb);
});

const API_URL = 'https://xforce-serverless.vercel.app/api/languages/english/phrasal-verb-master';

/**
 * Component: SearchBar
 * Input principal de búsqueda.
 */
const SearchBar = ({ searchTerm, setSearchTerm }: { searchTerm: string; setSearchTerm: (value: string) => void }) => (
  <div className="relative max-w-xl mx-auto mb-10 group">
    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
      <Search className="h-5 w-5 text-indigo-400 group-focus-within:text-indigo-600 transition-colors" />
    </div>
    <input
      type="text"
      className="block w-full pl-12 pr-4 py-4 border-2 border-indigo-50 rounded-2xl leading-5 bg-white placeholder-slate-400 text-slate-700 focus:outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50 transition-all duration-300 shadow-sm hover:shadow-md"
      placeholder="Search phrasal verbs (e.g., take off)..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  </div>
);

/**
 * Component: VerbCard
 * Tarjeta individual para cada verbo.
 */
const levelColor = (level: string) => {
  switch (level) {
    case 'A1': return 'bg-green-100 text-green-700';
    case 'A2': return 'bg-lime-100 text-lime-700';
    case 'B1': return 'bg-yellow-100 text-yellow-700';
    case 'B2': return 'bg-orange-100 text-orange-700';
    case 'C1': return 'bg-blue-100 text-blue-700';
    case 'C2': return 'bg-purple-100 text-purple-700';
    default: return 'bg-slate-100 text-slate-700';
  }
};

const VerbCard = ({ item, onClick }: { item: PhrasalVerbListItem; onClick: (verb: string) => void }) => (
  <div 
    onClick={() => onClick(item.verb)}
    className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 cursor-pointer hover:shadow-xl hover:-translate-y-1 hover:border-indigo-200 transition-all duration-300 group"
  >
    <div className="flex justify-between items-start mb-3">
      <h3 className="text-2xl font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
        {item.verb}
      </h3>
      <span className={`px-3 py-1 rounded-full text-xs font-bold ${levelColor(item.level)}`}>{item.level}</span>
    </div>
    <p className="text-slate-500 mb-4 font-medium">Click to load details</p>
    <div className="flex items-center text-indigo-500 text-sm font-semibold mt-auto">
      <span>Learn more</span>
      <ArrowRight className="h-4 w-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
    </div>
  </div>
);

/**
 * Component: Modal
 * Vista detallada con toda la información gramatical.
 */
const Modal = ({
  verbName,
  verbData,
  isLoading,
  error,
  onClose,
  onRetry,
}: {
  verbName: string | null;
  verbData: PhrasalVerbData | null;
  isLoading: boolean;
  error: string | null;
  onClose: () => void;
  onRetry: () => void;
}) => {
  if (!verbName) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
        style={{ animation: 'fadeIn 0.2s ease-out' }}
      ></div>

      {/* Modal Content */}
      <div 
        className="relative bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col"
        style={{ animation: 'modalPop 0.3s cubic-bezier(0.16, 1, 0.3, 1)' }}
      >
        <style>
          {`
            @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
            @keyframes modalPop { 
              from { opacity: 0; transform: scale(0.96) translateY(10px); } 
              to { opacity: 1; transform: scale(1) translateY(0); } 
            }
          `}
        </style>
        
        {/* Header (Sticky) */}
        <div className="sticky top-0 bg-white/90 backdrop-blur-md z-10 px-8 py-6 border-b border-slate-100 flex justify-between items-start">
          <div>
            <h2 className="text-4xl font-extrabold text-slate-800 tracking-tight">{verbData?.verb ?? verbName}</h2>
            <p className="text-lg text-indigo-600 font-medium mt-1">{verbData?.translation ?? (isLoading ? 'Loading…' : '')}</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-red-500 transition-colors focus:outline-none"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-8 space-y-8 bg-slate-50/50">

          {/* Loading / Error */}
          {(isLoading || error || !verbData) && (
            <section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              {isLoading && (
                <div className="text-slate-600">
                  <p className="font-semibold">Loading details…</p>
                  <p className="text-sm text-slate-400 mt-1">Fetching data from the API for “{verbName}”.</p>
                </div>
              )}

              {!isLoading && error && (
                <div className="text-slate-700">
                  <p className="font-semibold text-red-600">Could not load this phrasal verb.</p>
                  <p className="text-sm text-slate-500 mt-1">{error}</p>
                  <div className="mt-4 flex gap-3">
                    <button
                      onClick={onRetry}
                      className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors"
                    >
                      Retry
                    </button>
                    <button
                      onClick={onClose}
                      className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-semibold hover:bg-slate-200 transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
            </section>
          )}

          {!verbData ? null : (
            <>
          
          {/* Section 1: Meanings */}
          <section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <div className="flex items-center mb-4 text-indigo-600">
              <BookOpen className="h-6 w-6 mr-2" />
              <h3 className="text-xl font-bold uppercase tracking-wider text-xs">Meanings & Definitions</h3>
            </div>
            <div className="space-y-4">
              {verbData.meanings.map((meaning, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-indigo-100 transition-colors">
                  <div className="sm:w-32 flex-shrink-0">
                    <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 rounded-lg text-xs font-bold uppercase tracking-wide">
                      {meaning.context}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="text-slate-800 font-medium text-lg mb-1">{meaning.definition}</p>
                    <p className="text-slate-500 italic">{meaning.translation}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Section 2: Morphology */}
            <section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <div className="flex items-center mb-4 text-emerald-600">
                <Type className="h-6 w-6 mr-2" />
                <h3 className="text-xl font-bold uppercase tracking-wider text-xs">Morphology</h3>
              </div>
              <div className="space-y-3">
                {Object.entries(verbData.morphology).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center py-2 border-b border-slate-50 last:border-0">
                    <span className="text-slate-400 capitalize text-sm font-medium">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                    <span className="text-slate-800 font-bold">{String(value)}</span>
                  </div>
                ))}
              </div>
            </section>

             {/* Section 3: Grammar */}
             <section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <div className="flex items-center mb-4 text-orange-600">
                <Settings className="h-6 w-6 mr-2" />
                <h3 className="text-xl font-bold uppercase tracking-wider text-xs">Grammar Rules</h3>
              </div>
              
              <div className="mb-4">
                <span className="text-sm text-slate-400 font-medium uppercase">Type</span>
                <p className="text-lg font-bold text-slate-800">{verbData.grammar.type}</p>
              </div>

              <div className="space-y-3">
                {verbData.grammar.details.map((rule, idx) => (
                  <div key={idx} className="bg-orange-50 p-4 rounded-xl border border-orange-100">
                    <div className="flex items-start gap-3">
                      <div className="mt-1">
                        <div className="h-2 w-2 rounded-full bg-orange-400"></div>
                      </div>
                      <div>
                        <p className="text-slate-800 font-medium">{rule.text}</p>
                        <p className="text-slate-500 text-sm mt-1 italic">{rule.translation}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Section 4: Tenses & Usage */}
          <section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
             <div className="flex items-center mb-6 text-purple-600">
                <Layers className="h-6 w-6 mr-2" />
                <h3 className="text-xl font-bold uppercase tracking-wider text-xs">Tenses & Examples</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {verbData.tenses.map((tense, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-50 hover:bg-white hover:shadow-md border border-slate-100 transition-all duration-200">
                    <span className="text-xs font-bold text-purple-600 uppercase tracking-wide mb-2 block">
                      {tense.name}
                    </span>
                    <p className="text-slate-800 font-medium mb-1">{tense.en}</p>
                    <p className="text-slate-500 text-sm">{tense.es}</p>
                  </div>
                ))}
              </div>
          </section>

          </>
          )}

        </div>
      </div>
    </div>
  );
};

/**
 * Main Application Component
 */
const PhrasalVerbMaster = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedVerbName, setSelectedVerbName] = useState<string | null>(null);
  const [selectedVerbData, setSelectedVerbData] = useState<PhrasalVerbData | null>(null);
  const [isLoadingVerb, setIsLoadingVerb] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  const verbCacheRef = useRef<Map<string, PhrasalVerbData>>(new Map());
  const requestControllerRef = useRef<AbortController | null>(null);

  const fetchVerbDetails = async (verb: string) => {
    const normalized = verb.trim();
    if (!normalized) return;

    const cached = verbCacheRef.current.get(normalized.toLowerCase());
    if (cached) {
      setSelectedVerbData(cached);
      setLoadError(null);
      setIsLoadingVerb(false);
      return;
    }

    if (requestControllerRef.current) {
      requestControllerRef.current.abort();
    }

    const controller = new AbortController();
    requestControllerRef.current = controller;

    setIsLoadingVerb(true);
    setLoadError(null);
    setSelectedVerbData(null);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ verb: normalized }),
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status} ${response.statusText}`);
      }

      const json = (await response.json()) as ApiResponse;
      if (!json?.data) {
        throw new Error('Invalid API response: missing `data`.');
      }

      verbCacheRef.current.set(normalized.toLowerCase(), json.data);
      setSelectedVerbData(json.data);
    } catch (err) {
      if ((err as Error)?.name === 'AbortError') return;
      setLoadError((err as Error)?.message ?? 'Unknown error');
    } finally {
      setIsLoadingVerb(false);
    }
  };

  const openVerb = (verb: string) => {
    setSelectedVerbName(verb);
    fetchVerbDetails(verb);
  };

  const closeModal = () => {
    setSelectedVerbName(null);
    setSelectedVerbData(null);
    setIsLoadingVerb(false);
    setLoadError(null);
    if (requestControllerRef.current) {
      requestControllerRef.current.abort();
      requestControllerRef.current = null;
    }
  };

  // Filter logic
  const filteredVerbs = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return phrasalVerbsList;
    return phrasalVerbsList.filter((item) => item.verb.toLowerCase().includes(term));
  }, [searchTerm]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20">
      
      {/* Header Section */}
      <div className="bg-indigo-600 text-white pt-16 pb-24 px-6 rounded-b-[3rem] shadow-lg mb-[-3rem]">
        <div className="max-w-4xl mx-auto">
          {/* Back to Home Link */}
          <div className="mb-2">
            <a href="/about-me/" className="text-stone-200 hover:text-white dark:text-stone-300 dark:hover:text-white transition-colors font-serif italic text-sm">
              ← Back to Home
            </a>
          </div>
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-indigo-500 p-3 rounded-2xl shadow-inner">
                <GraduationCap className="h-10 w-10 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
              Phrasal Verb Master
            </h1>
            <p className="text-indigo-100 text-lg max-w-2xl mx-auto">
              Explore definitions, morphology, and usage examples to boost your English skills.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Search Bar Component */}
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        {/* Results Grid */}
        {filteredVerbs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVerbs.map((item) => (
              <VerbCard 
                key={item.verb}
                item={item}
                onClick={openVerb}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 opacity-60">
            <MessageCircle className="h-16 w-16 mx-auto mb-4 text-slate-300" />
            <p className="text-xl font-medium text-slate-500">No phrasal verbs found.</p>
            <p className="text-slate-400">Try searching for "take off" or "give up"</p>
          </div>
        )}
      </div>

      {/* Modal Overlay */}
      {selectedVerbName && (
        <Modal 
          verbName={selectedVerbName}
          verbData={selectedVerbData}
          isLoading={isLoadingVerb}
          error={loadError}
          onClose={closeModal}
          onRetry={() => {
            if (selectedVerbName) fetchVerbDetails(selectedVerbName);
          }}
        />
      )}
      
      {/* Footer */}
      <div className="mt-20 text-center text-slate-400 text-sm pb-8">
        <p>© {new Date().getFullYear()} Phrasal Verb Learning. Designed for Students.</p>
      </div>
    </div>
  );
};

export default PhrasalVerbMaster;