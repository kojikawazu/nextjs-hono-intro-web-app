import React from 'react';
import classNames from 'classnames';
// shared
import { MESSAGES } from '@/shared/constants/constants';
import {
    validatePropsFilter,
    validateFunctionProps,
    validateNumberProps,
} from '@/shared/utils/validateUtilities';
import { sendLogsToGCF } from '@/shared/helper/googleCloudLogger';
import { customLog, componentStart, componentJSX } from '@/shared/utils/logUtilities';
// components
import ErrorComponent from '@/components/common/error/ErrorComponent';

/** Propsの型定義 */
type IndicatorProps = {
    currentIndex: number;
    careerDataLength: number;
    className: string;
    innerClass: string;
    btnBaseClass: string;
    btnActiveClass: string;
    btnNoActiveClass: string;
    jumpToCard: (arg0: number) => void;
};

/**
 * Indicatorコンポーネント
 * @returns JSX
 */
const Indicator: React.FC<IndicatorProps> = ({
    currentIndex,
    careerDataLength,
    className,
    innerClass,
    btnBaseClass,
    btnActiveClass,
    btnNoActiveClass,
    jumpToCard,
}) => {
    componentStart(Indicator);

    // Props検証
    const functionError = validateFunctionProps([jumpToCard], MESSAGES.ERRORS.NOT_FUNCTIONS);
    const numberError = validateNumberProps(
        [currentIndex, careerDataLength],
        MESSAGES.ERRORS.NOT_NUMBERS,
    );
    const errors = validatePropsFilter([functionError, numberError]);
    if (errors.length > 0) {
        const errorJoin = errors.join(' ');
        customLog(Indicator, 'error', errorJoin);
        sendLogsToGCF([errorJoin], 'ERROR');
        return <ErrorComponent errorData={MESSAGES.INVALIDS.INVALID_PROPS} />;
    }

    componentJSX(Indicator);
    return (
        <div className={className}>
            <div className={innerClass}>
                {Array.from({ length: careerDataLength }).map((_, index) => {
                    const activeClass = index === currentIndex ? btnActiveClass : btnNoActiveClass;
                    const className = classNames(btnBaseClass, activeClass);

                    return (
                        <button
                            key={index}
                            onClick={() => jumpToCard(index)}
                            className={className}
                            aria-label={`Move to ${index + 1}`}
                        >
                            &bull;
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default Indicator;
