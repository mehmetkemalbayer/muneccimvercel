import { EventPriceType } from '@/types/EventPriceType'
import { useState } from 'react'

export type PriceChartFiltersProps = {
  prices: EventPriceType[]
  setfilteredPrices: (prices: EventPriceType[]) => void
}
const getDate = (d: EventPriceType) => d && new Date(d.date)
const PriceChartFilters = ({
  prices,
  setfilteredPrices,
}: PriceChartFiltersProps) => {
  const [lastDate] = useState(
    [...prices].sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })[0].date
  )
  const [filterType, setFilterType] = useState<'1W' | '1M' | 'ALL'>('ALL')

  const changeDateScale = ({
    startTime,
    endTime,
  }: {
    startTime: number
    endTime: number
  }) => {
    if (!startTime || !endTime) return

    const pricesCopy = prices.filter((s) => {
      const time = getDate(s).getTime()
      return time > startTime && time < endTime
    })
    setfilteredPrices(pricesCopy)
  }

  return (
    <div className="flex justify-end">
      <button
        type="button"
        className={`inline-flex items-center rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mr-1 ${
          filterType == '1W' && 'ring-offset-2 ring-indigo-500 ring-2'
        }`}
        onClick={() => {
          setFilterType('1W')
          changeDateScale({
            startTime: new Date(lastDate).setDate(
              new Date(lastDate).getDate() - 7
            ),
            endTime: new Date(lastDate).getTime(),
          })
        }}
      >
        1W
      </button>
      <button
        type="button"
        className={`inline-flex items-center rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mr-1 ${
          filterType == '1M' && 'ring-offset-2 ring-indigo-500 ring-2'
        }`}
        onClick={() => {
          setFilterType('1M')
          changeDateScale({
            startTime: new Date(lastDate).setDate(
              new Date(lastDate).getDate() - 30
            ),
            endTime: new Date(lastDate).getTime(),
          })
        }}
      >
        1M
      </button>
      <button
        type="button"
        className={`inline-flex items-center rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mr-1 ${
          filterType == 'ALL' && 'ring-offset-2 ring-indigo-500 ring-2'
        }`}
        onClick={() => {
          setFilterType('ALL')
          changeDateScale({
            startTime: new Date('2011-03-24T07:00:00.000Z').getTime(),
            endTime: new Date('2012-05-01T07:00:00.000Z').getTime(),
          })
        }}
      >
        ALL
      </button>
    </div>
  )
}

export { PriceChartFilters }
