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

test('NavBar is displayed', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'SampleProfile' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Scroll to Top' })).toBeVisible();
    
    // 明確な名前で指定する
    await expect(page.getByRole('button', { name: 'Navigate to About section' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Navigate to Career section' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Navigate to Skills section' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Navigate to Contact section' })).toBeVisible();
});