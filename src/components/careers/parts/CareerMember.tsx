import React from 'react';
// shared
import { MESSAGES } from '@/shared/constants/constants';
import { validatePropsFilter, validateStringProps } from '@/shared/utils/validateUtilities';
import { customLog, componentStart, componentJSX } from '@/shared/utils/logUtilities';
import { sendLogsToGCF } from '@/shared/helper/googleCloudLogger';
// components
import ErrorComponent from '@/components/common/error/ErrorComponent';

/** Propsの型定義 */
type CareerMemberProps = {
    careerTitle: string;
    careerDetail: string;
    className?: string;
};

/**
 * CareerMemberコンポーネント
 * @returns JSX
 */
const CareerMember: React.FC<CareerMemberProps> = ({
    careerTitle,
    careerDetail,
    className = '',
}) => {
    componentStart(CareerMember);

    // Props検証
    const stringError = validateStringProps(
        [careerTitle, careerDetail],
        MESSAGES.ERRORS.NOT_STRING,
    );
    const errors = validatePropsFilter([stringError]);
    if (errors.length > 0) {
        const errorJoin = errors.join(' ');
        customLog(CareerMember, 'error', errorJoin);
        sendLogsToGCF([errorJoin], 'ERROR');
        return <ErrorComponent errorData={MESSAGES.INVALIDS.INVALID_PROPS} />;
    }

    componentJSX(CareerMember);
    return (
        <div className={`flex ${className} pb-4`}>
            <div className="">{careerTitle}</div>
            <div className="px-2">:</div>
            <div className="">{careerDetail}</div>
        </div>
    );
};

export default CareerMember;
