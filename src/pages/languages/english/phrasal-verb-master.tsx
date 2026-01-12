import React, { useState, useMemo } from 'react';
import { Search, BookOpen, X, ChevronRight, GraduationCap, ArrowRight, MessageCircle, Layers, Type, Clock, Settings } from 'lucide-react';

/**
 * MOCK DATA
 * Datos de los Phrasal Verbs incluyendo definiciones, morfología y ejemplos.
 */
const phrasalVerbsData = [
  {
    id: 1,
    verb: "take off",
    translation: "Despegar / Quitarse",
    level: "B1",
    meanings: [
      { context: "Aviation", definition: "To leave the ground and begin to fly.", translation: "Despegar" },
      { context: "Clothing", definition: "To remove a piece of clothing from one's body.", translation: "Quitarse (ropa)" },
      { context: "Success", definition: "To become successful or popular very suddenly.", translation: "Tener éxito repentino" }
    ],
    morphology: {
      infinitive: "To take off",
      thirdPerson: "Takes off",
      pastSimple: "Took off",
      pastParticiple: "Taken off",
      gerund: "Taking off"
    },
    tenses: [
      { name: "Present Simple", en: "The plane takes off at 8:00 AM.", es: "El avión despega a las 8:00 AM." },
      { name: "Present Continuous", en: "He is taking off his jacket now.", es: "Él se está quitando la chaqueta ahora." },
      { name: "Past Simple", en: "Her career finally took off last year.", es: "Su carrera finalmente despegó el año pasado." },
      { name: "Past Continuous", en: "I was taking off my shoes when the phone rang.", es: "Me estaba quitando los zapatos cuando sonó el teléfono." },
      { name: "Future (Will)", en: "I think the new product will take off soon.", es: "Creo que el nuevo producto tendrá éxito pronto." },
      { name: "Future (Going to)", en: "The flight is going to take off on time.", es: "El vuelo va a despegar a tiempo." },
      { name: "Present Perfect", en: "Have you taken off your hat?", es: "¿Te has quitado el sombrero?" },
      { name: "Past Perfect", en: "The plane had already taken off when I arrived.", es: "El avión ya había despegado cuando llegué." }
    ],
    grammar: {
      type: "Separable / Inseparable",
      details: [
        { label: "Separable", text: "Yes (for clothing): Take it off / Take off your coat.", translation: "Es separable (para ropa/objetos)." },
        { label: "Inseparable", text: "No (for aviation/success): The plane took off.", translation: "Es inseparable (para aviación/éxito)." }
      ]
    }
  },
  {
    id: 2,
    verb: "give up",
    translation: "Rendirse / Dejar de hacer algo",
    level: "B2",
    meanings: [
      { context: "Habits", definition: "To stop doing something you do regularly.", translation: "Dejar (un hábito)" },
      { context: "Defeat", definition: "To stop trying to do something because it is too difficult.", translation: "Rendirse" }
    ],
    morphology: {
      infinitive: "To give up",
      thirdPerson: "Gives up",
      pastSimple: "Gave up",
      pastParticiple: "Given up",
      gerund: "Giving up"
    },
    tenses: [
      { name: "Past Simple", en: "I gave up smoking last year.", es: "Dejé de fumar el año pasado." },
      { name: "Present Perfect", en: "She has given up all hope.", es: "Ella ha perdido (rendido) toda esperanza." }
    ],
    grammar: {
      type: "Separable",
      details: [
        { label: "Separable", text: "Yes: Give it up / Give up smoking.", translation: "Se puede separar." }
      ]
    }
  },
  {
    id: 3,
    verb: "look after",
    translation: "Cuidar de alguien/algo",
    level: "A2",
    meanings: [
      { context: "Care", definition: "To take care of or be in charge of someone or something.", translation: "Cuidar" }
    ],
    morphology: {
      infinitive: "To look after",
      thirdPerson: "Looks after",
      pastSimple: "Looked after",
      pastParticiple: "Looked after",
      gerund: "Looking after"
    },
    tenses: [
      { name: "Present Continuous", en: "I am looking after my sister's dog.", es: "Estoy cuidando al perro de mi hermana." }
    ],
    grammar: {
      type: "Inseparable",
      details: [
        { label: "Inseparable", text: "You must say 'Look after him', not 'Look him after'.", translation: "No se puede separar." }
      ]
    }
  }
];

/**
 * Component: SearchBar
 * Input principal de búsqueda.
 */
const SearchBar = ({ searchTerm, setSearchTerm }) => (
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
const VerbCard = ({ data, onClick }) => (
  <div 
    onClick={() => onClick(data)}
    className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 cursor-pointer hover:shadow-xl hover:-translate-y-1 hover:border-indigo-200 transition-all duration-300 group"
  >
    <div className="flex justify-between items-start mb-3">
      <h3 className="text-2xl font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
        {data.verb}
      </h3>
      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
        data.level === 'B1' ? 'bg-yellow-100 text-yellow-700' :
        data.level === 'B2' ? 'bg-orange-100 text-orange-700' :
        'bg-green-100 text-green-700'
      }`}>
        {data.level}
      </span>
    </div>
    <p className="text-slate-500 mb-4 font-medium">{data.translation}</p>
    
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
const Modal = ({ verb, onClose }) => {
  if (!verb) return null;

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
            <h2 className="text-4xl font-extrabold text-slate-800 tracking-tight">{verb.verb}</h2>
            <p className="text-lg text-indigo-600 font-medium mt-1">{verb.translation}</p>
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
          
          {/* Section 1: Meanings */}
          <section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <div className="flex items-center mb-4 text-indigo-600">
              <BookOpen className="h-6 w-6 mr-2" />
              <h3 className="text-xl font-bold uppercase tracking-wider text-xs">Meanings & Definitions</h3>
            </div>
            <div className="space-y-4">
              {verb.meanings.map((meaning, idx) => (
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
                {Object.entries(verb.morphology).map(([key, value]) => (
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
                <p className="text-lg font-bold text-slate-800">{verb.grammar.type}</p>
              </div>

              <div className="space-y-3">
                {verb.grammar.details.map((rule, idx) => (
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
                {verb.tenses.map((tense, idx) => (
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
  const [selectedVerb, setSelectedVerb] = useState(null);

  // Filter logic
  const filteredVerbs = useMemo(() => {
    return phrasalVerbsData.filter(item => 
      item.verb.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20">
      
      {/* Header Section */}
      <div className="bg-indigo-600 text-white pt-16 pb-24 px-6 rounded-b-[3rem] shadow-lg mb-[-3rem]">
        <div className="max-w-4xl mx-auto text-center">
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

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Search Bar Component */}
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        {/* Results Grid */}
        {filteredVerbs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVerbs.map(verb => (
              <VerbCard 
                key={verb.id} 
                data={verb} 
                onClick={setSelectedVerb} 
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
      {selectedVerb && (
        <Modal 
          verb={selectedVerb} 
          onClose={() => setSelectedVerb(null)} 
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