import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { LogOut as LogOutIcon } from 'react-feather';
import { Box, Button } from '@material-ui/core';
import LogoutDialog from './LogoutDialog';

const LogoutButton = () => {
    const isLoggedIn = useSelector(state=>state.user.isLogged);
    const [ openDialog, setOpenDialog ] = useState(false);

    if(!isLoggedIn){
        return (
            <Box display="flex"
                justifyContent="left"
                mt={2} />
        )
    }
    return (
        <Box display="flex"
            justifyContent="left"
            mt={2}>
            <Button
                color="inherit"
                onClick={e=>setOpenDialog(true)}
                startIcon={<LogOutIcon/>} >
                登出
            </Button>
            <LogoutDialog open={openDialog} handleClose={e=>setOpenDialog(false)} />
        </Box>
    );
}

export default LogoutButton;