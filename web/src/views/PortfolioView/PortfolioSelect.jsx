import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';

const PortfolioSelect = ({ portfolioId, onPortfolioChange }) =>{
    const portfolios = useSelector(state=>state.portfolio.data);

    return (
        <FormControl fullWidth margin="normal">
            <InputLabel>Add to portfolio</InputLabel>
            <Select
                value={portfolioId}
                onChange={onPortfolioChange}>
                {portfolios.map((prop, key)=><MenuItem key={key} value={prop.portfolioId}>{prop.portfolioName}</MenuItem>)}
            </Select>
        </FormControl>
    );
}

export default PortfolioSelect;