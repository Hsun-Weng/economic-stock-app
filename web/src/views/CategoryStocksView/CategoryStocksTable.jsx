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
                        throw res;
                    }
                    return res.json();
                })
                .then((data)=>setStocks(data))
                .catch((err)=>{
                    if (err.json) {
                      err.json()
                      .then(data=> {
                        dispatch(notificationAction.enqueueError(data.message))
                      })
                    } else {
                      dispatch(notificationAction.enqueueError("伺服器錯誤，請稍後再試。"))
                    }
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