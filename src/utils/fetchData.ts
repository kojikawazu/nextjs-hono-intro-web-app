/**
 * データを取得する
 * @returns データ
 */
export const fetchIntroJsonData = async () => {
    try {
        const response = await fetch(`/api/gcs/data`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
