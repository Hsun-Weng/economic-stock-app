import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

import { Paper, Box, Grid, FormControl, InputLabel, Select, MenuItem, IconButton } from '@material-ui/core';

import AddIcon from '@material-ui/icons/Add';

import { portfolioAction } from '../actions';

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

const UserPortfolioSelect = ({ portfolioId, setPortfolioId }) =>{
    const classes = useStyles();
    const [ userPortfolios, setUserPortfolios ] = useState([]);

    useEffect(()=>{
        const fetchData = () => {
            fetch(`/api/portfolio`)
                .then((res)=>res.json())
                .then((res)=>res.data)
                .then((data)=>{
                    setUserPortfolios(data)
                    if(data.length > 0){
                        setPortfolioId(data[0].portfolioId);
                    }
                });
        }
        fetchData();
    }, [ setPortfolioId ])

    return (
        <FormControl className={classes.formControl}>
            <InputLabel>Add to portfolio</InputLabel>
            <Select
                value={portfolioId}
                onChange={(event)=>setPortfolioId(event.target.value)}>
                {userPortfolios.map((prop, key)=><MenuItem key={key} value={prop.portfolioId}>{prop.portfolioName}</MenuItem>)}
            </Select>
        </FormControl>
    );
}

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
                                <UserPortfolioSelect portfolioId={portfolioId} setPortfolioId={setPortfolioId} />
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