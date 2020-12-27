import React, { useState } from 'react';
import {
  Container,
  Box,
  makeStyles
} from '@material-ui/core';
import Page from '../../components/Page';
import Toolbar from './Toolbar';
import StockIndexTabs from './StockIndexTabs';

const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: theme.palette.background.dark,
      minHeight: '100%',
      paddingBottom: theme.spacing(3),
      paddingTop: theme.spacing(3)
    }
}));

const StockIndexView = () => {
    const classes = useStyles();
    const { indexCode } = useParams();

    return (
      <Page
        className={classes.root}
        title={stockCode}>
        <Container maxWidth="lg">
          <Toolbar indexCode={indexCode}/>
          <Box mt={3}>
            <StockIndexTabs indexCode={indexCode}/>
          </Box>
        </Container>
      </Page>
    );
}

export default StockIndexView;