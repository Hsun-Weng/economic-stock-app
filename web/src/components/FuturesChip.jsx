import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, FormControl, Select, InputLabel, MenuItem ,Box } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

import FuturesChipChart from './FuturesChipChart';

import { futuresAction } from '../actions/futures.action';
import { stockAction } from '../actions/stock.action';

import investor from '../data/investor.json'

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

const FuturesChip = () => {
    const classes = useStyles();
    const fixedInputSkeletonHeight = clsx(classes.paper, classes.fixedInputSkeletonHeight);
    const fixedChartHeightPaper = clsx(classes.paper, classes.fixedChartHeight);

    const dispatch = useDispatch();
    const futures = useSelector(state=>state.futures.futures.data);
    const indexDataset = useSelector(state=>state.stock.index.data);
    const futuresChipDataset = useSelector(state=>state.futures.chips.data);

    const futuresLoading = useSelector(state=>state.futures.futures.loading);

    const [investorCode, setInvestorCode] = useState('RI');
    const [futuresCode, setFuturesCode] = useState("MTX");
    const [indexCode, setIndexCode] = useState('TAIEX');

    const [dataset, setDataset] = useState([]);

    const formatDate = date => date.toISOString().slice(0,10);

    const handleChangeInvestor = event => {
        setInvestorCode(event.target.value);
    }

    const handleChangeFutures = event => {
        setFuturesCode(event.target.value);
        setIndexCode(futures.find(data=>data.futuresCode===event.target.value).indexCode);
    }

    const InvestorSelect = () => (
        <FormControl className={classes.formControl}>
            <InputLabel>Investor</InputLabel>
            <Select
                value={investorCode}
                onChange={handleChangeInvestor}>
                {investor.map((prop, key) => <MenuItem key={key} value={prop.investorCode}>{prop.investorName}</MenuItem>)}
            </Select>
        </FormControl>
    )

    const FuturesSelect = () => {
        if (futures.length > 0) {
            return (
                <FormControl className={classes.formControl}>
                    <InputLabel>Futures</InputLabel>
                    <Select
                        value={futuresCode}
                        onChange={handleChangeFutures}>
                        {futures.map((prop, key) => <MenuItem key={key} value={prop.futuresCode}>{prop.futuresName}</MenuItem>)}
                    </Select>
                </FormControl>
            )
        } else{
            return null;
        }
    }

    const mergeDataset = async( indexData, chipData) => {
        let mergedRawData = [...indexData.concat(chipData).reduce((m, o)=>
            m.set(o.date, Object.assign(m.get(o.date)|| {}, o)),
            new Map()
        ).values()];
        setDataset(mergedRawData);
    }

    useEffect(() => {
        dispatch(futuresAction.getFutures());
    }, [ dispatch ])

    useEffect(() => {
        let startDate = new Date(Date.now() - 120 * 24 * 60 * 60 * 1000);
        let endDate = new Date();
        dispatch(futuresAction.getFuturesChip(futuresCode, investorCode, formatDate(startDate), formatDate(endDate)))
    }, [ dispatch, futuresCode, investorCode ])

    useEffect(() => {
        let startDate = new Date(Date.now() - 120 * 24 * 60 * 60 * 1000);
        let endDate = new Date();
        dispatch(stockAction.getStockIndex(indexCode, formatDate(startDate), formatDate(endDate)));
    }, [ dispatch, indexCode ])

    useEffect(()=>{
        mergeDataset(indexDataset, futuresChipDataset);
    }, [ indexDataset, futuresChipDataset ])

    return (
        <React.Fragment>
            <Grid container spacing={3}>
                <Grid item md={12}>
                    {futuresLoading ? 
                        <Skeleton variant="text" className={fixedInputSkeletonHeight} />
                        :<Paper>
                            <Box>
                                <InvestorSelect />
                                <FuturesSelect />
                            </Box>
                        </Paper>
                    }
                </Grid>
                <Grid item md={12}>
                    {dataset.length > 0 ?
                        <Paper className={fixedChartHeightPaper}>
                            <FuturesChipChart data={dataset} />
                        </Paper>
                        :<Skeleton variant="rect" className={fixedChartHeightPaper} />
                    }
                </Grid>
            </Grid>
        </React.Fragment>);
}

export default FuturesChip;
