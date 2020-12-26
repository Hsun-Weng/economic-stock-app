import React, { useState } from 'react';
import {
  Container,
  Grid,
  Box,
  makeStyles
} from '@material-ui/core';
import Page from '../../components/Page';
import InvestorChipSelect from './InvestorChipSelect';
import FuturesChipChart from './FuturesChipChart';

const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: theme.palette.background.dark,
      minHeight: '100%',
      paddingBottom: theme.spacing(3),
      paddingTop: theme.spacing(3)
    }
}));

const FuturesChipView = () => {
    const classes = useStyles();

    const [ investorCode, setInvestorCode ] = useState('RI');
    const [ futuresCode, setFuturesCode ] = useState("MTX");

    return (
      <Page
        className={classes.root}
        title="期貨未平倉籌碼">
        <Container maxWidth="lg">
          <InvestorChipSelect investorCode={investorCode} futuresCode={futuresCode}
            onInvestorChange={e=>setInvestorCode(e.target.value)} onFuturesChange={e=>setFuturesCode(e.target.value)}/>
          <Box mt={3}>
            <FuturesChipChart investorCode={investorCode} futuresCode={futuresCode} />
          </Box>
        </Container>
      </Page>
    );
}

export default FuturesChipView;