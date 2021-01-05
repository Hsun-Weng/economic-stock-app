import { Box, Button, ListItemText, Menu, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { notificationAction } from '../../actions';

const useStyles = makeStyles(() => ({
    root: {},
}));

const Toolbar = ({ className, stockCode, ...rest }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state=>state.user.isLoggedIn);
    const [ portfolios, setPortfolios ] = useState([]);
    const [ anchorEl, setAnchorEl ] = useState(null);

    const addProduct = ( portfolioId ) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                productType: 1,
                productCode: stockCode
            })
        };
        setAnchorEl(null);
        fetch(`/api/portfolio/${portfolioId}/product`, requestOptions)
            .then(res=>{
                if(!res.ok){
                    throw res;
                }
            })
            .then(()=> {
                dispatch(notificationAction.enqueueSuccess('新增成功'));
            })
            .catch((err)=>{
                if (err.json) {
                  err.json()
                  .then(data=> {
                    dispatch(notificationAction.enqueueError(data.message))
                  })
                } else {
                  dispatch(notificationAction.enqueueError("伺服器錯誤，請稍後再試。"))
                }
            });
    }

    useEffect(()=>{
        const fetchData = async() =>{
            fetch(`/api/portfolios`)
                .then(res=>{
                    if(!res.ok){
                        throw res;
                    }
                    return res.json();
                })
                .then((data)=>setPortfolios(data));
        };
        if(isLoggedIn){
            fetchData();
        }
    }, [ isLoggedIn ]);

    return (
        <div className={clsx(classes.root, className)} {...rest}>
            <Box display="flex"
                justifyContent="flex-end">
                <Button onClick={e=>setAnchorEl(e.currentTarget)} color="primary" variant="contained">
                    加入
                </Button>
            </Box>
            <Menu anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={e=>setAnchorEl(null)}>
                {portfolios.map((prop, key)=>
                    <MenuItem key={key} onClick={e=>addProduct(prop.portfolioId)}>
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