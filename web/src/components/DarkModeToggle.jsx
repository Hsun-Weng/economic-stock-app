import { IconButton, useMediaQuery } from '@material-ui/core';
import React, { useEffect } from 'react';
import { Sun as SunIcon, Moon as MoonIcon} from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import { themeAction } from '../actions';

const DarkModeToggle = () => {
    const dispatch = useDispatch();
    const darkMode = useSelector(state=>state.theme.darkMode);
    const prefersDarkScheme = useMediaQuery('(prefers-color-scheme: dark)');

    useEffect(()=>{
        dispatch(themeAction.setDarkMode(prefersDarkScheme));
    }, [ dispatch, prefersDarkScheme ])
    
    return (
        <IconButton color="inherit" onClick={e=>dispatch(themeAction.setDarkMode(!darkMode))}>
            {darkMode?
                <MoonIcon />
            :<SunIcon />}
        </IconButton>
    )
}

export default DarkModeToggle;