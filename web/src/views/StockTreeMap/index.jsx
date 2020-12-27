import { Box, Container, makeStyles } from '@material-ui/core';
import React from 'react';
import Page from '../../components/Page';
import TreeMap from './TreeMap';

const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: theme.palette.background.dark,
      minHeight: '100%',
      paddingBottom: theme.spacing(3),
      paddingTop: theme.spacing(3)
    }
}));

const StockTreeMapView = () => {
    const classes = useStyles();

    return (
      <Page
        className={classes.root}
        title="上市公司">
        <Container maxWidth="lg">
          <Box mt={3}>
            <TreeMap />
          </Box>
        </Container>
      </Page>
    );
}

export default StockTreeMapView;