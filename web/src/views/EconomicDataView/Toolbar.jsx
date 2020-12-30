import { Card, CardContent, CardHeader } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import React from 'react';
import CountrySelect from './CountrySelect';
import DataSelect from './DataSelect';

const useStyles = makeStyles(() => ({
  root: {}
}));
  
const Toolbar = ({ className, countryCode, dataCode, onCountryChange, onDataChange, ...rest }) => {
    const classes = useStyles();
    return (
        <form
            autoComplete="off"
            noValidate
            className={clsx(classes.root, className)}
            {...rest}>
            <Card>
                <CardHeader title="國家經濟數據" />
                <CardContent>
                    <CountrySelect countryCode={countryCode} onCountryChange={onCountryChange} />
                    <DataSelect countryCode={countryCode} dataCode={dataCode} onDataChange={onDataChange} />
                </CardContent>
            </Card>
        </form>
    );
}
  
export default Toolbar;