import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, FormControl, Select, InputLabel, MenuItem, Grid, Box, RadioGroup, FormLabel, Radio, FormControlLabel,
  TableContainer, Table, TableHead, TableRow, TableFooter, TablePagination, TableCell } from '@material-ui/core'
import Skeleton from '@material-ui/lab/Skeleton';

import StockRankTableBody from './StockRankTableBody';
import { stockAction } from '../actions';

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

const StockRankTableHeading = () => (
  <TableHead>
      <TableRow>
          <TableCell>
              Code 
          </TableCell>
          <TableCell>
              Name
          </TableCell>
          <TableCell>
              Last
          </TableCell>
          <TableCell>
              Open
          </TableCell>
          <TableCell>
              High
          </TableCell>
          <TableCell>
              Low
          </TableCell>
          <TableCell>
              Chg
          </TableCell>
          <TableCell>
              Chg %
          </TableCell>
          <TableCell>
              Vol
          </TableCell>
          <TableCell>
              Time
          </TableCell>
      </TableRow>
  </TableHead>
)

const StockRank = () => {
  const classes = useStyles();
  const fixedChartHeightPaper = clsx(classes.paper, classes.fixedChartHeight);

  const dispatch = useDispatch();
  const loading = useSelector(state=>state.stockRank.loading);
  const stockRanks = useSelector(state=>state.stockRank.data);
  const totalPage = useSelector(state=>state.stockRank.page.totalPage);

  const [ sortColumn, setSortColumn ] = useState("volume");
  const [ direction, setDirection ] = useState("DESC");
  const [ page, setPage ] = useState(0);
  const [ size, setSize ] = useState(10);

  const handleChangeSortColumn = (event) => {
    setSortColumn(event.target.value);
  };

  const handleChangeDirection = (event) => {
    setDirection(event.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setSize(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(()=>{
    dispatch(stockAction.getStockRankPrices(sortColumn, page, size, direction))
  }, [ dispatch, sortColumn, page, size, direction ])

  const SortColumnSelect = () => (
    <FormControl className={classes.formControl}>
        <InputLabel>排序欄位</InputLabel>
        <Select
            value={sortColumn}
            onChange={handleChangeSortColumn}>
            <MenuItem value={"volume"}>成交量</MenuItem>
            <MenuItem value={"chg"}>價格變化</MenuItem>
        </Select>
    </FormControl>
  );

  const DirectionRadioGroup = () => (
    <FormControl className={classes.formControl}>
        <FormLabel component="legend" >順序</FormLabel>
        <RadioGroup row
          value={direction}
          onChange={handleChangeDirection}>
            <FormControlLabel value="ASC" label="升序" control={<Radio />}></FormControlLabel>
            <FormControlLabel value="DESC" label="降序" control={<Radio />}></FormControlLabel>
        </RadioGroup>
    </FormControl>
  )

  const StockRankTable = () => (
    <TableContainer>
      <Table>
        <StockRankTableHeading />
        <StockRankTableBody stocks={stockRanks} />
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              colSpan={10}
              count={totalPage}
              rowsPerPage={size}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );

  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item md={12}>
          <Paper>
            <Box>
              <SortColumnSelect />
              <DirectionRadioGroup />
            </Box>
          </Paper>
        </Grid>
        <Grid item md={12}>
          {loading ?
            <Skeleton variant="rect" className={fixedChartHeightPaper} />:
            <Paper className={fixedChartHeightPaper}>
                <StockRankTable />
            </Paper>
          }
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default StockRank;