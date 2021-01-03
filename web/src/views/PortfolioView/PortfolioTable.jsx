import { Card, CardHeader, Divider, LinearProgress, Table, TableBody, TableContainer } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import arrayMove from 'array-move';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { SortableContainer } from 'react-sortable-hoc';
import { notificationAction } from '../../actions';
import PortfolioTableHead from './PortfolioTableHead';
import PortfolioTableRow from './PortfolioTableRow';

const useStyles = makeStyles(() => ({
    root: {},
}));

const PortfolioTable = ({ className, portfolioId, ...rest }) => {
    const dispatch = useDispatch();
    const classes = useStyles();

    const [ products, setProducts ] = useState([]);
    const [ loading, setLoading ] = useState(false);

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

    const onSortEnd = async ({oldIndex, newIndex}) => {
        let resortedProducts = arrayMove(products, oldIndex, newIndex);
        let resortIndex = 0;
        let updateProducts = resortedProducts.map((product)=>{
            return {
                productType: product.productType,
                productCode: product.productCode,
                sort: ++resortIndex
            };
        });
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updateProducts)
        };
        fetch(`/api/portfolio/${portfolioId}/products`, requestOptions);
        setProducts(resortedProducts);
    };

    const SortableTableBody = SortableContainer(({children})=>(
        <TableBody>{children}</TableBody>
    ))

    return (
        <Card
            className={clsx(classes.root, className)}
            {...rest}>
            {loading?<LinearProgress/>:
            <>
                <CardHeader title="個股清單" />
                <Divider />    
                <TableContainer>
                    <Table>
                        <PortfolioTableHead />
                        <SortableTableBody onSortEnd={onSortEnd} useDragHandle>
                            {products.map((prop, key)=> <PortfolioTableRow key={key} index={key} product={prop} />)}
                        </SortableTableBody>
                    </Table>
                </TableContainer>
            </>}
        </Card>
    );
}

export default PortfolioTable;