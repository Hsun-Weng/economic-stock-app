import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userAction, notificationAction } from '../../actions';

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
            .then(res=>{
                if(!res.ok){
                    throw res;
                }
            })
            .then(() => {
                dispatch(userAction.removeUser());
                navigate('/');
            }).catch((err)=>{
                if (err.json) {
                  err.json()
                  .then(data=> {
                    dispatch(notificationAction.enqueueError(data.message))
                  })
                } else {
                  dispatch(notificationAction.enqueueError("伺服器錯誤，請稍後再試。"))
                }
            });
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