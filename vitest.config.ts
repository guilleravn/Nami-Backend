import { defineConfig } from 'vitest/config';

export default defineConfig({
  // Vite 8 resolves tsconfig paths natively (replaces vite-tsconfig-paths).
  resolve: { tsconfigPaths: true },
  test: {
    globals: true,
    root: './',
    include: ['**/*.spec.ts'],
    exclude: ['**/node_modules/**', '**/dist/**', '**/*.e2e-spec.ts'],
    passWithNoTests: true,
  },
});
