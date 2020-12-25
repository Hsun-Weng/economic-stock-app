import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';

const UserPortfolioSelect = ({ portfolioId, setPortfolioId, className }) =>{
    const userPortfolios = useSelector(state=>state.portfolio.data);

    useEffect(()=>{
        if(portfolioId===0&&userPortfolios.length>0){
            setPortfolioId(userPortfolios[0].portfolioId);
        }
    }, [portfolioId, userPortfolios, setPortfolioId])

    return (
        <FormControl className={className}>
            <InputLabel>Add to portfolio</InputLabel>
            <Select
                value={portfolioId}
                onChange={(event)=>setPortfolioId(event.target.value)}>
                {userPortfolios.map((prop, key)=><MenuItem key={key} value={prop.portfolioId}>{prop.portfolioName}</MenuItem>)}
            </Select>
        </FormControl>
    );
}

export default UserPortfolioSelect;