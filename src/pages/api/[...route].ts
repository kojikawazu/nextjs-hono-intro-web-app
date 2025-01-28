import { Hono } from 'hono';
import { handle } from '@hono/node-server/vercel';
import type { PageConfig } from 'next';
import { cors } from 'hono/cors';
import gcsRouter from './gcs/gcs';
import sendMailRouter from './mail/mail';

// ページ設定
export const config: PageConfig = { api: { bodyParser: false } };
// Honoのインスタンスを作成
const app = new Hono().basePath('/api');

// 許可するオリジンを設定（この開発プロジェクトのオリジンのみを指定）
const allowedOrigin = process.env.ALLOWED_ORIGIN || 'http://localhost:3000';
// セキュリティトークン
const validateToken = process.env.API_VALIDATE_SECRET_TOKEN || 'default-token';
const apiSecretToken = process.env.API_SECRET_TOKEN || 'default-token';

// CORS ミドルウェアを追加
app.use(
    '*',
    cors({
        origin: (origin) => {
            // 許可するオリジンかを判定
            if (origin === allowedOrigin) {
                return origin;
            }
            return null;
        },
        allowMethods: ['GET', 'POST', 'OPTIONS'],
        allowHeaders: ['Content-Type'],
    }),
);

// リクエストの検証ミドルウェア
app.use('*', async (c, next) => {
    const token = c.req.header('authorization');
    // Bearer を削除
    const bearerToken = token?.replace('Bearer ', '');
    // トークンを結合
    const targetToken = apiSecretToken + bearerToken;

    // Authorizationヘッダーのトークンを検証
    if (targetToken !== validateToken) {
        return c.json({ error: 'Unauthorized' }, 401);
    }

    await next();
});

// ルーティング
app.get('/hello', (c) => {
    return c.json({ message: 'Connected to Hono API' });
});

// GCSのルーティング
app.route('/gcs', gcsRouter);
// Mail送信のルーティング
app.route('/mail', sendMailRouter);

export default handle(app);
