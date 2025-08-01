import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    dir: './src',
    projects: [
      {
        extends: true,
        test: {
          name: 'unit',
          dir: './src/services',
        },
      },
      {
        extends: true,
        test: {
          name: 'e2e',
          dir: './src/controllers',
          environment:
            './prisma/vitest-environment-prisma/prisma-test-environment.ts',
        },
      },
    ],
    coverage: {
      exclude: [
        'node_modules/**',
        'generated/**',
        'prisma/**',
        'coverage/**',
        'build/**',
        'dist/**',
      ],
    },
  },
})
