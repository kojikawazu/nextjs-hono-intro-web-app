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

test('Contact is displayed', async ({ page }) => {
    // Contact Title
    const contactTitle = page.locator('div.text-5xl.underline', { hasText: 'Contact' });
    await expect(contactTitle).toBeVisible();

    // Contact Name
    const contactName = page.getByLabel('お名前*:', { exact: false });
    await expect(contactName).toBeVisible();

    // Contact Email
    const contactEmail = page.getByLabel('メールアドレス*:', { exact: false });
    await expect(contactEmail).toBeVisible();

    // Contact Contents
    const contactContents = page.getByLabel('お問い合わせ内容*:', { exact: false });
    await expect(contactContents).toBeVisible();

    // Contact Button
    const contactButton = page.getByRole('button', { name: '送信' });
    await expect(contactButton).toBeVisible();
});

test('Contact form validation', async ({ page }) => {
    await page.getByLabel('お名前*:', { exact: false }).fill('');
    await page.getByLabel('メールアドレス*:', { exact: false }).fill('');
    await page.getByLabel('お問い合わせ内容*:', { exact: false }).fill('');

    await page.getByRole('button', { name: '送信' }).click();

    // 名前バリデーションエラー
    await expect(page.getByText('名前の入力が正しくありません。')).toBeVisible();

    // メールアドレスバリデーションエラー
    await expect(page.getByText('Eメールアドレスの入力が正しくありません。')).toBeVisible();

    // お問い合わせ内容バリデーションエラー
    await expect(page.getByText('お問い合わせ内容の入力が正しくありません。')).toBeVisible();
});

test('Contact confirmation dialog is displayed', async ({ page }) => {
    await page.getByLabel('お名前*:', { exact: false }).fill('テスト太郎');
    await page.getByLabel('メールアドレス*:', { exact: false }).fill('test@example.com');
    await page
        .getByLabel('お問い合わせ内容*:', { exact: false })
        .fill('お問い合わせのテストです。');

    await page.getByRole('button', { name: '送信' }).click();

    // ダイアログの処理を事前にセット
    page.once('dialog', async (dialog) => {
        expect(dialog.message()).toContain('メッセージを送信してもよろしいでしょうか？');
    });
});

test('Contact confirmation dialog is dismissed', async ({ page }) => {
    await page.getByLabel('お名前*:', { exact: false }).fill('テスト太郎');
    await page.getByLabel('メールアドレス*:', { exact: false }).fill('test@example.com');
    await page
        .getByLabel('お問い合わせ内容*:', { exact: false })
        .fill('お問い合わせのテストです。');

    await page.getByRole('button', { name: '送信' }).click();

    // ダイアログの処理を事前にセット
    page.once('dialog', async (dialog) => {
        await dialog.dismiss();
    });
});

test('Contact form send', async ({ page }) => {
    // APIリクエストをモック化
    await page.route('**/api/mail/send', async (route, request) => {
        const requestBody = await request.postDataJSON();

        expect(requestBody).toEqual({
            name: 'テスト太郎',
            from: 'test@example.com',
            subjects: 'テスト太郎からの問い合わせ',
            messages: 'お問い合わせのテストです。',
        });

        await route.fulfill({
            status: 200,
            body: JSON.stringify({ message: 'success' }),
            headers: { 'Content-Type': 'application/json' },
        });
    });

    // フォームに入力
    await page.getByLabel('お名前*:', { exact: false }).fill('テスト太郎');
    await page.getByLabel('メールアドレス*:', { exact: false }).fill('test@example.com');
    await page
        .getByLabel('お問い合わせ内容*:', { exact: false })
        .fill('お問い合わせのテストです。');

    // window.confirmの対応をクリックの前に記述
    page.once('dialog', async (dialog) => {
        await dialog.accept();
    });

    // 送信ボタンをクリック
    await page.getByRole('button', { name: '送信' }).click();

    // 送信成功の通知が表示されることを確認
    await expect(page.getByText('送信しました！', { exact: false })).toBeVisible({
        timeout: 10000,
    });
});
