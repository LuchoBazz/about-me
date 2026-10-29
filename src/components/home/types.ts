import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';

export interface Stat {
  label: string;
  value: string;
}

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  desc: string;
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
