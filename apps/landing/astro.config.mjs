// @ts-check
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";

import icon from "astro-icon";

import alpinejs from "@astrojs/alpinejs";

import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind({ applyBaseStyles: false }), icon(), alpinejs()],

  adapter: node({
    mode: "standalone",
  }),
});