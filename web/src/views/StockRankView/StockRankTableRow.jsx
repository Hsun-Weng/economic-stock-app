import { Box, Link, TableCell, TableRow } from '@material-ui/core';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const StockRankTableRow = ({ stock }) => {
    const navigate = useNavigate();

    const redirectStockChart = ( event, stockCode ) => {
        event.preventDefault();
        navigate(`/stock/${stockCode}`);
    }

    const CellValue = ({children}) => {
        let fontColor = "";
        if(stock.change > 0){
            fontColor = "green";
        }else if(stock.change < 0) {
            fontColor = "red";
        }else {
            fontColor = "";
        }
        return (
            <Box color={fontColor}>
                {children}
            </Box>
        );
    }

    return (
        <TableRow >
            <TableCell>
                <Link href="#" onClick={event=>redirectStockChart(event, stock.stockCode)}>
                    {stock.stockCode}
                </Link>
            </TableCell>
            <TableCell>
                <Link href="#" onClick={event=>redirectStockChart(event, stock.stockCode)}>
                    {stock.stockName}
                </Link>
            </TableCell>
            <TableCell>
                <CellValue>
                    {stock.close}
                </CellValue>
            </TableCell>
            <TableCell>
                <CellValue>
                    {stock.open}
                </CellValue>
            </TableCell>
            <TableCell>
                <CellValue>
                    {stock.high}
                </CellValue>
            </TableCell>
            <TableCell>
                <CellValue>
                    {stock.low}
                </CellValue>
            </TableCell>
            <TableCell>
                <CellValue>
                    {stock.change}
                </CellValue>
            </TableCell>
            <TableCell>
                <CellValue>
                    {stock.changePercent}
                </CellValue>
            </TableCell>
            <TableCell>
                <CellValue>
                    {stock.volume}
                </CellValue>
            </TableCell>
            <TableCell>
                {stock.date}
            </TableCell>
        </TableRow>)
};

export default StockRankTableRow;