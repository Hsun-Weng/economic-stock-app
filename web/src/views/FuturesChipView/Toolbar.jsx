import { Card, CardContent, CardHeader } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import React from 'react';
import FuturesSelect from './FuturesSelect';
import InvestorSelect from './InvestorSelect';

const useStyles = makeStyles(() => ({
    root: {}
}));

const Toolbar = ({ className, investorCode, onInvestorChange, futuresCode, onFuturesChange, ...rest }) => {
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

export default Toolbar;