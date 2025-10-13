import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright configuration for testing stu-spa-demos
 */
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['html', { open: 'never' }]],
  timeout: 30 * 1000,
  expect: {
    timeout: 5000,
  },
  use: {
    baseURL: 'http://localhost:8080',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // Uncomment for additional browsers when needed
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],
  webServer: {
    command: 'npx serve .',
    url: 'http://localhost:8080',
    reuseExistingServer: !process.env.CI,
    // Add caching support for CI environments
    cwd: process.cwd(),
    env: {
      // Add cache control headers for CI
      SERVE_CACHE_CONTROL: process.env.CI ? 'public, max-age=3600' : 'no-cache',
    },
  },
});