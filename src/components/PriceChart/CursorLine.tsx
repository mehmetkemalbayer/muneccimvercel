import { EventPriceType } from '@/types/EventPriceType'
import { GlyphCircle } from '@visx/glyph'

import { Line } from '@visx/shape'

const styles = {
  defaultPointerColor: '#DDDDDD',
  lineStrokeColor: '#ddd',
}

export type CursorLineProps = {
  tooltipData: EventPriceType[]
  tooltipLeft: number
  marginLeft: number
  innerHeight: number
  yScale: (value: Date | number) => number
  getColor: (value: string) => string | undefined
}

const CursorLine = ({
  tooltipData,
  tooltipLeft = 0,
  marginLeft = 0,
  innerHeight = 0,
  yScale,
  getColor,
}: CursorLineProps) => {
  console.log({ innerHeight })
  return (
    <>
      {tooltipData && (
        <>
          <g>
            <Line
              from={{ x: tooltipLeft - marginLeft, y: 0 }}
              to={{ x: tooltipLeft - marginLeft, y: innerHeight }}
              stroke={styles.lineStrokeColor}
              strokeWidth={2}
              pointerEvents="none"
              strokeDasharray="4,2"
            />
          </g>
          {(tooltipData as EventPriceType[]).map((d, i) => (
            <g key={i}>
              <GlyphCircle
                left={tooltipLeft - marginLeft}
                top={(yScale(d.value) || 0) + 2}
                size={110}
                fill={getColor(d.type) || styles.defaultPointerColor}
                stroke={'white'}
                strokeWidth={2}
              />
            </g>
          ))}
        </>
      )}
    </>
  )
}
export { CursorLine }
