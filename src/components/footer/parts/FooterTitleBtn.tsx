import React from 'react';
// shared
import { MESSAGES } from '@/shared/constants/constants';
import {
    validatePropsFilter,
    validateFunctionProps,
    validateStringProps,
} from '@/shared/utils/validateUtilities';
import { customLog, componentStart, componentJSX } from '@/shared/utils/logUtilities';
import { sendLogsToGCF } from '@/shared/helper/googleCloudLogger';
// components
import ErrorComponent from '@/components/common/error/ErrorComponent';

/** Propsの型定義 */
type FooterTitleBtnProps = {
    className?: string;
    ariaLabel?: string;
    onClick: () => void;
    labelClassName?: string;
    label: string;
};

/**
 * FooterTitleボタンコンポーネント
 * @returns JSX
 */
const FooterTitleBtn: React.FC<FooterTitleBtnProps> = ({
    className = '',
    ariaLabel = 'footer title btn',
    onClick,
    labelClassName = '',
    label,
}) => {
    componentStart(FooterTitleBtn);

    // Props検証
    const functionError = validateFunctionProps([onClick], MESSAGES.ERRORS.NOT_FUNCTIONS);
    const stringError = validateStringProps([label], MESSAGES.ERRORS.NOT_STRING);
    const errors = validatePropsFilter([functionError, stringError]);
    if (errors.length > 0) {
        const errorJoin = errors.join(' ');
        customLog(FooterTitleBtn, 'error', errorJoin);
        sendLogsToGCF([errorJoin], 'ERROR');
        return <ErrorComponent errorData={MESSAGES.INVALIDS.INVALID_PROPS} />;
    }

    componentJSX(FooterTitleBtn);
    return (
        <button className={className} aria-label={ariaLabel} onClick={onClick}>
            <span className={labelClassName}>{label}</span>
        </button>
    );
};

export default FooterTitleBtn;
