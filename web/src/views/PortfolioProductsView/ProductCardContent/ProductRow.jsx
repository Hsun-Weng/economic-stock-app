import { Box, Link, TableCell, TableRow } from '@material-ui/core';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductRow = ({product}) => {
    const navigate = useNavigate();

    const redirectChart = ( event, productCode, productType ) => {
        event.preventDefault();
        switch(productType){
            case 0:
                navigate(`/stock/index/${productCode}`);
                break;
            case 1:
                navigate(`/stock/${productCode}`);
                break;
            default:
        }
    }

    const CellValue = ({children}) => {
        let fontColor = "";
        if(product.change > 0){
            fontColor = "green";
        }else if(product.change < 0) {
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
                <Link href="#" onClick={event=>redirectChart(event, product.productCode, product.productType)}>
                    {product.productCode}
                </Link>
            </TableCell>
            <TableCell>
                <Link href="#" onClick={event=>redirectChart(event, product.productCode, product.productType)}>
                    {product.productName}
                </Link>
            </TableCell>
            <TableCell>
                <CellValue>
                    {product.close}
                </CellValue>
            </TableCell>
            <TableCell>
                <CellValue>
                    {product.open}
                </CellValue>
            </TableCell>
            <TableCell>
                <CellValue>
                    {product.high}
                </CellValue>
            </TableCell>
            <TableCell>
                <CellValue>
                    {product.low}
                </CellValue>
            </TableCell>
            <TableCell>
                <CellValue>
                    {product.change}
                </CellValue>
            </TableCell>
            <TableCell>
                <CellValue>
                    {product.changePercent}
                </CellValue>
            </TableCell>
            <TableCell>
                <CellValue>
                    {product.volume}
                </CellValue>
            </TableCell>
            <TableCell>
                {product.date}
            </TableCell>
        </TableRow>
    )
};

export default ProductRow;