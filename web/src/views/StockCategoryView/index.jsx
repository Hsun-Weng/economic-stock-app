import { Container, Grid, makeStyles } from '@material-ui/core';
import React from 'react';
import Page from '../../components/Page';
import StockCategoryTable from './StockCategoryTable';

const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: theme.palette.background.dark,
      minHeight: '100%',
      paddingBottom: theme.spacing(3),
      paddingTop: theme.spacing(3)
    }
}));

const StockCategoryView = () => {
    const classes = useStyles();

    return (
      <Page
        className={classes.root}
        title="個股類別">
        <Container maxWidth={false}>
          <Grid
            container
            spacing={3}>
            <Grid
              item
              lg={8}
              md={12}
              xl={9}
              xs={12}>
              <StockCategoryTable />
            </Grid>
          </Grid>
        </Container>
      </Page>
    );
}

export default StockCategoryView;