import { test, expect } from '@playwright/test';

test.describe('Dummy Chatbot SPA', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/dummy-chatbot.html');
  });

  test('page loads with welcome message', async ({ page }) => {
    // Check that the page title is correct
    await expect(page).toHaveTitle('Dummy Chatbot');
    
    // Check that the back-to-home link is present
    const backLink = page.locator('a.back-home');
    await expect(backLink).toBeVisible();
    await expect(backLink).toHaveText('← back to home');
    
    // Check that the welcome message is displayed
    await expect(page.locator('.chat-msg').first()).toContainText('Welcome! Type a message');
  });

  test('sends message and receives canned reply', async ({ page }) => {
    // Type a message in the input field
    const input = page.locator('#prompt');
    await input.fill('Hello');
    
    // Click the send button
    await page.locator('button.send-btn').click();
    
    // Check that the user message appears
    const userMessage = page.locator('.chat-msg.user').last();
    await expect(userMessage).toContainText('Hello');
    
    // Wait for the bot reply to appear (typewriter effect takes time)
    // The reply should be based on prompt length % 4
    // "Hello" has length 5, so 5 % 4 = 1, which should give the second canned reply
    await page.waitForTimeout(2000); // Wait for typewriter effect to complete
    
    const botReply = page.locator('.chat-msg').last();
    await expect(botReply).toContainText('This is a canned response');
  });

  test('sends multiple messages and receives different replies', async ({ page }) => {
    const testMessages = [
      { text: 'Hi', expectedReply: 'This is a canned response' }, // length 2 % 4 = 2
      { text: 'How are you?', expectedReply: 'Try asking me anything' }, // length 12 % 4 = 0
      { text: 'Test', expectedReply: 'I\'m just a dummy bot' }, // length 4 % 4 = 0
    ];
    
    for (const msg of testMessages) {
      // Send message
      await page.locator('#prompt').fill(msg.text);
      await page.locator('button.send-btn').click();
      
      // Wait for the typewriter effect to complete
      await page.waitForTimeout(2000);
      
      // Check that the user message appears
      const userMessages = page.locator('.chat-msg.user');
      await expect(userMessages.last()).toContainText(msg.text);
    }
    
    // Verify we have messages in the chat window
    const allMessages = page.locator('.chat-msg');
    const messageCount = await allMessages.count();
    expect(messageCount).toBeGreaterThan(3); // At least welcome + 3 pairs of messages
  });

  test('stores state in URL fragment', async ({ page }) => {
    // Send a message
    await page.locator('#prompt').fill('Test message');
    await page.locator('button.send-btn').click();
    
    // Check that the URL fragment is updated
    await page.waitForTimeout(500);
    const url = page.url();
    expect(url).toContain('#Test%20message');
  });

  test('restores state from URL fragment', async ({ page }) => {
    // Navigate with a hash
    await page.goto('/dummy-chatbot.html#Hello%20World');
    
    // Wait for the typewriter effect
    await page.waitForTimeout(2000);
    
    // Check that the message is restored
    const userMessage = page.locator('.chat-msg.user').first();
    await expect(userMessage).toContainText('Hello World');
    
    // Check that a reply appears
    const messages = page.locator('.chat-msg');
    const count = await messages.count();
    expect(count).toBeGreaterThan(1); // At least user message + bot reply
  });

  test('footer displays correct version and updates on interaction', async ({ page }) => {
    // Check initial footer
    const footer = page.locator('footer');
    await expect(footer).toContainText('Made with ❤️ by Stu at github.com/gitstua/stu-spa-demos using GitHub Copilot');
    await expect(footer).toContainText('v1');
    
    // Send a message which should bump the version
    await page.locator('#prompt').fill('Test');
    await page.locator('button.send-btn').click();
    
    // Check that version was bumped
    await expect(footer).toContainText('v2');
  });

  test('explanation section is present', async ({ page }) => {
    const explanation = page.locator('.explanation');
    await expect(explanation).toBeVisible();
    await expect(explanation).toContainText('How it works');
    await expect(explanation).toContainText('typewriter effect');
  });

  test.describe.parallel('Load testing', () => {
    // Create multiple separate tests that will run in parallel
    for (let user = 0; user < 5; user++) {
      test(`parallel load test - user ${user}`, async ({ page }) => {
        await page.goto('/dummy-chatbot.html');
        
        // Each "user" sends different messages
        for (let i = 0; i < 5; i++) {
          await page.locator('#prompt').fill(`User ${user} Message ${i}`);
          await page.locator('button.send-btn').click();
          await page.waitForTimeout(300); // Reduced wait time
        }
        
        const allMessages = page.locator('.chat-msg');
        const messageCount = await allMessages.count();
        expect(messageCount).toBeGreaterThan(10); // 5 user messages + 5 bot replies + welcome
      });
    }
  });
});
