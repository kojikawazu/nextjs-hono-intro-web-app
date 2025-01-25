import React from 'react';
import classNames from 'classnames';
// types
import { CareerType, CareerTitleType } from '@/types/CareerType';
// shared
import { MESSAGES } from '@/shared/constants/constants';
import {
    validatePropsFilter,
    validateNumberProps,
    validateDataProps,
} from '@/shared/utils/validateUtilities';
import { customLog, componentStart, componentJSX } from '@/shared/utils/logUtilities';
import { sendLogsToGCF } from '@/shared/helper/googleCloudLogger';
// features
import { useDialogLogic } from '@/features/dialog/useDialogLogic';
// components
import ErrorComponent from '@/components/common/error/ErrorComponent';
import CareerTitle from '@/components/careers/parts/CareerTitle';
import CareerPeriod from '@/components/careers/parts/CareerPeriod';
import CareerMember from '@/components/careers/parts/CareerMember';
import CareerContents from '@/components/careers/parts/CareerContents';
import CareerStacks from '@/components/careers/parts/CareerStacks';
import CareerPhase from '@/components/careers/parts/CareerPhase';
import CareerRole from '@/components/careers/parts/CareerRole';

/** Propsの型定義 */
type CareerCardProps = {
    currentIndex: number;
    careerTitleData: CareerTitleType;
    careerData: CareerType;
    className?: string;
};

/**
 * Careerカードコンポーネント
 * @returns JSX
 */
const CareerCard: React.FC<CareerCardProps> = ({
    currentIndex,
    careerTitleData,
    careerData,
    className = '',
}) => {
    componentStart(CareerCard);

    // hooks
    const { setCurrentIndexOpen } = useDialogLogic();

    // Propsの検証
    const numberError = validateNumberProps([currentIndex], MESSAGES.ERRORS.NOT_NUMBERS);
    const dataError = validateDataProps([careerTitleData, careerData], MESSAGES.ERRORS.NOT_DATA);
    const errors = validatePropsFilter([numberError, dataError]);
    if (errors.length > 0) {
        const errorJoin = errors.join(' ');
        customLog(CareerCard, 'error', errorJoin);
        sendLogsToGCF([errorJoin], 'ERROR');
        return <ErrorComponent errorData={MESSAGES.INVALIDS.INVALID_PROPS} />;
    }

    // tailwindcss
    let componentsHeight = classNames([
        'h-[400px]',
        'xxs:h-[400px]',
        'xs:h-[420px]',
        'sssm:h-[370px]',
        'ssm:h-[330px]',
    ]);
    componentsHeight = classNames(componentsHeight, [
        'sm:h-[350px]',
        'md:h-[800px]',
        'lg:h-[700px]',
        'xl:h-[800px]',
    ]);
    const componentsBgColor = classNames(['bg-white', 'hover:bg-yellow-50', 'md:hover:bg-white']);
    const componentsClass = classNames(componentsHeight, componentsBgColor, className, [
        'w-full',
        'mx-auto',
        'my-16',
        'rounded-3xl',
    ]);

    componentJSX(CareerCard);
    return (
        <div className={componentsClass}>
            <button
                className="px-10 p-8"
                onClick={() => setCurrentIndexOpen(currentIndex)}
                aria-label="キャリア詳細を表示"
            >
                <CareerTitle
                    careerTitle={careerData.career_title}
                    className="text-xxxs xs:text-xxs sssm:text-xs sm:text-sm md:text-base py-5 md:py-10"
                />

                <CareerPeriod
                    careerTitle={careerTitleData.career_title_period}
                    careerStart={careerData.career_start}
                    careerEnd={careerData.career_end}
                    className="text-xxs xs:text-xs sm:text-sm md:text-base"
                />

                <CareerMember
                    careerTitle={careerTitleData.career_title_member}
                    careerDetail={careerData.career_member}
                    className="text-xxs xs:text-xs sm:text-sm md:text-base"
                />

                <CareerContents
                    careerTitle={careerTitleData.career_title_contents}
                    careerDescription={careerData.career_contents}
                    className="text-xxs xs:text-xs sm:text-sm md:text-base"
                />

                <CareerStacks
                    careerTitle={careerTitleData.career_title_stack}
                    careerStacks={careerData.career_skill_stack}
                    className="hidden md:flex md:flex-col md:justify-start"
                />

                <CareerPhase
                    careerTitle={careerTitleData.career_title_phase}
                    careerPhases={careerData.career_skill_phase}
                    className="hidden md:flex md:flex-col md:justify-start"
                />

                <CareerRole
                    careerTitle={careerTitleData.career_title_role}
                    careerRole={careerData.career_role}
                    className="hidden md:flex md:flex-col md:justify-start"
                />
            </button>
        </div>
    );
};

export default CareerCard;
