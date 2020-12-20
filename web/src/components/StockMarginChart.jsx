import React, { useEffect, useState } from 'react';

import { Box, Table, TableCell, TableContainer, TableHead, TableBody, TableRow} from '@material-ui/core';

const MarginHeading = () => (
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

const MarginRow = ({data}) => {
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
            <TableCell>{cellValue(data.longShare)}</TableCell>
            <TableCell>{cellValue(data.shortShare)}</TableCell>
            <TableCell>{data.totalLongShare}</TableCell>
            <TableCell>{data.totalShortShare}</TableCell>
            <TableCell>{data.dayShare}</TableCell>
        </TableRow>
    )
}

const StockMarginChart = ({ stockCode }) => {
    const [ margins, setMargins ] = useState([]);

    const formatDate = date => date.toISOString().slice(0,10);

    useEffect(() => {
        let startDate = new Date(Date.now() - 120 * 24 * 60 * 60 * 1000);
        let endDate = new Date();
        const fetchData = () => {
            fetch(`/api/stock/${stockCode}/margins?startDate=${formatDate(startDate)}&endDate=${formatDate(endDate)}`)
                .then((res)=>res.json())
                .then((res)=>res.data)
                .then((data)=>setMargins(data))
        };
        fetchData();
    }, [ stockCode ])

    return (
        <Box>
            <TableContainer >
                <Table>
                    <MarginHeading />
                    <TableBody>
                        {margins.map((prop, key)=><MarginRow key={key} data={prop} />)}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}

export default StockMarginChart;