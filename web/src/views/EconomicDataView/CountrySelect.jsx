import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import React from 'react';
import countries from '../../data/country.json';
  
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

export default CountrySelect;