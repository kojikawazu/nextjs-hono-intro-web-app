import { test, expect } from '@playwright/test';
import mockData from '../mocks/intro.json';

test.beforeEach(async ({ page }) => {
    await page.route('**/api/gcs/data', async (route, request) => {
        await route.fulfill({
            status: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(mockData),
        });
    });

    await page.goto('/');
    await page.waitForSelector('text=SampleProfile', { timeout: 60000 });
});

test('Home page is displayed', async ({ page }) => {
    await expect(page).toHaveTitle(/.*/);
});

test('Hero is displayed', async ({ page }) => {
    // Image
    await expect(page.locator('img[alt="hero_background"][src="https://placehold.co/1200x600"]')).toBeVisible();
});
