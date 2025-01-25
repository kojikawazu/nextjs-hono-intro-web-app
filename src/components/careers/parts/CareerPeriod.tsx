import React from 'react';
// shared
import { MESSAGES } from '@/shared/constants/constants';
import { validatePropsFilter, validateStringProps } from '@/shared/utils/validateUtilities';
import { customLog, componentStart, componentJSX } from '@/shared/utils/logUtilities';
import { sendLogsToGCF } from '@/shared/helper/googleCloudLogger';
// components
import ErrorComponent from '@/components/common/error/ErrorComponent';

/** Propsの型定義 */
type CareerPeriodProps = {
    careerTitle: string;
    careerStart: string;
    careerEnd: string;
    className?: string;
};

/**
 * CareerPeriodコンポーネント
 * @returns JSX
 */
const CareerPeriod: React.FC<CareerPeriodProps> = ({
    careerTitle,
    careerStart,
    careerEnd,
    className = '',
}) => {
    componentStart(CareerPeriod);

    // Props検証
    const stringError = validateStringProps(
        [careerTitle, careerStart, careerEnd],
        MESSAGES.ERRORS.NOT_STRING,
    );
    const errors = validatePropsFilter([stringError]);
    if (errors.length > 0) {
        const errorJoin = errors.join(' ');
        customLog(CareerPeriod, 'error', errorJoin);
        sendLogsToGCF([errorJoin], 'ERROR');
        return <ErrorComponent errorData={MESSAGES.INVALIDS.INVALID_PROPS} />;
    }

    componentJSX(CareerPeriod);
    return (
        <div className={`flex ${className} pb-1`}>
            <div className="">{careerTitle}</div>
            <div className="px-2">:</div>
            <div className="">{careerStart}</div>
            <div className="px-2">~</div>
            <div className="">{careerEnd}</div>
        </div>
    );
};

export default CareerPeriod;
