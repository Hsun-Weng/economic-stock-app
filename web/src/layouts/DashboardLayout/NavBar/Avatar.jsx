import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography, Button } from '@material-ui/core';
import { LogOut as LogOutIcon, Settings as SettingsIcon } from 'react-feather';
import LogoutDialog from './LogoutDialog';
import NavItem from './NavItem';

const items = [{
    href: '/app/portfolio',
    icon: SettingsIcon,
    title: '投資組合'
}];

const Avatar = () => {
    const isLoggedIn = useSelector(state=>state.user.isLoggedIn);
    const userInfo = useSelector(state=>state.user.info);
    const [ openDialog, setOpenDialog ] = useState(false);

    if(!isLoggedIn){
        return (
            <Box
                p={2}
                m={2}
                bgcolor="background.dark">
                <Typography
                align="center"
                gutterBottom
                variant="h4"
                >
                已經擁有帳號？
                </Typography>
                <Box
                display="flex"
                justifyContent="center"
                mt={2}>
                <Button
                    color="primary"
                    component="a"
                    href="/login"
                    variant="contained">
                    登入
                </Button>
                </Box>
            </Box>
        );
    }
    return (
        <Box
            alignItems="center"
            display="flex"
            flexDirection="column"
            p={2}>
            <Typography
                color="textPrimary"
                variant="h5"
                >
                {userInfo.lastName}
            </Typography>
            <Button
                color="inherit"
                onClick={e=>setOpenDialog(true)}
                startIcon={<LogOutIcon/>} >
                登出
            </Button>
            {items.map((item) => (
                <NavItem
                    href={item.href}
                    key={item.title}
                    title={item.title}
                    icon={item.icon}/>
            ))}
            <LogoutDialog open={openDialog} handleClose={e=>setOpenDialog(false)} />
        </Box>
    )
}

export default Avatar;