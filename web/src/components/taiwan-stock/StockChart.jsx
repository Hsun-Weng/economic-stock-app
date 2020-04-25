import React, { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { Grid, Paper, FormControl, Select, InputLabel, MenuItem, Box} from '@material-ui/core'
import { Skeleton } from '@material-ui/lab';

import CandlestickChart from './CandlestickChart';

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 200
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

const StockChart = () => {
    const classes = useStyles();
    const fixedInputSkeletonHeight = clsx(classes.paper, classes.fixedInputSkeletonHeight);
    const fixedChartHeightPaper = clsx(classes.paper, classes.fixedChartHeight);

    const [ categoryCode, setCategoryCode ] = useState("024");
    const [ stockCode, setStockCode ] = useState("2330");
    const [ categories, setCategories ] = useState([]);
    const [ stocks, setStocks ] = useState([]);
    const [ dataset, setDataset ] = useState([]);

    // 預設30天前
    const [ startDate, setStartDate ] = useState(new Date(Date.now() - 120 * 24 * 60 * 60 * 1000));
    const [ endDate, setEndDate ] = useState(new Date());

    const fetchCategories = async() => {
        const res = await fetch(`/api/stock/taiwan/categories`)
        res.json()
            .then(res => res.data)
            .then(data => setCategories(data))
            .catch(err => console.log(err));
    }

    /**
     * 所有證券代號
     */
    const fetchStocks = async( category ) => {
        const res = await fetch(`/api/stock/taiwan/category/${category}/stocks`);
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

    const CategorySelect = () => (
        <FormControl className={classes.formControl}>
            <InputLabel>Category</InputLabel>
            <Select
                value={categoryCode}
                onChange={handleChangeCategory}>
                {categories.map((prop, key) => <MenuItem key={key} value={prop.categoryCode}>{prop.categoryName}</MenuItem>)}
            </Select>
        </FormControl>
    )

    const StockSelect = () => (
        <FormControl className={classes.formControl}>
            <InputLabel>Stock</InputLabel>
            <Select
                value={stockCode}
                onChange={handleChangeStock}>
                {stocks.map((prop, key) => <MenuItem key={key} value={prop.stockCode}>{prop.stockCode} {prop.stockName}</MenuItem>)}
            </Select>
        </FormControl>
    )

    const handleChangeCategory = event => {
        setCategoryCode(event.target.value);
    }

    const handleChangeStock = event => {
        setStockCode(event.target.value);
    }

    useEffect(() => {
        fetchCategories();
    }, [])

    useEffect(() => {
        fetchStocks(categoryCode);
    }, [ categoryCode ])

    useEffect(() => {
        fetchStockData(stockCode, startDate, endDate);
    }, [ stockCode, startDate, endDate ])

    return (
        <React.Fragment>
            <Grid container spacing={3}>
                <Grid item md={12}>
                    <Paper>
                        {categories.length > 0 && stocks.length > 0?
                            <Box>
                                <CategorySelect />
                                <StockSelect />
                            </Box>
                        :<Skeleton variant="text" className={fixedInputSkeletonHeight} />}
                    </Paper>
                </Grid>
                <Grid item md={12}>
                    <Paper className={fixedChartHeightPaper}>
                        {dataset.length > 0 ?
                            <CandlestickChart dataset={dataset.map((data) => {
                                data.date = new Date(data.date);
                                return data;
                            })} />
                        :<Skeleton variant="rect" className={fixedChartHeightPaper} />}
                    </Paper>
                </Grid>
            </Grid>
        </React.Fragment>);
}

export default StockChart;