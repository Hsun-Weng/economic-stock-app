import React, { useEffect, useState } from 'react';

import { Box, Table, TableCell, TableContainer, TableHead, TableBody, TableRow} from '@material-ui/core';

const ChipHeading = () => (
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

const ChipRow = ({data}) => {
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
            <TableCell>{data.date}</TableCell>
            <TableCell>{investorChipCell(fiData(data.investorChip))}</TableCell>
            <TableCell>{investorChipCell(itData(data.investorChip))}</TableCell>
            <TableCell>{investorChipCell(dData(data.investorChip))}</TableCell>
            <TableCell>{cellValue(data.netShare)}</TableCell>
        </TableRow>
    )
}

const StockChipChart = ({ stockCode }) => {
    const [ chips, setChips ] = useState([]);

    const formatDate = date => date.toISOString().slice(0,10);

    useEffect(() => {
        let startDate = new Date(Date.now() - 120 * 24 * 60 * 60 * 1000);
        let endDate = new Date();
        const fetchData = () => {
            fetch(`/api/stock/${stockCode}/chips?startDate=${formatDate(startDate)}&endDate=${formatDate(endDate)}`)
                .then((res)=>res.json())
                .then((res)=>res.data)
                .then((data)=>setChips(data))
        };
        fetchData();
    }, [ stockCode ])

    return (
        <Box>
            <TableContainer >
                <Table>
                    <ChipHeading />
                    <TableBody>
                        {chips.map((prop, key)=><ChipRow key={key} data={prop} />)}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}

export default StockChipChart;