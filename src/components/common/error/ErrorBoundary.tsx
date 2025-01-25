import React from 'react';
// shared
import { customLog } from '@/shared/utils/logUtilities';

interface ErrorBoundaryProps {
    children: React.ReactNode;
}

interface State {
    hasError: boolean;
}

/**
 * エラーバウンダリークラス
 */
class ErrorBoundary extends React.Component<ErrorBoundaryProps, State> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(): State {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        const log = 'Caught error:' + error + errorInfo;
        customLog(ErrorBoundary, 'error', log);
    }

    render() {
        if (this.state.hasError) {
            return <h2>何らかのエラーが発生しました。リロードしてください。</h2>;
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
