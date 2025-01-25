import React from 'react';
import classNames from 'classnames';
import { MESSAGES } from '@/shared/constants/constants';
import { validatePropsFilter, validateStringProps } from '@/shared/utils/validateUtilities';
import { customLog, componentStart, componentJSX } from '@/shared/utils/logUtilities';
import { sendLogsToGCF } from '@/shared/helper/googleCloudLogger';
// components
import ErrorComponent from '@/components/common/error/ErrorComponent';

/** Props型定義 */
type CareerTitleProps = {
    careerTitle: string;
    className?: string;
};

/**
 * CareerTitleコンポーネント
 * @returns JSX
 */
const CareerTitle: React.FC<CareerTitleProps> = ({ careerTitle, className = '' }) => {
    componentStart(CareerTitle);

    // Props検証
    const stringError = validateStringProps([careerTitle], MESSAGES.ERRORS.NOT_STRING);
    const errors = validatePropsFilter([stringError]);
    if (errors.length > 0) {
        const errorJoin = errors.join(' ');
        customLog(CareerTitle, 'error', errorJoin);
        sendLogsToGCF([errorJoin], 'ERROR');
        return <ErrorComponent errorData={MESSAGES.INVALIDS.INVALID_PROPS} />;
    }

    const responsiveFontSize = classNames(['text-xxs', 'xs:text-xs', 'md:text-xl']);

    componentJSX(CareerTitle);
    return (
        <div className={`flex ${className}`}>
            <h3
                className={`${responsiveFontSize} underline decoration-1 decoration-solid underline-offset-8`}
            >
                {careerTitle}
            </h3>
        </div>
    );
};

export default CareerTitle;
