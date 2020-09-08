import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

import { Grid, Paper, IconButton, FormControl, Select, InputLabel, Button, Menu, MenuItem, ListItemIcon, ListItemText, Box, TextField, Table, TableCell
    , TableContainer, TableHead, TableRow, Divider, Dialog, DialogTitle, DialogContent, DialogActions, CircularProgress } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import PortfolioTableBody from './PortfolioTableBody';
import { AddPortoflioDialog, EditPortoflioDialog, DeletePortfolioDialog } from './PortfolioDialogs';

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 200
    },
    button: {
        margin: theme.spacing(1)
    },
    fixedInputSkeletonHeight: {
        height: 65,
    },
    fixedChartHeight: {
        height: 900,
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
}));

const PortfolioHeading = () => (
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
            <TableCell />
        </TableRow>
    </TableHead>
)

const Portfolio = () => {
    const classes = useStyles();
    const fixedChartHeightPaper = clsx(classes.paper, classes.fixedChartHeight);

    const dispatch = useDispatch();
    const portfolio = useSelector(state=>state.portfolio.portfolios.data);
    
    const [ portfolioId, setPortfolioId ] = useState(0);
    const [ portfolioName, setPortfolioName ] = useState("");
    
    const [ anchorEl, setAnchorEl ] = useState(null);
    const [ openAddPortfolio, setOpenAddPortfolio ] = useState(false);
    const [ openEditPortfolio, setOpenEditPortfolio ] = useState(false);
    const [ openDeletePortfolio, setOpenDeletePortfolio ] = useState(false);

    const handleActionMenuAnchor = (event) => {
        setAnchorEl(event.currentTarget);
    }
    const handleActionMenuClose = () => {
        setAnchorEl(null);
    };

    const handleOpenAddPortfolioClose = () => setOpenAddPortfolio(false);
    const handleOpenAddPortfolio = () => setOpenAddPortfolio(true);

    const handleOpenDeletePortfolioClose = () => setOpenDeletePortfolio(false);
    const handleOpenDeletePortfolio = () => {
        setPortfolioName(portfolio.find(data=>data.portfolioId===portfolioId).portfolioName);
        setOpenDeletePortfolio(true);
    }

    const handleOpenEditPortfolioClose = () => setOpenEditPortfolio(false);
    const handleOpenEditPortfolio = () => {
        setPortfolioName(portfolio.find(data=>data.portfolioId===portfolioId).portfolioName);
        setOpenEditPortfolio(true);
    }

    useEffect(()=>{
        if( portfolio.length > 0){
            setPortfolioId(portfolio[0].portfolioId);
        }
    }, [ portfolio ])

    return (
        <React.Fragment>
            <Grid container spacing={3}>
                <Grid item md={12}>
                    <Paper>
                        <Box>
                             <FormControl className={classes.formControl}>
                                <InputLabel>Portfolio</InputLabel>
                                <Select
                                    value={portfolioId}
                                    onChange={event=>setPortfolioId(event.target.value)}>
                                    {portfolio.map((prop, key)=><MenuItem key={key} value={prop.portfolioId}>{prop.portfolioName}</MenuItem>)}
                                </Select>
                            </FormControl>
                            <IconButton className={classes.button} onClick={handleActionMenuAnchor}>
                                <MoreVertIcon />
                            </IconButton>
                            <Menu anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleActionMenuClose}
                                >
                                <MenuItem onClick={handleOpenAddPortfolio}>
                                    <ListItemIcon>
                                        <AddIcon />
                                    </ListItemIcon>
                                    <ListItemText>
                                        新增投資組合
                                    </ListItemText>
                                </MenuItem>
                                <Divider />
                                <MenuItem onClick={handleOpenEditPortfolio}>
                                    <ListItemIcon>
                                        <AddIcon />
                                    </ListItemIcon>
                                    <ListItemText>
                                        修改
                                    </ListItemText>
                                </MenuItem>
                                <MenuItem onClick={handleOpenDeletePortfolio}>
                                    <ListItemIcon>
                                        <AddIcon />
                                    </ListItemIcon>
                                    <ListItemText>
                                        刪除
                                    </ListItemText>
                                </MenuItem>
                            </Menu>
                        </Box>
                        {/* :<Skeleton variant="text" className={fixedInputSkeletonHeight} />} */}
                    </Paper>
                </Grid>
                <Grid item md={12}>
                    <Paper className={fixedChartHeightPaper}>
                        <TableContainer >
                            <Table>
                                <PortfolioHeading />
                                <PortfolioTableBody portfolioId={portfolioId} />
                            </Table>
                        </TableContainer>
                    </Paper>
                </Grid>
            </Grid>
            <AddPortoflioDialog open={openAddPortfolio} handleClose={handleOpenAddPortfolioClose}/>
            <EditPortoflioDialog open={openEditPortfolio} handleClose={handleOpenEditPortfolioClose} portfolioId={portfolioId} portfolioName={portfolioName}/>
            <DeletePortfolioDialog open={openDeletePortfolio} handleClose={handleOpenDeletePortfolioClose} portfolioId={portfolioId} portfolioName={portfolioName}/>
        </React.Fragment>);
}

export default Portfolio;