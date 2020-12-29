import { Card, CardContent, CardHeader, FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import investors from '../../data/investor.json';
import { notificationAction } from '../../actions';

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
    const dispatch = useDispatch();
    const [ futures, setFutures ] = useState([]);

    useEffect(()=>{
        const fetchData = () => {
            fetch(`/api/futures`)
                .then(res=>{
                    if(!res.ok){
                        throw res;
                    }
                    return res.json();
                })
                .then((data)=>setFutures(data))
                .catch((err)=>{
                    if (err.json) {
                      err.json()
                      .then(data=> {
                        dispatch(notificationAction.enqueueError(data.message))
                      })
                    } else {
                      dispatch(notificationAction.enqueueError("伺服器錯誤，請稍後再試。"))
                    }
                })
        };
        fetchData();
    }, [ dispatch ])

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