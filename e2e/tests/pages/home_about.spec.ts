import { test, expect } from '@playwright/test';
import mockData from '../mocks/intro.json';

test.beforeEach(async ({ page }) => {
    await page.route('**/api/gcs/data', async (route) => {
        await route.fulfill({
            status: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(mockData),
        });
    });

    await page.goto('/');
    await page.waitForSelector('text=SampleProfile', { timeout: 60000 });
});

test('About is displayed', async ({ page }) => {
    // About Title
    const aboutTitle = page.locator('div.text-5xl.underline', { hasText: 'About' });
    await expect(aboutTitle).toBeVisible();

    // Image
    await expect(
        page.locator('img[alt="Profile background image"][src="https://placehold.co/400x400"]'),
    ).toBeVisible();
    await expect(
        page.locator('img[alt="profile_icon"][src="https://placehold.co/100x100"]'),
    ).toBeVisible();

    // About名
    const caption = page.getByText('K K', { exact: true });
    await expect(caption).toBeVisible();

    // X Link
    const x_link = page.getByRole('link', { name: 'x_image' });
    await expect(x_link).toHaveAttribute('href', 'https://twitter.com');
    const x_img = x_link.getByRole('img', { name: 'x_image' });
    await expect(x_img).toBeVisible();
    await expect(x_img).toHaveAttribute('src', 'https://placehold.co/32');

    // GitHub Link
    const github_link = page.getByRole('link', { name: 'github_image' });
    await expect(github_link).toHaveAttribute('href', 'https://github.com');
    const github_img = github_link.getByRole('img', { name: 'github_image' });
    await expect(github_img).toBeVisible();

    // Zenn Link
    const zenn_link = page.getByRole('link', { name: 'zenn_image' });
    await expect(zenn_link).toHaveAttribute('href', 'https://zenn.dev');
    const zenn_img = zenn_link.getByRole('img', { name: 'zenn_image' });
    await expect(zenn_img).toBeVisible();

    // Qiita Link
    const qiita_link = page.getByRole('link', { name: 'qiita_image' });
    await expect(qiita_link).toHaveAttribute('href', 'https://qiita.com');
    const qiita_img = qiita_link.getByRole('img', { name: 'qiita_image' });
    await expect(qiita_img).toBeVisible();
    await expect(qiita_img).toHaveAttribute('src', 'https://placehold.co/32');

    // About contents
    const introText = page.getByText('これはダミーテキストです。', { exact: false });
    await expect(introText).toBeVisible();
});
