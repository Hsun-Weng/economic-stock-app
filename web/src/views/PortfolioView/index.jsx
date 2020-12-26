import React, { useState } from 'react';
import {
  Container,
  Box,
  makeStyles
} from '@material-ui/core';
import Page from '../../components/Page';
import Toolbar from './Toolbar';
import PortfolioTable from './PortfolioTable';

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

    const [ portfolioId, setPortfolioId ] = useState(0);

    return (
      <Page
        className={classes.root}
        title="投資組合">
        <Toolbar  portfolioId={portfolioId} onPortfolioChange={e=>setPortfolioId(e.target.value)}/>
        <Container maxWidth="lg">
          <StockRankSelect sortColumn={sortColumn} onSortColumnChange={e=>setSortColumn(e.target.value)}
                direction={direction} onDirectionChange={e=>setDirection(e.target.value)}/>
          <Box mt={3}>
            <PortfolioTable portfolioId={portfolioId} />
          </Box>
        </Container>
      </Page>
    );
}

export default PortfolioView;