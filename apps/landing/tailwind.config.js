/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
    theme: {
        extend: {
            colors: {
                "light-blue": "#95BCCC",
                pink: {
                    100: "#fef8f8",
                    200: "#fef1f1",
                    300: "#fdeaea",
                    400: "#fde3e3",
                    500: "#fcdcdc",
                    600: "#cab0b0",
                    700: "#978484",
                    800: "#655858",
                    900: "#322c2c",
                },
                blue: {
                    700: "#2B4C59",
                    800: "hsl(197, 35%, 16%)",
                },
                brown: "#988080",
                gray: "#BECEDA",
                green: "hsl(178, 100%, 55%)",
                "dark-green": "hsl(178, 20%, 35%)",
                "light-brown": "#DDD4D4",
                "light-green": "#b5fffd",
            },
            fontFamily: {
                mono: ["Fira Mono", "monospace"],
                sans: ["Roboto", "sans-serif"],
                serif: ["Playfair Display", "serif"],
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(circle, var(--tw-gradient-stops))",
            },
        },
    },
    plugins: [],
};
