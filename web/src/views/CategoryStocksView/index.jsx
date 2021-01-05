import { Container, Box, makeStyles } from '@material-ui/core';
import React from 'react';
import { useParams } from 'react-router-dom';
import Page from '../../components/Page';
import CategoryStocksTable from './CategoryStocksTable';

const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: theme.palette.background.dark,
      minHeight: '100%',
      paddingBottom: theme.spacing(3),
      paddingTop: theme.spacing(3)
    }
}));

const CategoryStocksView = () => {
    const classes = useStyles();
    const { categoryCode } = useParams();

    return (
      <Page
        className={classes.root}
        title="個股類別">
        <Container maxWidth="lg">
          <Box mt={3}>
              <CategoryStocksTable categoryCode={categoryCode} />
          </Box>
        </Container>
      </Page>
    );
}

export default CategoryStocksView;