import React, { useState } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { IconButton, Badge, Menu, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import LoginForm from './LoginForm';

const UserAvatar = () => {
    const [ anchorEl, setAnchorEl ] = useState(null);
    const open = Boolean(anchorEl);
    const [ loginDialogOpen, setLoginDialogOpen] = useState(false);

    const isLoggedIn = useSelector(state => state.user.isLoggedIn);

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
    return (
        <div>
            {isLoggedIn ? 
                <IconButton onClick={handleMenu}>
                    <Badge badgeContent={4} color="secondary">
                        <AccountCircleRoundedIcon />
                    </Badge>
                </IconButton>:
                <div>
                    <Button onClick={handleLoginDialogOpen} color="inherit">Login</Button>
                    /
                    <Button color="inherit">Sign Up</Button>
                </div>
            }
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
                <MenuItem onClick={handleLoginDialogOpen}>Login</MenuItem>
                <MenuItem onClick={handleMenuClose}>Sign up</MenuItem>
            </Menu>
            <Dialog open={loginDialogOpen} onClose={handleLoginDialogClose} >
                <DialogTitle>Login</DialogTitle>
                <DialogContent>
                    <LoginForm />
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default UserAvatar;