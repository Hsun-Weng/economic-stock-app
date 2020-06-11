import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { Grid, Paper, FormControl, Select, InputLabel, MenuItem, Box, IconButton, Menu, TextField } from '@material-ui/core'
import { Skeleton, Autocomplete } from '@material-ui/lab';
import AddIcon from '@material-ui/icons/Add';

import { stockAction, portfolioAction } from '../../actions'
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
    button: {
        margin: theme.spacing(1)
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
}));

const StockSearch = () => {
    const classes = useStyles();
    const fixedInputSkeletonHeight = clsx(classes.paper, classes.fixedInputSkeletonHeight);
    const fixedChartHeightPaper = clsx(classes.paper, classes.fixedChartHeight);

    const dispatch = useDispatch();
    const stockPrices = useSelector(state=>state.stock.price.data);
    const portfolios = useSelector(state => state.portfolio.portfolios.data);
    const allStocks = useSelector(state=> state.stock.allStocks.data);
    
    const [ stock, setStock ] = useState({stockCode: "2330", stockName: "台積電"});

    const [ anchorEl, setAnchorEl ] = useState(null);
    const open = Boolean(anchorEl);

    // 預設30天前
    const [ startDate, setStartDate ] = useState(new Date(Date.now() - 120 * 24 * 60 * 60 * 1000));
    const [ endDate, setEndDate ] = useState(new Date());

    const formatDate = date => date.toISOString().slice(0,10);

    const handleChangeStock = ( event, value) => {
        setStock(value);
    }

    const handleMenu = ( event ) => {
        setAnchorEl(event.currentTarget);
    }
    const handleMenuClose = () => {
        setAnchorEl(null);
    }

    const addPortfolioProduct = ( portfolioId ) => {
        let portfolioProduct = {
            portfolioId: portfolioId,
            productType: 1,
            productCode: stock.stockCode
        }
        dispatch(portfolioAction.addPortfolioProduct(portfolioProduct));
    }

    const PortfolioSelect = () => (
        <Menu 
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: "top",
                horizontal: "right"
            }}
            keepMounted
            transformOrigin={{
                vertical: "top",
                horizontal: "right"
            }}
            open={open}
            onClose={handleMenuClose}
            >
            {portfolios.map((prop, key)=>
                <MenuItem key={key} onClick={event=>addPortfolioProduct(prop.portfolioId)}>{prop.portfolioName}</MenuItem>
            )}
        </Menu>)

    const SearchText = () => (
        <FormControl className={classes.formControl}>
            <Autocomplete
                options={allStocks}
                getOptionLabel={(stock)=>stock.stockCode + " " + stock.stockName}
                value={stock}
                onChange={handleChangeStock}
                disableClearable={true}
                renderInput={(params)=> <TextField {...params} label="Stock"/>}
            />
        </FormControl>
    )

    useEffect(() => {
        dispatch(stockAction.getAllStocks());
        dispatch(portfolioAction.getPortfolio());
    }, [])

    useEffect(() => {
        dispatch(stockAction.getStockPrices(stock.stockCode, formatDate(startDate), formatDate(endDate)));
    }, [ stock, startDate, endDate ])

    return (
        <React.Fragment>
            <Grid container spacing={3}>
                <Grid item md={12}>
                    <Paper>
                        {allStocks.length > 0 ?
                            <Box>
                                <SearchText />
                                <IconButton color="primary" className={classes.button} onClick={handleMenu}>
                                    <AddIcon />
                                </IconButton>
                                <PortfolioSelect />
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

export default StockSearch;