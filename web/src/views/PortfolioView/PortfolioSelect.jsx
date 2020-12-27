import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';

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