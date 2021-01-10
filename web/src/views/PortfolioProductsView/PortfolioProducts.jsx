import { Card, LinearProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { notificationAction } from '../../actions';
import ProductCardContent from './ProductCardContent';
import ProductSortCardContent from './ProductSortCardContent';

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
        const fetchData = async() => {
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
        fetchData();
    }, [ portfolioId, dispatch ]);

    const finishSortProducts = (sortProducts) => {
        let sortIndex = 0;
        let sortedProducts = sortProducts.map((product)=>{
            return {
                ...product,
                sort: ++sortIndex
            };
        });
        setProducts(sortedProducts);
        let putSortedProducts = sortedProducts.map((product)=>({
            productType: product.productType,
            productCode: product.productCode,
            sort: product.sort
        }));
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(putSortedProducts)
        };
        fetch(`/api/portfolio/${portfolioId}/products`, requestOptions);
        setOpenEdit(false);
    }

    return (
        <Card
            className={clsx(classes.root, className)}
            {...rest}>
            {loading?<LinearProgress/>:
            openEdit?<ProductSortCardContent products={products} finishSortProducts={finishSortProducts} cancel={e=>setOpenEdit(false)} />
                :<ProductCardContent products={products} closeContent={e=>setOpenEdit(true)} />}
        </Card>
    );
}

export default PortfolioTable;