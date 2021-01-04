import { Card, CardHeader, Divider, LinearProgress, TableContainer, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { notificationAction } from '../../actions';
import ProductSortTable from './ProductSortTable';
import ProductTable from './ProductTable';
import { Edit as EditIcon } from 'react-feather';

const useStyles = makeStyles(() => ({
    root: {},
}));

const PortfolioTable = ({ className, portfolioId, ...rest }) => {
    const dispatch = useDispatch();
    const classes = useStyles();

    const [ products, setProducts ] = useState([]);
    const [ loading, setLoading ] = useState(false);
    const [ openEdit, setOpenEdit ] = useState(false);

    useEffect(()=> {
        if( portfolioId !== 0){
            setLoading(true);
            fetch(`/api/portfolio/${portfolioId}/product/prices`)
                .then(res=>{
                    if(!res.ok){
                        throw res;
                    }
                    return res.json();
                })
                .then((data)=> {
                    setProducts(data);
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
    }, [ portfolioId, dispatch ]);

    return (
        <Card
            className={clsx(classes.root, className)}
            {...rest}>
            {loading?<LinearProgress/>:
            <>
                <CardHeader title="自選清單" action={
                    openEdit?
                    <IconButton color="inherit"
                        onClick={e=>setOpenEdit(true)}>
                        <EditIcon />
                    </IconButton>
                    :<IconButton color="inherit"
                        onClick={e=>setOpenEdit(false)}>
                        <EditIcon />
                    </IconButton>
                }/>
                <Divider />    
                <TableContainer>
                    {openEdit?
                    <ProductSortTable products={products} />
                    :<ProductTable products={products} />
                    }
                </TableContainer>
            </>}
        </Card>
    );
}

export default PortfolioTable;