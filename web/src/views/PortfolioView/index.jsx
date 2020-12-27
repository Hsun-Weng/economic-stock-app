import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Container,
  Box,
  makeStyles
} from '@material-ui/core';
import Page from '../../components/Page';
import Toolbar from './Toolbar';
import PortfolioTable from './PortfolioTable';
import PortfolioSelect from './PortfolioSelect';

const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: theme.palette.background.dark,
      minHeight: '100%',
      paddingBottom: theme.spacing(3),
      paddingTop: theme.spacing(3)
    }
}));

const PortfolioView = () => {
    const classes = useStyles();
    const portfolios = useSelector(state=>state.portfolio.data);

    const [ portfolioId, setPortfolioId ] = useState(0);

    if(portfolioId===0&&portfolios.length>0){
      setPortfolioId(portfolios[0].portfolioId);
    }

    return (
      <Page
        className={classes.root}
        title="投資組合">
        <Toolbar  portfolioId={portfolioId} onPortfolioChange={e=>setPortfolioId(e.target.value)}/>
        <Container maxWidth="lg">
          <PortfolioSelect portfolioId={portfolioId} onPortfolioChange={e=>setPortfolioId(e.target.value)}/>
          <Box mt={3}>
            <PortfolioTable portfolioId={portfolioId} />
          </Box>
        </Container>
      </Page>
    );
}

export default PortfolioView;