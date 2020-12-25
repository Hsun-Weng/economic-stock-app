import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

import { Paper, Box, Grid, IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import UserPortfolioSelect from './UserPortfolioSelect';

import StockIndexCandleStickChart from './StockIndexCandleStickChart';

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

const StockIndexChart = () => {
    const user = useSelector(state => state.user.data);

    const classes = useStyles();
    const fixedChartHeightPaper = clsx(classes.paper, classes.fixedChartHeight);

    const [ portfolioId, setPortfolioId ] = useState(0);

    const { indexCode } = useParams();

    const addPortfolioProduct = ( event ) => {
        let requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({productType: 0, productCode: indexCode})
        };
        fetch(`/api/portfolio/${portfolioId}/product`, requestOptions)
            .then((res)=>res.json())
            .then((res)=>res.data)
    };

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
                    <Paper className={fixedChartHeightPaper}>
                        <StockIndexCandleStickChart indexCode={indexCode}/>
                    </Paper>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default StockIndexChart;