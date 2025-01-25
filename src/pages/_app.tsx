import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
// contexts
import { IntroDataProvider } from '@/contexts/IntroContext';
// features
import { store } from '@/features/store';
// layouts
import IntroLayout from '@/pages/layout';
// styles
import '@/styles/globals.css';

/**
 * アプリケーション
 * @param Component
 * @param pageProps
 * @returns JSX.Element
 */
export default function App({ Component, pageProps }: AppProps) {
    return (
        <Provider store={store}>
            <IntroDataProvider>
                <IntroLayout>
                    <Component {...pageProps} />
                </IntroLayout>
            </IntroDataProvider>
        </Provider>
    );
}
