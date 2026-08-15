import sitemap from "@astrojs/sitemap";
import svelte from "@astrojs/svelte";
import tailwind from "@astrojs/tailwind";
import { pluginCollapsibleSections } from "@expressive-code/plugin-collapsible-sections";
import { pluginLineNumbers } from "@expressive-code/plugin-line-numbers";
import swup from "@swup/astro";
import expressiveCode from "astro-expressive-code";
import icon from "astro-icon";
import { defineConfig } from "astro/config";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeComponents from "rehype-components";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import remarkDirective from "remark-directive";
import remarkGithubAdmonitionsToDirectives from "remark-github-admonitions-to-directives";
import remarkMath from "remark-math";
import remarkSectionize from "remark-sectionize";
import { expressiveCodeConfig } from "./src/config.ts";
import { pluginLanguageBadge } from "./src/plugins/expressive-code/language-badge.ts";
import { AdmonitionComponent } from "./src/plugins/rehype-component-admonition.mjs";
import { GithubCardComponent } from "./src/plugins/rehype-component-github-card.mjs";
import { parseDirectiveNode } from "./src/plugins/remark-directive-rehype.js";
import { remarkExcerpt } from "./src/plugins/remark-excerpt.js";
import { remarkReadingTime } from "./src/plugins/remark-reading-time.mjs";
import { pluginCustomCopyButton } from "./src/plugins/expressive-code/custom-copy-button.js";

export default defineConfig({
  site: "https://blog.thelittlequtegdh.top",
  base: "/",
  trailingSlash: "always",
  integrations: [
    tailwind({ nesting: true }),
    swup({
      theme: false,
      animationClass: "transition-swup-",
      containers: ["main", "#toc"],
      smoothScrolling: true,
      cache: true,
      preload: true,
      accessibility: true,
      updateHead: true,
      updateBodyClass: false,
      globalInstance: true,
    }),
    icon({
      include: {
        "preprocess: vitePreprocess(),": ["*"],
        "fa6-brands": ["*"],
        "fa6-regular": ["*"],
        "fa6-solid": ["*"],
      },
    }),
    expressiveCode({
      themes: [expressiveCodeConfig.theme, expressiveCodeConfig.theme],
      plugins: [
        pluginCollapsibleSections(),
        pluginLineNumbers(),
        pluginLanguageBadge(),
        pluginCustomCopyButton()
      ],
      defaultProps: {
        wrap: true,
        overridesByLang: {
          'shellsession': { showLineNumbers: false },
        },
      },
      styleOverrides: {
        codeBackground: "var(--codeblock-bg)",
        borderRadius: "0.75rem",
        borderColor: "none",
        codeFontSize: "0.875rem",
        codeFontFamily: "'JetBrains Mono Variable', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
        codeLineHeight: "1.5rem",
        frames: {
          editorBackground: "var(--codeblock-bg)",
          terminalBackground: "var(--codeblock-bg)",
          terminalTitlebarBackground: "var(--codeblock-topbar-bg)",
          editorTabBarBackground: "var(--codeblock-topbar-bg)",
          editorActiveTabBackground: "none",
          editorActiveTabIndicatorBottomColor: "var(--primary)",
          editorActiveTabIndicatorTopColor: "none",
          editorTabBarBorderBottomColor: "var(--codeblock-topbar-bg)",
          terminalTitlebarBorderBottomColor: "none"
        },
        textMarkers: {
          delHue: 0,
          insHue: 180,
          markHue: 250
        }
      },
      frames: {
        showCopyToClipboardButton: false,
      }
    }),
    svelte(),
    sitemap(),
    // 不再有 replaceDomainIntegration()
  ],
  markdown: { /* 保持不变 */ },
  vite: { /* 保持不变 */ },
});
