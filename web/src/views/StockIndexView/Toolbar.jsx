import { Box, Button, ListItemText, Menu, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { notificationAction } from '../../actions';

const useStyles = makeStyles((theme) => ({
    root: {},
}));

const Toolbar = ({ className, indexCode, ...rest }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
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
            .then(res=>{
                if(!res.ok){
                    throw Error(res.text());
                }
            })
            .then(()=> {
                dispatch(notificationAction.enqueueSuccess('新增成功'));
            })
            .catch(errText=>{
                dispatch(notificationAction.enqueueError(errText));
            })
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