import { Table, TableBody } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import MarginTableHead from './MarginTableHead';
import MarginTableRow from './MarginTableRow';

const MarginTable = ({ stockCode }) => {
    const [ margins, setMargins ] = useState([]);

    const formatDate = date => date.toISOString().slice(0,10);

    useEffect(() => {
        let startDate = new Date(Date.now() - 120 * 24 * 60 * 60 * 1000);
        let endDate = new Date();
        const fetchData = () => {
            fetch(`/api/stock/${stockCode}/margins?startDate=${formatDate(startDate)}&endDate=${formatDate(endDate)}`)
                .then((res)=>res.json())
                .then((res)=>res.data)
                .then((data)=>setMargins(data))
        };
        fetchData();
    }, [ stockCode ])

    return (
        <Table>
            <MarginTableHead />
            <TableBody>
                {margins.map((prop, key)=><MarginTableRow key={key} margin={prop} />)}
            </TableBody>
        </Table>
    )
}

export default MarginTable;