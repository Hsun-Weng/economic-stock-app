import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc';
import arrayMove from 'array-move';

import { TableBody, TableCell, TableRow, Link, Box} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';

import { portfolioAction, stockAction } from '../actions'

const PortfolioTableBody = ({ portfolioId }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const portfolioProducts = useSelector(state=>state.portfolio.products.data);
    const stockLatestPrices = useSelector(state=>state.stock.latestPrices.data);
    const stockIndexLatestPrices = useSelector(state=>state.stock.latestIndexPrices.data);
    
    const [ productPrices, setProductPrices ] = useState([]);

    const onSortEnd = async ({oldIndex, newIndex}) => {
        let resortedProducts = arrayMove(productPrices, oldIndex, newIndex);
        let resortIndex = 0;
        let updateProducts = resortedProducts.map((product)=>{
            return {
                id: {
                    productType: product.productType
                },
                productCode: product.productCode,
                sort: ++resortIndex
            };
        });
        setProductPrices(resortedProducts);
        dispatch(portfolioAction.updatePortfolioProducts(portfolioId, updateProducts));
    };

    const redirectStockChart = ( event, productCode, productType ) => {
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
                <Link href="#" onClick={event=>redirectStockChart(event, product.productCode, product.productType)}>
                    {product.productCode}
                </Link>
            </TableCell>
            <TableCell>
                <Link href="#" onClick={event=>redirectStockChart(event, product.productCode, product.productType)}>
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

    useEffect(()=>{
        if( portfolioId !== 0){
            dispatch(portfolioAction.getPortfolioProducts(portfolioId));
        }
    }, [ dispatch, portfolioId ])

    useEffect(()=>{
        dispatch(stockAction.getLatestStockPrice(portfolioProducts));
        dispatch(stockAction.getLatestStockIndexPrice(portfolioProducts));
    }, [ dispatch, portfolioProducts ]);

    useEffect(()=> {
        let stockIndexPrices = stockIndexLatestPrices.map((data)=>{
            return {...data, productType: 0} 
         });
        let stockPrices = stockLatestPrices.map((data)=>{
           return {...data, productType: 1} 
        });
        setProductPrices(stockIndexPrices.concat(stockPrices)
            .sort((product1,product2)=>product1.sort-product2.sort));
    }, [ stockLatestPrices, stockIndexLatestPrices ]);
    
    return (<StockTable onSortEnd={onSortEnd} useDragHandle>
            {productPrices.map((prop, key)=>
              <StockRow key={key} index={key} product={prop} />  
            )}
        </StockTable>)
}

export default PortfolioTableBody;