import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [],
  test: {
    environment: 'jsdom',
    globals: true,
    include: ['**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
  }
});
