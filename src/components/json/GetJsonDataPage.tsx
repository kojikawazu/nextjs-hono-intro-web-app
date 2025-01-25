'use client';
import { useIntroData } from '@/contexts/IntroContext';

/**
 * データを取得するページ
 * @returns JSX.Element
 */
const GetJsonDataPage = () => {
    // Context
    const { introData, isLoading } = useIntroData();

    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (!introData) {
        return <div>No data</div>;
    }

    return (
        <div>
            <h1>GetJsonDataPage</h1>
            <pre>{JSON.stringify(introData, null, 2)}</pre>
        </div>
    );
};

export default GetJsonDataPage;
