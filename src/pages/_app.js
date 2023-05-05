import { AppProps } from "next/app";
import Head from "next/head";
import "../styles/globals.css";
import { MantineProvider } from "@mantine/core";
import Script from "next/script";

export default function App(props) {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <title>Onito test-task</title>
        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width'
        />
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: "light",
        }}>
        <Script src='https://code.jquery.com/jquery-3.6.0.min.js'></Script>
        <Script src='https://cdn.datatables.net/1.11.3/js/jquery.dataTables.min.js'></Script>
        <Component {...pageProps} />
      </MantineProvider>
    </>
  );
}
