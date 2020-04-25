import React from 'react';

import { ChartCanvas, Chart } from 'react-stockcharts';
import { CandlestickSeries, LineSeries, BarSeries, RSISeries } from "react-stockcharts/lib/series";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import { sma, rsi } from "react-stockcharts/lib/indicator";
import { discontinuousTimeScaleProvider } from "react-stockcharts/lib/scale";
import { format } from "d3-format";
import { timeFormat } from "d3-time-format";

import { OHLCTooltip, MovingAverageTooltip, RSITooltip } from "react-stockcharts/lib/tooltip";
import { CrossHairCursor, MouseCoordinateX, MouseCoordinateY, CurrentCoordinate } from "react-stockcharts/lib/coordinates";

import { last } from "react-stockcharts/lib/utils";

const CandlestickChart = ({ dataset }) => {

    const sma5 = sma().options({ 
                    windowSize: 5 ,
                    sourcePath: "close"
                })
                .merge((d, c) => {
                    d.sma5 = c;
                })
                .accessor(d => d.sma5)
                .stroke("#C7C742");

    const sma10 = sma().options({ 
                    windowSize: 10 ,
                    sourcePath: "close"
                })
                .merge((d, c) => {
                    d.sma10 = c;
                })
                .accessor(d => d.sma10)
                .stroke("#42DBC8");

    const sma20 = sma()
                .options({ 
                    windowSize: 20 ,
                    sourcePath: "close"
                })
                .merge((d, c) => {
                    d.sma20 = c;
                })
                .accessor(d => d.sma20)
                .stroke("#594BFE");

    const rsi5 = rsi()
                .options({ windowSize: 5 })
                .merge((d, c) => {d.rsi5 = c;})
                .accessor(d => d.rsi5);
    
    const rsi10 = rsi()
                .options({ windowSize: 10 })
                .merge((d, c) => {d.rsi10 = c;})
                .accessor(d => d.rsi10);

    const calculatedData = sma5(sma10(sma20(rsi5(rsi10(dataset)))));

    const xScaleProvider = discontinuousTimeScaleProvider.inputDateAccessor(d => d.date);

    const { data, xScale, xAccessor, displayXAccessor} = xScaleProvider(calculatedData);

    const start = xAccessor(last(data));
    const end = xAccessor(data[0]);
    const xExtents = [start, end];

    return (<ChartCanvas 
                width={950}
                height={800}
                margin={{ top: 50, right: 50, bottom: 50, left: 60 }}
                type={"svg"}
                data={data}
                xAccessor={xAccessor}
                seriesName="CandleStick"
                ratio={2}
                xExtents={xExtents}
                xScale={xScale}
                displayXAccessor={displayXAccessor}>
                <Chart id={1} yExtents={[d => [d.high, d.low], sma5.accessor(), sma10.accessor(), sma20.accessor()]} 
                    height={400}
                    padding={{ top: 10, bottom: 20 }} >
                    <OHLCTooltip origin={[-40, -10]}/>
                    <XAxis axisAt="bottom" orient="bottom" showTicks={false} />
                    <YAxis axisAt="right" orient="right" ticks={5} />
                    <CandlestickSeries />
                    <LineSeries yAccessor={sma5.accessor()} stroke={sma5.stroke()}/>
                    <CurrentCoordinate yAccessor={sma5.accessor()} fill={sma5.stroke()} />
                    <LineSeries yAccessor={sma10.accessor()} stroke={sma10.stroke()}/>
                    <CurrentCoordinate yAccessor={sma10.accessor()} fill={sma10.stroke()} />
                    <LineSeries yAccessor={sma20.accessor()} stroke={sma20.stroke()}/>
                    <CurrentCoordinate yAccessor={sma20.accessor()} fill={sma20.stroke()} />
                    <MouseCoordinateY at="right" orient="right" displayFormat={format(".2f")} />
                    <MovingAverageTooltip
						onClick={e => null}
						origin={[-38, 15]}
						options={[
							{
								yAccessor: sma5.accessor(),
								type: "SMA",
								stroke: sma5.stroke(),
								windowSize: sma5.options().windowSize,
							},
							{
								yAccessor: sma10.accessor(),
								type: "SMA",
								stroke: sma10.stroke(),
								windowSize: sma10.options().windowSize,
                            },
                            {
								yAccessor: sma20.accessor(),
								type: "SMA",
								stroke: sma20.stroke(),
								windowSize: sma20.options().windowSize,
							},
						]}
					/>
                </Chart>
                <Chart id={2} origin={(w, h) => [0, h - 300]} yExtents={d => d.volume}
                    height={150}>
					<XAxis axisAt="bottom" orient="bottom" showTicks={false} />
					<YAxis axisAt="right" orient="right" ticks={5} />
                    <MouseCoordinateY at="right" orient="right" displayFormat={format(".2s")} />
					<BarSeries yAccessor={d => d.volume} fill={(d) => d.close > d.open ? "#6BA583" : "red"} />
				</Chart>
                <Chart id={3} yExtents={[0, 100]}
                    height={150} origin={(w, h) => [0, h - 150]} >
					<XAxis axisAt="bottom" orient="bottom" />
					<YAxis axisAt="right" orient="right" tickValues={[30, 50, 70]} />
                    <MouseCoordinateY at="right" orient="right" displayFormat={format(".2f")} />
					<RSISeries yAccessor={d => d.rsi5} />
                    <RSISeries yAccessor={d => d.rsi10} />
                    <RSITooltip 
                        origin={[-38, 15]}
						yAccessor={d => d.rsi5}
						options={rsi5.options()} />
                    <RSITooltip 
                        origin={[40, 15]}
						yAccessor={d => d.rsi10}
						options={rsi10.options()} />
                    <MouseCoordinateX
						at="bottom"
						orient="bottom"
						displayFormat={timeFormat("%Y-%m-%d")} />
				</Chart>
                <CrossHairCursor />
        </ChartCanvas>);
}

export default CandlestickChart;