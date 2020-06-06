import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, FormControl, Select, InputLabel, MenuItem, Grid, Box} from '@material-ui/core'
import Skeleton from '@material-ui/lab/Skeleton';

import EconomicDataChart from './EconomicDataChart';

import { economicAction } from '../actions';
import countries from '../data/country';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  fixedInputSkeletonHeight: {
    height: 65,
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
  const fixedInputSkeletonHeight = clsx(classes.paper, classes.fixedInputSkeletonHeight);
  const fixedChartHeightPaper = clsx(classes.paper, classes.fixedChartHeight);

  const dispatch = useDispatch();
  const economicData = useSelector(state=>state.economic.data.data);
  const dataset = useSelector(state=>state.economic.value.data);

  const [countryCode, setCountryCode] = useState("USA");
  const [dataId, setDataId] = useState(1);
  const [units, setUnits] = useState([]);

  const handleChangeCountry = event => {
    setCountryCode(event.target.value);
  };

  const handleChangeEconomicData = event => {
    setDataId(event.target.value);
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
    fetchEconomicChart(dataId);
  }, [ dataId ]);

  useEffect(() => {
    dispatch(economicAction.getEconomicData(countryCode));
  }, [ countryCode ])

  useEffect(() => {
    dispatch(economicAction.getEconomicValue(countryCode, dataId));
  }, [ countryCode, dataId]);

  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item md={12}>
          <Paper>
            {economicData.length > 0?
              <Box>
                <CountrySelect />
                <EconomicDataSelect />
              </Box>
            :<Skeleton variant="text" className={fixedInputSkeletonHeight}/>}
          </Paper>
        </Grid>
        <Grid item md={12}>
          <Paper className={fixedChartHeightPaper}>
            {units.length > 0 && dataset.length > 0 ?
              <EconomicDataChart units={units} data={dataset} />
            :<Skeleton variant="rect" className={fixedChartHeightPaper} />}
          </Paper>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default EconomicData;