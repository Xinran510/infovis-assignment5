

import React from 'react'
import * as d3 from "d3"

function YAxis(props){
    const { yScale, height, axisLable, labelOffsetX = -40, tickStep } = props;
    const axisRef = React.useRef(null);

    React.useEffect(() => {
        if (!yScale || !axisRef.current) return;
        const [d0, d1] = yScale.domain();
        const axis = d3.axisLeft(yScale);
        if (tickStep != null && d0 === 0) {
            axis.tickValues(d3.range(0, d1 + tickStep, tickStep));
        } else {
            axis.ticks(8);
        }
        axis.tickFormat(d3.format(','));
        d3.select(axisRef.current).call(axis);
    }, [yScale, tickStep]);

    if(yScale){
        return (
            <g>
                <g ref={axisRef} />
                {axisLable ? (
                    <text
                        style={{ textAnchor: 'middle', fontSize: '15px' }}
                        transform={`translate(${labelOffsetX}, ${height / 2}) rotate(-90)`}
                    >
                        {axisLable}
                    </text>
                ) : null}
            </g>
        )
    } else {
        return <g></g>
    }

}

export default YAxis