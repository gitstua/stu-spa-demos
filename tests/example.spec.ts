import { test, expect } from '@playwright/test';

test('test dummy chatbot', async ({ page }) => {
  await page.goto('http://127.0.0.1:8080/dummy-chatbot.html');
  await page.getByRole('textbox', { name: 'Type your message...' }).click();
  await page.getByRole('textbox', { name: 'Type your message...' }).fill('test prompt from user... how much can i spend??');
  await page.getByRole('button', { name: 'Send' }).click();
  await page.getByRole('textbox', { name: 'Type your message...' }).click();
  await page.getByRole('textbox', { name: 'Type your message...' }).fill('would i need to review with the procurement team?');
  await page.getByRole('textbox', { name: 'Type your message...' }).press('Enter');
  await page.getByRole('button', { name: 'Send' }).click();
  await page.getByRole('textbox', { name: 'Type your message...' }).click();
  await page.getByRole('textbox', { name: 'Type your message...' }).fill('i wonder how many tokens this uses for really long text like this which I am typing into the box?');
  await page.getByRole('button', { name: 'Send' }).click();
});
