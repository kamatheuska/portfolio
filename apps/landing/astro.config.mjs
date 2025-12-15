import { defineConfig, envField } from "astro/config";

import icon from "astro-icon";

import alpinejs from "@astrojs/alpinejs";

import node from "@astrojs/node";

import tailwindcss from "@tailwindcss/vite";
// https://astro.build/config
export default defineConfig({
    integrations: [icon(), alpinejs()],

    vite: {
        plugins: [tailwindcss()],
        server: {
            proxy: {
                "/api": {
                    target: "http://localhost:4001",
                },
            },
        },
    },
    env: {
        schema: {
            PUBLIC_API_BASE_URL: envField.string({
                context: "client",
                access: "public",
                optional: true,
            }),
        },
    },
    i18n: {
        locales: ["en", "de"],
        defaultLocale: "en",
        routing: {
            prefixDefaultLocale: true,
        },
    },
});
