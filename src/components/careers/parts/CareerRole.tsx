import React from 'react';
// shared
import { MESSAGES } from '@/shared/constants/constants';
import { validatePropsFilter, validateStringProps } from '@/shared/utils/validateUtilities';
import { customLog, componentStart, componentJSX } from '@/shared/utils/logUtilities';
import { sendLogsToGCF } from '@/shared/helper/googleCloudLogger';
// components
import ErrorComponent from '@/components/common/error/ErrorComponent';

/** Propsの型定義 */
type CareerRoleProps = {
    careerTitle: string;
    careerRole: string;
    className?: string;
};

/**
 * CareerRoleコンポーネント
 * @returns JSX
 */
const CareerRole: React.FC<CareerRoleProps> = ({ careerTitle, careerRole, className = '' }) => {
    componentStart(CareerRole);

    // Props検証
    const stringError = validateStringProps([careerTitle, careerRole], MESSAGES.ERRORS.NOT_STRING);
    const errors = validatePropsFilter([stringError]);
    if (errors.length > 0) {
        const errorJoin = errors.join(' ');
        customLog(CareerRole, 'error', errorJoin);
        sendLogsToGCF([errorJoin], 'ERROR');
        return <ErrorComponent errorData={MESSAGES.INVALIDS.INVALID_PROPS} />;
    }

    componentJSX(CareerRole);
    return (
        <div className={`${className} pb-4`}>
            <div className="flex pb-2">
                <div className="">{careerTitle}</div>
                <div className="px-1">:</div>
            </div>
            <div className="text-left">{careerRole}</div>
        </div>
    );
};

export default CareerRole;
