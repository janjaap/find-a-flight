import type { AppProps } from 'next/app';

import { FlightsProvider } from '@/providers/FlightsProvider';

import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <FlightsProvider>
      <Component {...pageProps} />
    </FlightsProvider>
  );
}
