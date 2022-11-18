import events from '@/mock/eventsMock'
import EventCard from '@/components/EventCard'
import { useEffect, useState } from 'react';
import axios from 'axios'

const PositionsSection = () => {
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
    <div className="max-w-7xl mx-auto px-4 sm:px-0 lg:px-0 py-4">
      <h2 className="text-xl mb-2">Traded Events</h2>
      <ul
        role="list"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {data.map((event) => (
          <EventCard key={event['id']} event={event} />
        ))}
      </ul>
    </div>
  )
}

export default PositionsSection
