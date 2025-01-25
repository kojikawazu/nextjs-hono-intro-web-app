import { Suspense } from 'react';
import ErrorBoundary from '@/components/common/error/ErrorBoundary';
import LoadingSpinner from '@/components/common/spinner/LoadingSpinner';
/**
 * Introレイアウトコンポーネント
 * @param children
 * @returns JSX
 */
export default function IntroLayout({ children }: { children: React.ReactNode }) {
    return (
        <ErrorBoundary>
            <Suspense fallback={<LoadingSpinner isVisible={true} />}>{children}</Suspense>
        </ErrorBoundary>
    );
}
