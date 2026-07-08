import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Engineering Knowledge Base',
  tagline: 'Deep technical notes from years of certifications and real-world engineering.',
  favicon: 'img/favicon.ico',

  url: 'https://docs.oussamazbair.engineer',
  baseUrl: '/',

  onBrokenLinks: 'throw',

  // Moved from top-level to markdown.hooks (Docusaurus v4 migration)
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: '/',
          editUrl: 'https://github.com/oussama-zbair/oussama-zbair.github.io/tree/main/docs/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/og-image.png',

    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },

    navbar: {
      title: '',
      logo: {
        alt: 'Oussama Zbair — Knowledge Base',
        src: 'img/logo.svg',
        srcDark: 'img/logo-dark.svg',
        href: 'https://oussamazbair.engineer',
        target: '_self',
        width: 120,
        height: 36,
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'kb',
          position: 'left',
          label: 'Knowledge Base',
        },
        {
          href: 'https://oussamazbair.engineer',
          label: 'Portfolio',
          position: 'right',
        },
        {
          href: 'https://github.com/oussama-zbair',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },

    footer: {
      style: 'dark',
      links: [
        {
          title: 'Knowledge Base',
          items: [
            { label: 'Java Core',              to: '/java/java-core'                   },
            { label: 'Spring Boot',            to: '/java/spring-boot'                 },
            { label: 'AWS Cloud Practitioner', to: '/cloud/aws-cloud-practitioner'     },
            { label: 'Docker',                 to: '/devops/docker'                    },
            { label: 'Kubernetes',             to: '/devops/kubernetes'                },
          ],
        },
        {
          title: 'Connect',
          items: [
            { label: 'Portfolio', href: 'https://oussamazbair.engineer'               },
            { label: 'LinkedIn',  href: 'https://www.linkedin.com/in/oussama-zbair'   },
            { label: 'GitHub',    href: 'https://github.com/oussama-zbair'            },
            { label: 'Medium',    href: 'https://oussama-zbair.medium.com'            },
          ],
        },
      ],
      copyright: `© ${new Date().getFullYear()} Oussama Zbair — Personal Engineering Knowledge Base`,
    },

    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.oneDark,
      additionalLanguages: [
        'java', 'bash', 'yaml', 'json', 'docker',
        'sql', 'typescript', 'python', 'kotlin',
      ],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
