import events from '@/mock/eventsMock'
import EventCard from '@/components/EventCard'

const PositionsSection = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-0 lg:px-0 py-4">
      <h2 className="text-xl mb-2">Traded Events</h2>
      <ul
        role="list"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </ul>
    </div>
  )
}

export default PositionsSection
