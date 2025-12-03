import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'About Me',
  tagline: 'Dinosaurs are cool',
  favicon: 'https://upload.wikimedia.org/wikipedia/commons/e/ef/Emoji_u263a.svg',

  // Set the production url of your site here
  url: 'https://luchobazz.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/about-me',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'LuchoBazz', // Usually your GitHub org/user name.
  projectName: 'about-me', // Usually your repo name.

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  themes: [],

  presets: [
    [
      'classic',
      {
        docs: false,
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'https://upload.wikimedia.org/wikipedia/commons/e/ef/Emoji_u263a.svg',
    navbar: {
      title: 'About Me',
      logo: {
        alt: 'About Me',
        src: 'https://upload.wikimedia.org/wikipedia/commons/e/ef/Emoji_u263a.svg',
      },
      items: [
        {
          href: '#publications',
          label: 'Publications',
          position: 'left',
        },
        {
          href: '#experience',
          label: 'Experience',
          position: 'left',
        },
        {
          href: '#projects',
          label: 'Projects',
          position: 'left',
        },
        {
          href: '#tools',
          label: 'Tools',
          position: 'left',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/docusaurus',
            },
            {
              label: 'Discord',
              href: 'https://discordapp.com/invite/docusaurus',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/docusaurus',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/LuchoBazz/',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} About Me, Inc. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['json', 'bash', 'go', 'sql']
    },
  } satisfies Preset.ThemeConfig,

  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.13.11/dist/katex.min.css',
      type: 'text/css',
      integrity:
        'sha384-R4568FtHfI8soGp3Q06NlKJZB5m9FjKO9db0pIh6K2dQqqzNppWAIYlEAdc8eA5p',
      crossorigin: 'anonymous',
    },
  ],
};

export default config;
