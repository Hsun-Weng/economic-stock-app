import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

import { Grid, Paper, Table, TableCell, TableContainer, TableHead, TableRow, TableBody, Link, Box } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'

import { stockAction } from '../actions';

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 200
    },
    button: {
        margin: theme.spacing(1)
    },
    fixedInputSkeletonHeight: {
        height: 65,
    },
    fixedChartHeight: {
        // height: 900,
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
}));

const StockTable = ({ stocks }) => {
    const dispatch = useDispatch();

    const prices = useSelector(state=>state.stockPrice.latest);

    useEffect(()=>{
        dispatch(stockAction.getLatestStockPrice(stocks))
    }, [ dispatch, stocks ])

    return (<TableContainer >
            <Table size="small">
                <StockHeading />
                <TableBody>
                    {prices.map((prop, key)=>
                        <StockRow key={key} stock={prop} />)}
                </TableBody>
            </Table>
        </TableContainer>);
};

const StockHeading = () => (
    <TableHead>
        <TableRow>
            <TableCell>Code</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Last</TableCell>
            <TableCell>Open</TableCell>
            <TableCell>High</TableCell>
            <TableCell>Low</TableCell>
            <TableCell>Chg</TableCell>
            <TableCell>Chg %</TableCell>
            <TableCell>Vol</TableCell>
            <TableCell>Time</TableCell>
        </TableRow>
    </TableHead>
);

const StockRow = ({ stock }) => {
    const history = useHistory();

    const redirectStockChart = ( event, stockCode ) => {
        event.preventDefault();
        history.push(`/stock/${stockCode}`);
    }

    const CellValue = ({children}) => {
        let fontColor = "";
        if(stock.change > 0){
            fontColor = "green";
        }else if(stock.change < 0) {
            fontColor = "red";
        }else {
            fontColor = "";
        }
        return (
            <Box color={fontColor}>
                {children}
            </Box>
        );
    }

    return (<TableRow >
        <TableCell>
            <Link href="#" onClick={event=>redirectStockChart(event, stock.stockCode)}>
                {stock.stockCode}
            </Link>
        </TableCell>
        <TableCell>
            <Link href="#" onClick={event=>redirectStockChart(event, stock.stockCode)}>
                {stock.stockName}
            </Link>
        </TableCell>
        <TableCell>
            <CellValue>
                {stock.close}
            </CellValue>
        </TableCell>
        <TableCell>
            <CellValue>
                {stock.open}
            </CellValue>
        </TableCell>
        <TableCell>
            <CellValue>
                {stock.high}
            </CellValue>
        </TableCell>
        <TableCell>
            <CellValue>
                {stock.low}
            </CellValue>
        </TableCell>
        <TableCell>
            <CellValue>
                {stock.change}
            </CellValue>
        </TableCell>
        <TableCell>
            <CellValue>
                {stock.changePercent}
            </CellValue>
        </TableCell>
        <TableCell>
            <CellValue>
                {stock.volume}
            </CellValue>
        </TableCell>
        <TableCell>
            {stock.date}
        </TableCell>
    </TableRow>)
};

const StockCategory = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const { categoryCode } = useParams();
    const fixedChartHeightPaper = clsx(classes.paper, classes.fixedChartHeight);

    const loading = useSelector(state=>state.stockCategory.loading);
    const stocks = useSelector(state=>state.stockCategory.stocks);

    useEffect(()=>{
        dispatch(stockAction.getCategoryStocks(categoryCode));
    }, [ dispatch, categoryCode ])

    return (
        <React.Fragment>
            <Grid container spacing={3}>
                <Grid item md={12}>
                    {loading?<Skeleton variant="text" className={classes.fixedInputSkeletonHeight} />:
                        <Paper className={fixedChartHeightPaper}>
                            <StockTable stocks={stocks} />
                        </Paper>}
                </Grid>
            </Grid>
        </React.Fragment>);
}

export default StockCategory;