import { Card, CardHeader, Divider, LinearProgress, Link, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
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
    const [ loading, setLoading ] = useState(false);

    const redirectCategoryStockTable = (event, categoryCode) =>{
        event.preventDefault();
        navigate(`/stock/category/${categoryCode}`);
    };

    useEffect(()=>{
        const fetchData = () => {
            setLoading(true);
            fetch(`/api/categories`)
                .then(res=>{
                    if(!res.ok){
                        throw res;
                    }
                    return res.json();
                })
                .then((data)=> {
                    setCategories(data);
                })
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
        }
        fetchData();
    }, [ dispatch ])

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
                </TableContainer>
            </>}
        </Card>
    );
}

export default StockCategoryTable;