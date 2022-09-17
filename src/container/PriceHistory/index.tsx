import ParentSize from '@visx/responsive/lib/components/ParentSize'
import { PriceChart } from '@/components/PriceChart'
//mock data
import eventPrices from '@/mock/eventPriceMock'

type PriceHistoryProps = {
  eventId: string
}
const PriceHistory = ({ eventId }: PriceHistoryProps) => {
  // TODO : fetching event price data
  console.log(`fetching (${eventId}) event prices data...`)

  return (
    <div className="w-full">
      <ParentSize>
        {({ width }) => (
          <PriceChart width={width} height={350} eventPrices={eventPrices} />
        )}
      </ParentSize>
    </div>
  )
}

export { PriceHistory }
