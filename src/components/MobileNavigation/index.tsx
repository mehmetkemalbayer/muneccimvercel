import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import Avatar from '../../components/Avatar'
import Link from 'next/link'

const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
]

type UserType = {
  username?: string
  attributes?: {
    email?: string
  }
}

type MobileNavigationProps = {
  user?: UserType
}

const MobileNavigation = ({ user }: MobileNavigationProps) => {
  return (
    <>
      <div className="flex items-center lg:hidden">
        <Popover.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
          <span className="sr-only">Open main menu</span>
          <MenuIcon className="block h-6 w-6" aria-hidden="true" />
        </Popover.Button>
      </div>
      <Transition.Root as={Fragment}>
        <div className="lg:hidden absolute left-0 top-0 w-full h-full">
          <Transition.Child
            as={Fragment}
            enter="duration-150 ease-out"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="duration-150 ease-in"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Popover.Overlay
              className="z-20 fixed inset-0 bg-black bg-opacity-25"
              aria-hidden="true"
            />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="duration-150 ease-out"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="duration-150 ease-in"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Popover.Panel
              focus
              className="z-30 absolute top-0 right-0 max-w-none w-full p-2 transition transform origin-top"
            >
              <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y divide-gray-200">
                <div className="pt-3 pb-2">
                  <div className="px-4 flex items-center justify-between">
                    {user && (
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <Avatar size="large" username={user?.username} />
                        </div>
                        <div className="ml-3">
                          <div className="text-base font-medium text-gray-800">
                            {user?.username}
                          </div>
                          <div className="text-sm font-medium text-gray-500">
                            {user?.attributes?.email}
                          </div>
                        </div>
                      </div>
                    )}
                    {!user && (
                      <div className="px-2 space-y-1">
                        <Link href="/login">
                          <a className="block rounded-md px-3 py-2 text-base text-gray-900 font-medium hover:bg-gray-100 hover:text-gray-800">
                            Login
                          </a>
                        </Link>
                      </div>
                    )}
                    <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
                      <span className="sr-only">Close menu</span>
                      <XIcon className="h-6 w-6" aria-hidden="true" />
                    </Popover.Button>
                  </div>
                </div>
                {user && (
                  <div className="mt-3 px-2 space-y-1">
                    {userNavigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="block rounded-md px-3 py-2 text-base text-gray-900 font-medium hover:bg-gray-100 hover:text-gray-800"
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </Popover.Panel>
          </Transition.Child>
        </div>
      </Transition.Root>
    </>
  )
}

export default MobileNavigation
