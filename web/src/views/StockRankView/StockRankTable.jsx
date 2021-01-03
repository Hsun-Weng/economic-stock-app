import { Card, CardHeader, Divider, LinearProgress, Table, TableBody, TableContainer, TableFooter, TablePagination, TableRow } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { notificationAction } from '../../actions';
import StockRankTableHead from './StockRankTableHead';
import StockRankTableRow from './StockRankTableRow';

const useStyles = makeStyles(() => ({
    root: {},
}));

const StockRankTable = ({ className, categoryCode, sortColumn, direction, ...rest }) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [ page, setPage ] = useState(0);
    const [ size, setSize ] = useState(10);
    const [ totalPage, setTotalPage ] = useState(0);

    const [ stocks, setStocks ] = useState([]);
    const [ loading, setLoading ] = useState(false);

    const handleChangeRowsPerPage = (event) => {
        setSize(parseInt(event.target.value, 10));
        setPage(0);
    };

    useEffect(()=>{
        const fetchData = () => {
            setLoading(true);
            fetch(`/api/stocks/rank/latest?sortColumn=${sortColumn}&page=${page}&size=${size}&direction=${direction}`)
                .then(res=>{
                    if(!res.ok){
                        throw res;
                    }
                    return res.json();
                })
                .then((data)=> {
                    setTotalPage(data.totalPage);
                    setStocks(data.content)
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
                }).finally(()=>setLoading(false));
        };
        fetchData();
    }, [ sortColumn, direction, page, size, dispatch ])

    return (
        <Card
            className={clsx(classes.root, className)}
            {...rest}>
            {loading?<LinearProgress/>:
            <>
                <CardHeader title="排行清單" />
                <Divider />    
                <TableContainer>
                    <Table size="small">
                        <StockRankTableHead />
                        <TableBody>
                            {stocks.map((prop, key)=> <StockRankTableRow key={key} stock={prop} />)}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 25]}
                                    colSpan={10}
                                    count={totalPage}
                                    rowsPerPage={size}
                                    page={page}
                                    onChangePage={(event, newPage) => setPage(newPage)}
                                    onChangeRowsPerPage={handleChangeRowsPerPage} />
                            </TableRow>
                        </TableFooter>
                    </Table>
                </TableContainer>
            </>}
        </Card>
    );
}

export default StockRankTable;