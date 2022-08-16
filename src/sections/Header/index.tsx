import { useAuthenticator } from '@aws-amplify/ui-react'
import Link from 'next/link'
import Logo from '../../components/Logo'

import { Popover } from '@headlessui/react'
import { BellIcon } from '@heroicons/react/outline'
import ProfileDropdown from '../../components/ProfileDropdown'
import MobileNavigation from '../../components/MobileNavigation'

const navigation = [
  { name: 'Events', href: '/events' },
  { name: 'Portfolio', href: '/portfolio' },
]

const Header = () => {
  const { user } = useAuthenticator((context) => [context.user])

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <Popover className="flex justify-between h-16">
          <div className="flex px-2 lg:px-0">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/">
                <a>
                  <span className="sr-only">Logo</span>
                  <Logo />
                </a>
              </Link>
            </div>
            <nav
              aria-label="Global"
              className="flex-1 ml-6 flex justify-center items-center space-x-4"
            >
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="px-3 py-2 text-gray-900 text-sm font-medium"
                >
                  {item.name}
                </a>
              ))}
            </nav>
          </div>
          <MobileNavigation user={user} />
          {!user && (
            <span className="my-2 hidden md:inline-flex rounded-md shadow">
              <Link href="/login">
                <a className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50">
                  Log in
                </a>
              </Link>
            </span>
          )}
          {user && (
            <>
              <div className="hidden lg:ml-4 lg:flex lg:items-center">
                <button
                  type="button"
                  className="flex-shrink-0 bg-white p-1 text-gray-400 rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                <ProfileDropdown />
              </div>
            </>
          )}
        </Popover>
      </div>
    </header>
  )
}

export default Header
