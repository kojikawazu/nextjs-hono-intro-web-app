import React from 'react';
// contexts
import { useIntroData } from '@/contexts/IntroContext';
// shared
import { MESSAGES } from '@/shared/constants/constants';
import {
    validatePropsFilter,
    validateStringProps,
    validateDataProps,
} from '@/shared/utils/validateUtilities';
import { customLog, componentStart, componentJSX } from '@/shared/utils/logUtilities';
import { sendLogsToGCF } from '@/shared/helper/googleCloudLogger';
// components
import ErrorComponent from '@/components/common/error/ErrorComponent';
import LoadingSpinner from '@/components/common/spinner/LoadingSpinner';
import Title from '@/components/common/title/Title';
import ContactForm from '@/components/contact/ContactForm';

/**
 * Contactコンポーネント
 * @returns JSX
 */
const Contact = () => {
    componentStart(Contact);

    // Context
    const { introData, refData, isLoading } = useIntroData();
    if (isLoading) {
        return <LoadingSpinner isVisible={isLoading} />;
    }

    // Props検証
    if (!introData || !introData.contact_data || !refData) {
        const errorJoin = MESSAGES.ERRORS.DATA_ERROR;
        customLog(Contact, 'error', errorJoin);
        sendLogsToGCF([errorJoin], 'ERROR');
        return <ErrorComponent errorData={MESSAGES.ERRORS.DATA_LOADING} />;
    }
    const dataError = validateDataProps(
        [introData.navbar_data, introData.contact_data],
        MESSAGES.ERRORS.NOT_DATA,
    );
    const stringError = validateStringProps(
        [
            introData.contact_data.contact_name ?? '',
            introData.contact_data.contact_email ?? '',
            introData.contact_data.contact_contents ?? '',
            introData.contact_data.contact_btn_name ?? '',
        ],
        MESSAGES.ERRORS.NOT_STRING,
    );
    const errors = validatePropsFilter([dataError, stringError]);
    if (errors.length > 0) {
        const errorJoin = MESSAGES.ERRORS.DATA_LOADING;
        customLog(Contact, 'error', errorJoin);
        sendLogsToGCF([errorJoin], 'ERROR');
        return <ErrorComponent errorData={MESSAGES.ERRORS.DATA_LOADING} />;
    }

    const { navbar_data: navbarData, contact_data: contactData } = introData;
    componentJSX(Contact);
    return (
        <div className="w-full bg-white" ref={refData.contactRef}>
            <div className="flex justify-center items-center pt-32 pb-6">
                <Title titleName={navbarData.contact_name} />
            </div>

            <div className="pb-10">
                <ContactForm contactData={contactData} />
            </div>
        </div>
    );
};

export default Contact;
