import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { stockAction } from '../actions';
import { stockCategoryProportion } from '../reducers/stock.category.proportion.reducer';
import { Box } from '@material-ui/core';

import { Treemap } from 'react-vis';
import { ResponsiveTreeMap, TreeMap } from '@nivo/treemap';

const VisTreeMapChart = ({ data }) => {
    return (
        <Treemap 
            {...{
            data: data,
            title: "name",
            width: 1200,
            height: 800,
            margin: 10,
            renderMode: "SVG",
            mode: "squarify",
            colorType: 'literal',
            colorRange: ['#88572C'],
            getColor: d=>"#88572C",
            getSize: d=>d.proportion,
            style: {
                stroke: '#ddd',
                strokeWidth: '0.25',
                strokeOpacity: 0.5}
            }
            }
        />)
}

const NivoTreeMapChart = ({ data }) => {
    return (
        <Box widht={1000} height={1000}>
        <ResponsiveTreeMap
          root={data}
          identity="name"
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
        //   labelFormat=".0s"
          labelSkipSize={26}
          labelTextColor="inherit:darker(1.2)"
          colors={{ scheme: 'red_yellow_green' }}
          colorBy="changePercent"
          borderWidth={0}
          borderColor="inherit:darker(0.3)"
          animate={true}
          motionStiffness={90}
          motionDamping={11}
        />
        </Box>)
}

const StockTreeMap = () => {
    const dispatch = useDispatch();

    const loading = useSelector(state=>state.stockCategoryProportion.loading);
    const categoriesProportion = useSelector(state=>state.stockCategoryProportion.data);

    useEffect(()=>{
        dispatch(stockAction.getCategoriesProportion());
    }, [ dispatch ])

    return (
        <React.Fragment>
            {!loading&&Object.keys(categoriesProportion).length>0?
                // <VisTreeMapChart data={categoriesProportion} />
                <NivoTreeMapChart data={categoriesProportion} />:
                <div />
            }
        </React.Fragment>
    )
};

export default StockTreeMap;