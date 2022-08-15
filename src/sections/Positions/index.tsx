import EventCard from '../../components/EventCard'

const events = [
  {
    id: '3fa85f64-5717-4562-b3fc-2c963f66afa6e',
    title:
      'Will Boris Johnson remain Prime Minister of the United Kingdom through August?',
    volume: '$432,160',
    expiryDate: '2015-07-20',
    category: 'Category',
    yesPrice: {
      amount: 0.53,
      currency: '$',
    },
    noPrice: {
      amount: 0.47,
      currency: '$',
    },
  },
  {
    id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    title:
      'Will Boris Johnson remain Prime Minister of the United Kingdom through August?',
    volume: '$432,160',
    expiryDate: '2015-07-20',
    category: 'Category',
    yesPrice: {
      amount: 0.53,
      currency: '$',
    },
    noPrice: {
      amount: 0.47,
      currency: '$',
    },
  },
]

const PositionsSection = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-0 lg:px-0 py-4">
      <h2 className="text-xl mb-2">Traded Events</h2>
      <ul
        role="list"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {events.map((event) => (
          <EventCard key={event} event={event} />
        ))}
      </ul>
    </div>
  )
}

export default PositionsSection
