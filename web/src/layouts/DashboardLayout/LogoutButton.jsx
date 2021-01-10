import { IconButton } from '@material-ui/core';
import React, { useState } from 'react';
import { LogOut as LogOutIcon } from 'react-feather';
import { useSelector } from 'react-redux';
import LogoutDialog from './LogoutDialog';

const LogoutButton = () => {
    const isLoggedIn = useSelector(state=>state.user.isLoggedIn);
    const [ openDialog, setOpenDialog ] = useState(false);

    if(isLoggedIn){
        return (
            <>
                <IconButton
                    color="inherit"
                    onClick={e=>setOpenDialog(true)}>
                    <LogOutIcon/>
                </IconButton>
                <LogoutDialog open={openDialog} handleClose={()=>setOpenDialog(false)} />
            </>
        )
    }else{
        return (<></>)
    }
}

export default LogoutButton;