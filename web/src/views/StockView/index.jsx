import { Box, Container, makeStyles } from '@material-ui/core';
import React from 'react';
import { useParams } from 'react-router-dom';
import Page from '../../components/Page';
import StockTabs from './StockTabs';
import Toolbar from './Toolbar';

const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: theme.palette.background.dark,
      minHeight: '100%',
      paddingBottom: theme.spacing(3),
      paddingTop: theme.spacing(3)
    }
}));

const StockView = () => {
    const classes = useStyles();
    const { stockCode } = useParams();

    return (
      <Page
        className={classes.root}
        title={stockCode}>
        <Container maxWidth="lg">
          <Toolbar stockCode={stockCode}/>
          <Box mt={3}>
            <StockTabs stockCode={stockCode}/>
          </Box>
        </Container>
      </Page>
    );
}

export default StockView;