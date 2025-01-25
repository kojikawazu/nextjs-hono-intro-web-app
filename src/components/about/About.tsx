import React from 'react';
// shared
import { MESSAGES } from '@/shared/constants/constants';
import { useIntroData } from '@/contexts/IntroContext';
import { customLog, componentStart, componentJSX } from '@/shared/utils/logUtilities';
import { sendLogsToGCF } from '@/shared/helper/googleCloudLogger';
// components
import ErrorComponent from '@/components/common/error/ErrorComponent';
import Title from '@/components/common/title/Title';
import AboutContents from '@/components/about/AboutContents';
import LoadingSpinner from '../common/spinner/LoadingSpinner';

/**
 * Aboutコンポーネント
 * @returns JSX
 */
const About = () => {
    componentStart(About);

    // Context
    const { introData, refData, isLoading } = useIntroData();
    if (isLoading) {
        return <LoadingSpinner isVisible={isLoading} />;
    }

    // エラーハンドリング
    if (!introData || !introData.about_data || !refData) {
        const errorJoin = MESSAGES.ERRORS.DATA_ERROR;
        customLog(About, 'error', errorJoin);
        sendLogsToGCF([errorJoin], 'ERROR');
        return <ErrorComponent errorData={MESSAGES.ERRORS.DATA_LOADING} />;
    }

    const { navbar_data: navbarData, about_data: aboutData } = introData;

    componentJSX(About);
    return (
        <div className="w-full" ref={refData.aboutRef}>
            <div className="flex justify-center items-center pt-32 pb-6">
                <Title titleName={navbarData.about_name} />
            </div>

            <AboutContents aboutData={aboutData} />
        </div>
    );
};

export default About;
