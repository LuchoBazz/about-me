import React from 'react';
import { Globe } from 'lucide-react';
import useBaseUrl from '@docusaurus/useBaseUrl';

import { Card } from '@site/src/components/ui/card';
import { cn } from '@site/src/lib/utils';
import { PageSection, SectionHeading } from './PageSection';
import { companyMonths, formatDateRange, formatDuration, positionMonths } from './experience';
import type { ExperienceCompany, ExperiencePosition } from './types';

function CompanyLogo({ company, logo }: Pick<ExperienceCompany, 'company' | 'logo'>) {
  const src = useBaseUrl(logo ?? '');

  return (
    <div
      aria-hidden={logo ? undefined : true}
      className={cn(
        'size-[var(--logo)] shrink-0 overflow-hidden rounded-lg border',
        logo ? 'bg-card' : 'bg-muted',
      )}
    >
      {logo && (
        <img
          src={src}
          alt={`${company} logo`}
          loading="lazy"
          decoding="async"
          className="size-full object-contain"
        />
      )}
    </div>
  );
}

function PositionDetails({ position, showDuration = true }: { position: ExperiencePosition; showDuration?: boolean }) {
  return (
    <>
      {position.employmentType && <p className="text-sm text-foreground">{position.employmentType}</p>}
      <p className="text-sm text-muted-foreground" suppressHydrationWarning>
        {formatDateRange(position)}
        {showDuration && ` · ${formatDuration(positionMonths(position))}`}
      </p>
      {position.location && <p className="text-sm text-muted-foreground">{position.location}</p>}
      <p className="mt-2 text-sm leading-relaxed text-foreground">{position.desc}</p>
    </>
  );
}

function MultiplePositions({ company, logo, positions }: ExperienceCompany) {
  return (
    <>
      <div className="flex gap-[var(--gap)]">
        <CompanyLogo company={company} logo={logo} />
        <div className="min-w-0 space-y-0.5">
          <h3 className="text-lg font-semibold leading-snug tracking-tight text-foreground">{company}</h3>
          <p className="text-sm text-foreground" suppressHydrationWarning>
            {formatDuration(companyMonths(positions))}
          </p>
        </div>
      </div>

      <ul className="mt-5">
        {positions.map((position, index) => {
          const isLast = index === positions.length - 1;
          return (
            <li key={`${position.role}-${position.start}`} className={cn('flex gap-[var(--gap)]', !isLast && 'pb-6')}>
              <div aria-hidden="true" className="relative flex w-[var(--logo)] shrink-0 justify-center">
                <span
                  className={cn(
                    'mt-[7px] size-2.5 rounded-full',
                    position.end ? 'bg-muted-foreground/50' : 'bg-primary-emphasis',
                  )}
                />
                {!isLast && (
                  <span className="absolute top-[23px] -bottom-px left-1/2 w-0.5 -translate-x-1/2 rounded-full bg-border" />
                )}
              </div>
              <div className="min-w-0 space-y-0.5">
                <h4 className="text-base font-semibold leading-6 tracking-tight text-foreground">{position.role}</h4>
                <PositionDetails position={position} showDuration={positions.length > 1} />
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}

interface ExperienceTimelineProps {
  experience: ExperienceCompany[];
}

export function ExperienceTimeline({ experience }: ExperienceTimelineProps) {
  return (
    <PageSection id="experience" headingId="experience-heading" tone="muted" width="narrow">
      <SectionHeading id="experience-heading" title="Professional Timeline" icon={Globe} />

      <Card className="gap-0 py-0 shadow-xs">
        <ul className="divide-y [--gap:0.75rem] [--logo:2.5rem] sm:[--gap:1rem] sm:[--logo:3rem]">
          {experience.map((entry) => (
            <li key={entry.company} className="px-4 py-5 sm:px-6 sm:py-6">
              <MultiplePositions {...entry} />
            </li>
          ))}
        </ul>
      </Card>
    </PageSection>
  );
}
