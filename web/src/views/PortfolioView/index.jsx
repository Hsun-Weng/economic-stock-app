import { Box, Container, makeStyles } from '@material-ui/core';
import React from 'react';
import Page from '../../components/Page';
import PortfolioTable from './PortfolioTable';
import Toolbar from './Toolbar';

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

    return (
      <Page
        className={classes.root}
        title="投資組合">
        <Container maxWidth="lg">
          <Toolbar />
          <Box mt={3}>
            <PortfolioTable />
          </Box>
        </Container>
      </Page>
    );
}

export default PortfolioView;