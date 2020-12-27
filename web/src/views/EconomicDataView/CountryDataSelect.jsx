import { Card, CardContent, CardHeader, FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import countries from '../../data/country.json';

const useStyles = makeStyles(() => ({
  root: {}
}));
  
const CountrySelect = ({ countryCode, onCountryChange}) => {
    return (
        <FormControl fullWidth margin="normal">
            <InputLabel>國家</InputLabel>
            <Select
                value={countryCode}
                onChange={onCountryChange}>
                {countries.map((prop, key)=><MenuItem key={key} value={prop.countryCode}>{prop.countryName}</MenuItem>)}
            </Select>
        </FormControl>
    );
}
  
const DataSelect = ({ countryCode, dataCode, onDataChange }) => {
    const [ datas, setDatas ] = useState([]);

    useEffect(()=>{
        const fetchData = async() => {
        fetch(`/api/economic/${countryCode}/data`)
            .then((res)=>res.json())
            .then((res)=>res.data)
            .then((data)=>setDatas(data))
        }
        fetchData();
    }, [ countryCode ])
  
    return (
        <FormControl fullWidth margin="normal">
            <InputLabel>經濟數據</InputLabel>
            <Select
                value={dataCode}
                onChange={onDataChange}>
                {datas.map((prop, key)=><MenuItem key={key} value={prop.dataCode}>{prop.dataName}</MenuItem>)}
            </Select>
        </FormControl>
    );
  }
  
const CountryDataSelect = ({ className, countryCode, dataCode, onCountryChange, onDataChange, ...rest }) => {
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
  
export default CountryDataSelect;