
let __unconfig_data;
let __unconfig_stub = function (data = {}) { __unconfig_data = data };
__unconfig_stub.default = (data = {}) => { __unconfig_data = data };
import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel/serverless";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";

// https://astro.build/config

// https://astro.build/config
const __unconfig_default =  defineConfig({
  output: "server",
  adapter: vercel(),
  integrations: [react(), tailwind()],
  vite: {
    ssr: {
      noExternal: ["@fontsource/outfit"],
    },
  },
});

if (typeof __unconfig_default === "function") __unconfig_default(...[]);export default __unconfig_data;