import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Grid,
  Box,
  makeStyles
} from '@material-ui/core';
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
              <CategoryStocksTable categoryCode={categoryCode} />
            </Grid>
          </Grid>
        </Container>
      </Page>
    );
}

export default CategoryStocksView;