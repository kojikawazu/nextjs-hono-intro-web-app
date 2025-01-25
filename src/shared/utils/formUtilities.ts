import { ChangeEvent } from 'react';

/**
 * 入力値変更処理
 * @param e
 * @param setter
 */
export function handleFieldChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    setter: (value: string) => void,
) {
    setter(e.target.value);
}
