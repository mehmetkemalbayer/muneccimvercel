import React from 'react'
import {
  AnimatedAxis,
  AnimatedGrid,
  AnimatedLineSeries,
  Tooltip,
  XYChart,
} from '@visx/xychart'
import moment from 'moment'

import { ChartDataType } from '@/types/ChartDataType'

const ChartContainer = ({ children }: React.PropsWithChildren) => (
  <div className="">{children}</div>
)

const tickLabelOffset = 10

const accessors = {
  xAccessor: (d) => new Date(`${d.x}T00:00:00`),
  yAccessor: (d) => d.y,
}

const Chart = ({ data }: { data: ChartDataType[] }) => {
  return (
    <ChartContainer>
      <XYChart
        height={240}
        margin={{ left: 0, top: 20, bottom: 38, right: 0 }}
        xScale={{ type: 'time' }}
        yScale={{ type: 'linear' }}
      >
        <AnimatedGrid
          columns={false}
          numTicks={4}
          lineStyle={{
            stroke: '#e1e1e1',
            strokeLinecap: 'round',
            strokeWidth: 1,
          }}
          strokeDasharray="0, 4"
        />
        <AnimatedAxis
          hideAxisLine
          hideTicks
          orientation="bottom"
          tickLabelProps={() => ({ dy: tickLabelOffset })}
          left={30}
          numTicks={4}
        />

        <AnimatedLineSeries
          stroke="#008561"
          dataKey="primary_line"
          data={data}
          {...accessors}
        />
        <Tooltip
          snapTooltipToDatumX
          snapTooltipToDatumY
          showSeriesGlyphs
          glyphStyle={{
            fill: '#008561',
            strokeWidth: 0,
          }}
          renderTooltip={({ tooltipData }) => {
            return (
              <div>
                {Object.entries(tooltipData.datumByKey).map((lineDataArray) => {
                  const [key, value] = lineDataArray

                  return (
                    <div className="row" key={key}>
                      <div className="date">
                        {moment(accessors.xAccessor(value.datum)).format(
                          'MMM d'
                        )}
                      </div>
                      <div className="value">
                        {accessors.yAccessor(value.datum)}
                      </div>
                    </div>
                  )
                })}
              </div>
            )
          }}
        />
      </XYChart>
    </ChartContainer>
  )
}

export default Chart
