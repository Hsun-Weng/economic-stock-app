import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

import { Grid, Paper, IconButton, FormControl, Select, InputLabel, Menu, MenuItem, ListItemIcon, ListItemText, Box, Table, TableCell
    , TableContainer, TableHead, TableRow, Divider } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import PortfolioTableBody from './PortfolioTableBody';
import { AddPortoflioDialog, EditPortoflioDialog, DeletePortfolioDialog } from './PortfolioDialogs';

import { portfolioAction } from '../actions';

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
            <TableCell></TableCell>
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
    const dispatch = useDispatch();
    const classes = useStyles();
    const fixedChartHeightPaper = clsx(classes.paper, classes.fixedChartHeight);

    const portfolio = useSelector(state=>state.portfolio.data);
    const loading = useSelector(state=>state.portfolio.loading);
    const adding = useSelector(state=>state.portfolio.adding);
    const editing = useSelector(state=>state.portfolio.updating);
    const deleting = useSelector(state=>state.portfolio.deleting);
    
    const [ portfolioId, setPortfolioId ] = useState(0);
    
    const [ anchorEl, setAnchorEl ] = useState(null);
    const [ openAddPortfolio, setOpenAddPortfolio ] = useState(false);
    const [ openEditPortfolio, setOpenEditPortfolio ] = useState(false);
    const [ openDeletePortfolio, setOpenDeletePortfolio ] = useState(false);

    const menuOpen = Boolean(anchorEl);

    const handleActionMenuAnchor = (event) => {
        setAnchorEl(event.currentTarget);
    }
    const handleActionMenuClose = () => {
        setAnchorEl(null);
    };

    const portfolioName = () => {
        let selectedPortfolio = portfolio.find(data=>data.portfolioId===portfolioId);
        let selectedPortfolioName = "";
        if(selectedPortfolio) {
            selectedPortfolioName = selectedPortfolio.portfolioName;
        }
        return selectedPortfolioName;
    };

    const handleOpenAddPortfolioClose = () => setOpenAddPortfolio(false);
    const handleOpenAddPortfolio = () => { 
        handleActionMenuClose();
        setOpenAddPortfolio(true);
    };

    const handleOpenDeletePortfolioClose = () => setOpenDeletePortfolio(false);
    const handleOpenDeletePortfolio = () => {
        handleActionMenuClose();
        setOpenDeletePortfolio(true)
    };

    const handleOpenEditPortfolioClose = () => setOpenEditPortfolio(false);
    const handleOpenEditPortfolio = () => {
        handleActionMenuClose();
        setOpenEditPortfolio(true);
    };

    const handleChangePortfolio = (event) => {
        setPortfolioId(event.target.value);
    };

    useEffect(()=>{
        dispatch(portfolioAction.getPortfolio());
    }, [ dispatch ])

    useEffect(()=>{
        if( portfolio.length > 0){
            setPortfolioId(portfolio[0].portfolioId);
        }else{
            setPortfolioId(0);
        }
    }, [ portfolio ])

    useEffect(()=>{
        if(!adding){
            handleOpenAddPortfolioClose();
        }
    }, [ adding ]);

    useEffect(()=>{
        if(!editing){
            handleOpenEditPortfolioClose();
        }
    }, [ editing ]);

    useEffect(()=>{
        if(!deleting){
            handleOpenDeletePortfolioClose();
        }
    }, [ deleting ]);
    return (
        <React.Fragment>
            <Grid container spacing={3}>
                <Grid item md={12}>
                    {loading?<Skeleton variant="text" className={classes.fixedInputSkeletonHeight} />:
                        <Paper>
                            <Box>
                                <FormControl className={classes.formControl}>
                                    <InputLabel>Portfolio</InputLabel>
                                    <Select
                                        value={portfolioId}
                                        onChange={handleChangePortfolio}>
                                        <MenuItem value={0}>請選擇投資組合</MenuItem>
                                        {portfolio.map((prop, key)=><MenuItem key={key} value={prop.portfolioId}>{prop.portfolioName}</MenuItem>)}
                                    </Select>
                                </FormControl>
                                <IconButton className={classes.button} onClick={handleActionMenuAnchor}>
                                    <MoreVertIcon />
                                </IconButton>
                                <Menu anchorEl={anchorEl}
                                    open={menuOpen}
                                    onClose={handleActionMenuClose}
                                    >
                                    <MenuItem onClick={handleOpenAddPortfolio}>
                                        <ListItemIcon><AddIcon /></ListItemIcon>
                                        <ListItemText>新增投資組合</ListItemText>
                                    </MenuItem>
                                    <Divider />
                                    <MenuItem onClick={handleOpenEditPortfolio} disabled={portfolioId === 0}>
                                        <ListItemIcon><EditIcon /></ListItemIcon>
                                        <ListItemText>修改</ListItemText>
                                    </MenuItem>
                                    <MenuItem onClick={handleOpenDeletePortfolio} disabled={portfolioId === 0}>
                                        <ListItemIcon><DeleteIcon /></ListItemIcon>
                                        <ListItemText>刪除</ListItemText>
                                    </MenuItem>
                                </Menu>
                            </Box>
                        </Paper>}
                </Grid>
                <Grid item md={12}>
                    <Paper className={fixedChartHeightPaper}>
                        <TableContainer >
                            <Table size="small">
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