

import React from 'react'

function getColor(selectedStation, station) {
    return selectedStation === station ? 'red' : 'steelblue';
}

function Bars(props) {
    const {data, xScale, yScale, height, selectedStation, setSelectedStation} = props;

    if(data && xScale && yScale){
        return (
            <g onMouseLeave={() => setSelectedStation?.(null)}>
                {data.map((d, i) => (
                    <rect
                        key={i}
                        x={xScale(d.station)}
                        y={yScale(d.start)}
                        width={xScale.bandwidth()}
                        height={height - yScale(d.start)}
                        fill={getColor(selectedStation, d.station)}
                        onMouseEnter={() => setSelectedStation?.(d.station)}
                        onMouseOut={(e) => {
                            const root = e.currentTarget.parentNode;
                            if (root && e.relatedTarget && root.contains(e.relatedTarget)) {
                                return;
                            }
                            setSelectedStation?.(null);
                        }}
                    />
                ))}
            </g>
        )
    } else {
        return <g></g>
    }
}

export default Bars
