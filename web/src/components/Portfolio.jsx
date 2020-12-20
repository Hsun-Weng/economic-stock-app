import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

import { Grid, Paper, IconButton, Button, FormControl, Select, InputLabel, Menu, MenuItem, ListItemIcon, ListItemText, Box, Table, TableCell
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

const PortfolioControl = ({ portfolioId, setPortfolioId }) => {
    const classes = useStyles();

    const [ openAddPortfolio, setOpenAddPortfolio ] = useState(false);
    const [ openEditPortfolio, setOpenEditPortfolio ] = useState(false);
    const [ openDeletePortfolio, setOpenDeletePortfolio ] = useState(false);

    return (
        <Box>
            <UserPortfolioSelect portfolioId={portfolioId} setPortfolioId={setPortfolioId} className={classes.formControl} />
            <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={()=>setOpenAddPortfolio(true)}>
                新增
            </Button>
            <Button variant="contained" color="default" startIcon={<EditIcon />} onClick={()=>setOpenEditPortfolio(true)}>
                修改名稱
            </Button>
            <Button variant="contained" color="secondary" startIcon={<DeleteIcon />} onClick={()=>setOpenDeletePortfolio(true)}>
                刪除
            </Button>
            <AddPortoflioDialog open={openAddPortfolio} handleClose={()=>setOpenAddPortfolio(false)}/>
            <EditPortoflioDialog open={openEditPortfolio} handleClose={()=>setOpenEditPortfolio(false)} portfolioId={portfolioId} />
            <DeletePortfolioDialog open={openDeletePortfolio} handleClose={()=>setOpenDeletePortfolio(false)} portfolioId={portfolioId} />
        </Box>
    )
}

const Portfolio = () => {
    const classes = useStyles();
    const fixedChartHeightPaper = clsx(classes.paper, classes.fixedChartHeight);
    const [ portfolioId, setPortfolioId ] = useState(0);

    return (
        <React.Fragment>
            <Grid container spacing={3}>
                <Grid item md={12}>
                    <Paper>
                        <PortfolioControl portfolioId={portfolioId} setPortfolioId={setPortfolioId}/>
                    </Paper>
                </Grid>
                <Grid item md={12}>
                    <Paper className={fixedChartHeightPaper}>
                        <PortfolioTable portfolioId={portfolioId} />
                    </Paper>
                </Grid>
            </Grid>
        </React.Fragment>);
}

export default Portfolio;