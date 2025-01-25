import React from 'react';
// shared
import { MESSAGES } from '@/shared/constants/constants';
import {
    validatePropsFilter,
    validateStringProps,
    validateArraysProps,
} from '@/shared/utils/validateUtilities';
import { customLog, componentStart, componentJSX } from '@/shared/utils/logUtilities';
import { sendLogsToGCF } from '@/shared/helper/googleCloudLogger';
// components
import ErrorComponent from '@/components/common/error/ErrorComponent';
import StackCard from '@/components/careers/cards/StackCard';

/** Propsの型定義 */
type CareerPhaseProps = {
    careerTitle: string;
    careerPhases: Array<string>;
    className?: string;
};

/**
 * CareerPhaseコンポーネント
 * @returns JSX
 */
const CareerPhase: React.FC<CareerPhaseProps> = ({ careerTitle, careerPhases, className = '' }) => {
    componentStart(CareerPhase);

    // Props検証
    const stringError = validateStringProps([careerTitle], MESSAGES.ERRORS.NOT_STRING);
    const arrayError = validateArraysProps([careerPhases], MESSAGES.ERRORS.NOT_ARRAYS);
    const errors = validatePropsFilter([stringError, arrayError]);
    if (errors.length > 0) {
        const errorJoin = errors.join(' ');
        customLog(CareerPhase, 'error', errorJoin);
        sendLogsToGCF([errorJoin], 'ERROR');
        return <ErrorComponent errorData={MESSAGES.INVALIDS.INVALID_PROPS} />;
    }

    componentJSX(CareerPhase);
    return (
        <div className={`${className} pb-4`}>
            <div className="flex pb-2">
                <div className="">{careerTitle}</div>
                <div className="px-1">:</div>
            </div>

            <div className="flex flex-wrap">
                {careerPhases.map((phase, index) => (
                    <StackCard stackName={phase} key={phase + '_' + index} />
                ))}
            </div>
        </div>
    );
};

export default CareerPhase;
