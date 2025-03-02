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

test('Navigation Button is clicked', async ({ page }) => {
    const buttons = ['About', 'Career', 'Skills', 'Contact'];

    for (const button of buttons) {
        // ナビゲーションボタンをクリック
        await page.getByRole('button', { name: `Navigate to ${button} section` }).click();

        // スクロール完了のために少し待つ (安定性のため)
        await page.waitForTimeout(500);

        // 対応するセクションが可視であることを検証
        const sectionLocator = page.locator(`text=${button}`).first();
        await expect(sectionLocator).toBeVisible();
    }
});

test('NavigationScroll to Top Button is clicked', async ({ page }) => {
    const scrollTopBtn = page.getByRole('button', { name: 'Scroll to Top' });
    await scrollTopBtn.click();

    // スクロールが完全にトップに到達するまで待機
    await page.waitForFunction(() => window.scrollY === 0, null, { timeout: 5000 });

    // 先頭まで移動したことを確認する
    const scrollPosition = await page.evaluate(() => window.scrollY);
    await expect(scrollPosition).toBe(0);
});

test('HamburgerMenu is displayed', async ({ page }) => {
    // 画面幅を調整する
    await page.setViewportSize({ width: 375, height: 667 });

    const menuLocator = page.locator('nav[role="navigation"], nav');

    // 初期状態（閉じている）はtop-[-120%]を持つ
    await expect(menuLocator).toHaveClass(/top-\[-120%\]/);

    // メニューを開くボタンをクリック
    await page.locator('button[aria-label="メニューを開く"]').click();

    // 開いた後はtop-[-120%]がなくなっていることを確認
    await expect(menuLocator).not.toHaveClass(/top-\[-120%\]/);

    // メニューを閉じるボタンをクリック
    await page.locator('button[aria-label="メニューを閉じる"]').click();

    // 再度、top-[-120%]を持つことを確認（閉じた状態に戻った）
    await expect(menuLocator).toHaveClass(/top-\[-120%\]/);
});

test('HamburgerMenu is closed and scrolls to About section', async ({ page }) => {
    // 画面サイズを調整（スマホ表示想定）
    await page.setViewportSize({ width: 375, height: 667 });

    const menuLocator = page.locator('nav[role="navigation"], nav');

    // メニューを開く
    await page.locator('button[aria-label="メニューを開く"]').click();

    // メニューが表示されたことを確認
    await expect(menuLocator).not.toHaveClass(/top-\[-120%\]/);

    // 移動前のスクロール位置を記録
    const initialScroll = await page.evaluate(() => window.scrollY);

    // Aboutの位置までスクロールすることを確認するためのイベント待機をセットアップ
    await Promise.all([
        page.waitForFunction(() => window.scrollY > 0),
        page.getByRole('menuitem', { name: 'About' }).click(),
    ]);

    // スクロールが発生したか確認
    const newScroll = await page.evaluate(() => window.scrollY);
    expect(newScroll).toBeGreaterThan(initialScroll);

    // メニューが閉じられたことを確認
    await expect(menuLocator).toHaveClass(/top-\[-120%\]/);
});
