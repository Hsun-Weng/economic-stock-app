import { TableContainer, Table, TableBody, CardHeader, IconButton, Divider } from '@material-ui/core';
import { Edit as EditIcon } from 'react-feather';
import React from 'react';
import ProductHead from './ProductHead';
import ProductRow from './ProductRow';

const ProductCardContent = ({ products, closeContent }) => (
    <>
        <CardHeader title="自選清單" action={
            <IconButton color="inherit"
                onClick={closeContent}>
                <EditIcon />
            </IconButton>
        } />
        <Divider />    
        <TableContainer>
            <Table>
                <ProductHead />
                <TableBody>
                    {products.map((prop, key)=> <ProductRow key={key} index={key} product={prop} />)}
                </TableBody>
            </Table>
        </TableContainer>
    </>
)

export default ProductCardContent;