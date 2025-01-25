import { Hono } from 'hono';
import { Storage } from '@google-cloud/storage';

// GCSのインスタンスを作成
const storage = new Storage();

const gcsRouter = new Hono();

/**
 * GCSからJSONファイルを取得する
 * @param bucketName GCSのバケット名
 * @param fileName GCSのJSONファイルのパス
 * @returns JSONファイルの内容
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function fetchJsonFromGCS(bucketName: string, fileName: string): Promise<any> {
    const bucket = storage.bucket(bucketName);
    const file = bucket.file(fileName);

    const [content] = await file.download();
    return JSON.parse(content.toString());
}

// 動作確認用のエンドポイント
gcsRouter.get('/', (c) => {
    return c.json({ message: 'Connected to GCS API' });
});

// 実際に GCS から JSON を取得するエンドポイント
gcsRouter.get('/data', async (c) => {
    try {
        const bucketName = process.env.GCS_PRIVATE_BUCKET_NAME;
        const fileName = process.env.GCS_JSON_PATH;

        if (!bucketName || !fileName) {
            return c.json({ error: 'Bucket name or file name is not set' }, 400);
        }

        const data = await fetchJsonFromGCS(bucketName, fileName);
        return c.json(data);
    } catch (error) {
        console.error('Failed to fetch data from GCS:', error);
        return c.json({ error: 'Failed to fetch data from GCS' }, 500);
    }
});

export default gcsRouter;
