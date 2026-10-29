import React from 'react';
import { ArrowUpRight, Code2, Rocket } from 'lucide-react';

import { Card } from '@site/src/components/ui/card';
import { cn } from '@site/src/lib/utils';
import { PageSection, SectionHeading } from './PageSection';
import type { LaunchedProject } from './types';

function LaunchedProjectCard({ project }: { project: LaunchedProject }) {
  const Icon = project.icon;

  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block h-full rounded-xl outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
    >
      <Card className="h-full gap-0 py-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-primary/40 group-hover:shadow-glow motion-reduce:transition-none motion-reduce:group-hover:translate-y-0">
        <div className="flex aspect-[16/9] items-center justify-center rounded-t-xl border-b bg-muted/50 bg-[image:var(--hero-glow)]">
          {project.image ? (
            <img
              src={project.image}
              alt={project.title}
              loading="lazy"
              decoding="async"
              className="size-20 object-contain drop-shadow-sm transition-transform duration-300 group-hover:scale-105 motion-reduce:transition-none"
            />
          ) : Icon ? (
            <Icon className="size-14 text-primary-emphasis" strokeWidth={1.5} aria-hidden="true" />
          ) : null}
        </div>
        <div className="flex flex-1 flex-col gap-2 p-6">
          <h3 className="font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary-emphasis">{project.title}</h3>
          <p className="text-sm leading-relaxed text-muted-foreground">{project.description}</p>
          <span className="mt-auto inline-flex items-center gap-1 pt-3 text-xs font-medium uppercase tracking-wider text-primary-emphasis">
            <span>View</span>
            <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
          </span>
        </div>
      </Card>
    </a>
  );
}

const itemWidth = 'w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.667rem)]';

interface LaunchedProjectsSectionProps {
  projects: LaunchedProject[];
}

export function LaunchedProjectsSection({ projects }: LaunchedProjectsSectionProps) {
  return (
    <PageSection id="launched-projects" headingId="launched-projects-heading">
      <SectionHeading
        id="launched-projects-heading"
        title="Launched Projects"
        description="A selection of applications and tools I've built and deployed."
        icon={Rocket}
        align="center"
      />

      <ul className="flex flex-wrap justify-center gap-4">
        {projects.map((project) => (
          <li key={project.id} className={itemWidth}>
            <LaunchedProjectCard project={project} />
          </li>
        ))}

        <li
          aria-label="Coming soon"
          className={cn(
            itemWidth,
            'flex min-h-56 flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-primary/30 bg-primary/5 text-muted-foreground',
          )}
        >
          <Code2 className="size-8 opacity-40" aria-hidden="true" />
          <span className="text-xs font-medium">Coming soon...</span>
        </li>
      </ul>
    </PageSection>
  );
}
