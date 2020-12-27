import React, { useEffect, useState } from 'react';

import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

import { Grid, Paper, Box, Card,
    CardHeader, Divider, Table, TableCell, TablePagination, TableRow, TableBody, Typography, Link } from '@material-ui/core'

import StockRankTableHead from './StockRankTableHead';
import StockRankTableRow from './StockRankTableRow';

const useStyles = makeStyles(() => ({
    root: {},
}));

const StockRankTable = ({ className, categoryCode, sortColumn, direction, ...rest }) => {
    const classes = useStyles();

    const [ page, setPage ] = useState(0);
    const [ size, setSize ] = useState(10);
    const [ totalPage, setTotalPage ] = useState(0);

    const [ stocks, setStocks ] = useState([]);

    const handleChangeRowsPerPage = (event) => {
        setSize(parseInt(event.target.value, 10));
        setPage(0);
    };

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

    return (
        <Card
            className={clsx(classes.root, className)}
            {...rest}>
            <CardHeader title="個股類別" />
            <Divider />    
            <PerfectScrollbar>
                <Box minWidth={800}>
                    <Table>
                        <StockRankTableHead />
                        <TableBody>
                            {stocks.map((prop, key)=> <StockRankTableRow key={key} stock={prop} />)}
                        </TableBody>
                    </Table>
                </Box>
            </PerfectScrollbar>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                colSpan={10}
                count={totalPage}
                rowsPerPage={size}
                page={page}
                onChangePage={(event, newPage) => setPage(newPage)}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Card>
    );
}

export default StockRankTable;