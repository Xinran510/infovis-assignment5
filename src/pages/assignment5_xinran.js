
import React from 'react'
import * as d3 from "d3"
import 'bootstrap/dist/css/bootstrap.css'
import { Row, Col, Container} from 'react-bootstrap'
import ScatterPlot from '../components/scatterPlot'
import BarChart from '../components/barChart'
import Tooltip from '../components/tooltips'


const csvUrl = 'https://gist.githubusercontent.com/hogwild/3b9aa737bde61dcb4dfa60cde8046e04/raw/citibike2020.csv'

function useData(csvPath){
    const [dataAll, setData] = React.useState(null);
    React.useEffect(()=>{
        d3.csv(csvPath).then(data => {
            data.forEach(d => {
                d.start = +d.start;
                d.tripdurationS = +d.tripdurationS;
                d.end = +d.end;
                d.tripdurationE = +d.tripdurationE;
            });
            setData(data);
        });
    }, []);
    return dataAll;
}

const Charts = () => {
    const [month, setMonth] = React.useState(4);
    //Q1.5 define hooks to link the points and bars
    //Notes: you should define the hooks at the beginning of the component; a hook cannot be defined after the if ... else... statement;
    const [selectedStation, setSelectedStation] = React.useState(null);
    const [tooltipD, setTooltipD] = React.useState(null);
    const [tooltipX, setTooltipX] = React.useState(null);
    const [tooltipY, setTooltipY] = React.useState(null);
   
    const dataAll = useData(csvUrl);
    if (!dataAll) {
        return <pre>Loading...</pre>;
    };
    const WIDTH_SCATTER = 600;
    const HEIGHT_SCATTER = 400;
    const WIDTH_BAR = 600;
    const HEIGHT_BAR = 400;
    const margin = { top: 20, right: 20, bottom: 50, left: 35};
    const innerHeightScatter = HEIGHT_SCATTER - margin.top - margin.bottom;
    const innerWidthScatter = WIDTH_SCATTER - margin.left - margin.right;
    const innerWidthBar = WIDTH_BAR - margin.left - margin.right;
    const innerHeightBar = HEIGHT_BAR - margin.top - margin.bottom - 72;
    const MONTH = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const data = dataAll.filter( d => { 
        return d.month === MONTH[month] 
    });

   
    const xScaleScatter = d3
        .scaleLinear()
        .domain([0, 2600])
        .range([0, innerWidthScatter]);
    const yScaleScatter = d3
        .scaleLinear()
        .domain([0, 2400])
        .range([innerHeightScatter, 0]);

//Q1.2: Complete the xScaleBar and yScaleBar
//Hint: use d3.scaleBand for xScaleBar
    const xScaleBar = d3
        .scaleBand()
        .domain(data.map((d) => d.station))
        .range([0, innerWidthBar])
        .padding(0.08);
    const yScaleBar = d3
        .scaleLinear()
        .domain([0, 4000])
        .range([innerHeightBar, 0]);

    const changeHandler = (event) => {
        setMonth(Number(event.target.value));
    };
    return (
        <Container className="py-3" style={{ overflow: 'visible' }}>
            <Row
                className="position-relative mb-3 g-2 align-items-start"
                style={{ zIndex: 20, isolation: 'isolate' }}
            >
                <Col xs="auto" className="pe-2 pt-1">
                    <label htmlFor="month-slider" className="form-label small mb-0">
                        Month
                    </label>
                </Col>
                <Col xs={12} sm={8} md={6} lg={5} className="position-relative">
                    <div
                        className="d-flex flex-column align-items-start gap-1"
                        style={{ maxWidth: 360 }}
                    >
                        <input
                            id="month-slider"
                            name="month"
                            className="form-range"
                            type="range"
                            min={0}
                            max={11}
                            step={1}
                            value={month}
                            onChange={changeHandler}
                            style={{
                                width: '100%',
                                touchAction: 'none',
                                cursor: 'pointer',
                                position: 'relative',
                                zIndex: 30,
                            }}
                        />
                        <input
                            className="form-control form-control-sm"
                            style={{ width: 72 }}
                            type="text"
                            value={MONTH[month] ?? ''}
                            readOnly
                            tabIndex={-1}
                            aria-label="Selected month"
                        />
                    </div>
                </Col>
            </Row>
            <Row className="justify-content-center align-items-start g-3 position-relative" style={{ zIndex: 0 }}>
                <Col xs={12} lg={6} className="d-flex justify-content-center">
                    <svg width={WIDTH_SCATTER} height={HEIGHT_SCATTER}>
                        <ScatterPlot offsetX={margin.left} offsetY={margin.top} data={data} xScale={xScaleScatter} yScale={yScaleScatter} 
                        height={innerHeightScatter} width={innerWidthScatter}
                        selectedStation={selectedStation} setSelectedStation={setSelectedStation}
                        setTooltipD={setTooltipD} setTooltipX={setTooltipX} setTooltipY={setTooltipY}/>
                    </svg>
                </Col>
                <Col xs={12} lg={6} className="d-flex justify-content-center overflow-x-auto">
                    <svg width={WIDTH_BAR} height={HEIGHT_BAR}>
                        <BarChart offsetX={margin.left} offsetY={margin.top} data={data} xScale={xScaleBar} 
                        yScale={yScaleBar} height={innerHeightBar} width={innerWidthBar}
                        selectedStation={selectedStation} setSelectedStation={setSelectedStation}/>
                    </svg>
                </Col>
            </Row>
            {/* Q1.6: add the Tooltip 
            1. you should get the selected pointed first and pass it to the <Tooltip />
            2. you should define the hooks for X and Y coordinates of the tooltip; 
            3. to get the position of the mouse event, you can use event.pageX and event.pageY;
            */}
            <Tooltip d={tooltipD} x={tooltipX} y={tooltipY} />
        </Container>
    )   
}


export default Charts

