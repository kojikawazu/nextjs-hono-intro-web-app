import React, { useMemo } from 'react';
import classNames from 'classnames';
// contexts
import { useIntroData } from '@/contexts/IntroContext';
// shared
import { MESSAGES } from '@/shared/constants/constants';
import { customLog, componentStart, componentJSX } from '@/shared/utils/logUtilities';
import { sendLogsToGCF } from '@/shared/helper/googleCloudLogger';
// components
import ErrorComponent from '@/components/common/error/ErrorComponent';
import LoadingSpinner from '@/components/common/spinner/LoadingSpinner';
import CareerTitle from '@/components/careers/parts/CareerTitle';
import CareerPeriod from '@/components/careers/parts/CareerPeriod';
import CareerMember from '@/components/careers/parts/CareerMember';
import CareerContents from '@/components/careers/parts/CareerContents';
import CareerStacks from '@/components/careers/parts/CareerStacks';
import CareerPhase from '@/components/careers/parts/CareerPhase';
import CareerRole from '@/components/careers/parts/CareerRole';

/** Propsの型定義 */
type CareerDetailDialogProps = {
    currentIndex: number;
};

/**
 * CareerDetailDialogコンポーネント
 * @param currentIndex
 * @returns JSX
 */
const CareerDetailDialog: React.FC<CareerDetailDialogProps> = ({ currentIndex }) => {
    componentStart(CareerDetailDialog);

    // Context
    const { introData, isLoading } = useIntroData();
    const careerTitleData = introData?.career_title_data;
    const careerData = useMemo(() => introData?.career_data || [], [introData]);

    if (isLoading) {
        return <LoadingSpinner isVisible={isLoading} />;
    }

    // エラーハンドリング
    if (!careerTitleData || !careerData) {
        const errorJoin = MESSAGES.ERRORS.DATA_LOADING;
        customLog(CareerDetailDialog, 'error', errorJoin);
        sendLogsToGCF([errorJoin], 'ERROR');
        return <ErrorComponent errorData={MESSAGES.ERRORS.DATA_LOADING} />;
    }

    const currentCareerData = careerData[currentIndex];
    const responsiveFontSize = classNames([
        'text-xxxxs',
        'xxs:text-xxxs',
        'xs:text-xxs',
        'sssm:text-xs',
        'sm:text-sm',
        'md:text-base',
    ]);

    componentJSX(CareerDetailDialog);
    return (
        <div>
            <div>
                <CareerTitle
                    careerTitle={currentCareerData.career_title}
                    className={`${responsiveFontSize} py-5 md:py-5`}
                />

                <CareerPeriod
                    careerTitle={careerTitleData.career_title_period}
                    careerStart={currentCareerData.career_start}
                    careerEnd={currentCareerData.career_end}
                    className={responsiveFontSize}
                />

                <CareerMember
                    careerTitle={careerTitleData.career_title_member}
                    careerDetail={currentCareerData.career_member}
                    className={responsiveFontSize}
                />

                <CareerContents
                    careerTitle={careerTitleData.career_title_contents}
                    careerDescription={currentCareerData.career_contents}
                    className={responsiveFontSize}
                />

                <CareerStacks
                    careerTitle={careerTitleData.career_title_stack}
                    careerStacks={currentCareerData.career_skill_stack}
                    className={responsiveFontSize}
                />

                <CareerPhase
                    careerTitle={careerTitleData.career_title_phase}
                    careerPhases={currentCareerData.career_skill_phase}
                    className={responsiveFontSize}
                />

                <CareerRole
                    careerTitle={careerTitleData.career_title_role}
                    careerRole={currentCareerData.career_role}
                    className={responsiveFontSize}
                />
            </div>
        </div>
    );
};

export default CareerDetailDialog;
