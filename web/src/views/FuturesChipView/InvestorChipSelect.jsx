import React, { useState, useEffect } from 'react';

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, FormControl, Select, InputLabel, MenuItem,
    Card,
    CardContent,
    CardHeader,
    Divider
    , Grid, Box} from '@material-ui/core';

import investors from '../../data/investor.json';

const useStyles = makeStyles(() => ({
    root: {}
}));

const InvestorSelect = ({ investorCode, onInvestorChange }) => {
    return (
        <FormControl fullWidth margin="normal">
            <InputLabel>投資人</InputLabel>
            <Select
                value={investorCode}
                onChange={onInvestorChange}>
                {investors.map((prop, key) => <MenuItem key={key} value={prop.investorCode}>{prop.investorName}</MenuItem>)}
            </Select>
        </FormControl>
    )
}

const FuturesSelect = ({ futuresCode, onFuturesChange }) => {
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
        <FormControl fullWidth margin="normal">
            <InputLabel>期貨</InputLabel>
            <Select
                value={futuresCode}
                onChange={onFuturesChange}>
                {futures.map((prop, key) => <MenuItem key={key} value={prop.futuresCode}>{prop.futuresName}</MenuItem>)}
            </Select>
        </FormControl>
    )
}

const InvestorChipSelect = ({ className, investorCode, onInvestorChange, futuresCode, onFuturesChange, ...rest }) => {
    const classes = useStyles();

    return (
        <form
            autoComplete="off"
            noValidate
            className={clsx(classes.root, className)}
            {...rest}>
            <Card>
                <CardHeader title="期貨未平倉籌碼" />
                <CardContent>
                    <InvestorSelect investorCode={investorCode} onInvestorChange={onInvestorChange} />
                    <FuturesSelect futuresCode={futuresCode} onFuturesChange={onFuturesChange} />
                </CardContent>
            </Card>
        </form>
    );
}

export default InvestorChipSelect;