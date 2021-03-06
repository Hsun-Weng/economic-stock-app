import { Box, Container, makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import Page from '../../components/Page';
import FuturesChipChart from './FuturesChipChart';
import Toolbar from './Toolbar';

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
          <Toolbar investorCode={investorCode} futuresCode={futuresCode}
            onInvestorChange={e=>setInvestorCode(e.target.value)} onFuturesChange={e=>setFuturesCode(e.target.value)}/>
          <Box mt={3}>
            <FuturesChipChart investorCode={investorCode} futuresCode={futuresCode} />
          </Box>
        </Container>
      </Page>
    );
}

export default FuturesChipView;