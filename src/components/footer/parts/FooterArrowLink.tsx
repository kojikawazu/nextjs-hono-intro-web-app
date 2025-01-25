import React from 'react';
// shared
import { MESSAGES } from '@/shared/constants/constants';
import { validatePropsFilter, validateFunctionProps } from '@/shared/utils/validateUtilities';
import { customLog, componentStart, componentJSX } from '@/shared/utils/logUtilities';
import { sendLogsToGCF } from '@/shared/helper/googleCloudLogger';
// components
import ErrorComponent from '@/components/common/error/ErrorComponent';
import ScrollTopIcon from '@/components/common/icons/ScrollTopIcon';

/** Propsの型定義 */
type FooterArrowLinkProps = {
    className?: string;
    ariaLabel?: string;
    onClick: () => void;
    icon?: React.ReactNode;
};

/**
 * Footer矢印リンクコンポーネント
 * @returns JSX
 */
const FooterArrowLink: React.FC<FooterArrowLinkProps> = ({
    className = '',
    ariaLabel = 'footer arrow link',
    onClick,
    icon = <ScrollTopIcon />,
}) => {
    componentStart(FooterArrowLink);

    // Props検証
    const functionError = validateFunctionProps([onClick], MESSAGES.ERRORS.NOT_FUNCTIONS);
    const errors = validatePropsFilter([functionError]);
    if (errors.length > 0) {
        const errorJoin = errors.join(' ');
        customLog(FooterArrowLink, 'error', errorJoin);
        sendLogsToGCF([errorJoin], 'ERROR');
        return <ErrorComponent errorData={MESSAGES.INVALIDS.INVALID_PROPS} />;
    }

    componentJSX(FooterArrowLink);
    return (
        <button className={className} aria-label={ariaLabel} onClick={onClick}>
            {icon}
        </button>
    );
};

export default FooterArrowLink;
