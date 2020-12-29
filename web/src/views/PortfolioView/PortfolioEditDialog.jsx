import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { portfolioAction, notificationAction } from '../../actions';

const PortfolioEditDialog = ({ open, handleClose, portfolioId }) => {
    const dispatch = useDispatch();
    const userPortfolios = useSelector(state=>state.portfolio.data);

    const [ updating, setUpdating ] = useState(false);
    const [ updatePortfolioName, setUpdatePortfolioName ] = useState("");

    const updatePortfolio = (event) => {
        event.preventDefault();
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ portfolioName: updatePortfolioName })
        };
        setUpdating(true);
        fetch(`/api/portfolio/${portfolioId}`, requestOptions)
            .then(res=>{
                if(!res.ok){
                    throw res;
                }
            })
            .then(()=> {
                handleClose();
                dispatch(portfolioAction.getPortfolios());
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
            }).finally(()=>{
                setUpdating(false);
            })
    };

    useEffect(()=>{
        let filteredPortfolios = userPortfolios.filter((userPortfolio)=>userPortfolio.portfolioId===portfolioId);
        if(filteredPortfolios.length>0){
            setUpdatePortfolioName(filteredPortfolios[0].portfolioName);
        }
    }, [ portfolioId, userPortfolios ])

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>重新命名</DialogTitle>
            <DialogContent>
                <TextField
                    label="Portfolio Name"
                    name="portfolioName"
                    value={updatePortfolioName}
                    onChange={e=>setUpdatePortfolioName(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button color="primary" disabled={updating} onClick={updatePortfolio}>
                    {updating && <CircularProgress size={24} />}
                    確定
                </Button>
                <Button color="secondary" disabled={updating} onClick={handleClose}>
                    取消
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default PortfolioEditDialog;