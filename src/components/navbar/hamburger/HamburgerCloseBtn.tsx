import React from 'react';
import classNames from 'classnames';
// shared
import { MESSAGES } from '@/shared/constants/constants';
import { validatePropsFilter, validateFunctionProps } from '@/shared/utils/validateUtilities';
import { customLog, componentStart, componentJSX } from '@/shared/utils/logUtilities';
import { sendLogsToGCF } from '@/shared/helper/googleCloudLogger';
// components
import ErrorComponent from '@/components/common/error/ErrorComponent';

/** Propsの型定義 */
type HamburgerCloseBtnProps = {
    onClick: () => void;
    ariaLabel?: string;
};

/**
 * ハンバーガーメニューの閉じるボタンコンポーネント
 * @returns JSX
 */
const HamburgerCloseBtn: React.FC<HamburgerCloseBtnProps> = ({
    onClick,
    ariaLabel = 'メニューを閉じる',
}) => {
    componentStart(HamburgerCloseBtn);

    // Props検証
    const functionError = validateFunctionProps([onClick], MESSAGES.ERRORS.NOT_FUNCTIONS);
    const errors = validatePropsFilter([functionError]);
    if (errors.length > 0) {
        const errorJoin = errors.join(' ');
        customLog(HamburgerCloseBtn, 'error', errorJoin);
        sendLogsToGCF([errorJoin], 'ERROR');
        return <ErrorComponent errorData={MESSAGES.INVALIDS.INVALID_PROPS} />;
    }

    const commonClass = classNames(['w-10', 'h-0.5', 'bg-dblue', 'transform']);
    const leftClass = classNames(commonClass, ['rotate-45']);
    const rightClass = classNames(commonClass, ['-rotate-45']);

    componentJSX(HamburgerCloseBtn);
    return (
        <button type="button" aria-label={ariaLabel} onClick={onClick}>
            <div className={leftClass}></div>
            <div className={rightClass}></div>
        </button>
    );
};

export default HamburgerCloseBtn;
