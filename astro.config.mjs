import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/serverless';
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: vercel(),
  integrations: [react(), tailwind(), mdx()],
  vite: {
    ssr: {
      noExternal: ["@fontsource/outfit"]
    }
  }
});