// components
import CareerDialogArea from '@/components/careers/dialog/CareerDialogArea';
import ContactSendNotification from '@/components/contact/notice/ContactSendNotification';
import ContactActionSpinner from '@/components/contact/spinner/ContactActionSpinner';

/**
 * 最前面エリアコンポーネント
 * @returns JSX
 */
const FrontArea = () => {
    return (
        <>
            <CareerDialogArea />
            <ContactActionSpinner />
            <ContactSendNotification />
        </>
    );
};

export default FrontArea;
