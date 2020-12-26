import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

import { Grid, Paper, Table, TableCell, TableContainer, TableRow, TableBody, Typography, Link } from '@material-ui/core'

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

const CategoryTable = ({ categories }) => {
    const history = useNavigate();

    const redirectCategoryStockTable = (event, categoryCode) =>{
        event.preventDefault();
        history.push(`/stockCategory/${categoryCode}`);
    };

    return (<TableContainer >
            <Table size="small">
                <TableBody>
                    {categories.map((prop, key)=>
                        <TableRow key={key}>
                            <TableCell>
                                <Typography>
                                    <Link href="#" onClick={event=>redirectCategoryStockTable(event, prop.categoryCode)}>
                                        {prop.categoryName}
                                    </Link>
                                </Typography>
                            </TableCell>
                        </TableRow>)}
                </TableBody>
            </Table>
        </TableContainer>);
};

const StockCategory = () => {
    const classes = useStyles();
    const fixedChartHeightPaper = clsx(classes.paper, classes.fixedChartHeight);

    const [ categories, setCategories ] = useState([]);

    useEffect(()=>{
        const fetchData = () => {
            fetch(`/api/categories`)
                .then((res)=>res.json())
                .then((res)=>res.data)
                .then((data)=>setCategories(data))
        }
        fetchData();
    }, [])

    return (
        <React.Fragment>
            <Grid container spacing={3}>
                <Grid item md={12}>
                    <Paper className={fixedChartHeightPaper}>
                        <CategoryTable categories={categories} />
                    </Paper>
                </Grid>
            </Grid>
        </React.Fragment>);
}

export default StockCategory;