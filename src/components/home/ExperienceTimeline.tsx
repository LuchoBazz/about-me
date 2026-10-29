import React from 'react';
import { Globe } from 'lucide-react';

import { Badge } from '@site/src/components/ui/badge';
import { cn } from '@site/src/lib/utils';
import { PageSection, SectionHeading } from './PageSection';
import type { ExperienceItem } from './types';

interface ExperienceTimelineProps {
  experience: ExperienceItem[];
}

export function ExperienceTimeline({ experience }: ExperienceTimelineProps) {
  return (
    <PageSection id="experience" headingId="experience-heading" tone="muted" width="narrow">
      <SectionHeading id="experience-heading" title="Professional Timeline" icon={Globe} />

      <ol className="relative space-y-4 before:absolute before:top-2 before:bottom-2 before:left-[7px] before:w-px before:bg-gradient-to-b before:from-primary/60 before:via-border before:to-border">
        {experience.map((exp, index) => {
          const isCurrent = index === 0;
          return (
            <li key={`${exp.company}-${exp.period}`} className="relative pl-10">
              <span
                aria-hidden="true"
                className={cn(
                  'absolute top-7 left-0 flex size-[15px] items-center justify-center rounded-full border bg-background',
                  isCurrent && 'border-primary/50 shadow-[0_0_0_4px] shadow-primary/15',
                )}
              >
                <span
                  className={cn(
                    'size-[7px] rounded-full',
                    isCurrent ? 'bg-primary-emphasis' : 'bg-muted-foreground/40',
                  )}
                />
              </span>

              <div className="group rounded-xl border bg-card p-6 shadow-xs transition-all hover:border-primary/40 hover:shadow-glow">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                  <div className="space-y-1">
                    <h3 className="text-lg font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary-emphasis">{exp.role}</h3>
                    <p className="font-medium text-foreground/80">{exp.company}</p>
                  </div>
                  <Badge
                    variant="outline"
                    className="whitespace-normal font-mono text-[11px] font-normal text-muted-foreground sm:mt-1 sm:whitespace-nowrap"
                  >
                    {exp.period}
                  </Badge>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{exp.desc}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </PageSection>
  );
}
