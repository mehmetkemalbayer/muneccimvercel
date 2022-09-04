import React, { useState, useMemo, useEffect } from 'react'
import { scaleTime, scaleLinear } from '@visx/scale'
import appleStock, { AppleStock } from '@visx/mock-data/lib/mocks/appleStock'

import { LinearGradient } from '@visx/gradient'
import { max, extent, min } from 'd3-array'
import AreaChart from './AreaChart'
import { useTooltip, TooltipWithBounds, defaultStyles } from '@visx/tooltip'
// Initialize some variables
const stock = [
  ...appleStock
    .slice(1000)
    .map((x) => ({ ...x, close: x.close * (x.close / 450), type: 'YES' })),
  ...appleStock
    .slice(1000)
    .map((x) => ({ ...x, close: -x.close + 800, type: 'NO' })),
]
console.log({ stock })
const chartSeparation = 30

const GRADIENT_ID = 'brush_gradient'
export const accentColor = '#f6acc8'
export const background = '#584153'
export const background2 = '#af8baf'

// accessors
const getDate = (d: AppleStock) => new Date(d.date)
const getStockValue = (d: AppleStock) => d.close

export type BrushProps = {
  width: number
  height: number
  margin?: { top: number; right: number; bottom: number; left: number }
  compact?: boolean
}

function BrushChart({
  compact = false,
  width,
  height,
  margin = {
    top: 20,
    left: 30,
    bottom: 20,
    right: 20,
  },
}: BrushProps) {
  const [filteredStock, setFilteredStock] = useState(stock)
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
  const tooltipStyles = {
    ...defaultStyles,
    minWidth: 60,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderColor: '#c5c5c5',
    color: '#c5c5c5',
  }
  const {
    tooltipData,
    tooltipLeft = 0,
    tooltipTop = 0,
    showTooltip,
    hideTooltip,
  } = useTooltip()

  const onScaleChange = (
    domain: { x0: number; x1: number; y0: number; y1: number } | null
  ) => {
    if (!domain) return
    console.log(domain)
    const { x0, x1, y0, y1 } = domain
    const stockCopy = stock.filter((s) => {
      const x = getDate(s).getTime()
      const y = getStockValue(s)
      return x > x0 && x < x1 && y > y0 && y < y1
    })
    setFilteredStock(stockCopy)
  }

  const innerHeight = height - margin.top - margin.bottom
  const topChartBottomMargin = compact
    ? chartSeparation / 2
    : chartSeparation + 10
  const topChartHeight = 0.8 * innerHeight - topChartBottomMargin

  // bounds
  const xMax = Math.max(width - margin.left - margin.right, 0)
  const yMax = Math.max(topChartHeight, 0)

  // scales
  const dateScale = useMemo(() => {
    return scaleTime<number>({
      range: [0, xMax],
      domain: extent(filteredStock, getDate) as [Date, Date],
    })
  }, [xMax, filteredStock])
  const stockScale = useMemo(
    () =>
      scaleLinear<number>({
        range: [yMax, 0],
        domain: [
          min(filteredStock, getStockValue) || 0,
          max(filteredStock, getStockValue) || 0,
        ],
        nice: true,
      }),
    [yMax, filteredStock]
  )
  useEffect(() => {
    if (!(currentValues?.yesValue && currentValues?.noValue)) {
      setCurrentHighestType('-')
    }

    if (currentValues.yesValue > currentValues.noValue) {
      setCurrentHighestType('YES')
    } else {
      setCurrentHighestType('NO')
    }
  }, [currentValues])

  return (
    <div style={{ position: 'relative' }}>
      <div>
        {(currentHighestType === 'YES' || currentHighestType === 'NO') && (
          <span>
            <b
              className={`${
                currentHighestType === 'YES'
                  ? 'text-[#667bf0]'
                  : 'text-[#e77490]'
              }`}
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
      <svg width={width} height={height}>
        <LinearGradient
          id={GRADIENT_ID}
          from={background}
          to={background2}
          rotate={45}
        />

        <AreaChart
          hideBottomAxis={compact}
          data={filteredStock}
          width={width}
          margin={{ ...margin }}
          yMax={yMax}
          xScale={dateScale}
          yScale={stockScale}
          gradientColor={background2}
          tooltipData={tooltipData}
          tooltipLeft={tooltipLeft}
          tooltipTop={tooltipTop}
          showTooltip={showTooltip}
          hideTooltip={hideTooltip}
          setCurrentValues={setCurrentValues}
        />
      </svg>
      {tooltipData && (
        <TooltipWithBounds
          key={Math.random()}
          top={tooltipTop}
          left={tooltipLeft}
          style={tooltipStyles}
        >
          <p className="flex flex-row justify-center items-center">
            <div
              className="rounded-full w-[7px] h-[7px] mr-1"
              style={{
                height: '7px',
                backgroundColor: '#667bf0',
              }}
            ></div>
            {`YES: ${currentValues?.yesValue?.toFixed(4) || '-'}`}
          </p>
          <br />
          {/* <p>{`NO: ${getStockValue(tooltipData[0])}`}</p> */}
          <p className="flex flex-row justify-center items-center">
            <div
              className="rounded-full w-[7px] h-[7px] mr-1"
              style={{
                height: '7px',
                backgroundColor: '#e77490',
              }}
            ></div>
            {`NO: ${currentValues?.noValue?.toFixed(4) || '-'}`}
          </p>
        </TooltipWithBounds>
      )}
    </div>
  )
}

export default BrushChart
