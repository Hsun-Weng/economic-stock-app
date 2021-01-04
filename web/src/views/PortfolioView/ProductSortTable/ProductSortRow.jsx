import { Box, IconButton, Link, TableCell, TableRow } from '@material-ui/core';
import React from 'react';
import { AlignJustify as AlignJustifyIcon, X as XIcon } from 'react-feather';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SortableElement, SortableHandle } from 'react-sortable-hoc';
import { notificationAction } from '../../../actions';

const ProductSortRow = SortableElement(({product, portfolioId}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const DrageHandle = SortableHandle(()=> <AlignJustifyIcon />);

    const deleteProduct = ( productCode, productType ) => {
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        };
        fetch(`/api/portfolio/${portfolioId}/product/${productType}/${productCode}`, requestOptions)
            .then(res=>{
                if(!res.ok){
                    throw res;
                }
            })
            .catch((err)=>{
                if (err.json) {
                  err.json()
                  .then(data=> {
                    dispatch(notificationAction.enqueueError(data.message))
                  })
                } else {
                  dispatch(notificationAction.enqueueError("伺服器錯誤，請稍後再試。"))
                }
            })
    };

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

    return (<TableRow >
        <TableCell>
            <IconButton onClick={event=>deleteProduct(product.productCode, product.productType)}>
                <XIcon />
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

export default ProductSortRow;