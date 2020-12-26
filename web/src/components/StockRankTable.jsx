import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Table, TableHead, TableFooter, TableContainer, TableBody, TableRow, TablePagination, TableCell, Box, Link } from '@material-ui/core';

const StockRow = ({ stock }) => {
  const history = useNavigate();

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
    return (
        <TableBody>
        {stocks.map((prop, key)=>
            <StockRow key={key} stock={prop} />)}
        </TableBody>
    );
}

const StockRankTableHeading = () => (
    <TableHead>
        <TableRow>
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
        </TableRow>
    </TableHead>
  )

const StockRankTable = ({ sortColumn, direction }) => {
    const [ page, setPage ] = useState(0);
    const [ size, setSize ] = useState(10);
    const [ totalPage, setTotalPage ] = useState(0);

    const [ stocks, setStocks ] = useState([]);

    useEffect(()=>{
        const fetchData = () => {
            fetch(`/api/stocks/rank/latest?sortColumn=${sortColumn}&page=${page}&size=${size}&direction=${direction}`)
                .then((res)=>res.json())
                .then((res)=>res.data)
                .then((data)=>{
                    setTotalPage(data.totalPage);
                    setStocks(data.content)
                });
        };
        fetchData();
    }, [ sortColumn, direction, page, size ])

    const handleChangeRowsPerPage = (event) => {
        setSize(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <TableContainer>
            <Table>
            <StockRankTableHeading />
            <StockRankTableBody stocks={stocks} />
            <TableFooter>
                <TableRow>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    colSpan={10}
                    count={totalPage}
                    rowsPerPage={size}
                    page={page}
                    onChangePage={(event, newPage) => setPage(newPage)}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
                </TableRow>
            </TableFooter>
            </Table>
        </TableContainer>
    )
};

export default StockRankTable;