import React from 'react';
import { ArrowUpRight, Code2 } from 'lucide-react';

import { Badge } from '@site/src/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '@site/src/components/ui/card';
import { PageSection, SectionHeading } from './PageSection';
import type { FeaturedProject } from './types';

interface FeaturedProjectsSectionProps {
  projects: FeaturedProject[];
}

export function FeaturedProjectsSection({ projects }: FeaturedProjectsSectionProps) {
  return (
    <PageSection id="projects" headingId="projects-heading">
      <SectionHeading id="projects-heading" title="Featured Projects" icon={Code2} />

      <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <li key={project.title}>
            <Card className="group relative h-full transition-all hover:border-primary/40 hover:shadow-glow">
              <CardHeader className="gap-4">
                <div className="flex items-start justify-between gap-4">
                  <Badge variant="secondary" className="whitespace-normal border-highlight/30 bg-highlight/10 font-mono text-[11px] font-normal text-highlight-emphasis">
                    {project.type}
                  </Badge>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Open example (opens in a new tab)"
                    className="rounded-md text-muted-foreground outline-none transition-colors after:absolute after:inset-0 after:rounded-xl group-hover:text-primary-emphasis focus-visible:ring-[3px] focus-visible:ring-ring/50"
                  >
                    <ArrowUpRight className="size-5" aria-hidden="true" />
                  </a>
                </div>
                <h3 className="break-words text-lg font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary-emphasis">
                  {project.title}
                </h3>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-sm leading-relaxed text-muted-foreground">{project.desc}</p>
              </CardContent>
              <CardFooter>
                <ul className="flex flex-wrap gap-1.5" aria-label="Tags">
                  {project.tags.map((tag) => (
                    <li key={tag}>
                      <Badge variant="outline" className="font-mono text-[11px] font-normal text-muted-foreground">
                        {tag}
                      </Badge>
                    </li>
                  ))}
                </ul>
              </CardFooter>
            </Card>
          </li>
        ))}
      </ul>
    </PageSection>
  );
}
