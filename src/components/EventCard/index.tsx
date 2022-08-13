import Link from 'next/link'
import React from 'react'

type PriceType = {
  amount: number
  currency: string
}

type EventType = {
  id: string
  title: string
  category: string
  expiryDate: string
  yesPrice: PriceType
  noPrice: PriceType
  volume: string
}
type EventCardProps = {
  event: EventType
}
const EventCard = ({ event }: EventCardProps) => (
  <Link href={`events/${event.id}`}>
    <li className="col-span-1 bg-white rounded-lg shadow hover:shadow-md divide-y divide-gray-200 cursor-pointer">
      <div className="w-full flex flex-col justify-between p-6 space-y-4">
        <h3 className="text-gray-900 text-sm font-medium">
          <span className="flex-shrink-0 inline-block px-2 py-0.5 text-green-800 text-xs font-medium bg-green-100 ">
            {event.category}
          </span>{' '}
          {event.title}
        </h3>
        <p className="text-gray-500 text-sm truncate">{event.expiryDate}</p>
      </div>
      <div>
        <div className="-mt-px flex divide-x divide-gray-200">
          <div className="w-0 flex-1 flex flex-col p-2">
            <span className="text-gray-400 text-xs mb-1">Volume</span>
            <span className="text-gray-700">{event.volume}</span>
          </div>
          <div className="-ml-px w-0 flex-1 flex flex-col p-2 items-start">
            <span className="text-gray-400 text-xs mb-1">Yes</span>
            <span className="px-2 py-0.5 text-blue-800 text-xs font-medium bg-blue-100">
              {event.yesPrice.currency} {event.yesPrice.amount}
            </span>
          </div>
          <div className="-ml-px w-0 flex-1 flex flex-col p-2 items-start">
            <span className="text-gray-400 text-xs mb-1">No</span>
            <span className="px-2 py-0.5 text-blue-800 text-xs font-medium bg-blue-100">
              {event.noPrice.currency} {event.noPrice.amount}
            </span>
          </div>
        </div>
      </div>
    </li>
  </Link>
)

export default EventCard
