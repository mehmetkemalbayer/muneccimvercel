import { useEffect } from 'react'
import { Authenticator } from '@aws-amplify/ui-react'
import { Auth } from 'aws-amplify'
import { useRouter } from 'next/router'

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
    //TODO: burada logout olacak. Auth.currentAuthenticatedUser() ile olmadi!!!
  }, [])

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <Authenticator components={authenticatorComponents}>

      </Authenticator>
    </div>
  )
}

export default Login
