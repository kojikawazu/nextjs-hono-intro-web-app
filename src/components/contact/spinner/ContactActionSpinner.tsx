import React from 'react';
// shared
import { componentStart, componentJSX } from '@/shared/utils/logUtilities';
// components
import LoadingSpinner from '@/components/common/spinner/LoadingSpinner';
// features
import { useContactLogic } from '@/features/contact/useContactLogic';

/**
 * お問い合わせ実行用スピナーコンポーネント
 * @returns JSX
 */
const ContactActionSpinner = () => {
    componentStart(ContactActionSpinner);

    // hooks(Redux toolkit)
    const { contactStatusStr } = useContactLogic();
    const isVisible = contactStatusStr === 'loading';

    componentJSX(ContactActionSpinner);
    return <LoadingSpinner isVisible={isVisible} />;
};

export default ContactActionSpinner;
