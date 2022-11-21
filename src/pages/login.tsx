import { useEffect, useState } from 'react'
import { Authenticator } from '@aws-amplify/ui-react'
import { Auth, Hub } from 'aws-amplify'
import { Router, useRouter } from 'next/router'

const authenticatorComponents = {
  Header: () => (
    <h2 className="my-6 text-center text-3xl font-extrabold text-gray-900">
      Sign in to your account
    </h2>
  ),
}

const Login = () => {
  const router = useRouter()



  useEffect(() => {
    // Hub.listen('auth', listener)
    // return () => Hub.remove('auth', listener);
  }, [])


  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <Authenticator components={authenticatorComponents}>
        {({ user, signOut }) => (
          <main>
          </main>
        )}
      </Authenticator>
    </div>
  )
}
export default Login
