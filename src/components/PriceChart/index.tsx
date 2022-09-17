import React, { useState, useEffect } from 'react'

import { EventPriceType } from '@/types/EventPriceType'
import { useTooltip } from '@visx/tooltip'

import { PriceChartTooltip } from './PriceChartTooltip'
import { LineChart } from './LineChart'
import { PriceChartFilters } from './PriceChartFilter'

const defaultStrokeColor = '#DDDDDD'
const colors = [
  { type: 'NO', value: '#e77490' },
  { type: 'YES', value: '#667bf0' },
]
const getColor = (type: string): string | undefined => {
  const index = colors.findIndex((item) => item.type === type)
  return index !== -1 ? colors[index].value : undefined
}

export type PriceChartProps = {
  width: number
  height: number
  margin?: { top: number; right: number; bottom: number; left: number }
  eventPrices: EventPriceType[]
}

function PriceChart({
  width,
  height,
  margin = {
    top: 20,
    left: 30,
    bottom: 0,
    right: 20,
  },
  eventPrices,
}: PriceChartProps) {
  const [filteredPrices, setfilteredPrices] = useState(eventPrices)
  const [currentValues, setCurrentValues] = useState<{
    yesValue: number | undefined
    noValue: number | undefined
  }>({
    yesValue: undefined,
    noValue: undefined,
  })

  const [currentHighestType, setCurrentHighestType] = useState<
    'YES' | 'NO' | '-'
  >('-')

  const [dataTypeVariants, setDataTypeVariants] = useState<string[]>([])
  useEffect(() => {
    const dataTypeSet = new Set<string>()
    filteredPrices.forEach((item) => dataTypeSet.add(item.type))
    setDataTypeVariants(Array.from(dataTypeSet))
  }, [filteredPrices])

  useEffect(() => {
    console.log(width)
  }, [width])
  const {
    tooltipData,
    tooltipLeft = 0,
    tooltipTop = 0,
    showTooltip,
    hideTooltip,
  } = useTooltip()

  useEffect(() => {
    if (!(currentValues?.yesValue && currentValues?.noValue)) {
      setCurrentHighestType('-')
    } else if (currentValues?.yesValue > currentValues?.noValue) {
      setCurrentHighestType('YES')
    } else {
      setCurrentHighestType('NO')
    }
  }, [currentValues])

  return (
    <div className="relative w-full h-auto cursor-crosshair">
      <div>
        {currentHighestType === '-' && (
          <span>
            <b>{currentHighestType}</b>
          </span>
        )}
        {(currentHighestType === 'YES' || currentHighestType === 'NO') && (
          <span>
            <b
              className={`${`text-[${
                getColor(currentHighestType) || defaultStrokeColor
              }]`}`}
            >
              {currentHighestType}
            </b>
            :{' '}
            {currentHighestType === 'YES'
              ? currentValues.yesValue?.toFixed(4)
              : currentValues.noValue?.toFixed(4)}
          </span>
        )}
      </div>
      <LineChart
        prices={filteredPrices}
        width={width}
        height={height}
        margin={margin}
        tooltipData={tooltipData as EventPriceType[]}
        tooltipLeft={tooltipLeft}
        dataTypeVariants={dataTypeVariants}
        showTooltip={showTooltip}
        hideTooltip={hideTooltip}
        setCurrentValues={setCurrentValues}
        getColor={getColor}
      />

      <PriceChartTooltip
        tooltipData={tooltipData as EventPriceType[]}
        tooltipLeft={tooltipLeft}
        tooltipTop={tooltipTop}
        currentValues={currentValues}
      />
      <PriceChartFilters
        setfilteredPrices={setfilteredPrices}
        prices={eventPrices}
      />
    </div>
  )
}

export { PriceChart }
