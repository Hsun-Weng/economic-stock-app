import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

import { Paper, Box, Grid, IconButton, AppBar, Tabs, Tab, Card,
    CardHeader, Divider, } from '@material-ui/core';

import TabPanel from './TabPanel';
import CandleStickChart from './CandleStickChart';


const useStyles = makeStyles(() => ({
    root: {},
}));

const StockTabs = ({ stockCode }) => {
    const classes = useStyles();
    const [ tabValue, setTabValue ] = useState(0);

    return(
        <Card className={clsx(classes.root, className)} {...rest}>
            <CardContent>
                <AppBar position="static" color='default'>
                    <Tabs value={tabValue} onChange={(event, newValue)=> setTabValue(newValue)}>
                        <Tab label="技術線圖" />
                        <Tab label="法人進出" />
                        <Tab label="資券變化" />
                    </Tabs>
                </AppBar>
                <PerfectScrollbar>
                    <Box minWidth={1050}>
                        <TabPanel value={tabValue} index={0}>
                            <CandleStickChart stockCode={stockCode} />
                        </TabPanel>
                        <TabPanel value={tabValue} index={1}>
                            <StockChipChart stockCode={stockCode} />
                        </TabPanel>
                        <TabPanel value={tabValue} index={2}>
                            <StockMarginChart stockCode={stockCode} />
                        </TabPanel>
                    </Box>
                </PerfectScrollbar>
            </CardContent>
        </Card>
    );
}

export default StockTabs;