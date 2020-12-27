import React, { useEffect, useState } from 'react';

import { Box, Table, TableCell, TableContainer, TableHead, TableBody, TableRow} from '@material-ui/core';

const MarginTableRow = ({ margin }) => {
    const cellValue = (value) => {
        let fontColor = ""
        if(value > 0){
            fontColor = "green";
        }else if(value < 0) {
            fontColor = "red";
        }
        return (
            <Box color={fontColor}>
                {value}
            </Box>
        )
    }

    return (
        <TableRow>
            <TableCell>{margin.date}</TableCell>
            <TableCell>{cellValue(margin.longShare)}</TableCell>
            <TableCell>{cellValue(margin.shortShare)}</TableCell>
            <TableCell>{margin.totalLongShare}</TableCell>
            <TableCell>{margin.totalShortShare}</TableCell>
            <TableCell>{margin.dayShare}</TableCell>
        </TableRow>
    )
}

export default MarginTableRow;