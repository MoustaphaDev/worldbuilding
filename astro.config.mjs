import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), mdx(), sitemap()],
  markdown: {
    rehypePlugins: [
      [
        rehypeAutolinkHeadings,
        {
          behavior: "append",
        },
      ],
    ],
    remarkPlugins: [setFallbackLayout],
    extendPlugins: true,
  },
  vite: {
    ssr: {
      external: ["svgo"],
    },
  },
});

function setFallbackLayout() {
  // sets a default layout for all mdx files
  return function (_tree, file) {
    const layout =
      file.data.astro.frontmatter.layout ?? "@layouts/BookLayout.astro";
    file.data.astro.frontmatter.layout = layout;
  };
}
