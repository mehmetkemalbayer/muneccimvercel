import { useAuthenticator } from '@aws-amplify/ui-react'
import { Popover } from '@headlessui/react'
import Link from 'next/link'
import Logo from '../../components/Logo'

const navigation = [
  { name: 'Events', href: '/' },
  { name: 'Portfolio', href: '/portfolio' },
]

const Header = () => {
  const { user } = useAuthenticator((context) => [context.user])

  return (
    <Popover>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <nav
          className="relative flex items-center justify-between sm:h-10 md:justify-center"
          aria-label="Global"
        >
          <div className="flex items-center md:absolute md:inset-y-0 md:left-0">
            <div className="flex items-center justify-between w-full md:w-auto">
              <Link href="/">
                <a>
                  <span className="sr-only">Workflow</span>
                  <Logo />
                </a>
              </Link>
            </div>
          </div>
          <div className="flex space-x-10">
            {navigation.map((item) => (
              <Link href={item.href} key={item.name}>
                <a className="font-medium text-gray-500 hover:text-gray-900">
                  {item.name}
                </a>
              </Link>
            ))}
          </div>

          <div className="md:absolute md:flex md:items-center md:justify-end md:inset-y-0 md:right-0">
            {user && <span>{user?.username}</span>}
            {!user && (
              <span className="inline-flex rounded-md shadow">
                <Link href="/login">
                  <a className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50">
                    Log in
                  </a>
                </Link>
              </span>
            )}
          </div>
        </nav>
      </div>
    </Popover>
  )
}

export default Header
