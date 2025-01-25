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
type HamburgerLinkProps = {
    label: string;
    onClick: () => void;
    iconComponent: React.ReactNode;
};

/**
 * ハンバーガーメニューリンクコンポーネント
 * @returns JSX
 */
const HamburgerLink: React.FC<HamburgerLinkProps> = ({ label, onClick, iconComponent }) => {
    componentStart(HamburgerLink);

    // Props検証
    const functionError = validateFunctionProps([onClick], MESSAGES.ERRORS.NOT_FUNCTIONS);
    const stringError = validateStringProps([label], MESSAGES.ERRORS.NOT_STRING);
    const errors = validatePropsFilter([functionError, stringError]);
    if (errors.length > 0) {
        const errorJoin = errors.join(' ');
        customLog(HamburgerLink, 'error', errorJoin);
        sendLogsToGCF([errorJoin], 'ERROR');
        return <ErrorComponent errorData={MESSAGES.INVALIDS.INVALID_PROPS} />;
    }

    componentJSX(HamburgerLink);
    return (
        <li
            role="menuitem"
            className="flex justify-between items-center border-b-2 border-dashed border-dblue hover:bg-hoverdblue"
        >
            <button
                onClick={onClick}
                className="flex justify-between w-full"
                style={{
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    margin: 0,
                    font: 'inherit',
                    cursor: 'pointer',
                    outline: 'inherit',
                    appearance: 'none',
                }}
            >
                <div className="pl-10 xs:pl-20 ssm:pl-32 py-5 text-2xl inline-block">{label}</div>

                <div className="pr-8 py-5">{iconComponent}</div>
            </button>
        </li>
    );
};

export default HamburgerLink;
