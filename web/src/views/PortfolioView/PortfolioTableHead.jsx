import { TableCell, TableHead, TableRow } from '@material-ui/core';
import React from 'react';

const PortfolioTableHead = () => (
    <TableHead>
        <TableRow>
            <TableCell />
            <TableCell>
                名稱
            </TableCell>
            <TableCell>
                收盤總價格
            </TableCell>
            <TableCell>
                開盤總價格
            </TableCell>
            <TableCell>
                最高總價格
            </TableCell>
            <TableCell>
                最低總價格
            </TableCell>
            <TableCell>
                總變動價
            </TableCell>
            <TableCell>
                日期
            </TableCell>
            <TableCell />
        </TableRow>
    </TableHead>
)
export default PortfolioTableHead;