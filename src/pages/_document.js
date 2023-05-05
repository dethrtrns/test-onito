import { createGetInitialProps } from "@mantine/next";
import Document, { Head, Html, Main, NextScript } from "next/document";

const getInitialProps = createGetInitialProps();

export default class _Document extends Document {
  static getInitialProps = getInitialProps;

  render() {
    return (
      <Html>
        <Head />
        <script src='https://code.jquery.com/jquery-3.6.0.min.js'></script>
        <script src='https://cdn.datatables.net/1.11.3/js/jquery.dataTables.min.js'></script>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
