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
type NavBarTitleProps = {
    ariaLabel: string;
    btnClass?: string;
    onClick: () => void;
    label: string;
};

/**
 * ナビバータイトルコンポーネント
 * @returns JSX
 */
const NavBarTitle: React.FC<NavBarTitleProps> = ({ ariaLabel, btnClass = '', onClick, label }) => {
    componentStart(NavBarTitle);

    // Props検証
    const functionError = validateFunctionProps([onClick], MESSAGES.ERRORS.NOT_FUNCTIONS);
    const stringError = validateStringProps([ariaLabel, label], MESSAGES.ERRORS.NOT_STRING);
    const errors = validatePropsFilter([functionError, stringError]);
    if (errors.length > 0) {
        const errorJoin = errors.join(' ');
        customLog(NavBarTitle, 'error', errorJoin);
        sendLogsToGCF([errorJoin], 'ERROR');
        return <ErrorComponent errorData={MESSAGES.INVALIDS.INVALID_PROPS} />;
    }

    componentJSX(NavBarTitle);
    return (
        <button aria-label={ariaLabel} className={btnClass} onClick={onClick}>
            <h1>{label}</h1>
        </button>
    );
};

export default NavBarTitle;
