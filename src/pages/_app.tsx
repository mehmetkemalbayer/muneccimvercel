import '../styles/globals.css'
import '@aws-amplify/ui-react/styles.css'
import type { AppProps } from 'next/app'
import Footer from '../sections/Footer'
import Amplify from 'aws-amplify'
import config from '../aws-exports'
import { Authenticator } from '@aws-amplify/ui-react'
import Header from '../sections/Header'
Amplify.configure({
  ...config,
  ssr: true,
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Authenticator.Provider>
      <div className='min-h-full'>
        <Header />
      <Component {...pageProps} />
      <Footer />
      </div>
    </Authenticator.Provider>
  )
}

export default MyApp
