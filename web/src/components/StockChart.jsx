import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

import { Paper, Box, Grid, IconButton, AppBar, Tabs, Tab } from '@material-ui/core';

import AddIcon from '@material-ui/icons/Add';

import UserPortfolioSelect from './UserPortfolioSelect';
import StockCandleStickChart from './StockCandleStickChart';
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
    const user = useSelector(state => state.user.data);

    const [ tabValue, setTabValue] = useState(0);

    const classes = useStyles();
    const fixedChartHeightPaper = clsx(classes.paper, classes.fixedChartHeight);

    const [ portfolioId, setPortfolioId ] = useState(0);

    const { stockCode } = useParams();

    const handleChangeTab = (event, newValue) => {
        setTabValue(newValue);
      };

    const addPortfolioProduct = ( event ) => {
        let requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({productType: 1, productCode: stockCode})
        };
        fetch(`/api/portfolio/${portfolioId}/product`, requestOptions)
            .then((res)=>res.json())
            .then((res)=>res.data)
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

    return (
        <React.Fragment>
            <Grid container spacing={3}>
                {(user != null) &&
                    <Grid item md={12}>
                        <Paper>
                            <Box>
                                <UserPortfolioSelect portfolioId={portfolioId} setPortfolioId={setPortfolioId} className={classes.formControl} />
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
                            <StockCandleStickChart stockCode={stockCode} />
                        </TabPanel>
                        <TabPanel value={tabValue} index={1}>
                            <StockChipChart stockCode={stockCode} />
                        </TabPanel>
                        <TabPanel value={tabValue} index={2}>
                            <StockMarginChart stockCode={stockCode} />
                        </TabPanel>
                    </Paper>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default StockChart;