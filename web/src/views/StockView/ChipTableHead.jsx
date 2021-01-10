import { TableCell, TableHead, TableRow } from '@material-ui/core';
import React from 'react';

const ChipTableHead = () => (
    <TableHead>
        <TableRow>
            <TableCell>日期</TableCell>
            <TableCell>外資</TableCell>
            <TableCell>投信</TableCell>
            <TableCell>自營商</TableCell>
            <TableCell>合計</TableCell>
        </TableRow>
    </TableHead>
)

export default ChipTableHead;