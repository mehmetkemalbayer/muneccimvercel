import { Authenticator } from '@aws-amplify/ui-react'
import Logo from '../components/Logo'

const authenticatorComponents = {
  Header: () => (
    <h2 className="my-6 text-center text-3xl font-extrabold text-gray-900">
      Sign in to your account
    </h2>
  ),
}

const Login = () => {
  return (
    <>
      <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <Logo />
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <Authenticator components={authenticatorComponents}>
            {({ signOut, user }) => (
              <main>
                <h1>Hello {user?.username}</h1>
                <button onClick={signOut}>Sign out</button>
              </main>
            )}
          </Authenticator>
        </div>
      </div>
    </>
  )
}

export default Login
