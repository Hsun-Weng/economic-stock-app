import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userAction } from '../../actions';

const LogoutDialog = ({ open, handleClose }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [ loading, setLoading ] = useState(false);

    const logout = (event) => {
        event.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        };
        setLoading(true);
        fetch(`/api/user/logout`, requestOptions)
            .then(res=>res.json())
            .then((res) => {
                setLoading(false);
                dispatch(userAction.removeUser);
                handleClose();
                navigate('/');
            }).catch((err)=>{
                setLoading(false);
            })
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>登出</DialogTitle>
            <DialogContent>
                確定要登出?
            </DialogContent>
            <DialogActions>
                <Button color="primary" disabled={loading} onClick={logout}>
                    確定
                </Button>
                <Button color="secondary" disabled={loading} onClick={handleClose}>
                    取消
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default LogoutDialog;