import React from 'react';
import { ArrowUpRight, BookOpen } from 'lucide-react';

import { Badge } from '@site/src/components/ui/badge';
import { Button } from '@site/src/components/ui/button';
import { Card } from '@site/src/components/ui/card';
import { PageSection, SectionHeading } from './PageSection';
import type { Publication } from './types';

interface PublicationsSectionProps {
  publications: Publication[];
  profileUrl: string;
  profileLabel: string;
}

export function PublicationsSection({ publications, profileUrl, profileLabel }: PublicationsSectionProps) {
  return (
    <PageSection id="publications" headingId="publications-heading" width="narrow">
      <SectionHeading
        id="publications-heading"
        title="Featured Publications"
        icon={BookOpen}
        align="center"
      />

      <ul className="space-y-4">
        {publications.map((pub) => (
          <li key={pub.title}>
            <Card className="group gap-0 py-0 transition-all hover:border-primary/40 hover:shadow-glow">
              <div className="flex flex-col gap-5 p-6 sm:flex-row sm:gap-8 sm:p-8">
                <div className="shrink-0 sm:border-r sm:pr-8">
                  <span className="font-mono text-2xl font-medium tabular-nums text-muted-foreground transition-colors group-hover:text-primary-emphasis">
                    {pub.year}
                  </span>
                </div>
                <div className="min-w-0 flex-1 space-y-3">
                  <Badge variant="secondary" className="border-primary/20 bg-primary/10 font-mono text-[11px] uppercase tracking-wider text-primary-emphasis">
                    {pub.type}
                  </Badge>
                  <h3 className="text-lg font-semibold leading-snug tracking-tight text-foreground text-pretty transition-colors group-hover:text-primary-emphasis">
                    {pub.title}
                  </h3>
                  <p className="font-mono text-xs text-muted-foreground">{pub.journal}</p>
                  <a
                    href={pub.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 rounded-sm text-sm font-medium text-primary-emphasis underline-offset-4 outline-none hover:underline focus-visible:ring-[3px] focus-visible:ring-ring/50"
                  >
                    View on Zenodo
                    <ArrowUpRight className="size-3.5" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </Card>
          </li>
        ))}
      </ul>

      <div className="mt-10 flex justify-center">
        <Button asChild variant="outline" size="lg" className="rounded-full border-primary/40 text-primary-emphasis hover:border-primary/60 hover:bg-primary/10 hover:text-primary-emphasis dark:border-primary/40 dark:hover:bg-primary/15">
          <a href={profileUrl} target="_blank" rel="noopener noreferrer">
            {profileLabel}
            <ArrowUpRight aria-hidden="true" />
          </a>
        </Button>
      </div>
    </PageSection>
  );
}
