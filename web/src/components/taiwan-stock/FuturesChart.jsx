import React, { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Box from '@material-ui/core/Box';

import FuturesCandlesticChart from './FuturesCandlesticChart';

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 200
    },
    fixedHeight: {
        height: 400
    },
    fixedChartHeight: {
        height: 450,
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
}));

const FuturesChart = () => {
    const classes = useStyles();
    const fixedChartHeightPaper = clsx(classes.paper, classes.fixedChartHeight);

    const [futuresCode, setFuturesCode] = useState("TX");
    const [futures, setFutures] = useState([]);

    /**
     * 所有期貨代號
     */
    const fetchFutures = async() => {
        const res = await fetch(`/api/futures/taiwan`);
        res.json()
            .then(res => res.data)
            .then(_data => setFutures(_data))
            .catch(err => console.log(err));
    };

    const FuturesSelect = () => {
        if (futures.length > 0) {
            return (
                <FormControl className={classes.formControl}>
                    <InputLabel>Futures</InputLabel>
                    <Select
                        value={futuresCode}
                        onChange={handleChangeFutures}>
                        {futures.map((prop, key) => <MenuItem key={key} value={prop.futuresCode}>{prop.futuresName}</MenuItem>)}
                    </Select>
                </FormControl>
            )
        } else{
            return null;
        }
    }

    const handleChangeFutures = event => {
        setFuturesCode(event.target.value);
    }

    useEffect(() => {
        fetchFutures();
    }, [])

    return (<React.Fragment>
                <Grid container spacing={3}>
                    <Grid item md={12}>
                        <Paper>
                            <FuturesSelect />
                        </Paper>
                    </Grid>
                    <Grid item md={12}>
                        <Box>
                            <Paper className={fixedChartHeightPaper}>
                                <FuturesCandlesticChart />
                            </Paper>
                        </Box>
                    </Grid>
                </Grid>
            </React.Fragment>);
}

export default FuturesChart;