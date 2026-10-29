import React from 'react';
import { ArrowUpRight, Terminal } from 'lucide-react';

import { PageSection, SectionHeading } from './PageSection';
import type { Subpage } from './types';

interface SubpagesSectionProps {
  subpages: Subpage[];
}

export function SubpagesSection({ subpages }: SubpagesSectionProps) {
  return (
    <PageSection id="subpages" headingId="subpages-heading" tone="muted">
      <SectionHeading
        id="subpages-heading"
        title="Subpages"
        description="Resources and technical documentation maintained for internal and community use."
        icon={Terminal}
      />

      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {subpages.map(({ title, desc, icon: Icon, link }) => (
          <li key={title}>
            <a
              href={link}
              target="_self"
              className="group flex h-full items-start gap-4 rounded-xl border bg-card p-5 text-card-foreground shadow-xs outline-none transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-glow focus-visible:ring-[3px] focus-visible:ring-ring/50 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-primary/20 bg-primary/10 text-primary-emphasis transition-colors group-hover:border-primary/40 group-hover:bg-primary group-hover:text-primary-foreground">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary-emphasis">{title}</h3>
                  <ArrowUpRight
                    className="size-4 shrink-0 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary-emphasis"
                    aria-hidden="true"
                  />
                </div>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{desc}</p>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </PageSection>
  );
}
