import React, { useState, useEffect } from 'react';
import { TableContainer, Table, TableBody, CardHeader, IconButton, Divider } from '@material-ui/core';
import { Check as CheckIcon, X as XIcon } from 'react-feather';
import ProductSortHead from './ProductSortHead';
import ProductSortRow from './ProductSortRow';
import { sortableContainer } from 'react-sortable-hoc';
import arrayMove from 'array-move';

const SortableTable = sortableContainer(({children})=>(
    <Table>{children}</Table>
));

const ProductSortCardContent = ({ products, finishSortProducts, cancel }) => {
    const [ sortProducts, setSortProducts ] = useState([]);

    const onSortEnd = ({oldIndex, newIndex}) => {
        let resortedProducts = arrayMove(sortProducts, oldIndex, newIndex);
        setSortProducts(resortedProducts);
    };

    const removeProduct = (productType, productCode) => {
        setSortProducts(sortProducts
            .filter(product=>!(product.productType===productType && product.productCode===productCode)));
    };

    useEffect(()=>{
        let sorts = [];
        products.forEach(product=>sorts.push(product));
        setSortProducts(sorts);
    }, [ products ]);

    return (
        <>
            <CardHeader title="自選清單" action={
                <>
                    <IconButton color="inherit"
                        onClick={e=>finishSortProducts(sortProducts)}>
                        <CheckIcon />
                    </IconButton>
                    <IconButton color="inherit"
                        onClick={cancel}>
                        <XIcon />
                    </IconButton>
                </>
            }/>
            <Divider />    
            <TableContainer>
                <SortableTable onSortEnd={onSortEnd} useDragHandle>
                    <ProductSortHead />
                    <TableBody>
                        {sortProducts.map((prop, key)=> <ProductSortRow key={key} index={key} product={prop}
                            remove={e=>removeProduct(prop.productType, prop.productCode)} />)}
                    </TableBody>
                </SortableTable>
            </TableContainer>
        </>
    )
}

export default ProductSortCardContent;