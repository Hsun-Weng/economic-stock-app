import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions, CircularProgress } from '@material-ui/core'

import { portfolioAction } from '../actions/'

const AddPortoflioDialog = ({ open, handleClose }) => {
    const dispatch = useDispatch();

    const loading = useSelector(state=>state.portfolio.addPortfolio.loading);
    const [ addPorftolioName, setAddPortfolioName ] = useState("");

    const addPortfolio = () => {
        let portfolio = { portfolioName: addPorftolioName}
        dispatch(portfolioAction.addPortfolio(portfolio))
    };

    useEffect(()=>{
        if(!loading){
            handleClose();
        }
    }, [ loading ]);

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
                <Button color="primary" disabled={loading} onClick={addPortfolio}>
                    {loading && <CircularProgress size={24} />}
                    新增
                </Button>
                <Button color="secondary" disabled={loading} onClick={handleClose}>
                    取消
                </Button>
            </DialogActions>
        </Dialog>);
}

const EditPortoflioDialog = ({ open, handleClose, portfolioId, portfolioName }) => {
    const dispatch = useDispatch();

    const loading = useSelector(state=>state.portfolio.updatePortfolio.loading);
    const [ updatePortfolioName, setUpdatePortfolioName ] = useState("");

    const updatePortfolio = () => {
        let portfolio = { portfolioName: updatePortfolioName}
        dispatch(portfolioAction.updatePortfolio(portfolioId, portfolio))
    };

    const handleChange = (event) => {
        setUpdatePortfolioName(event.target.value);
    }

    useEffect(()=>{
        setUpdatePortfolioName(portfolioName);
    }, [ portfolioName ]);

    useEffect(()=>{
        if(!loading){
            handleClose();
        }
    }, [ loading ]);

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>重新命名</DialogTitle>
            <DialogContent>
                <TextField
                    label="Portfolio Name"
                    name="portfolioName"
                    value={updatePortfolioName}
                    onChange={handleChange}
                />
            </DialogContent>
            <DialogActions>
                <Button color="primary" disabled={loading} onClick={updatePortfolio}>
                    {loading && <CircularProgress size={24} />}
                    確定
                </Button>
                <Button color="secondary" disabled={loading} onClick={handleClose}>
                    取消
                </Button>
            </DialogActions>
        </Dialog>);
}

const DeletePortfolioDialog = ({ open, handleClose, portfolioId, portfolioName }) => {
    const dispatch = useDispatch();

    const loading = useSelector(state=>state.portfolio.deletePortfolio.loading);

    const deletePortfolio = () => {
        dispatch(portfolioAction.deletePortfolio(portfolioId))
    };

    useEffect(()=>{
        if(!loading){
            handleClose();
        }
    }, [ loading ]);

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>刪除</DialogTitle>
            <DialogContent>
                確定刪除 {portfolioName} ?
            </DialogContent>
            <DialogActions>
                <Button color="primary" disabled={loading} onClick={deletePortfolio}>
                    {loading && <CircularProgress size={24} />}
                    確定
                </Button>
                <Button color="secondary" disabled={loading} onClick={handleClose}>
                    取消
                </Button>
            </DialogActions>
        </Dialog>);
}


export { AddPortoflioDialog, EditPortoflioDialog, DeletePortfolioDialog };