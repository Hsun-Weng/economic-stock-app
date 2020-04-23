import React, { useState, useEffect } from 'react';

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, FormControl, Select, InputLabel, MenuItem ,Box } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

import FuturesChipChart from './FuturesChipChart';

import investor from '../../data/investor.json'

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

    const [investorCode, setInvestorCode] = useState('RI');
    const [futuresCode, setFuturesCode] = useState("MTX");
    const [futures, setFutures] = useState([]);
    const [indexCode, setIndexCode] = useState('TAIEX');

    // 預設30天前
    const [ startDate, setStartDate ] = useState(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000));
    const [ endDate, setEndDate ] = useState(new Date());

    // 資料集
    const [indexDataset, setIndexDataset] = useState([]);
    const [futuresChipDataset, setFuturesChipDataset] = useState([]);
    const [dataset, setDataset] = useState([]);

    /**
     * 所有期貨代號
     */
    const fetchFutures = async() => {
        const res = await fetch(`/api/futures/taiwan`);
        res.json()
            .then(res => res.data)
            .then(data => setFutures(data))
            .catch(err => console.log(err));
    };

    /**
     * 取得期貨對應現貨代號
     */
    const fetchFuturesIndexCode = async( futures ) => {
        const res = await fetch(`/api/futures/taiwan/${futures}`);
        res.json()
            .then(res => res.data)
            .then(data => setIndexCode(data.indexCode))
            .catch(err => console.log(err));
    };

    /**
     * 現貨指數
     */
    const fetchStockIndex = async ( index, start, end ) => {
        let formatStart = start.toISOString().slice(0,10)
        let formatEnd = end.toISOString().slice(0,10)
        const res = await fetch(`/data/stock/taiwan/index/${index}?startDate=${formatStart}&endDate=${formatEnd}`);
        res.json()
            .then(res => res.data)
            .then(data => setIndexDataset(data))
            .catch(err => console.log(err));
    };

    /**
     * 取得日期區間內期貨籌碼
     */
    const fetchFuturesChip = async( futures, investor, start, end ) => {
        let formatStart = start.toISOString().slice(0,10)
        let formatEnd = end.toISOString().slice(0,10)
        const res = await fetch(`/data/futures/taiwan/${futures}/chip?investorCode=${investor}&startDate=${formatStart}&endDate=${formatEnd}`);
        res.json()
            .then(res => res.data)
            .then(data => {
                return data.map((investorChipData)=>{
                    let chipData = investorChipData.investorChip.pop();
                    chipData.openInterestNetLot = chipData.openInterestLongLot - chipData.openInterestShortLot;
                    let percent = Math.round(( chipData.openInterestNetLot / investorChipData.openInterestLot ) * 100);
                    return {...investorChipData, ...chipData, "percent": percent};
                })
            })
            .then(data => setFuturesChipDataset(data))
            .catch(err => console.log(err));
    }

    const handleChangeInvestor = event => {
        setInvestorCode(event.target.value);
    }

    const handleChangeFutures = event => {
        setFuturesCode(event.target.value);
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
        fetchFutures();
    }, [])

    useEffect(() => {
        fetchFuturesIndexCode(futuresCode);
    }, [ futuresCode ])

    useEffect(() => {
        fetchFuturesChip(futuresCode, investorCode, startDate, endDate);
    }, [ futuresCode, investorCode, startDate, endDate ])

    useEffect(() => {
        fetchStockIndex(indexCode, startDate, endDate);
    }, [ indexCode, startDate, endDate ])

    useEffect(()=>{
        mergeDataset(indexDataset, futuresChipDataset);
    }, [ indexDataset, futuresChipDataset ])

    return (
        <React.Fragment>
            <Grid container spacing={3}>
                <Grid item md={12}>
                    <Paper>
                    {futures.length > 0?
                        <Box>
                            <InvestorSelect />
                            <FuturesSelect />
                        </Box>
                    :<Skeleton variant="text" className={fixedInputSkeletonHeight} />}
                    </Paper>
                </Grid>
                <Grid item md={12}>
                    <Paper className={fixedChartHeightPaper}>
                        {dataset.length > 0 ?
                            <FuturesChipChart data={dataset} />
                        :<Skeleton variant="rect" className={fixedChartHeightPaper} />}
                    </Paper>
                </Grid>
            </Grid>
        </React.Fragment>);
}

export default FuturesChip;
