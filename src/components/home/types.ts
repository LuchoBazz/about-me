import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';

export interface Stat {
  label: string;
  value: string;
}

export type EmploymentType = 'Full-time' | 'Part-time' | 'Contract' | 'Freelance' | 'Internship';

export interface ExperiencePosition {
  role: string;
  employmentType?: EmploymentType;
  /** Start month, formatted as `YYYY-MM`. */
  start: string;
  /** End month, formatted as `YYYY-MM`. Omit for a current ("Present") position. */
  end?: string;
  location?: string;
  desc: string;
}

export interface ExperienceCompany {
  company: string;
  /** Absolute URL or site path (e.g. `/img/logos/ibm.svg`). A neutral placeholder is shown when omitted. */
  logo?: string;
  /** Newest first. One position renders a single role; several render a grouped timeline. */
  positions: ExperiencePosition[];
}

export interface Publication {
  year: number;
  title: string;
  journal: string;
  type: string;
  link: string;
}

export interface FeaturedProject {
  title: string;
  type: string;
  desc: string;
  tags: string[];
  link: string;
}

export interface Subpage {
  title: string;
  desc: string;
  icon: LucideIcon;
  link: string;
}

export interface LaunchedProject {
  id: number;
  title: string;
  description: string;
  url: string;
  image?: string;
  icon?: LucideIcon;
}

export interface CodeSlide {
  id: number;
  filename: string;
  language: string;
  content: ReactNode;
}
