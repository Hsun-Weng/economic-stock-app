import React, { useState } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { IconButton, Badge, Menu, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import LoginForm from './LoginForm';

import { userActions } from '../actions';

const UserAvatar = () => {
    const [ anchorEl, setAnchorEl ] = useState(null);
    const open = Boolean(anchorEl);
    const [ loginDialogOpen, setLoginDialogOpen] = useState(false);

    const isLoggedIn = useSelector(state => state.user.loggedIn);
    const dispatch = useDispatch();

    const handleMenu = ( event ) => {
        setAnchorEl(event.currentTarget);
    } 
    const handleMenuClose = () => {
        setAnchorEl(null);
    }
    const handleLoginDialogOpen = () => {
        handleMenuClose();
        setLoginDialogOpen(true);
    }
    const handleLoginDialogClose = () => {
        setLoginDialogOpen(false);
    }
    const logout = () =>{
        dispatch(userActions.logout());
    }

    return (
        <div>
            {isLoggedIn ? 
                <div>
                    <IconButton onClick={handleMenu}>
                        <Badge badgeContent={4} color="secondary">
                            <AccountCircleRoundedIcon />
                        </Badge>
                    </IconButton>
                    <Menu 
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: "top",
                            horizontal: "right"
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "right"
                        }}
                        open={open}
                        onClose={handleMenuClose}
                        >
                        <MenuItem onClick={logout}>Logout</MenuItem>
                    </Menu>
                </div>
                :
                <div>
                    <Button onClick={handleLoginDialogOpen} color="inherit">Login</Button>
                    /
                    <Button color="inherit">Sign Up</Button>
                    <Dialog open={loginDialogOpen} onClose={handleLoginDialogClose} >
                        <DialogContent>
                            <LoginForm />
                        </DialogContent>
                    </Dialog>
                </div>
            }
        </div>
    )
}

export default UserAvatar;