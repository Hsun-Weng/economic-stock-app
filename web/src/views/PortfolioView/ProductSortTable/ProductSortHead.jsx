import { TableCell, TableHead, TableRow } from '@material-ui/core';
import React from 'react';

const ProductSortHead = () => (
    <TableHead>
        <TableRow>
            <TableCell></TableCell>
            <TableCell>
                Code 
            </TableCell>
            <TableCell>
                Name
            </TableCell>
            <TableCell>
                Last
            </TableCell>
            <TableCell>
                Open
            </TableCell>
            <TableCell>
                High
            </TableCell>
            <TableCell>
                Low
            </TableCell>
            <TableCell>
                Chg
            </TableCell>
            <TableCell>
                Chg %
            </TableCell>
            <TableCell>
                Vol
            </TableCell>
            <TableCell>
                Time
            </TableCell>
            <TableCell />
        </TableRow>
    </TableHead>
)
export default ProductSortHead;