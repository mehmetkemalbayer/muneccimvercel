import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { classNames } from '../../shared/utils'
import Avatar from '../../components/Avatar'
import { Auth } from 'aws-amplify'
import { useRouter } from 'next/router'


const ProfileDropdown = () => {

  const router = useRouter()

  const signOut = (e: any) => {
    e.preventDefault();
    Auth.signOut().then(res => {
      router.push("login")
    });
  }

  const userNavigation = [
    { name: 'Your Profile', href: '#' },
    { name: 'Settings', href: '#' },
    { name: 'Sign out', href: '#', onClick: signOut },
  ]

  return (
    <Menu as="div" className="ml-4 relative flex-shrink-0">
      <div>
        <Menu.Button className="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          <span className="sr-only">Open user menu</span>
          <Avatar />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" style={{ zIndex: 999 }}>
          {userNavigation.map((item) => (
            <Menu.Item key={item.name}>
              {({ active }) => (
                <a
                  href={item.href}
                  onClick={item.onClick}
                  className={classNames(
                    active ? 'bg-gray-100' : '',
                    'block px-4 py-2 text-sm text-gray-700'
                  )}
                >
                  {item.name}
                </a>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu >
  )
}

export default ProfileDropdown;