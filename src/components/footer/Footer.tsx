import React from 'react';
// components
import { useIntroData } from '@/contexts/IntroContext';
// hooks
import { useScrollToTop } from '@/hooks/useScroll';
// types
import { NavBarType } from '@/types/NavbarType';
import { FooterType } from '@/types/FooterType';
// shared
import { MESSAGES } from '@/shared/constants/constants';
import { customLog, componentStart, componentJSX } from '@/shared/utils/logUtilities';
import { sendLogsToGCF } from '@/shared/helper/googleCloudLogger';
// components
import ErrorComponent from '@/components/common/error/ErrorComponent';
import LoadingSpinner from '@/components/common/spinner/LoadingSpinner';
import FooterArrowLink from '@/components/footer/parts/FooterArrowLink';
import FooterLink from '@/components/footer/parts/FooterLink';
import FooterCopyRight from '@/components/footer/parts/FooterCopyRight';
import FooterTitleBtn from '@/components/footer/parts/FooterTitleBtn';

/**
 * Footerコンポーネント
 * @returns JSX
 */
const Footer = () => {
    componentStart(Footer);

    // Context
    const { introData, refData, isLoading } = useIntroData();
    // hooks
    const scrollTop = useScrollToTop();

    if (isLoading) {
        return <LoadingSpinner isVisible={isLoading} />;
    }

    // エラーハンドリング
    if (!introData || !introData.navbar_data) {
        const errorJoin = MESSAGES.ERRORS.DATA_ERROR;
        customLog(Footer, 'error', errorJoin);
        sendLogsToGCF([errorJoin], 'ERROR');
        return <ErrorComponent errorData={MESSAGES.ERRORS.DATA_LOADING} />;
    }

    const navbarData: NavBarType = introData.navbar_data;
    const footerData: FooterType = introData.footer_data;

    componentJSX(Footer);
    return (
        <footer className="w-full h-[190px] sm:h-[240px] bg-footer text-white">
            <div className="flex justify-center">
                <FooterLink
                    linkTitle={navbarData.about_name}
                    isEnd={false}
                    refData={refData?.aboutRef}
                />
                <FooterLink
                    linkTitle={navbarData.career_name}
                    isEnd={false}
                    refData={refData?.careerRef}
                />
                <FooterLink
                    linkTitle={navbarData.skills_name}
                    isEnd={false}
                    refData={refData?.skillsRef}
                />
                <FooterLink
                    linkTitle={navbarData.contact_name}
                    isEnd={true}
                    refData={refData?.contactRef}
                />
            </div>

            <div className="flex w-full">
                <div className="basis-1/3">
                    <FooterTitleBtn
                        className="pl-1 xxs:pl-2 xs:pl-4 ssssm:pl-8 sssm:pl-16 pt-4"
                        onClick={scrollTop}
                        labelClassName="text-xxs sssm:text-xs ssm:text-sm sm:text-lg hover:text-gray-300"
                        label={navbarData.link_title}
                    />
                </div>

                <div className="basis-1/3 flex justify-center">
                    <FooterArrowLink className="mt-24 hover:text-gray-400" onClick={scrollTop} />
                </div>

                <div className="basis-1/3 flex justify-end">
                    <FooterCopyRight
                        className="pt-14 pr-1 xxs:pr-2 xs:pr-4 ssssm:pr-8 sssm:pr-16 ssm:pr-20 text-xxs sssm:text-xs ssm:text-sm sm:text-lg"
                        label={footerData.copyright}
                    />
                </div>
            </div>
        </footer>
    );
};

export default Footer;
