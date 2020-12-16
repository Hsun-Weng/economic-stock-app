import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

import { Paper, Box, Grid, FormControl, InputLabel, Select, MenuItem, IconButton, AppBar, Tabs, Tab } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

import AddIcon from '@material-ui/icons/Add';

import { stockAction, portfolioAction } from '../actions';

import CandleStickChart from './CandleStickChart';
import StockChipChart from './StockChipChart';
import StockMarginChart from './StockMarginChart';

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

const StockChart = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.data);
    const portfolios = useSelector(state => state.portfolio.data);
    const prices = useSelector(state=>state.stockPrice.data);
    const pricesLoading = useSelector(state=>state.stockPrice.loading);

    const [ tabValue, setTabValue] = useState(0);

    const classes = useStyles();
    const fixedChartHeightPaper = clsx(classes.paper, classes.fixedChartHeight);

    const [ portfolioId, setPortfolioId ] = useState(0);

    const { stockCode } = useParams();

    const formatDate = date => date.toISOString().slice(0,10);

    const handleChangePortfolioId = ( event ) => {
        setPortfolioId(event.target.value);
    }

    const handleChangeTab = (event, newValue) => {
        setTabValue(newValue);
      };

    const addPortfolioProduct = ( event ) => {
        dispatch(portfolioAction.addPortfolioProduct(portfolioId, 1, stockCode));
    };

    const TabPanel = (props) => {
        const { children, value, index, ...other } = props;
      
        return (
          <div
            role="tabpanel"
            hidden={value !== index}
            {...other}
          >
            {value === index && children}
          </div>
        );
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
        dispatch(portfolioAction.getPortfolio());
    }, [ dispatch ])

    useEffect(()=>{
        if( portfolios.length > 0){
            setPortfolioId(portfolios[0].portfolioId);
        }
    }, [ portfolios ])

    useEffect(() => {
        let startDate = new Date(Date.now() - 120 * 24 * 60 * 60 * 1000);
        let endDate = new Date();
        dispatch(stockAction.getStockPrices(stockCode, formatDate(startDate), formatDate(endDate)));
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
                    <AppBar position="static" color='default'>
                        <Tabs value={tabValue} onChange={handleChangeTab}>
                            <Tab label="技術線圖" />
                            <Tab label="法人進出" />
                            <Tab label="資券變化" />
                        </Tabs>
                    </AppBar>
                    <Paper className={fixedChartHeightPaper}>
                        <TabPanel value={tabValue} index={0}>
                            {pricesLoading.loading ?
                                <Skeleton variant="rect" className={fixedChartHeightPaper} />
                                :<Box display="flex" justifyContent="center">
                                    {prices.length > 0 &&
                                        <CandleStickChart dataset={prices.map((data) => {
                                            data.date = new Date(data.date);
                                            return data;
                                        })} />
                                    }
                                </Box>
                            }
                        </TabPanel>
                        <TabPanel value={tabValue} index={1}>
                            <StockChipChart stockCode={stockCode} chartHeight={900} />
                        </TabPanel>
                        <TabPanel value={tabValue} index={2}>
                            <StockMarginChart stockCode={stockCode} chartHeight={900} />
                        </TabPanel>
                    </Paper>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default StockChart;