import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

import { Box, Button, Menu, MenuItem, ListItemText } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    root: {},
}));

const Toolbar = ({ className, indexCode, ...rest }) => {
    const classes = useStyles();
    const portfolios = useSelector(state=>state.portfolio.data);
    const [ anchorEl, setAnchorEl ] = useState(null);

    const addProduct = ( portfolioId ) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                productType: 0,
                productCode: indexCode
            })
        };
    
        fetch(`/api/portfolio/${portfolioId}/product`, requestOptions)
            .then(res=>res.json());
    }

    return (
        <div className={clsx(classes.root, className)} {...rest}>
            <Box display="flex"
                justifyContent="flex-end">
                <Button onClick={e=>setAnchorEl(e.currentTarget)}>
                    加入
                </Button>
            </Box>
            <Menu anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={e=>setAnchorEl(null)}>
                {portfolios.map((prop, key)=>
                    <MenuItem key={key} onClick={e=>addProduct(prop.portoflioId)}>
                        <ListItemText>
                            {prop.portfolioName}
                        </ListItemText>
                    </MenuItem>    
                )}
            </Menu>
        </div>
    )
}

export default Toolbar;