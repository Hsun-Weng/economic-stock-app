import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { useRoutes } from 'react-router-dom';
import './App.css';
import GlobalStyles from './components/GlobalStyles';
import Notification from './components/Notification';
import routes from './Routes';
import darkTheme from './theme/dark';
import lightTheme from './theme/light';

const getTheme = (isDarkMode) => isDarkMode?createMuiTheme(darkTheme):createMuiTheme(lightTheme);

const App = () => {
  const routing = useRoutes(routes);
  const darkMode = useSelector(state=>state.theme.darkMode);

  return (
    <ThemeProvider theme={getTheme(darkMode)}>
      <GlobalStyles />
      <Notification />
        {routing}
    </ThemeProvider>
  )
}

export default App;
