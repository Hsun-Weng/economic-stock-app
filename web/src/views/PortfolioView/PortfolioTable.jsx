import { Box, Card, CardHeader, Divider, Table, TableBody } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import arrayMove from 'array-move';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { SortableContainer } from 'react-sortable-hoc';
import PortfolioTableHead from './PortfolioTableHead';
import PortfolioTableRow from './PortfolioTableRow';
import { notificationAction } from '../../actions';

const useStyles = makeStyles(() => ({
    root: {},
}));

const PortfolioTable = ({ className, portfolioId, ...rest }) => {
    const dispatch = useDispatch();
    const classes = useStyles();

    const [ products, setProducts ] = useState([]);

    useEffect(()=> {
        if( portfolioId !== 0){
            fetch(`/api/portfolio/${portfolioId}/product/prices`)
                .then(res=>{
                    if(!res.ok){
                        throw Error(res.text());
                    }
                    return res.json();
                })
                .then((data)=> {
                    setProducts(data);
                })
                .catch(errText=>{
                    dispatch(notificationAction.enqueueError(errText));
                })
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
    };

    const SortableTableBody = SortableContainer(({children})=>(
        <TableBody>{children}</TableBody>
    ))

    return (
        <Card
            className={clsx(classes.root, className)}
            {...rest}>
            <CardHeader title="個股清單" />
            <Divider />    
            <PerfectScrollbar>
                <Box minWidth={800}>
                    <Table>
                        <PortfolioTableHead />
                        <SortableTableBody onSortEnd={onSortEnd} useDragHandle>
                            {products.map((prop, key)=> <PortfolioTableRow key={key} product={prop} />)}
                        </SortableTableBody>
                    </Table>
                </Box>
            </PerfectScrollbar>
        </Card>
    );
}

export default PortfolioTable;