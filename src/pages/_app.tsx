import "../styles/globals.css";
import type { AppProps } from "next/app";
import Footer from "../sections/Footer";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default MyApp;
