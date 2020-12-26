import React, { useState } from 'react';
import {
  Container,
  Box,
  makeStyles
} from '@material-ui/core';
import Page from '../../components/Page';
import StockRankSelect from './StockRankSelect';
import EconomicDataChart from './EconomicDataChart';

const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: theme.palette.background.dark,
      minHeight: '100%',
      paddingBottom: theme.spacing(3),
      paddingTop: theme.spacing(3)
    }
}));

const EconomicDataView = () => {
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
            <EconomicDataChart countryCode={countryCode} dataCode={dataCode} />
          </Box>
        </Container>
      </Page>
    );
}

export default EconomicDataView;