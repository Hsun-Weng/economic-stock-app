import { AppBar, Box, Card, CardContent, Tab, Tabs } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import React, { useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import CandleStickChart from './CandleStickChart';
import ChipTable from './ChipTable';
import MarginTable from './MarginTable';
import TabPanel from './TabPanel';

const useStyles = makeStyles(() => ({
    root: {},
}));

const StockTabs = ({className, stockCode, ...rest }) => {
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
                            <ChipTable stockCode={stockCode} />
                        </TabPanel>
                        <TabPanel value={tabValue} index={2}>
                            <MarginTable stockCode={stockCode} />
                        </TabPanel>
                    </Box>
                </PerfectScrollbar>
            </CardContent>
        </Card>
    );
}

export default StockTabs;