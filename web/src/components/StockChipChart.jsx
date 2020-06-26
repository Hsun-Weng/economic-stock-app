import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Box, Table, TableCell, TableContainer, TableHead, TableBody, TableRow} from '@material-ui/core'
import { useEffect } from 'react';

import { stockAction } from '../actions';

const ChipHeading = () => (
    <TableHead>
        <TableRow>
            <TableCell>日期</TableCell>
            <TableCell>外資</TableCell>
            <TableCell>投信</TableCell>
            <TableCell>自營商</TableCell>
            <TableCell>合計</TableCell>
        </TableRow>
    </TableHead>
)

const ChipRow = ({data}) => {
    const netShare = (shares) => shares.longShare - shares.shortShare;

    const fiData = (investors) => investors.filter((investor)=>investor.investorCode === 'FI');
    const itData = (investors) => investors.filter((investor)=>investor.investorCode === 'IT');
    const dData = (investors) => investors.filter((investor)=>investor.investorCode === 'D');

    const investorChipCell = (investorData) => {
        if(investorData.length === 0){
            return;
        }
        let investorNetShare = netShare(investorData[0]);
        return cellValue(investorNetShare);
    }

    const cellValue = (value) => {
        let fontColor = ""
        if(value > 0){
            fontColor = "green";
        }else if(value < 0) {
            fontColor = "red";
        }
        return (
            <Box color={fontColor}>
                {value}
            </Box>
        )
    }

    return (
        <TableRow>
            <TableCell>{data.date}</TableCell>
            <TableCell>{investorChipCell(fiData(data.investorChip))}</TableCell>
            <TableCell>{investorChipCell(itData(data.investorChip))}</TableCell>
            <TableCell>{investorChipCell(dData(data.investorChip))}</TableCell>
            <TableCell>{cellValue(data.netShare)}</TableCell>
        </TableRow>
    )
}

const StockChipChart = ({ stockCode }) => {
    const dispatch = useDispatch();
    const data = useSelector(state=>state.stock.chips.data);
    const formatDate = date => date.toISOString().slice(0,10);

    useEffect(()=>{
        let startDate = new Date(Date.now() - 120 * 24 * 60 * 60 * 1000);
        let endDate = new Date();
        dispatch(stockAction.getStockChip(stockCode, formatDate(startDate), formatDate(endDate)));
    }, [ dispatch, stockCode ]);

    return (
        <TableContainer >
            <Table>
                <ChipHeading />
                <TableBody>
                    {data.map((prop, key)=><ChipRow key={key} data={prop} />)}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default StockChipChart;