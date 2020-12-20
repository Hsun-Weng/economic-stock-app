import React, { useState, useEffect } from 'react';

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, FormControl, Select, InputLabel, MenuItem ,Box } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

import FuturesChipChart from './FuturesChipChart';

import { futuresAction } from '../actions/futures.action';
import { stockAction } from '../actions/stock.action';

import investors from '../data/investor.json'

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 200
    },
    fixedInputSkeletonHeight: {
        height: 65,
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

const InvestorSelect = ({ investorCode, setInvestorCode }) => {
    const classes = useStyles();

    return (
        <FormControl className={classes.formControl}>
            <InputLabel>Investor</InputLabel>
            <Select
                value={investorCode}
                onChange={(event)=>setInvestorCode(event.target.value)}>
                {investors.map((prop, key) => <MenuItem key={key} value={prop.investorCode}>{prop.investorName}</MenuItem>)}
            </Select>
        </FormControl>
    )
}

const FuturesSelect = ({ futuresCode, setFuturesCode }) => {
    const classes = useStyles();
    const [ futures, setFutures ] = useState([]);

    useEffect(()=>{
        const fetchData = () => {
            fetch(`/api/futures`)
                .then((res)=>res.json())
                .then((res)=>res.data)
                .then((data)=>setFutures(data))
        };
        fetchData();
    }, [])

    return (
        <FormControl className={classes.formControl}>
            <InputLabel>Futures</InputLabel>
            <Select
                value={futuresCode}
                onChange={(event)=>setFuturesCode(event.target.value)}>
                {futures.map((prop, key) => <MenuItem key={key} value={prop.futuresCode}>{prop.futuresName}</MenuItem>)}
            </Select>
        </FormControl>
    )
}

const FuturesChip = () => {
    const classes = useStyles();
    const fixedInputSkeletonHeight = clsx(classes.paper, classes.fixedInputSkeletonHeight);
    const fixedChartHeightPaper = clsx(classes.paper, classes.fixedChartHeight);

    const [ investorCode, setInvestorCode ] = useState('RI');
    const [ futuresCode, setFuturesCode ] = useState("MTX");

    return (
        <React.Fragment>
            <Grid container spacing={3}>
                <Grid item md={12}>
                    <Paper>
                        <Box>
                            <InvestorSelect investorCode={investorCode} setInvestorCode={setInvestorCode} />
                            <FuturesSelect futuresCode={futuresCode} setFuturesCode={setFuturesCode} />
                        </Box>
                    </Paper>
                </Grid>
                <Grid item md={12}>
                    <Paper className={fixedChartHeightPaper}>
                        <FuturesChipChart investorCode={investorCode} futuresCode={futuresCode} />
                    </Paper>
                </Grid>
            </Grid>
        </React.Fragment>);
}

export default FuturesChip;
