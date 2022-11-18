import { EventModel } from '@/types/EventType'
import Link from 'next/link'
import React, { useState } from 'react'
import moment from 'moment'
type EventCardProps = {
  event: EventModel
  isFeatured?: boolean
}
const EventCard = ({ event, isFeatured = false }: EventCardProps) => {

  const [lang] = useState('tr');

  const getTotalVolume = () => {
    return event.volume?.yesBuyVolume + event.volume?.yesSellVolume + event.volume?.noBuyVolume + event.volume?.noSellVolume;
  }

  const yesPrice = () => {
    return (event.volume?.yesBuyVolume + event.volume?.noSellVolume) / getTotalVolume();
  }

  const noPrice = () => {
    return 1 - yesPrice();
  }

  return (<Link href={`events/${event.id}`}>
    <li
      className={`col-span-1 bg-white  rounded-lg rounded-tl-none shadow hover:shadow-md cursor-pointer mb-2 relative ${isFeatured ? 'border border-lime-500' : 'divide-y divide-gray-200 '
        }`}
    >
      {isFeatured && (
        <span className="absolute -top-5 -ml-px  rounded-t flex-shrink-0 inline-block px-2 py-0.5 text-white text-xs font-medium bg-lime-500 ">
          Featured
        </span>
      )}
      <div className="w-full flex flex-col justify-between p-6 space-y-4">
        <h3 className="text-gray-900 text-sm font-medium">
          <span className="flex-shrink-0 inline-block px-2 py-0.5 text-green-800 text-xs font-medium bg-green-100 ">
            {"CATEGORY"}
          </span>{' '}
          {event.title?.[lang]}
        </h3>
        <p className="text-gray-500 text-sm truncate">
          { }
          Expires at {moment(event.expiryDate).format('DD.MM.YYYY HH:mm')}
        </p>
      </div>
      <div>
        <div className="-mt-px flex divide-x divide-gray-200">
          <div className="w-0 flex-1 flex flex-col p-2">
            <span className="text-gray-400 text-xs mb-1">Volume</span>
            <span className="text-gray-700">{getTotalVolume()}</span>
          </div>
          <div className="-ml-px w-0 flex-1 flex flex-col p-2 items-start">
            <span className="text-gray-400 text-xs mb-1">Yes</span>
            <span className="px-2 py-0.5 text-blue-800 text-xs font-medium bg-blue-100">
              {event.currency} {yesPrice().toFixed(2)}
            </span>
          </div>
          <div className="-ml-px w-0 flex-1 flex flex-col p-2 items-start">
            <span className="text-gray-400 text-xs mb-1">No</span>
            <span className="px-2 py-0.5 text-blue-800 text-xs font-medium bg-blue-100">
              {event.currency} {noPrice().toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </li>
  </Link>);
}

export default EventCard
