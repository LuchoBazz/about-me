import React, { type ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import useBrokenLinks from '@docusaurus/useBrokenLinks';

import { cn } from '@site/src/lib/utils';

interface SectionHeadingProps {
  id: string;
  title: ReactNode;
  description?: ReactNode;
  icon?: LucideIcon;
  align?: 'start' | 'center';
}

export function SectionHeading({
  id,
  title,
  description,
  icon: Icon,
  align = 'start',
}: SectionHeadingProps) {
  const centered = align === 'center';

  return (
    <div className={cn('mb-10 md:mb-14', centered && 'mx-auto max-w-2xl text-center')}>
      {Icon && (
        <div
          className={cn(
            'mb-5 inline-flex size-10 items-center justify-center rounded-lg border border-primary/25 bg-primary/10 text-primary-emphasis shadow-xs',
            centered && 'mx-auto',
          )}
        >
          <Icon className="size-5" aria-hidden="true" />
        </div>
      )}
      <h2
        id={id}
        className="text-3xl font-semibold tracking-tight text-foreground text-balance md:text-4xl"
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            'mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground text-pretty',
            centered && 'mx-auto',
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}

interface PageSectionProps {
  id?: string;
  headingId: string;
  tone?: 'default' | 'muted';
  width?: 'default' | 'narrow';
  className?: string;
  children: ReactNode;
}

/** Consistent vertical rhythm, container width and optional tinted background. */
export function PageSection({
  id,
  headingId,
  tone = 'default',
  width = 'default',
  className,
  children,
}: PageSectionProps) {
  const brokenLinks = useBrokenLinks();
  if (id) brokenLinks.collectAnchor(id);

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={cn(
        'py-16 md:py-24',
        tone === 'muted' && 'border-y bg-muted/40 dark:bg-muted/30',
        className,
      )}
    >
      <div
        className={cn(
          'portfolio-reveal mx-auto px-4 sm:px-6 lg:px-8',
          width === 'narrow' ? 'max-w-4xl' : 'max-w-6xl',
        )}
      >
        {children}
      </div>
    </section>
  );
}
