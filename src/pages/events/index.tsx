import EventCard from '@/components/EventCard'
import events from '@/mock/eventsMock'

const Events = () => {
  return (
    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8  p-8 ">
      <span className="text-gray-900 text-sm font-bold mb-1.5">
        Popular markets
      </span>
      <ul
        role="list"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 mt-7 lg:grid-cols-3"
      >
        {events.map((event, i) => (
          <EventCard key={event.id} event={event} isFeatured={i < 3} />
        ))}
      </ul>
    </div>
  )
}

export default Events
