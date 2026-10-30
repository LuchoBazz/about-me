import React from 'react';
import {
  Cpu,
  Network,
  Shield,
  Terminal,
  BookOpen,
  Wrench,
  Brain,
  Library,
  Globe,
  CalendarClock,
  Sparkles,
  GraduationCap,
  Languages,
  Clock,
} from 'lucide-react';
import Layout from '@theme/Layout';

import { HeroSection, type HeroAction } from '@site/src/components/home/HeroSection';
import { PublicationsSection } from '@site/src/components/home/PublicationsSection';
import { ExperienceTimeline } from '@site/src/components/home/ExperienceTimeline';
import { LaunchedProjectsSection } from '@site/src/components/home/LaunchedProjectsSection';
import { FeaturedProjectsSection } from '@site/src/components/home/FeaturedProjectsSection';
import { SubpagesSection } from '@site/src/components/home/SubpagesSection';
import { AwardsSection } from '@site/src/components/home/AwardsSection';
import type {
  ExperienceCompany,
  FeaturedProject,
  LaunchedProject,
  Publication,
  Stat,
  Subpage,
} from '@site/src/components/home/types';

const calculateDuration = (startDate: string) => {
  const start = new Date(startDate);
  const now = new Date();
  let years = now.getFullYear() - start.getFullYear();
  let months = now.getMonth() - start.getMonth();

  if (now.getDate() < start.getDate()) {
    months--;
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  const parts = [];
  if (years > 0) parts.push(`${years} yr${years > 1 ? 's' : ''}`);
  if (months > 0) parts.push(`${months} mo${months > 1 ? 's' : ''}`);

  return parts.join(' ');
};

function HomePage() {
  // Sample data
  const stats: Stat[] = [
    { label: "Native", value: "🇪🇸Spanish" },
    { label: "B1+", value: "🇬🇧English" },
    { label: "Years of Exp.", value: `${calculateDuration('2021-07-01')}` },
  ];

  // Not rendered (the Research Areas section is hidden); kept for future use.
  const researchAreas = [
    {
      title: "Generative Artificial Intelligence",
      desc: "Research on efficient transformer architectures and hallucination reduction in LLMs.",
      icon: <Cpu className="w-6 h-6" />,
      color: "text-blue-500"
    },
    {
      title: "Distributed Systems",
      desc: "Design of fault-tolerant consensus protocols for large-scale cloud computing.",
      icon: <Network className="w-6 h-6" />,
      color: "text-emerald-500"
    },
    {
      title: "Cybersecurity & Privacy",
      desc: "Homomorphic encryption methods for secure processing of sensitive data.",
      icon: <Shield className="w-6 h-6" />,
      color: "text-purple-500"
    }
  ];

  const experience: ExperienceCompany[] = [
    {
      company: "Instaleap by 🥕 Instacart",
      logo: "https://github.com/user-attachments/assets/4418b5d2-13a0-4631-934e-1e6e84d3e8f3",
      positions: [
        {
          role: "Back-End Software Engineer",
          employmentType: "Full-time",
          start: "2022-10",
          desc: "Back-End Engineer."
        }
      ]
    },
    {
      company: "IBM",
      logo: "https://github.com/user-attachments/assets/291a78f5-45ce-4d20-acb8-9a14290c73a9",
      positions: [
        {
          role: "Back-End Software Engineer",
          employmentType: "Full-time",
          start: "2022-01",
          end: "2022-09",
          desc: "Backend Software Engineer + Integration."
        },
        {
          role: "Software Engineer Intern",
          employmentType: "Internship",
          start: "2021-07",
          end: "2021-12",
          desc: "Software Engineer Intern + Integration."
        }
      ]
    }
  ];

  const publications: Publication[] = [
    {
      year: 2025,
      title: "Quick Test CLI: A Cross‑Platform for Automated Testing in Competitive Programming",
      journal: "Github",
      type: "pre-print",
      link: "https://doi.org/10.5281/zenodo.17803503"
    },
    // {
    //   year: 2023,
    //   title: "Byzantine Fault Tolerance in Asynchronous Networks: A New Paradigm",
    //   journal: "ACM SIGCOMM",
    //   type: "Journal Article",
    //   link: "#"
    // },
    // {
    //   year: 2023,
    //   title: "Zero‑Knowledge Proofs for Scalable Blockchain Privacy",
    //   journal: "IEEE S&P (Oakland)",
    //   type: "Conference Paper",
    //   link: "#"
    // }
  ];

  const projects: FeaturedProject[] = [
    {
      title: "LuchoBazz/quicktest",
      type: "CLI / Open Source",
      desc: "Quick Test CLI: A Cross-Platform for Automated Testing in Competitive Programming",
      tags: ["Competitive Programming", "Stress Testing", "Comparative Testing", "Differential Testing", "Automated Testing", "Algorithm Validation", "Software Testing"],
      link: "https://github.com/LuchoBazz/quicktest"
    },
    {
      title: "LuchoBazz/cpp-algorithm-snippets",
      type: "Data Structures & Algorithms / Open Source",
      desc: "This repository contains templates of useful algorithms and data structures coded in C++ for use in competitive programming.",
      tags: ["C++", "Algorithms", "Data Structures", "Competitive Programming"],
      link: "https://github.com/LuchoBazz/cpp-algorithm-snippets"
    },
    {
      title: "LuchoBazz/xbitwise",
      type: "Rust Library / Open Source",
      desc: "A Rust library that extends the basic functionality of bitwise operations.",
      tags: ["Rust", "Bitwise Operations", "Bitwise", "Integer"],
      link: "https://github.com/LuchoBazz/xbitwise"
    }
  ];

  const subpages: Subpage[] = [
    {
      title: "Personal Toolkit",
      desc: "Collection of utilities and scripts for automation.",
      icon: Wrench,
      link: "https://luchobazz.github.io/personal-toolkit/docs/intro/",
    },
    {
      title: "Knowledge Core",
      desc: "My Knowledge Core Repo.",
      icon: Brain,
      link: "https://luchobazz.github.io/knowledge-core/docs/intro",
    },
    {
      title: "AI Handbook",
      desc: "Notes and guides about AI and Machine Learning.",
      icon: Cpu,
      link: "https://luchobazz.github.io/ai-handbook/docs/intro",
    },
    {
      title: "Cpp Algorithm Snippets",
      desc: "Optimized repository of data structures and algorithms.",
      icon: Library,
      link: "https://luchobazz.github.io/cpp-algorithm-snippets/docs/intro/",
    },
    {
      title: "Prompts Library",
      desc: "Collection of useful AI prompts and templates.",
      icon: Terminal,
      link: "https://luchobazz.github.io/knowledge-core/prompts/",
    },
    {
      title: "Cultural Explorer",
      desc: "Discover curious cultural facts with AI.",
      icon: Globe,
      link: "/about-me/apps/cultural-explorer/",
    },
    {
      title: "Daily Inspiration",
      desc: "Fragments of thought collected over time.",
      icon: Sparkles,
      link: "/about-me/apps/inspiration",
    },
    {
      title: "My English Grammar Path",
      desc: "My personal English learning journey from A1 to C2.",
      icon: Languages,
      link: "/about-me/languages/english/grammar-topics",
    },
    {
      title: "My English Common Phrases",
      desc: "My personal collection of common English phrases.",
      icon: BookOpen,
      link: "/about-me/languages/english/common-phrases",
    },
    // {
    //   title: "Christmas Tree",
    //   desc: "Interactive 3D Christmas tree experience.",
    //   icon: TreePine,
    //   link: "/about-me/apps/christmas",
    // },
    {
      title: "Phrasal Verb Master",
      desc: "Interactive tool to learn English phrasal verbs with definitions, examples, and grammar.",
      icon: GraduationCap,
      link: "/about-me/languages/english/phrasal-verb-master",
    },
    {
      title: "IELTS Master",
      desc: "Practice IELTS Academic Reading with AI-generated tests.",
      icon: BookOpen,
      link: "/about-me/languages/english/ielts-academic-reading",
    },
    {
      title: "Academic Word List Explorer",
      desc: "Interactive tool to explore essential academic vocabulary terms.",
      icon: BookOpen,
      link: "/about-me/languages/english/academic-word-list-explorer",
    },
    {
      title: "Vocabulary Builder",
      desc: "Master new words with synonyms, antonyms, and common collocations.",
      icon: BookOpen,
      link: "/about-me/languages/english/vocab-builder",
    },
    {
      title: "Life Calendar",
      desc: "Visualize your life in weeks.",
      icon: CalendarClock,
      link: "/about-me/apps/life-calendar",
    },
    {
      title: "Work Schedule Comparator",
      desc: "Compare work hours across countries and see how they affect your sleep.",
      icon: Clock,
      link: "/about-me/apps/work-schedule-comparator",
    },
  ];

  const launchedProjects: LaunchedProject[] = [
    {
      id: 1,
      title: "Quick Test CLI",
      description: "A cross-platform CLI tool for automated stress testing in competitive programming. Supports multiple languages and eliminates the need for complex testing scripts.",
      url: "https://luchobazz.github.io/quicktest/docs/intro",
      image: "https://raw.githubusercontent.com/LuchoBazz/quicktest/refs/heads/main/assets/logo/quicktest-512x512.png",
    },
    // {
    //   id: 2,
    //   title: "Taskon AI",
    //   description: "A comprehensive developer productivity suite featuring a wide array of tools and utilities designed to streamline software development workflows.",
    //   url: "#",
    //   image: "https://i.ibb.co/d0tDkbtH/logo-dark.png",
    // },
    // {
    //   id: 3,
    //   title: "Prompt Composer",
    //   description: "A centralized platform for storing and perfecting AI prompts. Organize your library and use AI-driven suggestions to improve prompt clarity and output quality.",
    //   url: "#",
    //   image: "https://i.ibb.co/XrxcM2nb/prompt-composer-logo.png",
    // },
  ];

  const awards = [
    "The 2021 ICPC South America-North Finals",
    "The 2021 ICPC Colombia - XXXV Maraton Nacional de Programacion ACIS REDIS",
    "2rd Place Ironhacks Competition 2018 Issued by RCODI Purdue University",
  ];

  const heroActions: HeroAction[] = [
    {
      label: "View Projects / GitHub",
      href: "https://github.com/LuchoBazz",
      icon: Terminal,
      variant: "default",
    },
    {
      label: "Publications",
      href: "https://orcid.org/0009-0008-7515-457X",
      icon: BookOpen,
      variant: "outline",
    },
  ];

  return (
    <Layout
      title="Home"
      description="Luis Miguel Báez - Computer Scientist"
    // noFooter={true}
    // wrapperClassName="homepage-wrapper"
    >
      <div className="portfolio-root min-h-screen bg-background font-sans text-foreground antialiased selection:bg-primary/30">
        <HeroSection
          status="Open for Research Collaborations"
          name="Luis Miguel Báez"
          headline="Systems and Computer Engineer at UNAL."
          bio={
            <>
              I am a <strong>Systems and Computer Engineer</strong> from the National University of Colombia (UNAL).
              {' '}
              I have experience working as a <strong>Software Engineer</strong> at high-growth startups and large tech companies. I specialize in backend development, high-scalability systems, and optimization.
            </>
          }
          actions={heroActions}
          stats={stats}
        />

        <PublicationsSection
          publications={publications}
          profileUrl="https://zenodo.org/search?q=metadata.creators.person_or_org.name%3A%22B%C3%A1ez%20Aponte%2C%20Luis%20Miguel%22&l=list&p=1&s=10&sort=mostviewed"
          profileLabel="View Luis Miguel Báez on Zenodo.org"
        />

        <ExperienceTimeline experience={experience} />

        <LaunchedProjectsSection projects={launchedProjects} />

        <FeaturedProjectsSection projects={projects} />

        <SubpagesSection subpages={subpages} />

        <AwardsSection awards={awards} nowPageUrl="/about-me/now" />
      </div>
    </Layout>
  );
}

export default function Home() {
  return <HomePage />;
}
