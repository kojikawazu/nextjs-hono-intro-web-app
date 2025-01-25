'use client';
import { useState, useEffect } from 'react';
import { fetchIntroJsonData } from '@/utils/fetchData';

/**
 * データを取得するページ
 * @returns JSX.Element
 */
const GetJsonDataPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchIntroJsonData();
            setData(data);
            setIsLoading(false);
        };

        fetchData();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (!data) {
        return <div>No data</div>;
    }

    return (
        <div>
            <h1>GetJsonDataPage</h1>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
};

export default GetJsonDataPage;
