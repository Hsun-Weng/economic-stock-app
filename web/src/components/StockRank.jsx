import React, { useState } from 'react';

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, FormControl, Select, InputLabel, MenuItem, Grid, Box, RadioGroup, FormLabel, Radio, FormControlLabel} from '@material-ui/core'

import StockRankTable from './StockRankTable';

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

const SortColumnSelect = ({ sortColumn, setSortColumn }) => {
  const classes = useStyles();
  return(
    <FormControl className={classes.formControl}>
        <InputLabel>排序欄位</InputLabel>
        <Select
            value={sortColumn}
            onChange={(event)=>setSortColumn(event.target.value)}>
            <MenuItem value={"volume"}>成交量</MenuItem>
            <MenuItem value={"chg"}>價格變化</MenuItem>
        </Select>
    </FormControl>
  )
};

const DirectionRadioGroup = ({ direction, setDirection }) => {
  const classes = useStyles();
  return (
    <FormControl className={classes.formControl}>
        <FormLabel component="legend" >順序</FormLabel>
        <RadioGroup row
          value={direction}
          onChange={(event)=>setDirection(event.target.value)}>
            <FormControlLabel value="ASC" label="升序" control={<Radio />}></FormControlLabel>
            <FormControlLabel value="DESC" label="降序" control={<Radio />}></FormControlLabel>
        </RadioGroup>
    </FormControl>
  )
}

const StockRank = () => {
  const classes = useStyles();
  const fixedChartHeightPaper = clsx(classes.paper, classes.fixedChartHeight);

  const [ sortColumn, setSortColumn ] = useState("volume");
  const [ direction, setDirection ] = useState("DESC");


  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item md={12}>
          <Paper>
            <Box>
              <SortColumnSelect sortColumn={sortColumn} setSortColumn={setSortColumn} />
              <DirectionRadioGroup direction={direction} setDirection={setDirection} />
            </Box>
          </Paper>
        </Grid>
        <Grid item md={12}>
          <Paper className={fixedChartHeightPaper}>
              <StockRankTable sortColumn={sortColumn} direction={direction} />
          </Paper>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default StockRank;