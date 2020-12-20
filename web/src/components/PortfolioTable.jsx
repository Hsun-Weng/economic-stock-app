import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc';

import { Typography, Table, TableContainer, TableHead, TableBody, TableCell, TableRow, Link, Box, IconButton } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';

const PortfolioHeading = () => (
    <TableHead>
        <TableRow>
            <TableCell></TableCell>
            <TableCell>
                Code 
            </TableCell>
            <TableCell>
                Name
            </TableCell>
            <TableCell>
                Last
            </TableCell>
            <TableCell>
                Open
            </TableCell>
            <TableCell>
                High
            </TableCell>
            <TableCell>
                Low
            </TableCell>
            <TableCell>
                Chg
            </TableCell>
            <TableCell>
                Chg %
            </TableCell>
            <TableCell>
                Vol
            </TableCell>
            <TableCell>
                Time
            </TableCell>
            <TableCell />
        </TableRow>
    </TableHead>
)

const StockRow = SortableElement(({product, portfolioId}) => {
    const history = useHistory();

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
                history.push(`/index/${productCode}`);
                break;
            case 1:
                history.push(`/stock/${productCode}`);
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


const PortfolioTable = ({ portfolioId }) => {
    const history = useHistory();
    const [ portfolioProductPrices , setPortfolioProductPrices ] = useState([]);

    const onSortEnd = async ({oldIndex, newIndex}) => {
        fetch(`/api/portfolio/${portfolioId}/products`)
            .then(res=>res.json())
    };

    const StockTable = SortableContainer(({children})=>(
        <TableBody>{children}</TableBody>
    ))
        
    useEffect(()=> {
        if( portfolioId !== 0){
            fetch(`/api/portfolio/${portfolioId}/product/prices`)
                .then(res=>res.json())
                .then(res=>res.data)
                .then(data=>setPortfolioProductPrices(data))
        }
    }, [ portfolioId ]);

    if(portfolioProductPrices.length==0){
        return (<Box align="center">
            <Typography variant="h4" color="error">
                查無資料
            </Typography>
        </Box>);
    }
    
    return (
        <TableContainer>
            <Table size="small">
                <PortfolioHeading />
                    <StockTable onSortEnd={onSortEnd} useDragHandle>
                        {portfolioProductPrices.map((prop, key)=>
                        <StockRow key={key} index={key} product={prop} portfolioId={portfolioId} /> )}
                    </StockTable>
            </Table>
        </TableContainer>
    )
}

export default PortfolioTable;