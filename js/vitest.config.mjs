import { defineConfig } from 'vitest/config';

// Experiment: Vitest runs only the lection3/homework folder for now.
// The rest of the project stays on Jest (see `npm test`).
export default defineConfig({
    test: {
        globals: true,
        include: ['lection3/homework/**/*.test.js'],
    },
});
