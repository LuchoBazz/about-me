import React, { useEffect, useState } from 'react';
import { Code2, Terminal } from 'lucide-react';

import { cn } from '@site/src/lib/utils';
import type { CodeSlide } from './types';

/** Syntax palette driven by the `--code-*` CSS variables (the code window is always dark). */
const syntax = {
  keyword: 'text-code-keyword',
  fn: 'text-code-function',
  type: 'text-code-type',
  string: 'text-code-string',
  number: 'text-code-number',
  comment: 'text-code-comment',
} as const;

const slides: CodeSlide[] = [
  {
    id: 0,
    filename: "research_agent.py",
    language: "python",
    content: (
      <>
        {/* Imports */}
        <div><span className={syntax.keyword}>from</span> dataclasses <span className={syntax.keyword}>import</span> dataclass, field</div>
        <div><span className={syntax.keyword}>from</span> typing <span className={syntax.keyword}>import</span> List</div>
        <br />

        {/* Class Definition */}
        <div><span className={syntax.fn}>@dataclass</span></div>
        <div><span className={syntax.keyword}>class</span> <span className={syntax.fn}>ResearchAgent</span>:</div>

        {/* Name */}
        <div className="pl-4">
          name: <span className={syntax.type}>str</span> = <span className={syntax.string}>"Luis Miguel Báez"</span>
        </div>

        {/* Focus */}
        <div className="pl-4">
          focus: <span className={syntax.type}>List</span>[<span className={syntax.type}>str</span>] = field(
        </div>
        <div className="pl-8">
          default_factory=<span className={syntax.keyword}>lambda</span>: [
        </div>
        <div className={cn('pl-12', syntax.string)}>"NLP", "RL", "Ethics"</div>
        <div className="pl-8">])</div>

        {/* Language */}
        <div className="pl-4">
          language: <span className={syntax.type}>str</span> = <span className={syntax.string}>"Python"</span>
        </div>

        {/* Status */}
        <div className="pl-4">
          status: <span className={syntax.type}>str</span> = <span className={syntax.string}>"Training..."</span>
        </div>
        <br />

        {/* Method */}
        <div className="pl-4">
          <span className={syntax.keyword}>def</span> <span className={syntax.fn}>__repr__</span>(self):
        </div>
        <div className="pl-8">
          <span className={syntax.keyword}>return</span> (
        </div>
        <div className={cn('pl-12', syntax.string)}>f"&lt;&#123;self.name&#125;\n"</div>
        <div className={cn('pl-12', syntax.string)}>f" Driving: &#123;self.focus&#125;\n"</div>
        <div className={cn('pl-12', syntax.string)}>f" Powered by &#123;self.language&#125;/&gt;"</div>
        <div className="pl-8">)</div>
      </>
    ),
  },
  {
    id: 1,
    filename: "knapsack.cpp",
    language: "cpp",
    content: (
      <>
        {/* Headers */}
        <div><span className={syntax.keyword}>#include</span> <span className={syntax.string}>&lt;bits/stdc++.h&gt;</span></div>
        <div><span className={syntax.keyword}>using namespace</span> std;</div>
        <br />

        {/* Globals */}
        <div><span className={syntax.type}>vector</span>&lt;<span className={syntax.type}>int</span>&gt; weights, values;</div>
        <div><span className={syntax.type}>vector</span>&lt;<span className={syntax.type}>vector</span>&lt;<span className={syntax.type}>int</span>&gt;&gt; dp;</div>
        <br />

        {/* Recursive Function */}
        <div><span className={syntax.type}>int</span> <span className={syntax.fn}>go</span>(<span className={syntax.type}>int</span> i, <span className={syntax.type}>int</span> w) &#123;</div>
        <div className="pl-4">
          <span className={syntax.keyword}>if</span> (i &lt; <span className={syntax.number}>0</span> || w &lt;= <span className={syntax.number}>0</span>) <span className={syntax.keyword}>return</span> <span className={syntax.number}>0</span>;
        </div>
        <div className="pl-4">
          <span className={syntax.keyword}>if</span> (dp[i][w] != <span className={syntax.number}>-1</span>) <span className={syntax.keyword}>return</span> dp[i][w];
        </div>

        <div className="pl-4">
          <span className={syntax.type}>int</span> res = <span className={syntax.fn}>go</span>(i - <span className={syntax.number}>1</span>, w);
        </div>

        <div className="pl-4">
          <span className={syntax.keyword}>if</span> (weights[i] &lt;= w)
        </div>
        <div className="pl-8">
          res = <span className={syntax.fn}>max</span>(res, values[i] + <span className={syntax.fn}>go</span>(i - <span className={syntax.number}>1</span>, w - weights[i]));
        </div>

        <div className="pl-4">
          <span className={syntax.keyword}>return</span> dp[i][w] = res;
        </div>
        <div>&#125;</div>
        <br />

        {/* Main */}
        <div><span className={syntax.type}>int</span> <span className={syntax.fn}>main</span>() &#123;</div>
        <div className="pl-4">
          ios::<span className={syntax.fn}>sync_with_stdio</span>(<span className={syntax.keyword}>false</span>);
        </div>
        <div className="pl-4">
          cin.<span className={syntax.fn}>tie</span>(<span className={syntax.keyword}>nullptr</span>);
        </div>
        <div className={cn('pl-4', syntax.comment)}>// ... logic implementation</div>
        <div className="pl-4">
          cout &lt;&lt; <span className={syntax.fn}>go</span>(n - <span className={syntax.number}>1</span>, W) &lt;&lt; <span className={syntax.string}>'\n'</span>;
        </div>
        <div className="pl-4">
          <span className={syntax.keyword}>return</span> <span className={syntax.number}>0</span>;
        </div>
        <div>&#125;</div>
      </>
    ),
  },
];

