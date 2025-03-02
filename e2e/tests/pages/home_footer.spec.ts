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

test('Footer is displayed', async ({ page }) => {
    // Footer Navigation Button
    const buttons = ['About', 'Career', 'Skills', 'Contact'];
    for (const button of buttons) {
        const footerAboutButton = page.locator('footer').getByRole('button', { name: button, exact: true });
        await expect(footerAboutButton).toBeVisible();
    }

    // Footer Title
    const footerTitle = page.getByRole('button', { name: 'footer title btn' });
    await expect(footerTitle).toBeVisible();
    await expect(footerTitle).toHaveText('SampleProfile');

    // Scroll Top Button
    const scrollTopBtn = page.getByRole('button', { name: 'footer arrow link' });
    await expect(scrollTopBtn).toBeVisible();

    // Copyright
    await expect(page.getByText('@sampleprofile')).toBeVisible();
});

test('Footer Navigation Button is clicked', async ({ page }) => {
    const buttons = ['About', 'Career', 'Skills', 'Contact'];

    for (const button of buttons) {
        // フッター内のボタンをクリック
        await page.locator('footer').getByRole('button', { name: button, exact: true }).click();

        // スクロール完了のために少し待つ (安定性のため)
        await page.waitForTimeout(500);

        // 対応するセクションが可視であることを検証
        const sectionLocator = page.locator(`text=${button}`).first();
        await expect(sectionLocator).toBeVisible();
    }
});

test('Footer Title Button is clicked', async ({ page }) => {
    const footerTitle = page.getByRole('button', { name: 'footer title btn' });
    await footerTitle.click();

    // スクロールが完全にトップに到達するまで待機
    await page.waitForFunction(() => window.scrollY === 0, null, { timeout: 5000 });
    
    // 先頭まで移動したことを確認する
    const scrollPosition = await page.evaluate(() => window.scrollY);
    await expect(scrollPosition).toBe(0);    
});

test('Scroll to Top Button is clicked', async ({ page }) => {
    const scrollTopBtn = page.getByRole('button', { name: 'footer arrow link' });
    await scrollTopBtn.click();

    // スクロールが完全にトップに到達するまで待機
    await page.waitForFunction(() => window.scrollY === 0, null, { timeout: 5000 });
    
    // 先頭まで移動したことを確認する
    const scrollPosition = await page.evaluate(() => window.scrollY);
    await expect(scrollPosition).toBe(0);    
});