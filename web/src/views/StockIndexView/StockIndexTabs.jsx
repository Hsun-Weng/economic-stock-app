import { AppBar, Box, Card, CardContent, Tab, Tabs } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import React, { useState } from 'react';
import CandleStickChart from './CandleStickChart';
import TabPanel from './TabPanel';

const useStyles = makeStyles(() => ({
    root: {},
}));

const StockIndexTabs = ({className, indexCode, ...rest }) => {
    const classes = useStyles();
    const [ tabValue, setTabValue ] = useState(0);

    return(
        <Card className={clsx(classes.root, className)} {...rest}>
            <CardContent>
                <AppBar position="static" color='default'>
                    <Tabs value={tabValue} onChange={(event, newValue)=> setTabValue(newValue)}>
                        <Tab label="技術線圖" />
                        {/* <Tab label="法人進出" />
                        <Tab label="資券變化" /> */}
                    </Tabs>
                </AppBar>
                <Box minWidth={1050}>
                    <TabPanel value={tabValue} index={0}>
                        <CandleStickChart indexCode={indexCode} />
                    </TabPanel>
                    {/* <TabPanel value={tabValue} index={1}>
                        <StockChipChart stockCode={stockCode} />
                    </TabPanel>
                    <TabPanel value={tabValue} index={2}>
                        <StockMarginChart stockCode={stockCode} />
                    </TabPanel> */}
                </Box>
            </CardContent>
        </Card>
    );
}

export default StockIndexTabs;