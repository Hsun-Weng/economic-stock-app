import { TableCell, TableHead, TableRow } from '@material-ui/core';
import React from 'react';

const MarginTableHead = () => (
    <TableHead>
        <TableRow>
            <TableCell>日期</TableCell>
            <TableCell>融資</TableCell>
            <TableCell>融券</TableCell>
            <TableCell>融資餘額</TableCell>
            <TableCell>融券餘額</TableCell>
            <TableCell>資券互抵</TableCell>
        </TableRow>
    </TableHead>
)

export default MarginTableHead;