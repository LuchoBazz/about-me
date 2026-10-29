import React from 'react';
import { ArrowRight, Award, CalendarClock } from 'lucide-react';

import { Button } from '@site/src/components/ui/button';
import { Card, CardDescription, CardFooter, CardHeader } from '@site/src/components/ui/card';
import { PageSection, SectionHeading } from './PageSection';

interface AwardsSectionProps {
  awards: string[];
  nowPageUrl: string;
}

export function AwardsSection({ awards, nowPageUrl }: AwardsSectionProps) {
  return (
    <PageSection headingId="awards-heading">
      <div className="grid items-start gap-12 md:grid-cols-[1.4fr_1fr] lg:gap-16">
        <div>
          <SectionHeading
            id="awards-heading"
            title="Awards"
            description="My experience includes awards and recognition from multiple institutions."
            icon={Award}
          />
          <ul className="divide-y rounded-xl border bg-card shadow-xs">
            {awards.map((award) => (
              <li key={award} className="flex items-start gap-3 px-5 py-4">
                <Award className="mt-0.5 size-4 shrink-0 text-highlight-emphasis" aria-hidden="true" />
                <span className="text-sm font-medium leading-relaxed text-foreground">{award}</span>
              </li>
            ))}
          </ul>
        </div>

        <Card className="border-primary/30 bg-gradient-to-br from-primary/10 via-card to-card shadow-glow md:mt-[4.5rem]">
          <CardHeader className="gap-4">
            <span className="flex size-10 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-glow">
              <CalendarClock className="size-5" aria-hidden="true" />
            </span>
            <h3 className="text-xl leading-none font-semibold tracking-tight">Now Page</h3>
            <CardDescription className="leading-relaxed">
              A snapshot of my current focus, projects, and priorities.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button asChild variant="default">
              <a href={nowPageUrl}>
                View Now Page
                <ArrowRight aria-hidden="true" />
              </a>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </PageSection>
  );
}
