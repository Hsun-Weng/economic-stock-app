import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles, Dialog, DialogContent, Button, Backdrop, CircularProgress } from '@material-ui/core';
import UserAvatar from './UserAvatar';
import { userAction } from '../actions';
import LoginForm from './LoginForm';

const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }));

const LoginButton = () => {
    const [ loginDialogOpen, setLoginDialogOpen] = useState(false);

    const handleLoginDialogOpen = () => {
        setLoginDialogOpen(true);
    }
    const handleLoginDialogClose = () => {
        setLoginDialogOpen(false);
    }

    return (
        <div>
            <Button onClick={handleLoginDialogOpen} color="inherit">Login</Button>
            <Dialog open={loginDialogOpen} onClose={handleLoginDialogClose} >
                <DialogContent>
                    <LoginForm />
                </DialogContent>
            </Dialog>
        </div>
    )
}

const User = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.data);
    const loading = useSelector(state => state.user.loading);
    const oauthLogining = useSelector(state => state.oauthLogin.loading);
    
    useEffect(()=>{
        if(!oauthLogining){
            dispatch(userAction.getUser())
        }
    }, [ dispatch, oauthLogining ]);

    return (
        <div>
            <Backdrop className={classes.backdrop} open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
            {user ? 
                <UserAvatar />
                :<LoginButton />
            }
        </div>
    )
}

export default User;