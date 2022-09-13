import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), mdx()],
  markdown: {
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
