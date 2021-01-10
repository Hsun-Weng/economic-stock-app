import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import React from 'react';
import investors from '../../data/investor.json';

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

export default InvestorSelect;