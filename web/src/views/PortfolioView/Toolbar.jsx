import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

import { Box, Card, CardContent } from '@material-ui/core';
import PortfolioAddDialog from './PortfolioAddDialog';
import PortfolioEditDialog from  './PortfolioEditDialog';
import PortfolioDeleteDialog from './PortfolioDeleteDialog';
import PortfolioSelect from './PortfolioSelect';

const useStyles = makeStyles((theme) => ({
    root: {},
    editButton: {
      marginRight: theme.spacing(1)
    },
    deleteButton: {
      marginRight: theme.spacing(1)
    }
}));

const Toolbar = ({ className, portfolioId, onPortfolioChange, ...rest }) => {
    const classes = useStyles();

    const [ openAddPortfolio, setOpenAddPortfolio ] = useState(false);
    const [ openEditPortfolio, setOpenEditPortfolio ] = useState(false);
    const [ openDeletePortfolio, setOpenDeletePortfolio ] = useState(false);

    return (
        <div className={clsx(classes.root, className)} {...rest}>
            <Box display="flex"
                justifyContent="flex-end">
                <Button className={classes.editButton} onClick={()=>setOpenEditPortfolio(true)}>
                    編輯
                </Button>
                <Button className={classes.deleteButton} onClick={()=>setOpenDeletePortfolio(true)}>
                    刪除
                </Button>
                <Button color="primary" onClick={()=>setOpenAddPortfolio(true)} variant="contained">
                    新增
                </Button>
            </Box>
            <Box mt={3}>
                <Card>
                    <CardContent>
                        <PortfolioSelect portfolioId={portfolioId} onPortfolioChange={onPortfolioChange} />
                    </CardContent>
                </Card>
            </Box>
            <PortfolioAddDialog open={openAddPortfolio} handleClose={()=>setOpenAddPortfolio(false)}/>
            <PortfolioEditDialog open={openEditPortfolio} handleClose={()=>setOpenEditPortfolio(false)} portfolioId={portfolioId} />
            <PortfolioDeleteDialog open={openDeletePortfolio} handleClose={()=>setOpenDeletePortfolio(false)} portfolioId={portfolioId} />
        </div>
    )
}

export default Toolbar;