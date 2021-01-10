import { TableContainer, Table, TableBody, LinearProgress } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import ChipTableHead from './ChipTableHead';
import ChipTableRow from './ChipTableRow';
import { notificationAction } from '../../actions';

const ChipTable = ({ stockCode }) => {
    const dispatch = useDispatch();
    const [ chips, setChips ] = useState([]);
    const [ loading, setLoading ] = useState(false);

    const formatDate = date => date.toISOString().slice(0,10);

    useEffect(() => {
        let startDate = new Date(Date.now() - 120 * 24 * 60 * 60 * 1000);
        let endDate = new Date();
        const fetchData = () => {
            setLoading(true);
            fetch(`/api/stock/${stockCode}/chips?startDate=${formatDate(startDate)}&endDate=${formatDate(endDate)}`)
                .then(res=>{
                    if(!res.ok){
                        throw res;
                    }
                    return res.json();
                })
                .then((data)=> {
                    setChips(data)
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
    }, [ stockCode, dispatch ])

    return (
        loading?<LinearProgress/>:
        <TableContainer>
            <Table>
                <ChipTableHead />
                <TableBody>
                    {chips.map((prop, key)=><ChipTableRow key={key} chip={prop} />)}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default ChipTable;