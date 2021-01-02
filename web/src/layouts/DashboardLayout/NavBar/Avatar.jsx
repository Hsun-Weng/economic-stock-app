import { Box, Button, Typography } from '@material-ui/core';
import React from 'react';
import { User as UserIcon, Briefcase as BriefcaseIcon } from 'react-feather';
import { useSelector } from 'react-redux';
import NavItem from './NavItem';

const items = [{
    href: '/portfolio',
    icon: BriefcaseIcon,
    title: '投資組合'
},{
    href: '/user/info',
    icon: UserIcon,
    title: '基本資料變更'
}];

const Avatar = () => {
    const isLoggedIn = useSelector(state=>state.user.isLoggedIn);
    const userInfo = useSelector(state=>state.user.info);

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
            {items.map((item) => (
                <NavItem
                    href={item.href}
                    key={item.title}
                    title={item.title}
                    icon={item.icon}/>
            ))}
        </Box>
    )
}

export default Avatar;