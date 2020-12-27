import React, { useEffect, useState } from 'react';

import { Box, Table, TableCell, TableContainer, TableHead, TableBody, TableRow} from '@material-ui/core';

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