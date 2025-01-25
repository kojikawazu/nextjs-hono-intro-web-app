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
type NormalHeaderMenuLinkProps = {
    menuClass?: string;
    ariaLabel: string;
    btnClass?: string;
    onClick: () => void;
    btnLabel: string;
};

/**
 * ノーマルヘッダーメニューリンクコンポーネント
 * @returns JSX
 */
const NormalHeaderMenuLink: React.FC<NormalHeaderMenuLinkProps> = ({
    menuClass = '',
    ariaLabel,
    btnClass = '',
    onClick,
    btnLabel,
}) => {
    componentStart(NormalHeaderMenuLink);

    // Props検証
    const functionError = validateFunctionProps([onClick], MESSAGES.ERRORS.NOT_FUNCTIONS);
    const stringError = validateStringProps([ariaLabel, btnLabel], MESSAGES.ERRORS.NOT_STRING);
    const errors = validatePropsFilter([functionError, stringError]);
    if (errors.length > 0) {
        const errorJoin = errors.join(' ');
        customLog(NormalHeaderMenuLink, 'error', errorJoin);
        sendLogsToGCF([errorJoin], 'ERROR');
        return <ErrorComponent errorData={MESSAGES.INVALIDS.INVALID_PROPS} />;
    }

    componentJSX(NormalHeaderMenuLink);
    return (
        <div className={menuClass}>
            <button type="button" aria-label={ariaLabel} className={btnClass} onClick={onClick}>
                {btnLabel}
            </button>
        </div>
    );
};

export default NormalHeaderMenuLink;
