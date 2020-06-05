import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { Grid, Paper, FormControl, Select, InputLabel, MenuItem, Box} from '@material-ui/core'
import { Skeleton } from '@material-ui/lab';

import { stockAction } from '../../actions'
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

    const dispatch = useDispatch();
    const categories = useSelector(state=>state.stock.categories.data);
    const stocks = useSelector(state=>state.stock.categoryStocks.data);
    const stockPrices = useSelector(state=>state.stock.price.data);
    
    const [ categoryCode, setCategoryCode ] = useState("024");
    const [ stockCode, setStockCode ] = useState("2330");
    const [ dataset, setDataset ] = useState([]);

    // 預設30天前
    const [ startDate, setStartDate ] = useState(new Date(Date.now() - 120 * 24 * 60 * 60 * 1000));
    const [ endDate, setEndDate ] = useState(new Date());

    const formatDate = date => date.toISOString().slice(0,10);

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
        dispatch(stockAction.getCategories());
    }, [])

    useEffect(() => { 
        dispatch(stockAction.getCategoryStocks(categoryCode));
    }, [ categoryCode ])

    useEffect(() => {
        dispatch(stockAction.getStockPrices(stockCode, formatDate(startDate), formatDate(endDate)))
    }, [ stockCode, startDate, endDate])

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
                        <Box display="flex" justifyContent="center">
                            {stockPrices.length > 0 ?
                                <CandlestickChart dataset={stockPrices.map((data) => {
                                    data.date = new Date(data.date);
                                    return data;
                                })} />
                            :<Skeleton variant="rect" className={fixedChartHeightPaper} />}
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </React.Fragment>);
}

export default StockChart;