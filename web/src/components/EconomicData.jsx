import React, { useState, useEffect } from 'react';

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, FormControl, Select, InputLabel, MenuItem, Grid, Box} from '@material-ui/core'

import EconomicDataChart from './EconomicDataChart';

import countries from '../data/country';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  fixedInputSkeletonHeight: {
    height: 65,
    width: '100%'
  },
  fixedChartHeight: {
    height: 550,
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
}));

const CountrySelect = ({ countryCode, setCountryCode}) => {
  const classes = useStyles();
  return (
    <FormControl className={classes.formControl}>
      <InputLabel>Country</InputLabel>
      <Select
        value={countryCode}
        onChange={(event)=>setCountryCode(event.target.value)}>
          {countries.map((prop, key)=><MenuItem key={key} value={prop.countryCode}>{prop.countryName}</MenuItem>)}
      </Select>
    </FormControl>
  );
}

const DataSelect = ({ countryCode, dataCode, setDataCode }) => {
  const classes = useStyles();
  const [ datas, setDatas ] = useState([]);

  useEffect(()=>{
    const fetchData = async() => {
      fetch(`/api/economic/${countryCode}/data`)
        .then((res)=>res.json())
        .then((res)=>res.data)
        .then((data)=>setDatas(data))
    }
    fetchData();
  }, [ countryCode ])

  return (
    <FormControl className={classes.formControl}>
      <InputLabel>Economic Data</InputLabel>
      <Select
        value={dataCode}
        onChange={(event)=>setDataCode(event.target.value)}>
          {datas.map((prop, key)=><MenuItem key={key} value={prop.dataCode}>{prop.dataName}</MenuItem>)}
      </Select>
    </FormControl>
  );
}

const EconomicData = () => {
  const classes = useStyles();
  const fixedChartHeightPaper = clsx(classes.paper, classes.fixedChartHeight);

  const [ dataCode, setDataCode ] = useState("NONFARM");
  const [ countryCode, setCountryCode ] = useState("USA");

  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item md={12}>
          <Paper>
            <Box>
              <CountrySelect countryCode={countryCode} setCountryCode={setCountryCode} />
              <DataSelect countryCode={countryCode} dataCode={dataCode} setDataCode={setDataCode} />
            </Box>
          </Paper>
        </Grid>
        <Grid item md={12}>
          <Paper className={fixedChartHeightPaper}>
              <EconomicDataChart countryCode={countryCode} dataCode={dataCode} />
          </Paper>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default EconomicData;