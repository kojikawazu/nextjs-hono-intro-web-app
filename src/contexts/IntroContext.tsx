'use client';

import React, { createContext, useContext, useState, ReactNode, useRef, useEffect } from 'react';
// types
import { IntroDataType } from '@/types/IntroType';
import { IntroRefType } from '@/types/IntroRefType';
// utils
import { fetchIntroJsonData } from '@/utils/fetchData';

// type
type IntroDataState = {
    introData: IntroDataType | null;
    refData: IntroRefType | null;
    isLoading: boolean;
};

// Context
const IntroDataContext = createContext<IntroDataState | null>(null);

// hooks
export const useIntroData = () => {
    const context = useContext(IntroDataContext);
    if (!context) {
        throw new Error('useIntroData must be used within a DataProvider');
    }
    return context;
};

// Props
interface IntroDataProviderProps {
    children: ReactNode;
}

// Provider
export const IntroDataProvider: React.FC<IntroDataProviderProps> = ({ children }) => {
    // ref
    const aboutRef = useRef<HTMLDivElement>(null);
    const careerRef = useRef<HTMLDivElement>(null);
    const skillsRef = useRef<HTMLDivElement>(null);
    const contactRef = useRef<HTMLDivElement>(null);
    const initialRefData = { aboutRef, careerRef, skillsRef, contactRef } as IntroRefType;
    // state
    const [introData, setIntroData] = useState<IntroDataType | null>(null);
    const [refData] = useState<IntroRefType | null>(initialRefData);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const result = await fetchIntroJsonData();
            setIntroData(result);
            setIsLoading(false);
        };

        fetchData();
    }, []);

    return (
        <IntroDataContext.Provider value={{ introData, refData, isLoading }}>
            {children}
        </IntroDataContext.Provider>
    );
};
