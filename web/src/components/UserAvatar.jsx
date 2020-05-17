import React, { useState } from 'react';
import { IconButton, Badge, Menu, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import LoginForm from './LoginForm';

const UserAvatar = () => {
    const [ anchorEl, setAnchorEl ] = useState(null);
    const open = Boolean(anchorEl);
    const [ loginDialogOpen, setLoginDialogOpen] = useState(false);
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