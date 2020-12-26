import React, { useEffect, useState } from 'react';

import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import arrayMove from 'array-move';

import { Grid, Paper, Card,
    CardHeader, Divider, Table, TableCell, TablePagination, TableRow, TableBody, Typography, Link } from '@material-ui/core'

import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc';

import PortfolioTableHead from './PortfolioTableHead';
import PortfolioTableRow from './PortfolioTableRow';

const useStyles = makeStyles(() => ({
    root: {},
}));

const PortfolioTable = ({ className, portfolioId, ...rest }) => {
    const classes = useStyles();

    const [ products, setProducts ] = useState([]);

    useEffect(()=> {
        if( portfolioId !== 0){
            fetch(`/api/portfolio/${portfolioId}/product/prices`)
                .then(res=>res.json())
                .then(res=>res.data)
                .then(data=>setProducts(data))
        }
    }, [ portfolioId ]);

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
    
        fetch(`/api/portfolio/${portfolioId}/products`, requestOptions)
            .then(res=>res.json());
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