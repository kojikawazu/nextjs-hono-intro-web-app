/**
 * データを取得する
 * @returns データ
 */
export const fetchIntroJsonData = async () => {
    try {

        const apiToken = process.env.NEXT_PUBLIC_API_TOKEN || 'default-token';

        const response = await fetch(`/api/gcs/data`, {
            headers: {
                Authorization: `${apiToken}`,
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
