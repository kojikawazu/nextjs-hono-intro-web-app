import React from 'react';
// shared
import { MESSAGES } from '@/shared/constants/constants';
import { validatePropsFilter, validateStringProps } from '@/shared/utils/validateUtilities';
import { customLog, componentStart, componentJSX } from '@/shared/utils/logUtilities';
import { sendLogsToGCF } from '@/shared/helper/googleCloudLogger';
// components
import ErrorComponent from '@/components/common/error/ErrorComponent';

/** Propsの型定義 */
type ContactButtonProps = {
    btnType?: 'button' | 'submit';
    btnName: string;
    className?: string;
    onClick?: () => void;
    ariaLabel?: string;
};

function defaultHandler() {}

/**
 * お問い合わせボタンコンポーネント
 * @returns JSX
 */
const ContactButton: React.FC<ContactButtonProps> = ({
    btnType = 'submit',
    btnName,
    className = '',
    onClick = defaultHandler,
    ariaLabel,
}) => {
    componentStart(ContactButton);

    // Props検証
    const stringError = validateStringProps([btnName], MESSAGES.ERRORS.NOT_STRING);
    const errors = validatePropsFilter([stringError]);
    if (errors.length > 0) {
        const errorJoin = errors.join(' ');
        customLog(ContactButton, 'error', errorJoin);
        sendLogsToGCF([errorJoin], 'ERROR');
        return <ErrorComponent errorData={MESSAGES.INVALIDS.INVALID_PROPS} />;
    }

    componentJSX(ContactButton);
    return (
        <button
            type={btnType}
            className={`btn btn-primary bg-lblue hover:bg-lblue-btn-hover rounded-xl shadow-lg active:shadow-sm ${className}`}
            onClick={onClick}
            aria-label={ariaLabel || btnName}
        >
            {btnName}
        </button>
    );
};

export default ContactButton;
