import '../styles/globals.css'
import '@aws-amplify/ui-react/styles.css'
import type { AppProps } from 'next/app'
import Footer from '../sections/Footer'
import Amplify from 'aws-amplify'
import config from '../aws-exports'
import { Authenticator } from '@aws-amplify/ui-react'
Amplify.configure({
  ...config,
  ssr: true,
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Authenticator.Provider>
      <Component {...pageProps} />
      <Footer />
    </Authenticator.Provider>
  )
}

export default MyApp
