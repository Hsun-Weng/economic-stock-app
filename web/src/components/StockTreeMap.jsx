import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import { Box, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { ResponsiveTreeMap } from '@nivo/treemap';

import { stockAction } from '../actions';

const useStyles = makeStyles(theme => ({
    chart: {
        height: 800
    },
}));

const TreeMapChart = ({ data }) => {
    const history = useHistory();
    const classes = useStyles();

    const redirectStockChart = ( stockCode ) => {
        history.push(`/stock/${stockCode}`);
    }

    const redirectCategoryStockTable = (categoryCode) =>{
        history.push(`/stockCategory/${categoryCode}`);
    };

    return (
        <Box className={classes.chart}>
            <ResponsiveTreeMap
            root={data}
            identity={"name"}
            value="proportion"
            innerPadding={3}
            outerPadding={3}
            margin={{
                top: 10,
                right: 10,
                bottom: 10,
                left: 10
            }}
            label={d=>`${d.name} ${d.changePercent}%`}
            labelSkipSize={26}
            labelTextColor="inherit:darker(1.2)"
            colors={{ scheme: 'pastel2' }}
            colorBy="changePercent"
            borderWidth={2}
            borderColor={{ from: 'color', modifiers: [ [ 'darker', '0.5' ] ] }}
            animate={true}
            motionStiffness={90}
            motionDamping={11} 
            tooltip={(d) => {
                if(d.data.stockCode){
                    return <Typography>{d.data.stockCode} {d.id} {d.data.changePercent}%</Typography>
                }else{
                    return <Typography>{d.id}</Typography>
                }}}
            onClick={(d)=>{
                if(d.data.stockCode){
                    redirectStockChart(d.data.stockCode);
                }
                if(d.data.categoryCode){
                    redirectCategoryStockTable(d.data.categoryCode);
                }
            }}
            />
        </Box>)
}

const StockTreeMap = () => {
    const dispatch = useDispatch();
    const classes = useStyles();

    const loading = useSelector(state=>state.stockCategoryProportion.loading);
    const categoriesProportion = useSelector(state=>state.stockCategoryProportion.data);

    useEffect(()=>{
        dispatch(stockAction.getCategoriesProportion());
    }, [ dispatch ])

    return (
        <React.Fragment>
            {!loading&&Object.keys(categoriesProportion).length>0?
                // <VisTreeMapChart data={categoriesProportion} />
                <TreeMapChart data={categoriesProportion} />
                :<Skeleton variant="text" className={classes.chart} />
            }
        </React.Fragment>
    )
};

export default StockTreeMap;