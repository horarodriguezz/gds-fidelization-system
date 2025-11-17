// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";
// @ts-ignore
import { Pathname } from "@/config/Pathname";
import react from "@astrojs/react";

import node from "@astrojs/node";

// https://astro.buil d/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [react()],

  adapter: node({
    mode: "standalone",
  }),

  redirects: {
    "/": Pathname.BUSINESS_DASHBOARD,
  },
});
