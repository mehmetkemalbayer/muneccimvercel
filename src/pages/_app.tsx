import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import '../styles/globals.css'
import '@aws-amplify/ui-react/styles.css'
import type { AppProps } from 'next/app'
import Footer from '../sections/Footer'
import { Amplify, Auth, Hub } from 'aws-amplify'
import config from '../aws-exports'
import { Authenticator } from '@aws-amplify/ui-react'
import Header from '../sections/Header'

Amplify.configure({
  ...config,
  ssr: true,
})

function MyApp({ Component, pageProps }: AppProps) {

  const [user, setUser] = useState(null);
  const router = useRouter()

  useEffect(() => {
    console.log("CHECKING USER");
    Auth.currentAuthenticatedUser().then((user) => {
      console.log(JSON.stringify(user));
    }).catch(() => {
      console.log("SIGNED OUT");
      router.push("/login")
    });

    const authListener = (data: any) => {
      if (data.payload.event == "signIn") {
        router.push("/")
      } else if (data.payload.event == "signOut") {
        router.push("/login")
      }
    }

    Hub.listen('auth', authListener)
    return () => Hub.remove('auth', authListener);
  }, [])

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
