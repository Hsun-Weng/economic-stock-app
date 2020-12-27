import { Box, Container, makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import Page from '../../components/Page';
import CountryDataSelect from './CountryDataSelect';
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

    const [ dataCode, setDataCode ] = useState("NONFARM");
    const [ countryCode, setCountryCode ] = useState("USA");

    return (
      <Page
        className={classes.root}
        title="經濟數據"
      >
        <Container maxWidth="lg">
          <CountryDataSelect countryCode={countryCode} dataCode={dataCode}
            onCountryChange={e=>setCountryCode(e.target.value)} onDataChange={e=>setDataCode(e.target.value)}/>
          <Box mt={3}>
            <EconomicDataChart countryCode={countryCode} dataCode={dataCode} />
          </Box>
        </Container>
      </Page>
    );
}

export default EconomicDataView;