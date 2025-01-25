import React from 'react';
// shared
import { MESSAGES } from '@/shared/constants/constants';
import { NavBarType } from '@/types/NavbarType';
import { SkillsType } from '@/types/SkillsType';
import { useIntroData } from '@/contexts/IntroContext';
import { useLoadLimitLogic } from '@/features/loadlimit/useLoadLimit';
import { customLog, componentStart, componentJSX } from '@/shared/utils/logUtilities';
import { sendLogsToGCF } from '@/shared/helper/googleCloudLogger';
// components
import ErrorComponent from '@/components/common/error/ErrorComponent';

import Title from '@/components/common/title/Title';
import LoadingSpinner from '@/components/common/spinner/LoadingSpinner';
import SkillCard from '@/components/skills/SkillCard';
import SkillsAndMore from '@/components/skills/SkillsAndMore';

/** ロード数 */
const CARD_ADDITION_COUNT = Number(MESSAGES.MAIL.SKILLS_CARD_LOAD_COUNT || 6);

/**
 * スキルコンポーネント
 * @returns JSX
 */
const Skills = () => {
    componentStart(Skills);

    // Context
    const { introData, refData, isLoading } = useIntroData();
    // hook
    const { currentLoadSum, incrementWithLimit } = useLoadLimitLogic();

    if (isLoading) {
        return <LoadingSpinner isVisible={isLoading} />;
    }

    // エラーハンドリング
    if (!introData?.navbar_data || !introData?.skills_data || !refData) {
        const errorJoin = MESSAGES.ERRORS.DATA_ERROR;
        customLog(Skills, 'error', errorJoin);
        sendLogsToGCF([errorJoin], 'ERROR');
        return <ErrorComponent errorData={MESSAGES.ERRORS.DATA_LOADING} />;
    }

    const navbarData: NavBarType = introData.navbar_data;
    const skillsData: SkillsType = introData.skills_data;

    componentJSX(Skills);
    return (
        <section className="w-full h-full bg-skills" ref={refData.skillsRef}>
            <div className="flex justify-center content-center pt-32 pb-6">
                <Title titleName={navbarData.skills_name} />
            </div>

            <div className="flex flex-wrap justify-center pb-10">
                {skillsData.skills_cards.map((skill, index) => {
                    if (index >= currentLoadSum) return null;
                    return <SkillCard key={`skill_${index}`} skill={skill} />;
                })}
            </div>

            <div className="flex justify-center py-5 pb-12">
                <SkillsAndMore
                    updateCardDisplayLimit={incrementWithLimit}
                    currentIndex={currentLoadSum}
                    cardAdditionCount={CARD_ADDITION_COUNT}
                    cardTotal={skillsData.skills_cards.length}
                    buttonLabel={skillsData.skills_more}
                />
            </div>
        </section>
    );
};

export default Skills;
