import { Box, Container, makeStyles } from '@material-ui/core';
import React from 'react';
import { useParams } from 'react-router-dom';
import Page from '../../components/Page';
import StockIndexTabs from './StockIndexTabs';
import Toolbar from './Toolbar';

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
        title={indexCode}>
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