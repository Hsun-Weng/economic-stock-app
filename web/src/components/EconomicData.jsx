import React, { useState, useEffect } from 'react';

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, FormControl, Select, InputLabel, MenuItem, Grid} from '@material-ui/core'
import Skeleton from '@material-ui/lab/Skeleton';

import EconomicDataChart from './EconomicDataChart';

import countries from '../data/country';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  fixedHeight: {
    height: 110,
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

const EconomicData = () => {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const fixedChartHeightPaper = clsx(classes.paper, classes.fixedChartHeight);

  const [economicData, setEconomicData] = useState([]);
  const [countryCode, setCountryCode] = useState("USA");
  const [dataId, setDataId] = useState(1);
  const [units, setUnits] = useState([]);
  const [dataset, setDataset] = useState([]);

  const handleChangeCountry = event => {
    setCountryCode(event.target.value);
  };

  const handleChangeEconomicData = event => {
    setDataId(event.target.value);
  };

  const fetchEconomicData = async () => {
    const res = await fetch("/api/economic/country/data");
    res.json()
      .then(res => res.data)
      .then(data => setEconomicData(data))
      .catch(err=>console.log)
  };

  /**
   * 取得圖表基本資料
    */
  const fetchEconomicChart = async (data) =>{
    const res = await fetch(`/data/economic/chart/${data}`);
    res.json()
      .then(res=> res.data)
      .then(data=> setUnits(data.chart.line.units))
      .catch(err=>console.log(err));
  }
  

  /**
   * 取得數據
   */
  const fetchEconomicDataset = async (country, data) =>{
    const res = await fetch(`/data/economic/data/${country}/${data}`);
    res.json()
      .then(res => res.data)
      .then(data => setDataset(data))
      .catch(err=>console.log(err));
  }

  const CountrySelect = () => (
    <FormControl className={classes.formControl}>
      <InputLabel>Country</InputLabel>
      <Select
        value={countryCode}
        onChange={handleChangeCountry}>
          {countries.map((prop, key)=><MenuItem key={key} value={prop.countryCode}>{prop.countryName}</MenuItem>)}
      </Select>
    </FormControl>
  )

  const EconomicDataSelect = () => (
    <FormControl className={classes.formControl}>
      <InputLabel>Economic Data</InputLabel>
      <Select
        value={dataId}
        onChange={handleChangeEconomicData}>
          {economicData.map((prop, key)=><MenuItem key={key} value={prop.dataId}>{prop.dataName}</MenuItem>)}
      </Select>
    </FormControl>
  )

  useEffect(() => {
    fetchEconomicData();
  }, []);

  useEffect(() => {
    fetchEconomicChart(dataId);
  }, [ dataId ]);

  useEffect(() => {
    fetchEconomicDataset(countryCode, dataId)
  }, [ countryCode, dataId]);

  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item md={12}>
          {economicData.length > 0?
            <Paper>
              <CountrySelect />
              <EconomicDataSelect />
            </Paper>:<Skeleton variant="text" className={fixedHeightPaper}/>
          }
        </Grid>
        <Grid item md={12}>
          {units.length > 0 && dataset.length > 0 ?
            <Paper className={fixedChartHeightPaper}>
              <EconomicDataChart units={units} data={dataset} />
            </Paper>
          :<Skeleton variant="rect" className={fixedChartHeightPaper} />}
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default EconomicData;