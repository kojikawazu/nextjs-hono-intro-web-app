import React from 'react';
// shared
import { MESSAGES } from '@/shared/constants/constants';
import { customLog, componentStart, componentJSX } from '@/shared/utils/logUtilities';
import { sendLogsToGCF } from '@/shared/helper/googleCloudLogger';
// context
import { useIntroData } from '@/contexts/IntroContext';
// components
import ErrorComponent from '@/components/common/error/ErrorComponent';
import LoadingSpinner from '@/components/common/spinner/LoadingSpinner';
import HeroBackground from '@/components/hero/background/HeroBackground';
/**
 * Heroコンポーネント
 * @returns JSX
 */
const Hero = () => {
    componentStart(Hero);

    // context
    const { introData, isLoading } = useIntroData();
    if (isLoading) {
        return <LoadingSpinner isVisible={isLoading} />;
    }

    // エラーハンドリング
    if (!introData || !introData.hero_data) {
        const errorJoin = MESSAGES.ERRORS.DATA_ERROR;
        customLog(Hero, 'error', errorJoin);
        sendLogsToGCF([errorJoin], 'ERROR');
        return <ErrorComponent errorData={MESSAGES.ERRORS.DATA_LOADING} />;
    }

    const heroData = introData.hero_data;

    componentJSX(Hero);
    return (
        <HeroBackground
            url={heroData.hero_img_url}
            alt="hero_background"
            coverBackgroundColor="bg-hero"
        />
    );
};

export default Hero;
