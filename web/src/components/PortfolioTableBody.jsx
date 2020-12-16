import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc';

import { TableBody, TableCell, TableRow, Link, Box, IconButton } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';

import { portfolioAction } from '../actions'

const PortfolioTableBody = ({ portfolioId }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const portfolioProductPrices = useSelector(state=>state.portfolioProduct.price);

    const onSortEnd = async ({oldIndex, newIndex}) => {
        dispatch(portfolioAction.resortPortfolioProducts(portfolioId, portfolioProductPrices, oldIndex, newIndex));
    };

    const deleteProduct = ( productCode, productType ) => {
        let portfolioProduct = {
            productType: productType,
            productCode: productCode
        }
        dispatch(portfolioAction.deletePortfolioProducts(portfolioId, portfolioProduct));
    };

    const redirectChart = ( event, productCode, productType ) => {
        event.preventDefault();
        switch(productType){
            case 0:
                history.push(`/index/${productCode}`);
                break;
            case 1:
                history.push(`/stock/${productCode}`);
                break;
            default:
        }
    }

    const StockTable = SortableContainer(({children})=>(
        <TableBody>{children}</TableBody>
    ))

    const DrageHandle = SortableHandle(()=> <MenuIcon />);
    
    const StockRow = SortableElement(({product}) => {
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
        
    useEffect(()=> {
        if( portfolioId !== 0){
            dispatch(portfolioAction.getLatestProductPrice(portfolioId));
        }
    }, [ dispatch, portfolioId ]);

    return (<StockTable onSortEnd={onSortEnd} useDragHandle>
            {portfolioProductPrices.map((prop, key)=>
              <StockRow key={key} index={key} product={prop} />  
            )}
        </StockTable>)
}

export default PortfolioTableBody;