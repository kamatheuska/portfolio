// @ts-check
import { defineConfig } from "astro/config";

import icon from "astro-icon";

import alpinejs from "@astrojs/alpinejs";

import node from "@astrojs/node";

import tailwindcss from "@tailwindcss/vite";
// https://astro.build/config
export default defineConfig({
    integrations: [icon(), alpinejs()],

    vite: {
        plugins: [tailwindcss()],
    },
    adapter: node({
        mode: "standalone",
    }),
});
