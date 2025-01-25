import React from 'react';
// shared
import { MESSAGES } from '@/shared/constants/constants';
import { validatePropsFilter, validateFunctionProps } from '@/shared/utils/validateUtilities';
import { sendLogsToGCF } from '@/shared/helper/googleCloudLogger';
import { customLog, componentStart, componentJSX } from '@/shared/utils/logUtilities';
// components
import ErrorComponent from '@/components/common/error/ErrorComponent';
import ArrowIcon from '@/components/common/icons/ArrowIcon';

/** Propsの型定義 */
type NavigatorProps = {
    direction: 'prev' | 'next';
    componentClassName?: string;
    btnclassName?: string;
    onClick: () => void;
};

/**
 * Navigatorコンポーネント
 * @returns JSX
 */
const Navigator: React.FC<NavigatorProps> = ({
    direction,
    componentClassName = '',
    btnclassName = '',
    onClick,
}) => {
    componentStart(Navigator);

    // Props検証
    const functionError = validateFunctionProps([onClick], MESSAGES.ERRORS.NOT_FUNCTIONS);
    const errors = validatePropsFilter([functionError]);
    if (errors.length > 0) {
        const errorJoin = errors.join(' ');
        customLog(Navigator, 'error', errorJoin);
        sendLogsToGCF([errorJoin], 'ERROR');
        return <ErrorComponent errorData={MESSAGES.INVALIDS.INVALID_PROPS} />;
    }

    const isPrev = direction === 'prev';

    componentJSX(Navigator);
    return (
        <div className={componentClassName}>
            <button
                className={btnclassName}
                onClick={onClick}
                aria-label={isPrev ? 'Previous' : 'Next'}
            >
                <ArrowIcon angleCSS={isPrev ? '-rotate-90' : 'rotate-90'} />
            </button>
        </div>
    );
};

export default Navigator;
