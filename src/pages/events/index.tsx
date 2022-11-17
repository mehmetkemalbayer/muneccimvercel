import { useEffect, useState } from 'react';
import EventCard from '@/components/EventCard'
import events from '@/mock/eventsMock'
import { AnimatedAxis } from '@visx/xychart'
import axios from 'axios'

const Events = () => {

  const [data, setData] = useState([]);

  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = () => {
    axios.get('https://0lwihue84b.execute-api.eu-central-1.amazonaws.com/client/v1/events').then(response => {
      // console.log(response.data);
      setData(response.data);
    });
  }

  return (
    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8  p-8 ">
      <span className="text-gray-900 text-sm font-bold mb-1.5">
        Popular markets
      </span>
      <ul
        role="list"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 mt-7 lg:grid-cols-3"
      >
        {data.map((event, i) => (
          <EventCard key={event['id']} event={event} isFeatured={false} />
        ))}

      </ul>
    </div>
  )
}

export default Events
