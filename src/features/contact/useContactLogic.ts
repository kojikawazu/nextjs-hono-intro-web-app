import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
// shared
import { MESSAGES } from '@/shared/constants/constants';
import { customLog } from '@/shared/utils/logUtilities';
import {
    isValidLength,
    isValidEmail,
    isValidSpecialCharacters,
} from '@/shared/utils/validateUtilities';
// features
import {
    setContactName,
    setContactEmail,
    setContactMessage,
    setNotificationVisible,
    setFadingOut,
    sendContactStart,
    sendContactSuccess,
    sendContactFailed,
    resetContactForm,
    setValidationErrors,
    ValidationErrors,
} from '@/features/contact/contactSlice';
import { RootState } from '@/features/store';

// Constants
const ERROR_NAME = MESSAGES.MAIL.CONTACT_ERROR_NAME;
const ERROR_EMAIL = MESSAGES.MAIL.CONTACT_ERROR_EMAIL;
const ERROR_MESSAGE = MESSAGES.MAIL.CONTACT_ERROR_MESSAGE;
const CONFIRM_DATA = MESSAGES.MAIL.CONTACT_CONFIRM;
const TITLE_PREFIX = MESSAGES.MAIL.MAIN_TITLE_PREFIX;

const VISIBLE_COUNT = 4500;
const TOTAL_COUNT = 5000;

/** contactのhook */
export const useContactLogic = () => {
    // dispatch
    const dispatch = useDispatch();

    // selector
    const contactName = useSelector((state: RootState) => state.contact.contactName);
    const contactEmail = useSelector((state: RootState) => state.contact.contactEmail);
    const contactMessage = useSelector((state: RootState) => state.contact.contactMessage);
    const contactStatus = useSelector((state: RootState) => state.contact.contactStatus);
    const validationErrors = useSelector((state: RootState) => state.contact.validationErrors);
    const isNotificationVisible = useSelector(
        (state: RootState) => state.contact.isNotificationVisible,
    );
    const isFadingOut = useSelector((state: RootState) => state.contact.isFadingOut);
    const contactStatusStr: string = contactStatus;

    /**
     * バリデーション
     * @returns true 検証成功 false 検証失敗
     */
    const validate = () => {
        const errors: ValidationErrors = {};

        if (
            !contactName ||
            !isValidLength(contactName, 10) ||
            !isValidSpecialCharacters(contactName)
        )
            errors.contactName = ERROR_NAME;
        if (!contactEmail || !isValidEmail(contactEmail)) errors.contactEmail = ERROR_EMAIL;
        if (!contactMessage || !isValidSpecialCharacters(contactMessage))
            errors.contactMessage = ERROR_MESSAGE;

        dispatch(setValidationErrors(errors));
        return Object.keys(errors).length === 0;
    };

    /**
     * 送信通知処理
     */
    const handleSendNotice = () => {
        // メール送信のロジック
        dispatch(setNotificationVisible(true));

        // 4.5秒後に透明にする
        setTimeout(() => {
            dispatch(setFadingOut(true));
        }, VISIBLE_COUNT);

        // 5秒後に実際に非表示にする
        setTimeout(() => {
            // 状態をリセット
            dispatch(setNotificationVisible(false));
            dispatch(setFadingOut(false));
        }, TOTAL_COUNT);
    };

    /**
     * 問い合わせ実行
     * @param e フォームイベント
     */
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (validate()) {
            // 確認ダイアログの表示
            if (window.confirm(CONFIRM_DATA)) {
                // メール送信のロジック
                dispatch(sendContactStart());

                // APIエンドポイントとパラメータを設定
                const API_ENDPOINT = '/api/mail/send';
                const emailData = {
                    name: contactName,
                    from: contactEmail,
                    subjects: contactName + TITLE_PREFIX,
                    messages: contactMessage,
                };

                try {
                    const apiToken = process.env.NEXT_PUBLIC_API_TOKEN || 'default-token';
                    const response = await axios.post(API_ENDPOINT, emailData, {
                        headers: {
                            Authorization: `${apiToken}`,
                            'Content-Type': 'application/json',
                        },
                    });

                    if (response.status === 200) {
                        dispatch(sendContactSuccess());
                        handleSendNotice();
                        dispatch(resetContactForm());
                    } else {
                        dispatch(sendContactFailed('error'));
                        handleSendNotice();
                        customLog('str', 'error', 'Email send failed:', response.data);
                    }
                } catch (error) {
                    dispatch(sendContactFailed('error'));
                    handleSendNotice();
                    customLog('str', 'error', 'Error send email catch:', error);
                }
            }
        }
    };

    return {
        contactName,
        contactEmail,
        contactMessage,
        contactStatusStr,
        validationErrors,
        isNotificationVisible,
        isFadingOut,
        setContactName: (val: string) => dispatch(setContactName(val)),
        setContactEmail: (val: string) => dispatch(setContactEmail(val)),
        setContactMessage: (val: string) => dispatch(setContactMessage(val)),
        setOffNotificationVisible: () => dispatch(setNotificationVisible(false)),
        sendContactStart: () => dispatch(sendContactStart()),
        sendContactSuccess: () => dispatch(sendContactSuccess()),
        sendContactFailed: () => dispatch(sendContactFailed('error')),
        validate,
        handleSendNotice,
        handleSubmit,
        contactReset: () => dispatch(resetContactForm()),
    };
};
