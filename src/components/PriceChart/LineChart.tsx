import React, { useMemo } from 'react'
import { scaleTime } from '@visx/scale'

import { EventPriceType } from '@/types/EventPriceType'

import { max, extent, min, bisector } from 'd3-array'
import { localPoint } from '@visx/event'
import { Group } from '@visx/group'

import { LinePath } from '@visx/shape'

import { GridRows, GridColumns } from '@visx/grid'
import { CursorLine } from './CursorLine'
import { PriceChartAxis } from './PriceChartAxis'

export type LineChartProps = {
  prices: EventPriceType[]
  width: number
  height: number
  margin: {
    left: number
    top: number
    bottom: number
    right: number
  }
  tooltipData: EventPriceType[]
  tooltipLeft: number
  dataTypeVariants: string[]
  showTooltip: ({}) => void
  hideTooltip: () => void
  getColor: (value: string) => string | undefined
  setCurrentValues: ({
    yesValue,
    noValue,
  }: {
    yesValue: number | undefined
    noValue: number | undefined
  }) => void
}

const LineChart = ({
  prices,
  width = 0,
  height = 0,
  margin,
  tooltipData,
  tooltipLeft = 0,
  dataTypeVariants,
  showTooltip,
  hideTooltip,
  getColor,
  setCurrentValues,
}: LineChartProps) => {
  const defaultColor = '#DDDDDD'
  const chartSeparation = 30
  const innerHeight = height - margin.top - margin.bottom
  const innerWidth = width - margin.left - margin.right
  const topChartBottomMargin = chartSeparation + 10
  const topChartHeight = innerHeight - topChartBottomMargin

  const xMax = Math.max(width - margin.left - margin.right, 0)
  const yMax = Math.max(topChartHeight, 0)

  // accessors
  const getDate = (d: EventPriceType) => d && new Date(d.date)
  const getPriceValue = (d: EventPriceType) => (d ? d.value : 0)
  const bisectDate = bisector((d: EventPriceType) => new Date(d.date)).left

  // scales
  const dateScale = useMemo(() => {
    return scaleTime<number>({
      range: [0, xMax],
      domain: extent(prices, getDate) as [Date, Date],
    })
  }, [xMax, prices])

  const priceScale = useMemo(
    () =>
      scaleTime<number>({
        range: [yMax, 0],
        domain: [
          min(prices, getPriceValue) || 0,
          max(prices, getPriceValue) || 0,
        ],
        nice: true,
      }),
    [yMax, prices]
  )

  const handleTooltip = (
    event: React.TouchEvent<SVGRectElement> | React.MouseEvent<SVGRectElement>
  ) => {
    const { x, y } = localPoint(event) || { x: 0 }
    const x0 = dateScale.invert(x - margin.left)

    const index = bisectDate(prices, x0, 1)
    const d0 = prices[index - 1]
    const d1 = prices[index]
    let d = d0

    const getCurrentDateValues = (d: EventPriceType) =>
      prices.filter((item) => item.date === d.date)

    if (d1 && getDate(d1)) {
      d =
        x0.valueOf() - getDate(d0).valueOf() >
        getDate(d1).valueOf() - x0.valueOf()
          ? d1
          : d0
    }
    showTooltip({
      tooltipData: getCurrentDateValues(d),
      tooltipLeft: x,
      tooltipTop: y,
    })

    const _tooltipData = tooltipData as EventPriceType[]
    setCurrentValues({
      yesValue: _tooltipData ? getPriceValue(_tooltipData[0]) : undefined,
      noValue: _tooltipData ? getPriceValue(_tooltipData[1]) : undefined,
    })
  }

  return (
    <svg width={width} height={height}>
      <React.Fragment>
        <Group left={margin.left} top={margin.top}>
          <GridRows
            scale={priceScale}
            width={width}
            height={yMax}
            stroke="#e0e0e0"
            strokeDasharray="4"
          />
          <GridColumns
            scale={dateScale}
            width={width}
            height={yMax}
            stroke="#e0e0e0"
            strokeDasharray="4"
          />

          {dataTypeVariants.map((dataType) => (
            <LinePath
              key={dataType}
              stroke={getColor(dataType) || defaultColor}
              strokeWidth={2}
              data={prices.filter((d) => d.type === dataType)}
              x={(d) => dateScale(getDate(d)) || 0}
              y={(d) => priceScale(getPriceValue(d)) || 0}
            />
          ))}

          <PriceChartAxis
            xScale={dateScale}
            yScale={priceScale}
            width={width}
            yMax={yMax}
          />
          <CursorLine
            tooltipData={tooltipData as EventPriceType[]}
            tooltipLeft={tooltipLeft}
            marginLeft={margin.left}
            yScale={priceScale}
            getColor={getColor}
            innerHeight={topChartHeight}
          />
          <rect
            x={0}
            y={0}
            width={innerWidth}
            height={innerHeight}
            onTouchStart={handleTooltip}
            fill={'transparent'}
            onTouchMove={handleTooltip}
            onMouseMove={handleTooltip}
            onMouseLeave={() => hideTooltip()}
          />
        </Group>
      </React.Fragment>
    </svg>
  )
}

export { LineChart }
