import React, { useState, useEffect } from 'react';

import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';

const UserPortfolioSelect = ({ portfolioId, setPortfolioId, className }) =>{
    const [ userPortfolios, setUserPortfolios ] = useState([]);

    useEffect(()=>{
        const fetchData = () => {
            fetch(`/api/portfolio`)
                .then((res)=>res.json())
                .then((res)=>res.data)
                .then((data)=>{
                    setUserPortfolios(data)
                    if(data.length > 0){
                        setPortfolioId(data[0].portfolioId);
                    }
                });
        }
        fetchData();
    }, [ setPortfolioId ])

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