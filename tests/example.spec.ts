
import { test, expect } from '@playwright/test';

test('dummy-chatbot.html basic interaction', async ({ page }) => {
  // Use Playwright baseURL if configured, else fallback to localhost:8080
  const url = process.env.PLAYWRIGHT_TEST_BASE_URL || 'http://localhost:8080/dummy-chatbot.html';
  await page.goto(url);

  // Send first message
  await page.getByRole('textbox', { name: 'Type your message...' }).fill('test prompt from user... how much can i spend??');
  await page.getByRole('button', { name: 'Send' }).click();
  // Wait for bot reply to appear
  await expect(page.locator('.chat-msg')).toContainText('dummy bot');

  // Send second message
  await page.getByRole('textbox', { name: 'Type your message...' }).fill('would i need to review with the finance team?');
  await page.getByRole('button', { name: 'Send' }).click();
  await expect(page.locator('.chat-msg')).toContainText('canned response');

  // Send third message
  await page.getByRole('textbox', { name: 'Type your message...' }).fill('i wonder how many tokens this uses for really long text like this which I am typing into the box?');
  await page.getByRole('button', { name: 'Send' }).click();
  await expect(page.locator('.chat-msg')).toContainText('slow motion');
});
