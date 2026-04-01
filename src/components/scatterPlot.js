
import Points from './points'
import XAxis from './xAxis'
import YAxis from './yAxis'

function ScatterPlot(props){
    const {
        offsetX,
        offsetY,
        data,
        xScale,
        yScale,
        height,
        width,
        selectedStation,
        setSelectedStation,
        setTooltipD,
        setTooltipX,
        setTooltipY,
    } = props;
    // Task 1: translate the plot contents by offsets.
    // Task 2: compose Points + axes.
    return (
        <g transform={`translate(${offsetX}, ${offsetY})`}>
            <Points
                data={data}
                xScale={xScale}
                yScale={yScale}
                height={height}
                width={width}
                selectedStation={selectedStation}
                setSelectedStation={setSelectedStation}
                setTooltipD={setTooltipD}
                setTooltipX={setTooltipX}
                setTooltipY={setTooltipY}
            />
            <YAxis
                yScale={yScale}
                height={height}
                axisLable={"Trip duration end in"}
                labelOffsetX={20}
                tickStep={200}
            />
            <XAxis
                xScale={xScale}
                height={height}
                width={width}
                axisLable={"Trip duration start from"}
            />
        </g>
      )
      }

export default ScatterPlot