import { AxisLeft, AxisBottom, AxisScale, AxisScaleOutput } from '@visx/axis'
import { ScaleTime } from 'd3-scale'

const styles = {
  axisColor: '#c5c5c5',
}

const axisBottomTickLabelProps = {
  textAnchor: 'middle' as const,
  fontFamily: 'Arial',
  fontSize: 10,
  fill: styles.axisColor,
}
const axisLeftTickLabelProps = {
  dx: '-0.25em',
  dy: '0.25em',
  fontFamily: 'Arial',
  fontSize: 10,
  textAnchor: 'end' as const,
  fill: styles.axisColor,
}

export type PriceChartAxisProps = {
  xScale: ScaleTime<number, number, never>
  yScale: AxisScale<AxisScaleOutput>
  width: number
  yMax: number
}
const PriceChartAxis = ({
  xScale,
  yScale,
  width = 0,
  yMax = 0,
}: PriceChartAxisProps) => {
  return (
    <>
      <AxisBottom
        top={yMax}
        scale={xScale}
        numTicks={width > 520 ? 10 : 5}
        stroke={styles.axisColor}
        tickStroke={styles.axisColor}
        tickLabelProps={() => axisBottomTickLabelProps}
      />

      <AxisLeft
        scale={yScale}
        numTicks={5}
        stroke={styles.axisColor}
        tickStroke={styles.axisColor}
        tickLabelProps={() => axisLeftTickLabelProps}
      />
    </>
  )
}

export { PriceChartAxis }
