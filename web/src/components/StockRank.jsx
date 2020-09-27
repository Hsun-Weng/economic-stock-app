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

const SortColumnSelect = () => (
  <FormControl className={classes.formControl}>
      <InputLabel>Investor</InputLabel>
      <Select
          value={investorCode}
          onChange={handleChangeInvestor}>
          <MenuItem value={"volume"}>成交量</MenuItem>
          <MenuItem value={"chg"}>價格變化</MenuItem>
      </Select>
  </FormControl>
);

const StockSort = () => {
  const classes = useStyles();
  const fixedInputSkeletonHeight = clsx(classes.paper, classes.fixedInputSkeletonHeight);
  const fixedChartHeightPaper = clsx(classes.paper, classes.fixedChartHeight);

  const dispatch = useDispatch();

  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item md={12}>
          {dataLoading ?
            <Skeleton variant="text" className={fixedInputSkeletonHeight}/>:
            <Paper>
              <Box>
                <SortColumnSelect />
              </Box>
            </Paper>
          }
        </Grid>
        <Grid item md={12}>
          {valueLoading ?
            <Skeleton variant="rect" className={fixedChartHeightPaper} />:
            <Paper className={fixedChartHeightPaper}>
                <EconomicDataChart data={economicDataValue} />
            </Paper>
          }
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default StockSort;