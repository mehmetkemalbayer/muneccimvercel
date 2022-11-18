import { useState } from 'react';
import { SearchIcon } from '@heroicons/react/outline'
import EventCard from '../../components/EventCard'
import axios from 'axios'

const MarketsSection = () => {
  const [events, setEvents] = useState([]);

  const refreshData = () => {
    axios.get('https://0lwihue84b.execute-api.eu-central-1.amazonaws.com/client/v1/events').then(response => {
      // console.log(response.data);
      setEvents(response.data);
    });
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className="mt-1 mb-6 relative shadow-sm">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <SearchIcon className="h-5 w-5 text-gray-500" aria-hidden="true" />
        </div>
        <input
          type="text"
          name="search"
          id="search"
          className="bg-gray-200 rounded-md py-3 text-black placeholder:text-gray-500 focus:ring-transparent focus:border-transparent block w-full pl-10 sm:text-sm border-gray-300"
          placeholder="Search"
        />
      </div>
      <ul
        role="list"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {events.slice(0, 3).map((event) => (
          <EventCard key={event['id']} event={event} isFeatured={true} />
        ))}
      </ul>
    </div>
  )
}

export default MarketsSection
