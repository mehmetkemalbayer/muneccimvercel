import { EventPriceType } from '@/types/EventPriceType'
import { TooltipWithBounds, defaultStyles } from '@visx/tooltip'
import React from 'react'
export type PriceChartTooltipProps = {
  tooltipData: EventPriceType[]
  tooltipTop: number
  tooltipLeft: number
  currentValues: {
    yesValue: number | undefined
    noValue: number | undefined
  }
}

const tooltipStyles: React.CSSProperties = {
  ...defaultStyles,
  minWidth: 60,
  backgroundColor: 'rgba(255,255,255,0.9)',
  borderColor: '#c5c5c5',
  borderWidth: '1px',
  borderStyle: 'solid',
  borderRadius: '3px',
  color: '#c5c5c5',
}

const PriceChartTooltip = ({
  tooltipData,
  tooltipTop = 0,
  tooltipLeft = 0,
  currentValues,
}: PriceChartTooltipProps) => {
  return (
    <>
      {tooltipData && (
        <div>
          <TooltipWithBounds
            key={Math.random()}
            top={tooltipTop}
            left={tooltipLeft}
            style={tooltipStyles}
          >
            <p className="flex flex-row justify-center items-center">
              {`YES: ${currentValues?.yesValue?.toFixed(4) || '-'}`}
            </p>
            <br />
            <p className="flex flex-row justify-center items-center">
              {`NO: ${currentValues?.noValue?.toFixed(4) || '-'}`}
            </p>
          </TooltipWithBounds>
        </div>
      )}
    </>
  )
}

export { PriceChartTooltip }
