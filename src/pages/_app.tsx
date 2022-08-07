import "../styles/globals.css";
import '@aws-amplify/ui-react/styles.css';
import type { AppProps } from "next/app";
import Footer from "../sections/Footer";
import Amplify from 'aws-amplify'
import config from '../aws-exports'
Amplify.configure({
  ...config,
  ssr: true
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default MyApp;
