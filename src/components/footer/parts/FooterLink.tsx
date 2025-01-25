import React from 'react';
import classNames from 'classnames';
// shared
import { MESSAGES } from '@/shared/constants/constants';
import {
    validatePropsFilter,
    validateStringProps,
    validateRefProps,
} from '@/shared/utils/validateUtilities';
import { useScrollToRef } from '@/hooks/useScroll';
import { customLog, componentStart, componentJSX } from '@/shared/utils/logUtilities';
import { sendLogsToGCF } from '@/shared/helper/googleCloudLogger';
// components
import ErrorComponent from '@/components/common/error/ErrorComponent';

/** Propsの型定義 */
type FooterLinkProps = {
    linkTitle: string;
    isEnd: boolean;
    refData: React.RefObject<HTMLDivElement> | undefined;
};

/**
 * Footerリンクコンポーネント
 * @returns JSX
 */
const FooterLink: React.FC<FooterLinkProps> = ({ linkTitle, isEnd, refData }) => {
    componentStart(FooterLink);
    // hooks
    const scrollToRef = useScrollToRef(refData);

    // Props検証
    const stringError = validateStringProps([linkTitle], MESSAGES.ERRORS.NOT_STRING);
    const refError = validateRefProps([refData], MESSAGES.ERRORS.NOT_REF);
    const errors = validatePropsFilter([stringError, refError]);
    if (errors.length > 0) {
        const errorJoin = errors.join(' ');
        customLog(FooterLink, 'error', errorJoin);
        sendLogsToGCF([errorJoin], 'ERROR');
        return <ErrorComponent errorData={MESSAGES.INVALIDS.INVALID_PROPS} />;
    }

    const baseStyles = ['text-white', 'hover:text-gray-300'];
    const textStyles = ['text-xxs', 'sssm:text-xs', 'sm:text-base', 'md:text-xl'];
    const pmStyles = [
        'px-2',
        'xs:px-3',
        'ssssm:px-5',
        'sm:px-8',
        'mx-1',
        'sm:mx-2',
        'my-4',
        'sm:my-8',
    ];
    const conditionalStyles = [isEnd ? '' : 'border-r'];
    const styles = classNames(baseStyles, textStyles, pmStyles, conditionalStyles);

    componentJSX(FooterLink);
    return (
        <div>
            <button className={styles} onClick={scrollToRef}>
                {linkTitle}
            </button>
        </div>
    );
};

export default FooterLink;
