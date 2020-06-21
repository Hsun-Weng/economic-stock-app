import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

import { Paper, Box, Grid, FormControl, InputLabel, Select, MenuItem, IconButton } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

import AddIcon from '@material-ui/icons/Add';

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

import { stockAction, portfolioAction } from '../actions';

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 200
    },
    button: {
        margin: theme.spacing(1)
    },
    fixedInputSkeletonHeight: {
        height: 65,
    },
    fixedChartHeight: {
        height: 900,
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
}));

const CandleStickChart = ({ dataset }) => {

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

const StockChart = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.user);
    const portfolios = useSelector(state => state.portfolio.portfolios.data);
    const prices = useSelector(state=>state.stock.price.data);

    const classes = useStyles();
    const fixedChartHeightPaper = clsx(classes.paper, classes.fixedChartHeight);

    const [ portfolioId, setPortfolioId ] = useState(0);

    const { stockCode } = useParams();

    const formatDate = date => date.toISOString().slice(0,10);

    const handleChangePortfolioId = ( event ) => {
        setPortfolioId(event.target.value);
    }

    const addPortfolioProduct = ( event ) => {
        let portfolioProduct = {
            id: {
                portfolioId: portfolioId,
                productType: 1,
            },
            productCode: stockCode
        }
        dispatch(portfolioAction.addPortfolioProduct(portfolioProduct));
    }


    const UserPortfolioSelect = () =>(
        <FormControl className={classes.formControl}>
            <InputLabel>Add to portfolio</InputLabel>
            <Select
                value={portfolioId}
                onChange={handleChangePortfolioId}>
                {portfolios.map((prop, key)=><MenuItem key={key} value={prop.portfolioId}>{prop.portfolioName}</MenuItem>)}
            </Select>
        </FormControl>
    );

    useEffect(()=>{
        if( portfolios.length > 0){
            setPortfolioId(portfolios[0].portfolioId);
        }
    }, [ portfolios ])

    useEffect(() => {
        let startDate = new Date(Date.now() - 120 * 24 * 60 * 60 * 1000);
        let endDate = new Date();
        dispatch(stockAction.getStockPrices(stockCode, formatDate(startDate), formatDate(endDate)))
    }, [ dispatch, stockCode ])

    return (
        <React.Fragment>
            <Grid container spacing={3}>
                {(user != null && portfolios.length > 0) &&
                    <Grid item md={12}>
                        <Paper>
                            <Box>
                                <UserPortfolioSelect />
                                <IconButton color="primary" className={classes.button} onClick={addPortfolioProduct}>
                                    <AddIcon />
                                </IconButton>
                            </Box>
                        </Paper>
                    </Grid>
                }
                <Grid item md={12}>
                    <Paper className={fixedChartHeightPaper}>
                        <Box display="flex" justifyContent="center">
                            {prices.length > 0 ?
                                <CandleStickChart dataset={prices.map((data) => {
                                    data.date = new Date(data.date);
                                    return data;
                                })} />
                            :<Skeleton variant="rect" className={fixedChartHeightPaper} />}
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default StockChart;