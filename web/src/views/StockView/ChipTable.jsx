import { Table, TableBody } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import ChipTableHead from './ChipTableHead';
import ChipTableRow from './ChipTableRow';

const ChipTable = ({ stockCode }) => {
    const [ chips, setChips ] = useState([]);

    const formatDate = date => date.toISOString().slice(0,10);

    useEffect(() => {
        let startDate = new Date(Date.now() - 120 * 24 * 60 * 60 * 1000);
        let endDate = new Date();
        const fetchData = () => {
            fetch(`/api/stock/${stockCode}/chips?startDate=${formatDate(startDate)}&endDate=${formatDate(endDate)}`)
                .then((res)=>res.json())
                .then((res)=>res.data)
                .then((data)=>setChips(data))
        };
        fetchData();
    }, [ stockCode ])

    return (
        <Table>
            <ChipTableHead />
            <TableBody>
                {chips.map((prop, key)=><ChipTableRow key={key} chip={prop} />)}
            </TableBody>
        </Table>
    )
}

export default ChipTable;