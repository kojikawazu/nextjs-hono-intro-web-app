/**
 * データを取得する
 * @returns データ
 */
export const fetchIntroJsonData = async () => {
    try {
        const apiSecretToken = process.env.API_SECRET_TOKEN || 'default-token';

        const response = await fetch(`/api/gcs/data`, {
            headers: {
                Authorization: `${apiSecretToken}`,
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
