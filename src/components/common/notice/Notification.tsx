import React from 'react';
// shared
import { MESSAGES } from '@/shared/constants/constants';
import {
    validatePropsFilter,
    validateStringProps,
    validateFunctionProps,
} from '@/shared/utils/validateUtilities';
import { customLog, componentStart, componentJSX } from '@/shared/utils/logUtilities';
import { sendLogsToGCF } from '@/shared/helper/googleCloudLogger';
// components
import ErrorComponent from '@/components/common/error/ErrorComponent';

/** Propsの型定義 */
type NotificationProps = {
    isVisible?: boolean;
    isFadingOut?: boolean;
    bgColor?: string;
    message: string;
    onClose: () => void;
};

/**
 * 通知コンポーネント
 * @returns JSX
 */
const Notification: React.FC<NotificationProps> = ({
    isVisible = false,
    isFadingOut = false,
    bgColor = 'bg-green-500',
    message,
    onClose,
}) => {
    componentStart(Notification);

    const functionError = validateFunctionProps([onClose], MESSAGES.ERRORS.NOT_FUNCTIONS);
    const stringError = validateStringProps([message], MESSAGES.ERRORS.NOT_STRING);
    const errors = validatePropsFilter([functionError, stringError]);
    if (errors.length > 0) {
        const errorJoin = errors.join(' ');
        customLog(Notification, 'error', errorJoin);
        sendLogsToGCF([errorJoin], 'ERROR');
        return <ErrorComponent errorData={MESSAGES.INVALIDS.INVALID_PROPS} />;
    }

    const visibilityClass = isVisible ? 'visible' : 'invisible';
    const opacityClass = isFadingOut ? 'opacity-0' : 'opacity-100';

    componentJSX(Notification);
    return (
        <div
            className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 p-4 ${bgColor} text-white rounded transition-opacity duration-500 ${visibilityClass} ${opacityClass}`}
        >
            {message}
            <button className="ml-2" onClick={onClose}>
                ✕
            </button>
        </div>
    );
};

export default Notification;
