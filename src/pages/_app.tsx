import '@/styles/globals.css';
import { Layouts } from '@/layouts/Layouts';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@/design/theme';
import CssBaseline from '@mui/material/CssBaseline';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Head from 'next/head';
import { MyAppProps } from '@/types/myAppTypes';
import { GlobalStateProvider } from '@/providers/GlobalStateProvider';
export default function App({ Component, pageProps }: MyAppProps) {
  const Layout = Layouts[Component.Layout] ?? Layouts.Default;

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider theme={theme}>
        <GlobalStateProvider>
          <CssBaseline />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </GlobalStateProvider>
      </ThemeProvider>
    </>
  );
}
