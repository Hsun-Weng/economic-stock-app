import { ThemeProvider } from '@material-ui/core';
import React from 'react';
import { useRoutes } from 'react-router-dom';
import './App.css';
import GlobalStyles from './components/GlobalStyles';
import Notification from './components/Notification';
import routes from './newRoutes';
import theme from './theme';

const App = () => {
  const routing = useRoutes(routes);
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Notification />
        {routing}
    </ThemeProvider>
  )
}

export default App;
