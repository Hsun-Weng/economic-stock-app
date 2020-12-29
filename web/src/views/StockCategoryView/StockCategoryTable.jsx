import { Box, Card, CardHeader, Divider, Link, Table, TableBody, TableCell, TableRow, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useNavigate } from 'react-router-dom';
import { notificationAction } from '../../actions';

const useStyles = makeStyles(() => ({
    root: {},
}));

const StockCategoryTable = ({ className, ...rest }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [ categories, setCategories ] = useState([]);

    const redirectCategoryStockTable = (event, categoryCode) =>{
        event.preventDefault();
        navigate(`/app/stock/category/${categoryCode}`);
    };

    useEffect(()=>{
        const fetchData = () => {
            fetch(`/api/categories`)
                .then(res=>{
                    if(!res.ok){
                        throw Error(res.text());
                    }
                    return res.json();
                })
                .then((data)=> {
                    setCategories(data);
                })
                .catch(errText=>{
                    dispatch(notificationAction.enqueueError(errText));
                })
        }
        fetchData();
    }, [ dispatch ])

    return (
        <Card
            className={clsx(classes.root, className)}
            {...rest}>
            <CardHeader title="個股類別" />
            <Divider />    
            <PerfectScrollbar>
                <Box minWidth={800}>
                    <Table>
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
                </Box>
            </PerfectScrollbar>
        </Card>
    );
}

export default StockCategoryTable;