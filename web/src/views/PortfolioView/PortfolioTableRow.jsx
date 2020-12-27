import { Box, IconButton, Link, TableCell, TableRow } from '@material-ui/core';
import { Close as CloseIcon, Menu as MenuIcon } from '@material-ui/icons';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SortableElement, SortableHandle } from 'react-sortable-hoc';

const PortfolioTableRow = SortableElement(({product, portfolioId}) => {
    const navigate = useNavigate();

    const DrageHandle = SortableHandle(()=> <MenuIcon />);

    const deleteProduct = ( productCode, productType ) => {
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        };
        fetch(`/api/portfolio/${portfolioId}/product/${productType}/${productCode}`, requestOptions)
            .then(res=>res.json())
    };

    const redirectChart = ( event, productCode, productType ) => {
        event.preventDefault();
        switch(productType){
            case 0:
                navigate(`/app/stock/index/${productCode}`);
                break;
            case 1:
                navigate(`/app/stock/${productCode}`);
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

    return (<TableRow >
        <TableCell>
            <IconButton onClick={event=>deleteProduct(product.productCode, product.productType)}>
                <CloseIcon />
            </IconButton>
        </TableCell>
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
        <TableCell>
            <DrageHandle />
        </TableCell>
    </TableRow>
)});

export default PortfolioTableRow;