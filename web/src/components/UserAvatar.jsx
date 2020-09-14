import React, { useState } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { IconButton, Menu, MenuItem, Typography } from '@material-ui/core';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';

import { userAction } from '../actions';

const UserAvatar = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.data);

    const [ anchorEl, setAnchorEl ] = useState(null);
    const open = Boolean(anchorEl);

    const handleMenu = ( event ) => {
        setAnchorEl(event.currentTarget);
    } 
    const handleMenuClose = () => {
        setAnchorEl(null);
    }
    const logout = () => {
        dispatch(userAction.logout());
    }

    return (
        <div>
            <IconButton onClick={handleMenu} color="inherit">
                <AccountCircleRoundedIcon />
                <Typography>{user && user.lastName}</Typography>
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
    )
}

export default UserAvatar;