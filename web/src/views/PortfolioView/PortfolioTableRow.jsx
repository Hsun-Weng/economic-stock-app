import { Box, Link, TableCell, TableRow, IconButton } from '@material-ui/core';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit as EditIcon, Trash2 as Trash2Icon } from 'react-feather';

const PortfolioTableRow = ({ portfolio, openEdit, openDelete }) => {
    const navigate = useNavigate();

    const redirectProducts = ( portfolioId ) => {
        navigate(`/portfolio/${portfolioId}`);
    }

    const CellValue = ({children}) => {
        let fontColor = "";
        if(portfolio.change > 0){
            fontColor = "green";
        }else if(portfolio.change < 0) {
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
            <IconButton color="inherit"
                onClick={e=>openDelete(portfolio.portfolioId, portfolio.portfolioName)}>
                <Trash2Icon />
            </IconButton>
        </TableCell>
        <TableCell>
            <Link href="#" onClick={e=>redirectProducts(portfolio.portfolioId)}>
                {portfolio.portfolioName}
            </Link>
        </TableCell>
        <TableCell>
            <CellValue>
                {portfolio.close}
            </CellValue>
        </TableCell>
        <TableCell>
            <CellValue>
                {portfolio.open}
            </CellValue>
        </TableCell>
        <TableCell>
            <CellValue>
                {portfolio.high}
            </CellValue>
        </TableCell>
        <TableCell>
            <CellValue>
                {portfolio.low}
            </CellValue>
        </TableCell>
        <TableCell>
            <CellValue>
                {portfolio.change}
            </CellValue>
        </TableCell>
        <TableCell>
            {portfolio.date}
        </TableCell>
        <TableCell>
            <IconButton color="inherit"
                onClick={e=>openEdit(portfolio.portfolioId, portfolio.portfolioName)}>
                <EditIcon />
            </IconButton>
        </TableCell>
    </TableRow>
)};

export default PortfolioTableRow;