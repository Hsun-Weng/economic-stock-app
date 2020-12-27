import React, { useEffect, useState } from 'react';

import { Box, Table, TableCell, TableContainer, TableHead, TableBody, TableRow} from '@material-ui/core';

const ChipTableRow = ({ chip }) => {
    const netShare = (shares) => shares.longShare - shares.shortShare;

    const fiData = (investors) => investors.filter((investor)=>investor.investorCode === 'FI');
    const itData = (investors) => investors.filter((investor)=>investor.investorCode === 'IT');
    const dData = (investors) => investors.filter((investor)=>investor.investorCode === 'D');

    const investorChipCell = (investorData) => {
        if(investorData.length === 0){
            return;
        }
        let investorNetShare = netShare(investorData[0]);
        return cellValue(investorNetShare);
    }

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
            <TableCell>{chip.date}</TableCell>
            <TableCell>{investorChipCell(fiData(chip.investorChip))}</TableCell>
            <TableCell>{investorChipCell(itData(chip.investorChip))}</TableCell>
            <TableCell>{investorChipCell(dData(chip.investorChip))}</TableCell>
            <TableCell>{cellValue(chip.netShare)}</TableCell>
        </TableRow>
    )
}

export default ChipTableRow;