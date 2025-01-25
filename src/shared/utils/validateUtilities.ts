/**
 * 文字列の長さバリデーション
 * @param target 検証文字列
 * @param length 文字列の長さ
 * @returns true OK false NG
 */
export const isValidLength = (target: string, length: number): boolean => {
    return target.length >= 1 && target.length <= length;
};

/**
 * Eメールバリデーション
 * @param email Eメール
 * @returns true OK false NG
 */
export const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
};

/**
 * 特殊文字バリデーション
 * @param text
 * @returns true OK false NG
 */
export const isValidSpecialCharacters = (text: string): boolean => {
    // 一般的な特殊文字を制限する
    const specialCharsRegex = /[<>!@#$%^&*()_+\-=\[\]{}':"\\|,~]/;
    return !specialCharsRegex.test(text);
};

/**
 * props検証(文字列)
 * @param props
 * @param errorMessage
 * @returns エラーメッセージ or null
 */
export const validateStringProps = (props: string[], errorMessage: string): string | null => {
    for (const prop of props) {
        if (!prop) {
            return errorMessage;
        }
    }
    return null;
};

/**
 * props検証(number型)
 * @param props
 * @param errorMessage
 * @returns エラーメッセージ or null
 */
export const validateNumberProps = (
    props: (number | undefined)[],
    errorMessage: string,
): string | null => {
    for (const prop of props) {
        if (prop === null || prop === undefined) {
            return errorMessage;
        }
    }
    return null;
};

/**
 * props検証(関数)
 * @param props
 * @param errorMessage
 * @returns エラーメッセージ or null
 */
export const validateFunctionProps = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    props: Array<((...args: any[]) => any) | undefined>,
    errorMessage: string,
): string | null => {
    for (const prop of props) {
        if (!prop) {
            return errorMessage;
        }
    }
    return null;
};

/**
 * props検証(データ)
 * @param args
 * @param errorMessage
 * @returns エラーメッセージ or null
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const validateDataProps = (args: any[], errorMessage: string): string | null => {
    for (const arg of args) {
        if (!arg) {
            return errorMessage;
        }
    }
    return null;
};

/**
 * props検証(配列)
 * @param list
 * @param errorMessage
 * @returns エラーメッセージ or null
 */
export const validateArraysProps = (
    list: (Array<unknown> | undefined)[],
    errorMessage: string,
): string | null => {
    for (const arg of list) {
        if (!Array.isArray(arg) || arg.length === 0) {
            return errorMessage;
        }
    }
    return null;
};

/**
 * props検証(ref)
 * @param refList
 * @param errorMessage
 * @returns エラーメッセージ or null
 */
export const validateRefProps = (
    refList: (React.RefObject<HTMLDivElement> | undefined)[],
    errorMessage: string,
): string | null => {
    for (const ref of refList) {
        if (!ref) {
            return errorMessage;
        }
    }
    return null;
};

/**
 * props検証のフィルター
 * @param errorList
 * @returns エラーメッセージリスト
 */
export const validatePropsFilter = (errorList: Array<string | null>): Array<string | null> => {
    const filteredErrors = errorList.filter((e) => e !== null && e !== undefined) as Array<string>;
    return filteredErrors !== null && filteredErrors.length > 0 ? filteredErrors : [];
};
