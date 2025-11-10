// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import { themes as prismThemes } from "prism-react-renderer";
const modulConfig = require("./modul.config");

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: modulConfig.title || "Unbenanntes Modul",
  tagline: modulConfig.tagline || "Tolles Modul!",
  url: modulConfig.url,
  baseUrl: `/${modulConfig.repoName}/`,
  onBrokenLinks: "log",
  favicon: "img/favicon.png",

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
    experimental_faster: true,
  },

  markdown: {
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: "warn",
    },
  },

  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: modulConfig.organizationName || "noname-corp", // Usually your GitHub org/user name.
  projectName: modulConfig.repoName, // Usually your repo name.

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "de",
    locales: ["de"],
  },

  themes: [require.resolve("@docusaurus/theme-mermaid")],

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: "./sidebars.js",
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: `${modulConfig.url}/${modulConfig.repoName}`,
          remarkPlugins: [],
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: "img/docusaurus-social-card.jpg",
      colorMode: {
        respectPrefersColorScheme: true,
      },
      mermaid: {
        theme: { light: "neutral", dark: "forest" },
      },
      navbar: {
        title: modulConfig.title,
        logo: {
          alt: "BBZBL Logo",
          src: "img/bbzbl-logo.png",
        },
        items: [
          {
            type: "doc",
            docId: "index",
            position: "left",
            label: "Unterlagen",
          },
          {
            href: `https://github.com/${modulConfig.organizationName}/${modulConfig.repoName}`,
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Docs",
            items: [
              {
                label: "Tutorial",
                to: "/docs/intro",
              },
            ],
          },
          {
            title: "Community",
            items: [
              {
                label: "Stack Overflow",
                href: "https://stackoverflow.com/questions/tagged/docusaurus",
              },
              {
                label: "Discord",
                href: "https://discordapp.com/invite/docusaurus",
              },
              {
                label: "X",
                href: "https://x.com/docusaurus",
              },
            ],
          },
          {
            title: "More",
            items: [
              {
                label: "Blog",
                to: "/blog",
              },
              {
                label: "GitHub",
                href: "https://github.com/facebook/docusaurus",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} BBZBL, Made with ❤️ in Pratteln`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ["java", "bash", "docker", "python"],
        magicComments: [
          // Remember to extend the default highlight class name as well!
          {
            className: "theme-code-block-highlighted-line",
            line: "highlight-next-line",
            block: { start: "highlight-start", end: "highlight-end" },
          },
          {
            className: "code-block-red-line",
            line: "highlight-red-next-line",
            block: { start: "highlight-red-start", end: "highlight-red-end" },
          },
          {
            className: "code-block-green-line",
            line: "highlight-green-next-line",
            block: {
              start: "highlight-green-start",
              end: "highlight-green-end",
            },
          },
          {
            className: "code-block-yellow-line",
            line: "highlight-yellow-next-line",
            block: {
              start: "highlight-yellow-start",
              end: "highlight-yellow-end",
            },
          },
          {
            className: "code-block-orange-line",
            line: "highlight-orange-next-line",
            block: {
              start: "highlight-orange-start",
              end: "highlight-orange-end",
            },
          },
          {
            className: "code-block-blue-line",
            line: "highlight-blue-next-line",
            block: { start: "highlight-blue-start", end: "highlight-blue-end" },
          },
        ],
      },
    }),
};

export default config;
