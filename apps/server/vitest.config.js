import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        exclude: [
            // default exclude
            '**/node_modules/**',
            '**/dist/**',
            '**/cypress/**',
            '**/.{idea,git,cache,output,temp}/**',
            '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*',

            // own directories
            '**/data/**',
        ],
    },
});
