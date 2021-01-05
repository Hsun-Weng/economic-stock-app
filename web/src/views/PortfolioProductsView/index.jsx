import { Box, Container, makeStyles } from '@material-ui/core';
import React from 'react';
import { useParams } from 'react-router-dom';
import Page from '../../components/Page';
import PortfolioProducts from './PortfolioProducts';

const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: theme.palette.background.dark,
      minHeight: '100%',
      paddingBottom: theme.spacing(3),
      paddingTop: theme.spacing(3)
    }
}));

const PortfolioProductsView = () => {
    const classes = useStyles();
    const { portfolioId } = useParams();

    return (
      <Page
        className={classes.root}
        title="投資組合">
        <Container maxWidth="lg">
          <Box mt={3}>
            <PortfolioProducts portfolioId={portfolioId} />
          </Box>
        </Container>
      </Page>
    );
}

export default PortfolioProductsView;