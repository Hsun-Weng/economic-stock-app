import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { portfolioAction, notificationAction } from '../../actions';

const PortfolioDeleteDialog = ({ open, handleClose, portfolioId }) => {
    const dispatch = useDispatch();
    const userPortfolios = useSelector(state=>state.portfolio.data);

    const [ deleting, setDeleting ] = useState(false); 
    const [ deletePortfolioName, setDeletePortfolioName ] = useState("");

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
                setDeleting(false);
            })
    };

    useEffect(()=>{
        let filteredPortfolios = userPortfolios.filter((userPortfolio)=>userPortfolio.portfolioId===portfolioId);
        if(filteredPortfolios.length>0){
            setDeletePortfolioName(filteredPortfolios[0].portfolioName);
        }
    }, [ portfolioId, userPortfolios ])

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>刪除</DialogTitle>
            <DialogContent>
                確定刪除 {deletePortfolioName} ?
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