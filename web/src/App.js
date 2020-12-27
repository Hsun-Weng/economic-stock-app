import React from 'react';
import logo from './logo.svg';
import { useRoutes } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from './components/GlobalStyles';
import './App.css';
import theme from './theme';
import routes from './newRoutes';

const App = () => {
  const routing = useRoutes(routes);
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {routing}
    </ThemeProvider>
  )
}

export default App;
