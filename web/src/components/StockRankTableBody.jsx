import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { TableBody, TableRow, TableCell, Box, Link } from '@material-ui/core';

import { stockAction } from '../actions';

const StockRow = ({ stock }) => {
  const history = useHistory();

  const redirectStockChart = ( event, stockCode ) => {
      event.preventDefault();
      history.push(`/stock/${stockCode}`);
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

  return (<TableRow >
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

const StockRankTableBody = ({ stocks }) => {
    const dispatch = useDispatch();
  
    const prices = useSelector(state=>state.stockPrice.latest);

    useEffect(()=>{
      dispatch(stockAction.getLatestStockPrice(stocks))
  }, [ dispatch, stocks ])

  return (
      <TableBody>
        {prices.map((prop, key)=>
          <StockRow key={key} stock={prop} />)}
      </TableBody>
  );
  }

  export default StockRankTableBody;