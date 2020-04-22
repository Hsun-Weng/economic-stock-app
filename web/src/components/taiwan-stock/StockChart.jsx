import React, { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { Skeleton } from '@material-ui/lab';

import CandlestickChart from './CandlestickChart';

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 200
    },
    fixedHeight: {
        height: 400
    },
    fixedChartHeight: {
        height: 450,
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
}));

const StockChart = () => {
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    const fixedChartHeightPaper = clsx(classes.paper, classes.fixedChartHeight);

    const [ stockCode, setStockCode ] = useState("2330");
    const [ stocks, setStocks ] = useState([]);
    const [ dataset, setDataset ] = useState([]);

    // 預設30天前
    const [ startDate, setStartDate ] = useState(new Date(Date.now() - 120 * 24 * 60 * 60 * 1000));
    const [ endDate, setEndDate ] = useState(new Date());

    /**
     * 所有期貨代號
     */
    const fetchStocks = async() => {
        const res = await fetch(`/api/stock/taiwan`);
        res.json()
            .then(res => res.data)
            .then(data => setStocks(data))
            .catch(err => console.log(err));
    };

    const fetchStockData = async(stock, start, end) => {
        let formatStart = start.toISOString().slice(0,10)
        let formatEnd = end.toISOString().slice(0,10)
        const res = await fetch(`/data/stock/taiwan/${stock}?startDate=${formatStart}&endDate=${formatEnd}`);
        res.json()
            .then(res => res.data)
            .then(data => setDataset(data))
            .catch(err => console.log(err));
    }

    const StockSelect = () => {
        if (stocks.length > 0) {
            return (
                <FormControl className={classes.formControl}>
                    <InputLabel>Stock</InputLabel>
                    <Select
                        value={stockCode}
                        onChange={handleChangeStock}>
                        {stocks.map((prop, key) => <MenuItem key={key} value={prop.stockCode}>{prop.stockCode} {prop.stockName}</MenuItem>)}
                    </Select>
                </FormControl>
            )
        } else{
            return null;
        }
    }

    const handleChangeStock = event => {
        setStockCode(event.target.value);
    }

    useEffect(() => {
        fetchStocks();
    }, [])

    useEffect(() => {
        fetchStockData(stockCode, startDate, endDate);
    }, [ stockCode, startDate, endDate ])

    return (
        <React.Fragment>
            <Grid container spacing={3}>
                <Grid item md={12}>
                    {stocks.length > 0?
                        <Paper>
                            <StockSelect />
                        </Paper>
                    :<Skeleton variant="text" className={fixedHeightPaper} />}
                </Grid>
                <Grid item md={12}>
                    {dataset.length > 0 ?
                        <Paper className={fixedChartHeightPaper}>
                            <CandlestickChart dataset={dataset.map((data) => {
                                data.date = new Date(data.date);
                                return data;
                            })} />
                        </Paper>
                    :<Skeleton variant="rect" className={fixedChartHeightPaper} />}
                </Grid>
            </Grid>
        </React.Fragment>);
}

export default StockChart;