import * as d3 from "d3"

//`<XAxis />` has the following properties,
// - xScale: the scale of the x-axis
// - height: the height of the scatter plot
// - width: the width of the scatter plot
// - axisLabel: the name of the axis
// - `<YAxis />` has the following properties,
// - yScale: the scale of y-axis
// - height: the height of the scatter plot
// - axisLabel: the name of the axis
// - **`<Points />`**: it is defined in the module points.js. The radius of each `<circle />` is 5 and the color is `steelblue`, and the `<Points />` has the following properties,
// - data: the data items
// - xScale: the scale for the x coordinate
// - yScale: the scale for the y coordinate




function XAxis(props){
    const { xScale, height, width, axisLable } = props;
    //Note:
    //1. XAxis works for two cases: the xScale is linear (i.e., scatter plot) and the xScalse is discrete (i.e., bar chart)
    //2. you can use typeof(xScale.domain()[0]) to decide the return value
    //3. if typeof(xScale.domain()[0]) is a number, xScale is a linear scale; if it is a string, it is a scaleBand.
    
    if (xScale) {
        const domain = xScale.domain();
        const isLinear = typeof domain[0] === 'number';

        if (isLinear) {
            const d0 = domain[0];
            const d1 = domain[1];
            const ticks =
                d0 === 0 && d1 === 2600
                    ? d3.range(0, 2800, 200)
                    : xScale.ticks(10);
            const fmt = d3.format(',');
            return (
                <g transform={`translate(0, ${height})`}>
                    <line x1={0} y1={0} x2={width} y2={0} stroke="black" />
                    {ticks.map((t, i) => (
                        <g key={i} transform={`translate(${xScale(t)}, 0)`}>
                            <line y2={6} stroke="black" />
                            <text
                                y={20}
                                style={{ textAnchor: 'middle', fontSize: '10px' }}
                            >
                                {fmt(t)}
                            </text>
                        </g>
                    ))}
                    {axisLable ? (
                        <text
                            x={width / 2}
                            y={42}
                            style={{ textAnchor: 'middle', fontSize: '12px' }}
                        >
                            {axisLable}
                        </text>
                    ) : null}
                </g>
            );
        }

        // discrete scale (e.g., scaleBand for bar chart) — rotate labels like assignment reference
        return (
            <g transform={`translate(0, ${height})`}>
                <line x1={0} y1={0} x2={width} y2={0} stroke="black" />
                {domain.map((d, i) => {
                    const x =
                        xScale(d) +
                        (typeof xScale.bandwidth === 'function'
                            ? xScale.bandwidth() / 2
                            : 0);
                    return (
                        <g key={i} transform={`translate(${x}, 0)`}>
                            <line y2={6} stroke="black" />
                            <text
                                y={8}
                                transform="rotate(45)"
                                style={{ textAnchor: 'start', fontSize: '9px' }}
                            >
                                {d}
                            </text>
                        </g>
                    );
                })}
                {axisLable ? (
                    <text
                        x={width / 2}
                        y={Math.max(height * 0.15, 48)}
                        style={{ textAnchor: 'middle', fontSize: '12px' }}
                    >
                        {axisLable}
                    </text>
                ) : null}
            </g>
        );
    } else {
        return <g></g>
    }
}

export default XAxis