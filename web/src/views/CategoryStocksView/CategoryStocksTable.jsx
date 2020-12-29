import { Box, Card, CardHeader, Divider, Table, TableBody } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import PerfectScrollbar from 'react-perfect-scrollbar';
import CategoryStocksTableHead from './CategoryStocksTableHead';
import CategoryStocksTableRow from './CategoryStocksTableRow';
import { notificationAction } from '../../actions'; 

const useStyles = makeStyles(() => ({
    root: {},
}));

const CategoryStocksTable = ({ className, categoryCode, ...rest }) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [ stocks, setStocks ] = useState([]);

    useEffect(()=>{
        const fetchData = () => {
            fetch(`/api/category/${categoryCode}/stocks/prices`)
                .then(res=>{
                    if(!res.ok){
                        throw Error(res.text());
                    }
                    return res.json();
                })
                .then((data)=>setStocks(data))
                .catch(errText=>{
                    dispatch(notificationAction.enqueueError(errText));
                })
        };
        fetchData();
    }, [ categoryCode, dispatch ])

    return (
        <Card
            className={clsx(classes.root, className)}
            {...rest}>
            <CardHeader title="個股類別" />
            <Divider />    
            <PerfectScrollbar>
                <Box minWidth={800}>
                    <Table>
                        <CategoryStocksTableHead />
                        <TableBody>
                            {stocks.map((prop, key)=> <CategoryStocksTableRow key={key} stock={prop} />)}
                        </TableBody>
                    </Table>
                </Box>
            </PerfectScrollbar>
        </Card>
    );
}

export default CategoryStocksTable;