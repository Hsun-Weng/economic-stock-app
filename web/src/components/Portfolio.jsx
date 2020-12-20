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

import UserPortfolioSelect from './UserPortfolioSelect';
import PortfolioTable from './PortfolioTable';
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

const Portfolio = () => {
    const classes = useStyles();
    const fixedChartHeightPaper = clsx(classes.paper, classes.fixedChartHeight);

    const portfolio = useSelector(state=>state.portfolio.data);
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
                        <Paper>
                            <Box>
                                <UserPortfolioSelect portfolioId={portfolioId} setPortfolioId={setPortfolioId} className={classes.formControl} />
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
                        </Paper>
                </Grid>
                <Grid item md={12}>
                    <Paper className={fixedChartHeightPaper}>
                        <PortfolioTable portfolioId={portfolioId} />
                    </Paper>
                </Grid>
            </Grid>
            <AddPortoflioDialog open={openAddPortfolio} handleClose={handleOpenAddPortfolioClose}/>
            <EditPortoflioDialog open={openEditPortfolio} handleClose={handleOpenEditPortfolioClose} portfolioId={portfolioId} portfolioName={portfolioName}/>
            <DeletePortfolioDialog open={openDeletePortfolio} handleClose={handleOpenDeletePortfolioClose} portfolioId={portfolioId} portfolioName={portfolioName}/>
        </React.Fragment>);
}

export default Portfolio;