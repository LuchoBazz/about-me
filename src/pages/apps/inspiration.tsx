import React from 'react';

import { InspirationSection } from '../components/InspirationSection';

export default function InspirationPage() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4">
      <a href="/about-me/" className="text-stone-500 hover:text-stone-800 dark:text-stone-400 dark:hover:text-stone-200 transition-colors font-serif italic text-sm">
        ← Back to Home
      </a>
      <InspirationSection />
    </main>
  );
}
