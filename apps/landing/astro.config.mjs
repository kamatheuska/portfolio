import { defineConfig, envField } from "astro/config";

import icon from "astro-icon";

import alpinejs from "@astrojs/alpinejs";

import tailwindcss from "@tailwindcss/vite";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
    integrations: [icon(), alpinejs(), sitemap()],
    site: "https://nicolasramirez.dev",

    vite: {
        plugins: [tailwindcss()],
        server: {
            proxy: {
                "/api": {
                    target: "http://localhost:3000",
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
            ADMIN_BASE_URL: envField.string({
                context: "server",
                access: "public",
            }),
            ADMIN_API_KEY: envField.string({
                context: "server",
                access: "secret",
            }),
        },
    },
    i18n: {
        locales: ["en", "de"],
        defaultLocale: "en",
        routing: {
            prefixDefaultLocale: false,
        },
    },
});
