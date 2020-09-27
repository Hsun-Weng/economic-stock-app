import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Box, Table, TableCell, TableContainer, TableHead, TableBody, TableRow} from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

import { stockAction } from '../actions';

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

const StockMarginChart = ({ stockCode, chartHeight }) => {
    const dispatch = useDispatch();

    const marginData = useSelector(state=>state.stockMargin.data);
    const marginDataLoading = useSelector(state=>state.stockMargin.loading);

    const formatDate = date => date.toISOString().slice(0,10);

    useEffect(() => {
        let startDate = new Date(Date.now() - 120 * 24 * 60 * 60 * 1000);
        let endDate = new Date();
        dispatch(stockAction.getStockMargin(stockCode, formatDate(startDate), formatDate(endDate)));
    }, [ dispatch, stockCode ])

    return (
        <Box>
            {marginDataLoading? 
                <Skeleton variant="rect" height={chartHeight} />:
                <TableContainer >
                    <Table>
                        <MarginHeading />
                        <TableBody>
                            {marginData.map((prop, key)=><MarginRow key={key} data={prop} />)}
                        </TableBody>
                    </Table>
                </TableContainer>
            }
        </Box>
    )
}

export default StockMarginChart;