import { IconButton, TableCell, TableRow } from '@material-ui/core';
import React from 'react';
import { AlignJustify as AlignJustifyIcon, X as XIcon } from 'react-feather';
import { sortableElement, sortableHandle } from 'react-sortable-hoc';

const DrageHandle = sortableHandle(()=> <AlignJustifyIcon />);

const ProductSortRow = sortableElement(({product, remove}) => (
    <TableRow >
        <TableCell>
            <IconButton onClick={remove}>
                <XIcon />
            </IconButton>
        </TableCell>
        <TableCell>
            {product.productCode}
        </TableCell>
        <TableCell>
            {product.productName}
        </TableCell>
        <TableCell>
            <DrageHandle />
        </TableCell>
    </TableRow>
));

export default ProductSortRow;