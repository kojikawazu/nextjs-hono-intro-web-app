import React from 'react';
import Image from 'next/image';
import classNames from 'classnames';
// types
import { AboutType } from '@/types/AboutType';
// shared
import { MESSAGES } from '@/shared/constants/constants';
import { validatePropsFilter, validateDataProps } from '@/shared/utils/validateUtilities';
import { customLog, componentStart, componentJSX } from '@/shared/utils/logUtilities';
import { sendLogsToGCF } from '@/shared/helper/googleCloudLogger';
// components
import ErrorComponent from '@/components/common/error/ErrorComponent';
import ProfileCard from '@/components/about/profile/ProfileCard';

/** Propsの型定義 */
type AboutContentsProps = {
    aboutData: AboutType;
};

/**
 * AboutContentsコンポーネント
 * @returns JSX
 */
const AboutContents: React.FC<AboutContentsProps> = ({ aboutData }) => {
    componentStart(AboutContents);

    // Propsの検証
    const dataError = validateDataProps([aboutData], MESSAGES.ERRORS.NOT_DATA);
    const errors = validatePropsFilter([dataError]);
    if (errors.length > 0) {
        const errorJoin = errors.join(' ');
        customLog(AboutContents, 'error', errorJoin);
        sendLogsToGCF([errorJoin], 'ERROR');
        return <ErrorComponent errorData={MESSAGES.INVALIDS.INVALID_PROPS} />;
    }

    const className = classNames([
        'w-full',
        'h-[1000px]',
        'xs:h-[900px]',
        'ssssm:h-[850px]',
        'md:h-[900px]',
        'lg:h-[800px]',
    ]);
    const childClassName = classNames(['w-full', 'h-[400px]']);
    const innerClassname = classNames(['w-full', 'lg:w-[60%]', 'h-[500px]']);

    componentJSX(AboutContents);
    return (
        <div className={className}>
            <div className={`relative ${childClassName}`}>
                <Image src={aboutData.about_img_url} alt="Profile background image" fill />

                <div className={`absolute top-1/4 left-0 lg:left-[20%] bg-white ${innerClassname}`}>
                    <ProfileCard profileData={aboutData} />
                </div>
            </div>
        </div>
    );
};

export default AboutContents;
