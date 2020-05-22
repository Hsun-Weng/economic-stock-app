import React, { useState } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { IconButton, Badge, Menu, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';

import { userActions } from '../actions';

const UnLoggedInUser = () => {
    const [ loginDialogOpen, setLoginDialogOpen] = useState(false);
    const [ signupDialogOpen, setSignupDialogOpen ] = useState(false);

    const handleLoginDialogOpen = () => {
        setLoginDialogOpen(true);
    }
    const handleLoginDialogClose = () => {
        setLoginDialogOpen(false);
    }
    const handleSignupDialogOpen = () => {
        setSignupDialogOpen(true);
    }
    const handleSignupDialogClose = () => {
        setSignupDialogOpen(false);
    }

    return (
        <div>
            <Button onClick={handleLoginDialogOpen} color="inherit">Login</Button>
            /
            <Button onClick={handleSignupDialogOpen} color="inherit">Sign Up</Button>
            <Dialog open={loginDialogOpen} onClose={handleLoginDialogClose} >
                <DialogContent>
                    <LoginForm />
                </DialogContent>
            </Dialog>
            <Dialog open={signupDialogOpen} onClose={handleSignupDialogClose} >
                <DialogContent>
                    <SignUpForm />
                </DialogContent>
            </Dialog>
        </div>
    )
}

const UserAvatar = () => {
    const [ anchorEl, setAnchorEl ] = useState(null);
    const open = Boolean(anchorEl);

    const isLoggedIn = useSelector(state => state.user.loggedIn);
    const dispatch = useDispatch();

    const handleMenu = ( event ) => {
        setAnchorEl(event.currentTarget);
    } 
    const handleMenuClose = () => {
        setAnchorEl(null);
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
                :<UnLoggedInUser />
            }
        </div>
    )
}

export default UserAvatar;