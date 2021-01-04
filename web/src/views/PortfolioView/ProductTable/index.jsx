import { Table, TableBody } from '@material-ui/core';
import React from 'react';
import ProductHead from './ProductHead';
import ProductRow from './ProductRow';

const ProductTable = ({ products }) => (
    <Table>
        <ProductHead />
        <TableBody>
            {products.map((prop, key)=> <ProductRow key={key} index={key} product={prop} />)}
        </TableBody>
    </Table>
)

export default ProductTable;