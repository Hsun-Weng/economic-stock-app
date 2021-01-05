import { Card, CardHeader, Divider, LinearProgress, Table, TableBody, TableContainer } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { notificationAction } from '../../actions';
import PortfolioTableHead from './PortfolioTableHead';
import PortfolioTableRow from './PortfolioTableRow';
import PortfolioEditDialog from './PortfolioEditDialog';
import PortfolioDeleteDialog from './PortfolioDeleteDialog';

const useStyles = makeStyles(() => ({
    root: {},
}));

const PortfolioTable = ({ className, ...rest }) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [ portfolios, setPortfolios ] = useState([]);
    const [ loading, setLoading ] = useState(false);
    const [ openEditPortfolio, setOpenEditPortfolio ] = useState(false);
    const [ openDeletePortfolio, setOpenDeletePortfolio ] = useState(false);

    const [ portfolioId, setPortfolioId ]  = useState(0);
    const [ portfolioName, setPortfolioName ]  = useState("");

    useEffect(()=>{
        const fetchData = async () => {
            setLoading(true);
            fetch(`/api/portfolios/price/latest`)
                .then(res=>{
                    if(!res.ok){
                        throw res;
                    }
                    return res.json();
                })
                .then((data)=> {
                    setPortfolios(data);
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
        }
        fetchData();
    }, [ dispatch ])

    const openEdit = ( portfolioId, portfolioName ) => {
        setPortfolioId(portfolioId);
        setPortfolioName(portfolioName);
        setOpenEditPortfolio(true);
    }

    const openDelete = ( portfolioId, portfolioName ) => {
        setPortfolioId(portfolioId);
        setPortfolioName(portfolioName);
        setOpenDeletePortfolio(true);
    }

    return (
        <Card
            className={clsx(classes.root, className)}
            {...rest}>
            {loading?<LinearProgress/>:
            <>
                <CardHeader title="投資組合" />
                <Divider />    
                <TableContainer>
                    <Table>
                        <PortfolioTableHead />
                        <TableBody>
                            {portfolios.map((prop, key)=>
                                <PortfolioTableRow key={key} portfolio={prop} openEdit={openEdit} openDelete={openDelete} />)}
                        </TableBody>
                    </Table>
                </TableContainer>
            </>}
            <PortfolioEditDialog open={openEditPortfolio} handleClose={()=>setOpenEditPortfolio(false)} portfolioId={portfolioId} portfolioName={portfolioName}/>
            <PortfolioDeleteDialog open={openDeletePortfolio} handleClose={()=>setOpenDeletePortfolio(false)} portfolioId={portfolioId} portfolioName={portfolioName}/>
        </Card>
    );
}

export default PortfolioTable;