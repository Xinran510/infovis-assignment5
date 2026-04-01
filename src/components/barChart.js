
import Bars from './bars'
import XAxis from './xAxis'
import YAxis from './yAxis'

function BarChart(props){
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
    } = props;
    return (
        <g transform={`translate(${offsetX}, ${offsetY})`}>
            <Bars
                data={data}
                xScale={xScale}
                yScale={yScale}
                height={height}
                selectedStation={selectedStation}
                setSelectedStation={setSelectedStation}
            />
            <YAxis
                yScale={yScale}
                height={height}
                axisLable={"Bikers star from"}
                labelOffsetX={22}
                tickStep={500}
            />
            <XAxis xScale={xScale} height={height} width={width} />
        </g>
    )
}

export default BarChart
