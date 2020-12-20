import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions, CircularProgress } from '@material-ui/core'

import { portfolioAction } from '../actions/'

const AddPortoflioDialog = ({ open, handleClose }) => {
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
        </Dialog>);
}

const EditPortoflioDialog = ({ open, handleClose, portfolioId }) => {
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
            .then((res) => {
                setUpdating(false);
                handleClose();
                dispatch(portfolioAction.getPortfolios());
            }).catch((err)=>{
                setUpdating(false);
            })
    };

    const handleChange = (event) => {
        setUpdatePortfolioName(event.target.value);
    }

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
                    onChange={handleChange}
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
        </Dialog>);
}

const DeletePortfolioDialog = ({ open, handleClose, portfolioId }) => {
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
            .then((res) => {
                setDeleting(false);
                handleClose();
                dispatch(portfolioAction.getPortfolios());
            }).catch((err)=>{
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
        </Dialog>);
}


export { AddPortoflioDialog, EditPortoflioDialog, DeletePortfolioDialog };