import { Card, CardHeader, Divider, LinearProgress, Table, TableBody, TableContainer } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { notificationAction } from '../../actions';
import CategoryStocksTableHead from './CategoryStocksTableHead';
import CategoryStocksTableRow from './CategoryStocksTableRow';

const useStyles = makeStyles(() => ({
    root: {},
}));

const CategoryStocksTable = ({ className, categoryCode, ...rest }) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [ loading, setLoading  ] = useState(false);
    const [ stocks, setStocks ] = useState([]);

    useEffect(()=>{
        const fetchData = () => {
            setLoading(true);
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
                }).finally(()=>setLoading(false));
        };
        fetchData();
    }, [ categoryCode, dispatch ])

    return (
        <Card
            className={clsx(classes.root, className)}
            {...rest}>
            {loading?<LinearProgress/>:
            <>
                <CardHeader title="個股類別" />
                <Divider />
                <TableContainer>
                    <Table>
                        <CategoryStocksTableHead />
                        <TableBody>
                            {stocks.map((prop, key)=> <CategoryStocksTableRow key={key} stock={prop} />)}
                        </TableBody>
                    </Table>
                </TableContainer>
            </>
            }
        </Card>
    );
}

export default CategoryStocksTable;