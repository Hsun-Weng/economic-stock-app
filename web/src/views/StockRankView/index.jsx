import { Box, Container, makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import Page from '../../components/Page';
import StockRankSelect from './StockRankSelect';
import StockRankTable from './StockRankTable';

const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: theme.palette.background.dark,
      minHeight: '100%',
      paddingBottom: theme.spacing(3),
      paddingTop: theme.spacing(3)
    }
}));

const StockRankView = () => {
    const classes = useStyles();

    const [ sortColumn, setSortColumn ] = useState("volume");
    const [ direction, setDirection ] = useState("DESC");

    return (
      <Page
        className={classes.root}
        title="個股成交排行"
      >
        <Container maxWidth="lg">
          <StockRankSelect sortColumn={sortColumn} onSortColumnChange={e=>setSortColumn(e.target.value)}
                direction={direction} onDirectionChange={e=>setDirection(e.target.value)}/>
          <Box mt={3}>
            <StockRankTable sortColumn={sortColumn} direction={direction}/>
          </Box>
        </Container>
      </Page>
    );
}

export default StockRankView;