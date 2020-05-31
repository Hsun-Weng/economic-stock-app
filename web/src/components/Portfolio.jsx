import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { Grid, Paper, IconButton, TextField, FormControl, Select, InputLabel, MenuItem, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Icon} from '@material-ui/core'
import { Skeleton } from '@material-ui/lab';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';

import {  } from '../actions/'

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 200
    },
    deleteButton: {
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
    const fixedInputSkeletonHeight = clsx(classes.paper, classes.fixedInputSkeletonHeight);
    const fixedChartHeightPaper = clsx(classes.paper, classes.fixedChartHeight);

    const dispatch = useDispatch();
    const portfolio = useSelector(state=>state.portfolio.data);
    
    const formatDate = date => date.toISOString().slice(0,10);

    const [ portfolioId, setPortfolioId ] = useState(0);
    const [ addPorftolioName, setAddPortfolioName ] = useState("");

    const PortfolioSelect = () => (
        <FormControl className={classes.formControl}>
          <InputLabel>Portfolio</InputLabel>
          <Select
            value={portfolioId}
            onChange={event=>setPortfolioId(event.target.value)}>
              {portfolio.map((prop, key)=><MenuItem key={key} value={prop.portoflioId}>{prop.portfolioName}</MenuItem>)}
          </Select>
        </FormControl>
    )

    const AddPorfolio = () => (
        <FormControl className={classes.formControl}>
          <TextField
            fullWidth
            label="Portfolio Name"
            name="portfolioName"
            value={addPorftolioName}
            onChange={event=>setAddPortfolioName(event.target.value)}
          />
        </FormControl>
    )

    return (
        <React.Fragment>
            <Grid container spacing={3}>
                <Grid item md={12}>
                    <Paper>
                        <Box>
                            <PortfolioSelect />
                            <IconButton color="secondary" className={classes.deleteButton}>
                                <DeleteIcon />
                            </IconButton>
                            <AddPorfolio />
                            <IconButton color="primary" className={classes.deleteButton}>
                                <AddIcon />
                            </IconButton>
                        </Box>
                        {/* :<Skeleton variant="text" className={fixedInputSkeletonHeight} />} */}
                    </Paper>
                </Grid>
                <Grid item md={12}>
                    <Paper className={fixedChartHeightPaper}>
                        <Box display="flex" justifyContent="center">
                            <Table>

                            </Table>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </React.Fragment>);
}

export default Portfolio;