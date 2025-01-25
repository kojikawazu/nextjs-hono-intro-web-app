import React from 'react';
// shared
import { MESSAGES } from '@/shared/constants/constants';
import { useContactLogic } from '@/features/contact/useContactLogic';
import { componentStart, componentJSX } from '@/shared/utils/logUtilities';
// components
import Notification from '@/components/common/notice/Notification';

/**
 * 送信通知コンポーネント
 * @returns JSX
 */
const ContactSendNotification = () => {
    componentStart(ContactSendNotification);

    // hooks(Redux toolkit)
    const { contactStatusStr, isNotificationVisible, isFadingOut, setOffNotificationVisible } =
        useContactLogic();
    const bgColor = contactStatusStr === 'failed' ? 'bg-red-500' : 'bg-green-500';
    const notice = ((contactStatusStr === 'failed'
        ? MESSAGES.MAIL.NOTICE_FAILED
        : MESSAGES.MAIL.NOTICE_SUCCESSED) || 'notice') as string;

    componentJSX(ContactSendNotification);
    return (
        <Notification
            isVisible={isNotificationVisible}
            isFadingOut={isFadingOut}
            bgColor={bgColor}
            message={notice}
            onClose={setOffNotificationVisible}
        />
    );
};

export default ContactSendNotification;
