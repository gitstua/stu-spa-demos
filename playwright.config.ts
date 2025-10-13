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
    // Enable video recording for all test runs with 800x600 resolution
    video: {
      mode: 'on',
      size: { width: 800, height: 600 },
    },
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
    timeout: 30000, // Increase timeout to 30 seconds for slower machines
    cwd: process.cwd(),
    env: {
      // Add cache control headers for CI
      SERVE_CACHE_CONTROL: process.env.CI ? 'public, max-age=3600' : 'no-cache',
      // Ensure consistent port usage
      PORT: '8080',
    },
  },
});