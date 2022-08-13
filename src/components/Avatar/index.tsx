import React from 'react'
import { classNames } from '../../shared/utils'

type AvatarProps = {
  username?: string
  size?: 'medium' | 'large'
}

const Avatar = ({ username, size = 'medium' }: AvatarProps) => {
  if (username) {
    return <span
      className={classNames(
        'inline-flex items-center justify-center rounded-full bg-gray-500',
        size === 'large' ? 'h-10 w-10' : 'h-8 w-8'
      )}
    >
      <span className="text-sm font-medium leading-none text-white">
        {username[0].toUpperCase()}
      </span>
    </span>
  }

  return (
    <span
      className={classNames(
        'inline-block rounded-full overflow-hidden bg-gray-100',
        size === 'large' ? 'h-10 w-10' : 'h-8 w-8'
      )}
    >
      <svg
        className="h-full w-full text-gray-300"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    </span>
  )
}

export default React.memo(Avatar)
