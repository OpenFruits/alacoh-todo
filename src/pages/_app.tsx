import type { CustomAppProps } from 'next/app'
import Head from 'next/head'
import { ThemeProvider } from 'next-themes';
import { dark } from '../styles/dark';
import { memo } from 'react';
import { withTheme } from '../components/theme/withTheme';

const App = (props: CustomAppProps) => {
  return (
    <>
      <Head>
        <title>Alacoh TODO</title>
        <meta name="description" content="タスク管理アプリケーション" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider attribute="class" value={{ light: "light", dark }}>
         <props.Component {...props.pageProps} />
      </ThemeProvider>
    </>
  );
}

export default memo(withTheme(App));
