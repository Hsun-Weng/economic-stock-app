import React from 'react';

import { ChartCanvas, Chart } from 'react-stockcharts';
import { CandlestickSeries, LineSeries } from "react-stockcharts/lib/series";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import { sma } from "react-stockcharts/lib/indicator";
import { discontinuousTimeScaleProvider } from "react-stockcharts/lib/scale";

import { MovingAverageTooltip } from "react-stockcharts/lib/tooltip";
import { CurrentCoordinate } from "react-stockcharts/lib/coordinates";

import sampleData from '../../sample/futures';
import { last } from "react-stockcharts/lib/utils";

const FuturesCandlestickChart = () => {
    const chartData = () => {
        return sampleData.map((data)=> {
            return {"date": new Date(data.date),
                    "open": data.open,
                    "low": data.low,
                    "high": data.high,
                    "close": data.close,
                    "volume": data.volume}
        });
    }

    const sma20 = sma()
                .options({ 
                    windowSize: 20 ,
                    sourcePath: "close"
                })
                .merge((d, c) => {
                    console.log(c)
                    d.sma20 = c;
                })
                .accessor(d => d.sma20);

    const calculatedData = sma20(chartData());

    const xScaleProvider = discontinuousTimeScaleProvider.inputDateAccessor(d => d.date);

    const { data, xScale, xAccessor, displayXAccessor} = xScaleProvider(calculatedData);

    const start = xAccessor(last(data));
    const end = xAccessor(data[0]);
    const xExtents = [start, end];

    return (<ChartCanvas width={950}
                height={400}
                seriesName="MSFT"
                margin={{ top: 50, right: 50, bottom: 50, left: 60 }}
                type={"svg"}
                data={data}
                xAccessor={xAccessor}
                ratio={1}
                xExtents={xExtents}
                xScale={xScale}
                displayXAccessor={displayXAccessor}
            >
                <Chart id={1} yExtents={[d => [d.high, d.low], sma20.accessor()]} 
                    padding={{ top: 10, bottom: 20 }} >
                    <XAxis axisAt="bottom" orient="bottom" ticks={6} />
                    <YAxis axisAt="right" orient="right" ticks={5} />
                    <CandlestickSeries />
                    <LineSeries yAccessor={sma20.accessor()} stroke={sma20.stroke()}/>
                    <CurrentCoordinate yAccessor={sma20.accessor()} fill={sma20.stroke()} />
                    <MovingAverageTooltip origin={[-38, 15]}
                        options={[
                            {
                                yAccessor: sma20.accessor(),
                                type: "SMA",
                                stroke: sma20.stroke(),
                                windowSize: sma20.options().windowSize
                            }
                        ]}/>
                </Chart>
        </ChartCanvas>);
}

export default FuturesCandlestickChart;