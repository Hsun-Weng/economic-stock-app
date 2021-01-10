import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { notificationAction } from '../../actions';

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
            .then(res=>{
                if(!res.ok){
                    throw res;
                }
            })
            .then(()=> {
                window.location.reload();
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
                setAdding(false);
            });
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