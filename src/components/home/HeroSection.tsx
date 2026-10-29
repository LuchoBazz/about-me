import React, { type ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';

import { Badge } from '@site/src/components/ui/badge';
import { Button } from '@site/src/components/ui/button';
import { CodeWindowCarousel } from './CodeWindowCarousel';
import type { Stat } from './types';

export interface HeroAction {
  label: string;
  href: string;
  icon: LucideIcon;
  variant: 'default' | 'outline';
}

interface HeroSectionProps {
  status: string;
  name: string;
  headline: string;
  bio: ReactNode;
  actions: HeroAction[];
  stats: Stat[];
}

export function HeroSection({ status, name, headline, bio, actions, stats }: HeroSectionProps) {
  return (
    <header className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[560px] bg-[image:var(--hero-glow)]"
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 pt-16 pb-20 sm:px-6 md:pt-24 md:pb-28 lg:grid-cols-[1.15fr_1fr] lg:gap-16 lg:px-8">
        <div className="portfolio-enter space-y-8">
          <Badge
            variant="outline"
            className="gap-2 rounded-full border-highlight/30 bg-highlight/10 px-3 py-1 text-xs font-medium text-foreground shadow-xs"
          >
            <span className="relative flex size-2" aria-hidden="true">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-highlight opacity-60 motion-reduce:animate-none" />
              <span className="relative inline-flex size-2 rounded-full bg-highlight" />
            </span>
            {status}
          </Badge>

          <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight text-foreground text-balance sm:text-5xl lg:text-[3.5rem]">
            {name} <br />
            <span className="bg-gradient-to-r from-primary-emphasis to-highlight-emphasis bg-clip-text text-transparent">{headline}</span>
          </h1>

          <p className="max-w-xl text-lg leading-relaxed text-muted-foreground text-pretty [&_strong]:font-medium [&_strong]:text-foreground">
            {bio}
          </p>

          <div className="flex flex-wrap gap-3">
            {actions.map(({ label, href, icon: Icon, variant }) => (
              <Button key={label} asChild size="lg" variant={variant} className={variant === 'default' ? 'shadow-glow' : undefined}>
                <a href={href} target="_blank" rel="noopener noreferrer">
                  <Icon aria-hidden="true" />
                  {label}
                </a>
              </Button>
            ))}
          </div>

          <dl className="grid grid-cols-3 divide-x rounded-xl border bg-card/70 shadow-xs backdrop-blur-sm">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col-reverse gap-1 px-4 py-4 sm:px-5">
                <dt className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                  {stat.label}
                </dt>
                <dd className="text-base font-semibold tracking-tight text-primary-emphasis sm:text-xl">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="portfolio-enter [animation-delay:150ms]">
          <CodeWindowCarousel />
        </div>
      </div>
    </header>
  );
}
