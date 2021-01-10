import { TableCell, TableHead, TableRow } from '@material-ui/core';
import React from 'react';

const StockRankTableHead = () => (
    <TableHead>
        <TableRow>
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
        </TableRow>
    </TableHead>
)

export default StockRankTableHead;