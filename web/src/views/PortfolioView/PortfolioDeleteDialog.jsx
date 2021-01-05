import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { notificationAction } from '../../actions';

const PortfolioDeleteDialog = ({ open, handleClose, portfolioId, portfolioName }) => {
    const dispatch = useDispatch();

    const [ deleting, setDeleting ] = useState(false); 

    const deletePortfolio = (event) => {
        event.preventDefault();
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        };
        setDeleting(true);
        fetch(`/api/portfolio/${portfolioId}`, requestOptions)
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
                setDeleting(false);
            });
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>刪除</DialogTitle>
            <DialogContent>
                確定刪除 {portfolioName} ?
            </DialogContent>
            <DialogActions>
                <Button color="primary" disabled={deleting} onClick={deletePortfolio}>
                    {deleting && <CircularProgress size={24} />}
                    確定
                </Button>
                <Button color="secondary" disabled={deleting} onClick={handleClose}>
                    取消
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default PortfolioDeleteDialog;