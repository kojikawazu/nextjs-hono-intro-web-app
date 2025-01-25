import React from 'react';
// shared
import { componentJSX } from '@/shared/utils/logUtilities';

/** Propsの型定義 */
type FooterCopyRightProps = {
    className?: string;
    label?: string;
};

/**
 * CopyRightコンポーネント
 * @returns JSX
 */
const FooterCopyRight: React.FC<FooterCopyRightProps> = ({
    className = '',
    label = 'copy right',
}) => {
    componentJSX(FooterCopyRight);
    return <small className={`footer-copyright ${className}`}>{label}</small>;
};

export default FooterCopyRight;
