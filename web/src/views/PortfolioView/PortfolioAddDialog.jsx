import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dialog, DialogContent, DialogActions, TextField, Button, DialogTitle, CircularProgress } from '@material-ui/core';

import { portfolioAction } from '../../actions';

const PortfolioAddDialog = ({ open, handleClose }) => {
    const dispatch = useDispatch();

    const [ adding, setAdding ] = useState(false);
    const [ addPorftolioName, setAddPortfolioName ] = useState("");

    const addPortfolio = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ portfolioName: addPorftolioName})
        };
        setAdding(true);
        fetch(`/api/portfolio`, requestOptions)
            .then((res) => {
                setAdding(false);
                handleClose();
                dispatch(portfolioAction.getPortfolios());
            }).catch((err)=>{
                setAdding(false);
            })
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>新增投資組合</DialogTitle>
            <DialogContent>
                <TextField
                    label="Portfolio Name"
                    name="portfolioName"
                    value={addPorftolioName}
                    onChange={event=>setAddPortfolioName(event.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button color="primary" disabled={adding} onClick={addPortfolio}>
                    {adding && <CircularProgress size={24} />}
                    新增
                </Button>
                <Button color="secondary" disabled={adding} onClick={handleClose}>
                    取消
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default PortfolioAddDialog;