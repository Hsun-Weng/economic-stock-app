import { Box, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import React, { useState } from 'react';
import PortfolioAddDialog from './PortfolioAddDialog';

const useStyles = makeStyles((theme) => ({
    root: {},
}));

const Toolbar = ({ className, ...rest }) => {
    const classes = useStyles();

    const [ openAddPortfolio, setOpenAddPortfolio ] = useState(false);

    return (
        <div className={clsx(classes.root, className)} {...rest}>
            <Box display="flex"
                justifyContent="flex-end">
                <Button color="primary" onClick={()=>setOpenAddPortfolio(true)} variant="contained">
                    新增
                </Button>
            </Box>
            <PortfolioAddDialog open={openAddPortfolio} handleClose={()=>setOpenAddPortfolio(false)}/>
        </div>
    )
}

export default Toolbar;