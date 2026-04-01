import React from 'react'

function getColor(selectedStation, station) {
    return selectedStation === station ? 'red' : 'steelblue';
}

function getRadius(selectedStation, station) {
    return selectedStation === station ? 10 : 5;
}

function Points(props) {
    const {
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

    if (data) {
        const selectedDatum =
            selectedStation == null
                ? null
                : data.find((d) => d.station === selectedStation);

        const clearTooltip = () => {
            setTooltipD?.(null);
            setTooltipX?.(null);
            setTooltipY?.(null);
        };

        const setTooltipFromEvent = (event, d) => {
            setTooltipD?.(d);
            setTooltipX?.(event.pageX);
            setTooltipY?.(event.pageY);
        };

        return (
            <g
                onMouseLeave={() => {
                    setSelectedStation?.(null);
                    clearTooltip();
                }}
            >
                {data.map((d, idx) => (
                    <circle
                        key={idx}
                        cx={xScale(d.tripdurationS)}
                        cy={yScale(d.tripdurationE)}
                        r={getRadius(selectedStation, d.station)}
                        fill={getColor(selectedStation, d.station)}
                        onMouseEnter={(event) => {
                            setSelectedStation?.(d.station);
                            setTooltipFromEvent(event, d);
                        }}
                        onMouseMove={(event) => {
                            if (selectedStation === d.station) {
                                setTooltipFromEvent(event, d);
                            }
                        }}
                        onMouseOut={(e) => {
                            const root = e.currentTarget.parentNode;
                            if (
                                root &&
                                e.relatedTarget &&
                                root.contains(e.relatedTarget)
                            ) {
                                return;
                            }
                            setSelectedStation?.(null);
                            clearTooltip();
                        }}
                    />
                ))}
                {selectedStation != null && selectedDatum ? (
                    <>
                        <rect
                            width={width}
                            height={height}
                            fill="yellow"
                            fillOpacity={0.65}
                            pointerEvents="none"
                        />
                        <circle
                            cx={xScale(selectedDatum.tripdurationS)}
                            cy={yScale(selectedDatum.tripdurationE)}
                            r={10}
                            fill="red"
                            pointerEvents="none"
                        />
                    </>
                ) : null}
            </g>
        );
    }
    return <g></g>;
}

export default Points