const AUTOPLAY_MS = 6000;

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  return reduced;
}

export function CodeWindowCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (paused || reducedMotion) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [paused, reducedMotion]);

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Code samples"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className="relative hidden h-[540px] w-full select-none overflow-hidden rounded-2xl border bg-muted/50 bg-[image:var(--hero-glow)] lg:block"
    >
      {/* Subtle grid backdrop */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:28px_28px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]"
      />

      <div className="absolute inset-0 flex items-center justify-center">
        {slides.map((slide, index) => {
          const active = index === currentSlide;
          return (
            <div
              key={slide.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${slides.length}`}
              aria-hidden={!active}
              className={cn(
                'absolute w-[78%] max-w-sm rounded-xl border border-code-border bg-code p-4 shadow-2xl shadow-primary/25 ring-1 ring-black/5 transition-all duration-700 ease-out motion-reduce:transition-none',
                active ? 'z-10 translate-y-0 scale-100 opacity-100' : 'z-0 translate-y-3 scale-[0.97] opacity-0',
              )}
            >
              {/* Window header */}
              <div className="mb-4 flex items-center justify-between border-b border-code-border pb-3">
                <div className="flex items-center gap-1.5" aria-hidden="true">
                  <span className="size-2.5 rounded-full bg-code-dot-red/80" />
                  <span className="size-2.5 rounded-full bg-code-dot-amber/80" />
                  <span className="size-2.5 rounded-full bg-code-dot-green/80" />
                </div>
                <div className="flex items-center gap-2 font-mono text-xs text-code-muted">
                  {slide.language === 'python' ? (
                    <Terminal className="size-3" aria-hidden="true" />
                  ) : (
                    <Code2 className="size-3" aria-hidden="true" />
                  )}
                  {slide.filename}
                </div>
              </div>

              {/* Code */}
              <div className="h-[400px] space-y-1 overflow-x-auto font-mono text-xs leading-relaxed text-code-foreground">
                {slide.content}
                {active && (
                  <div className="mt-4 flex items-center gap-2" aria-hidden="true">
                    <div className="h-4 w-2 animate-pulse bg-highlight/80 motion-reduce:animate-none" />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Slide controls */}
      <div className="absolute inset-x-0 bottom-6 z-20 flex justify-center gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setCurrentSlide(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            aria-current={idx === currentSlide}
            className={cn(
              'h-1.5 cursor-pointer rounded-full transition-all duration-300 outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50',
              idx === currentSlide ? 'w-6 bg-primary-emphasis' : 'w-1.5 bg-foreground/25 hover:bg-primary-emphasis/60',
            )}
          />
        ))}
      </div>
    </div>
  );
}
