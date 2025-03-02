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

test('Skills is displayed', async ({ page }) => {
    // Skills Title
    const skillsTitle = page.locator('div.text-5xl.underline', { hasText: 'Skills' });
    await expect(skillsTitle).toBeVisible();

    // Skill Card A
    const skillName = page.getByRole('heading', { name: 'Java' });
    await expect(skillName).toBeVisible();

    const skillContents = page.getByText('Javaを用いた開発経験があります。', { exact: false });
    await expect(skillContents).toBeVisible();

    await expect(
        page.locator('img[alt="skill_icon"][src="https://placehold.co/50"]'),
    ).toBeVisible();

    // Skill Card B
    const skillName2 = page.getByRole('heading', { name: 'Docker' });
    await expect(skillName2).toBeVisible();

    const skillContents2 = page.getByText('コンテナを用いた開発経験があります。', { exact: false });
    await expect(skillContents2).toBeVisible();

    await expect(
        page.locator('img[alt="skill_icon"][src="https://placehold.co/51"]'),
    ).toBeVisible();

    const skillIcons = page.locator('img[alt="skill_icon"]');
    await expect(skillIcons).toHaveCount(9);

    // and more...
    await expect(page.getByText('and more...')).toBeVisible();
});

test('And more... is clicked', async ({ page }) => {
    await page.getByRole('button', { name: 'もっとスキルを読み込む' }).click();

    // 明示的に「最後に追加されるアイコン」の表示を待つ
    await page.waitForSelector('img[alt="skill_icon"][src="https://placehold.co/61"]');

    // 加算スキルカードの数を確認
    const skillIcons = page.locator('img[alt="skill_icon"]');
    await expect(skillIcons).toHaveCount(12);

    // 追加スキル分
    const skillContents2 = page.getByText('Goを用いた開発経験があります。', { exact: false });
    await expect(skillContents2).toBeVisible();

    await expect(
        page.locator('img[alt="skill_icon"][src="https://placehold.co/59"]'),
    ).toBeVisible();
});
