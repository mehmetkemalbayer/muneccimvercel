import React, { useCallback } from 'react'
import { Group } from '@visx/group'
import { LinePath, Line } from '@visx/shape'
import { AxisLeft, AxisBottom, AxisScale } from '@visx/axis'
import { LinearGradient } from '@visx/gradient'
import { curveMonotoneX } from '@visx/curve'
import { AppleStock } from '@visx/mock-data/lib/mocks/appleStock'
import { GridRows, GridColumns } from '@visx/grid'

import { useTooltip, TooltipWithBounds, defaultStyles } from '@visx/tooltip'
import { localPoint } from '@visx/event'
import { bisector } from 'd3-array'
import { GlyphCircle } from '@visx/glyph'

// Initialize some variables
const axisColor = '#c5c5c5'
const axisBottomTickLabelProps = {
  textAnchor: 'middle' as const,
  fontFamily: 'Arial',
  fontSize: 10,
  fill: axisColor,
}
const axisLeftTickLabelProps = {
  dx: '-0.25em',
  dy: '0.25em',
  fontFamily: 'Arial',
  fontSize: 10,
  textAnchor: 'end' as const,
  fill: axisColor,
}

// accessors
const getDate = (d: AppleStock) => new Date(d.date)
const getStockValue = (d: AppleStock) => d.close
const bisectDate = bisector((d: AppleStock) => new Date(d.date)).left
const colors = ['#667bf0', '#e77490']
export default function AreaChart({
  data,
  gradientColor,
  width,
  yMax,
  margin,
  xScale,
  yScale,
  hideBottomAxis = false,
  hideLeftAxis = false,
  top,
  left,
  tooltipData,
  tooltipLeft = 0,
  tooltipTop = 0,
  showTooltip,
  hideTooltip,
  setCurrentValues,
  children,
}: {
  data: AppleStock[]
  gradientColor: string
  xScale: AxisScale<number>
  yScale: AxisScale<number>
  width: number
  yMax: number
  margin: { top: number; right: number; bottom: number; left: number }
  hideBottomAxis?: boolean
  hideLeftAxis?: boolean
  top?: number
  left?: number
  tooltipData: Record<string, unknown> | undefined
  tooltipLeft: number
  tooltipTop: number
  showTooltip: ({ tooltipData, tooltipLeft, tooltipTop }) => void
  hideTooltip: () => void
  setCurrentValues: ({
    yesValue,
    noValue,
  }: {
    yesValue: number | undefined
    noValue: number | undefined
  }) => void
  children?: React.ReactNode
}) {
  if (width < 10) return null

  const handleTooltip = (event) => {
    const { x } = localPoint(event) || { x: 0 }
    const x0 = xScale.invert(x - margin.left)

    const index = bisectDate(data, x0, 1)
    const d0 = data[index - 1]
    const d1 = data[index]
    let d = d0

    const getCurrentDateValues = (d: AppleStock) =>
      data.filter((item) => item.date === d.date)

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
      tooltipTop: yScale(getStockValue(d)),
    })

    setCurrentValues({
      yesValue: tooltipData ? getStockValue(tooltipData[0]) : undefined,
      noValue: tooltipData ? getStockValue(tooltipData[1]) : undefined,
    })
  }

  return (
    <React.Fragment>
      <Group left={left || margin.left} top={top || margin.top}>
        <LinearGradient
          id="gradient"
          from={gradientColor}
          fromOpacity={1}
          to={gradientColor}
          toOpacity={0.2}
        />
        <GridRows
          scale={yScale}
          width={width}
          height={yMax}
          stroke="#e0e0e0"
          strokeDasharray="4"
        />
        <GridColumns
          scale={xScale}
          width={width}
          height={yMax}
          stroke="#e0e0e0"
          strokeDasharray="4"
        />
        <LinePath<AppleStock>
          stroke={'#667bf0'}
          strokeWidth={2}
          data={data.filter((d) => d.type === 'YES')}
          x={(d) => xScale(getDate(d)) || 0}
          y={(d) => yScale(getStockValue(d)) || 0}
        />
        <LinePath<AppleStock>
          stroke={'#e77490'}
          strokeWidth={2}
          data={data.filter((d) => d.type === 'NO')}
          x={(d) => xScale(getDate(d)) || 0}
          y={(d) => yScale(getStockValue(d)) || 0}
        />

        {!hideBottomAxis && (
          <AxisBottom
            top={yMax}
            scale={xScale}
            numTicks={width > 520 ? 10 : 5}
            stroke={axisColor}
            tickStroke={axisColor}
            tickLabelProps={() => axisBottomTickLabelProps}
          />
        )}
        {!hideLeftAxis && (
          <AxisLeft
            scale={yScale}
            numTicks={5}
            stroke={axisColor}
            tickStroke={axisColor}
            tickLabelProps={() => axisLeftTickLabelProps}
          />
        )}
        {tooltipData && (
          <g>
            <Line
              from={{ x: tooltipLeft - margin.left, y: 0 }}
              to={{ x: tooltipLeft - margin.left, y: innerHeight }}
              stroke={'#EDF2F7'}
              strokeWidth={2}
              pointerEvents="none"
              strokeDasharray="4,2"
            />
          </g>
        )}
        {tooltipData &&
          tooltipData.map((d, i) => (
            <g key={i}>
              <GlyphCircle
                left={tooltipLeft - margin.left}
                top={yScale(d.close) + 2}
                size={110}
                fill={colors[i]}
                stroke={'white'}
                strokeWidth={2}
              />
            </g>
          ))}
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

        {children}
      </Group>
    </React.Fragment>
  )
}
