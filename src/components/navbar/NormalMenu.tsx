import React from 'react';
// types
import { NavBarMenuType } from '@/types/NavBarMenuType';
// shared
import { MESSAGES } from '@/shared/constants/constants';
import { validatePropsFilter, validateArraysProps } from '@/shared/utils/validateUtilities';
import { customLog, componentStart, componentJSX } from '@/shared/utils/logUtilities';
import { sendLogsToGCF } from '@/shared/helper/googleCloudLogger';
// components
import ErrorComponent from '@/components/common/error/ErrorComponent';
import NormalHMenuLink from '@/components/navbar/normal/NormalHeaderMenuLink';

/** Propsの型定義 */
type NormalMenuProps = {
    menuList: Array<NavBarMenuType>;
};

/**
 * NormalMenuコンポーネント
 * @returns JSX
 */
const NormalMenu: React.FC<NormalMenuProps> = ({ menuList }) => {
    componentStart(NormalMenu);

    // Props検証
    const arrayError = validateArraysProps([menuList], MESSAGES.ERRORS.NOT_ARRAYS);
    const errors = validatePropsFilter([arrayError]);
    if (errors.length > 0) {
        const errorJoin = errors.join(' ');
        customLog(NormalMenu, 'error', errorJoin);
        sendLogsToGCF([errorJoin], 'ERROR');
        return <ErrorComponent errorData={MESSAGES.INVALIDS.INVALID_PROPS} />;
    }

    componentJSX(NormalMenu);
    return (
        <>
            <div className="flex mt-3 mr-3 border-black">
                {menuList.map((menu, index) => {
                    const isLastItem = menuList.length - 1 !== index;
                    const menuItemStyle = `px-6 ${isLastItem ? 'border-r border-black' : 'border-black'}`;
                    const btnStyles = 'hover:text-gray-500';

                    return (
                        <NormalHMenuLink
                            key={menu.label}
                            menuClass={menuItemStyle}
                            ariaLabel={`Navigate to ${menu.ariaLabel} section`}
                            btnClass={btnStyles}
                            onClick={menu.action}
                            btnLabel={menu.label}
                        />
                    );
                })}
            </div>
        </>
    );
};

export default NormalMenu;
