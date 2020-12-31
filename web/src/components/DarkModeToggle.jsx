import { Switch, useMediaQuery } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { themeAction } from '../actions';

const DarkModeToggle = () => {
    const dispatch = useDispatch();
    const darkMode = useSelector(state=>state.theme.darkMode);
    const prefersDarkScheme = useMediaQuery('(prefers-color-scheme: dark)');

    useEffect(()=>{
        dispatch(themeAction.setDarkMode(prefersDarkScheme));
    }, [ dispatch, prefersDarkScheme ])
    

    return (<Switch checked ={darkMode} 
        color="default"
        onChange = {() => dispatch(themeAction.setDarkMode(!darkMode)) } />)
}

export default DarkModeToggle;