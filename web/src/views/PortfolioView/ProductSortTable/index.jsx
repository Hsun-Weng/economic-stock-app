import React from 'react';
import { Table, TableBody } from '@material-ui/core';
import ProductSortHead from './ProductSortHead';
import ProductSortRow from './ProductSortRow';
import { SortableContainer } from 'react-sortable-hoc';
import arrayMove from 'array-move';

const SortableTableBody = SortableContainer(({children})=>(
    <TableBody>{children}</TableBody>
))

const ProductSortTable = ({ products }) => {
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
        // fetch(`/api/portfolio/${portfolioId}/products`, requestOptions);
        // setProducts(resortedProducts);
    };
    return (
        <Table>
            <ProductSortHead />
            <SortableTableBody onSortEnd={onSortEnd} useDragHandle>
                {products.map((prop, key)=> <ProductSortRow key={key} index={key} product={prop} />)}
            </SortableTableBody>
        </Table>
    )
}

export default ProductSortTable;