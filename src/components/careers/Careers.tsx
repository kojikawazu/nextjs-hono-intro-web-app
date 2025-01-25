import React, { useMemo } from 'react';
// contexts
import { useIntroData } from '@/contexts/IntroContext';
// shared
import { MESSAGES } from '@/shared/constants/constants';
import { customLog, componentStart, componentJSX } from '@/shared/utils/logUtilities';
import { sendLogsToGCF } from '@/shared/helper/googleCloudLogger';
// components
import ErrorComponent from '@/components/common/error/ErrorComponent';
import LoadingSpinner from '@/components/common/spinner/LoadingSpinner';
import Title from '@/components/common/title/Title';
import CareerSlideContainer from '@/components/careers/slides/CareerSlideContainer';

/**
 * Careerコンポーネント
 * @returns JSX
 */
const Careers = () => {
    componentStart(Careers);

    // Context
    const { introData, refData, isLoading } = useIntroData();
    const navbarData = introData?.navbar_data;
    const careerTitleData = introData?.career_title_data;
    const careerData = useMemo(() => introData?.career_data || [], [introData]);

    if (isLoading) {
        return <LoadingSpinner isVisible={isLoading} />;
    }

    // エラーハンドリング
    if (!navbarData || !careerTitleData || !careerData || !refData) {
        const errorJoin = MESSAGES.ERRORS.DATA_ERROR;
        customLog(Careers, 'error', errorJoin);
        sendLogsToGCF([errorJoin], 'ERROR');
        return <ErrorComponent errorData={MESSAGES.ERRORS.DATA_LOADING} />;
    }

    const componentsHeight =
        'h-[850px] xs:h-[900px] sssm:h-[820px] sm:h-[830px] md:h-[1300px] lg:h-[1200px] xl:h-[1300px]';

    componentJSX(Careers);
    return (
        <section className={`w-full ${componentsHeight} bg-lblue`} ref={refData.careerRef}>
            <div className="flex justify-center content-center pt-32 pb-6">
                <Title titleName={navbarData.career_name} />
            </div>

            <div className="">
                <CareerSlideContainer careerTitleData={careerTitleData} careerData={careerData} />
            </div>
        </section>
    );
};

export default Careers;
