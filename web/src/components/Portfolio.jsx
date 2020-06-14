import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { Grid, Paper, IconButton, TextField, FormControl, Select, InputLabel, MenuItem, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Link} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';

import { portfolioAction, stockAction } from '../actions/'

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
        height: 900,
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
}));

const PortfolioHeading = (prop) => (
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

const PortfolioBody = ({ latestPrices }) => {
    const history = useHistory();

    const redirectStockChart = ( event, productCode, productType ) => {
        event.preventDefault();
        switch(productType){
            case 0:
                history.push(`/index/${productCode}`);
                break;
            case 1:
                history.push(`/stock/${productCode}`);
                break;
            default:
        }
    }

    return (<TableBody>
        {latestPrices.map((prop, key)=>
            <TableRow key={key}>
                <TableCell>
                    <Link href="#" onClick={event=>redirectStockChart(event, prop.productCode, prop.productType)}>
                        {prop.productCode}
                    </Link>
                </TableCell>
                <TableCell>
                    {prop.productName}
                </TableCell>
                <TableCell>
                    {prop.close}
                </TableCell>
                <TableCell>
                    {prop.open}
                </TableCell>
                <TableCell>
                    {prop.high}
                </TableCell>
                <TableCell>
                    {prop.low}
                </TableCell>
                <TableCell>
                    {prop.change}
                </TableCell>
                <TableCell>
                    {prop.changePercent}
                </TableCell>
                <TableCell>
                    {prop.volume}
                </TableCell>
                <TableCell>
                    {prop.date}
                </TableCell>
            </TableRow>
        )}
    </TableBody>)
}

const Portfolio = () => {
    const classes = useStyles();
    const fixedChartHeightPaper = clsx(classes.paper, classes.fixedChartHeight);

    const dispatch = useDispatch();
    const portfolio = useSelector(state=>state.portfolio.portfolios.data);
    const portfolioProducts = useSelector(state=>state.portfolio.products.data);
    const stockLatestPrices = useSelector(state=>state.stock.latestPrices.data);
    const stockIndexLatestPrices = useSelector(state=>state.stock.latestIndexPrices.data);
    
    const [ productPrices, setProductPrices ] = useState([]);
    
    const [ portfolioId, setPortfolioId ] = useState(0);
    const [ addPorftolioName, setAddPortfolioName ] = useState("");

    const addPortfolio = () => {
        let portfolio = { portfolioName: addPorftolioName}
        dispatch(portfolioAction.addPortfolio(portfolio))
    }

    useEffect(()=>{
        if( portfolio.length > 0){
            setPortfolioId(portfolio[0].portfolioId);
        }
    }, [ portfolio ])

    useEffect(()=>{
        if( portfolioId !== 0){
            dispatch(portfolioAction.getPortfolioProducts(portfolioId));
        }
    }, [ dispatch, portfolioId ])

    useEffect(()=>{
        dispatch(stockAction.getLatestStockPrice(portfolioProducts));
        dispatch(stockAction.getLatestStockIndexPrice(portfolioProducts));
    }, [ dispatch, portfolioProducts ]);

    useEffect(()=> {
        let allProducts = [];
        let stockIndexPrices = stockIndexLatestPrices.map((data)=>{
            return {...data, productType: 0} 
         });
        let stockPrices = stockLatestPrices.map((data)=>{
           return {...data, productType: 1} 
        });
        setProductPrices(stockIndexPrices.concat(stockPrices)
            .sort((product1,product2)=>product1.sort-product2.sort));
    }, [ stockLatestPrices, stockIndexLatestPrices ]);

    return (
        <React.Fragment>
            <Grid container spacing={3}>
                <Grid item md={12}>
                    <Paper>
                        <Box>
                             <FormControl className={classes.formControl}>
                                <InputLabel>Portfolio</InputLabel>
                                <Select
                                    value={portfolioId}
                                    onChange={event=>setPortfolioId(event.target.value)}>
                                    {portfolio.map((prop, key)=><MenuItem key={key} value={prop.portfolioId}>{prop.portfolioName}</MenuItem>)}
                                </Select>
                            </FormControl>
                            <IconButton color="secondary" className={classes.button}>
                                <DeleteIcon />
                            </IconButton>
                            <TextField
                                className={classes.formControl}
                                label="Portfolio Name"
                                name="portfolioName"
                                value={addPorftolioName}
                                onChange={event=>setAddPortfolioName(event.target.value)}
                            />
                            <IconButton color="primary" className={classes.button} onClick={addPortfolio}>
                                <AddIcon />
                            </IconButton>
                        </Box>
                        {/* :<Skeleton variant="text" className={fixedInputSkeletonHeight} />} */}
                    </Paper>
                </Grid>
                <Grid item md={12}>
                    <Paper className={fixedChartHeightPaper}>
                        <TableContainer >
                            <Table>
                                <PortfolioHeading />
                                <PortfolioBody latestPrices={productPrices} />
                            </Table>
                        </TableContainer>
                    </Paper>
                </Grid>
            </Grid>
        </React.Fragment>);
}

export default Portfolio;