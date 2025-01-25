import React, { useRef } from 'react';
// hooks
import { useScrollToTop, useScrollToRef } from '@/hooks/useScroll';

/**
 * テスト用のスクロールコンポーネント
 * @returns
 */
const ScrollComponent: React.FC = () => {
    const ref = useRef<HTMLDivElement>(null);

    const scrollTop = useScrollToTop();
    const scrollToRef = useScrollToRef(ref);

    return (
        <>
            <button onClick={scrollTop}>Scroll to Top</button>
            <button onClick={scrollToRef}>Scroll to Ref</button>
            <div ref={ref} data-testid="scroll-div" />
        </>
    );
};

export default ScrollComponent;
