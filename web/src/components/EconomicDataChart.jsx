import React, { useState, useEffect } from 'react';

import { Grid, Box, Button, ButtonGroup, Typography } from '@material-ui/core'
import ReactEcharts from 'echarts-for-react';

const UnitButtonGroup = ({ setUnitCode }) => (
    <ButtonGroup variant="text" color="inherit" >
        <Button onClick={event=>setUnitCode('TOTAL')}>TOTAL</Button>
        <Button onClick={event=>setUnitCode('CHANGE')}>CHANGE</Button>
    </ButtonGroup>
)

const Echart = ({ values }) => {
    const option = {
        xAxis: {
            type: 'category',
            data: values.map((value)=>value.date)
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            data: values.map((value)=>value.value),
            type: 'line',
            smooth: true
        }],
        tooltip: {
            trigger: 'axis',
            formatter: (params) => {
                params = params[0];
                return params.name + ' : ' + params.value;
            }
        }
    };
    return (<ReactEcharts
        option={option} />);
}

const convertChangeData = (values) => {
    let cloneData = Object.assign([], values); // copy data array
    return cloneData.sort(function(a, b){
        return a.date > b.date ? 1 : -1;
    }).map((detail, index)=>{
        if(index === 0){
            return null;
        }
        return {date: detail.date,
            value: (detail.value - cloneData[index-1].value)};
    }).filter(value=>value);
}

const getDisplayValues = ( unitCode, values ) => {
    switch(unitCode){
        case "TOTAL":
            return values;
        case "CHANGE":
            return convertChangeData(values);
        default:
            return [];
    }
}

const EconomicDataChart = ({ countryCode, dataCode }) => {
    const [ unitCode, setUnitCode ] = useState("TOTAL");
    const [ values, setValues ] = useState([]);
    const [ chartValues, setChartValues ] = useState([]);
    
    useEffect(()=>{
        const fetchValues = async() => {
            fetch(`/data/economic/${countryCode}/${dataCode}`)
              .then((res)=>res.json())
              .then((res)=>res.data)
              .then((data)=>setValues(data))
        }
        fetchValues();
    }, [ countryCode, dataCode ]);

    useEffect(()=>{
        setChartValues(getDisplayValues(unitCode, values));
    }, [ unitCode, values ])

    if(chartValues.length>0){
        return (
            <Box>
                <Grid container spacing={3}>
                    <Grid item md={12}>
                        <Box display="flex" justifyContent="left">
                            <UnitButtonGroup unitCode={unitCode} setUnitCode={setUnitCode} />
                        </Box>
                    </Grid>
                </Grid>
                <Box display="flex" justifyContent="center">
                    <Box width={950} height={400}>
                        <Echart values={chartValues}/>
                    </Box>
                </Box>
            </Box>
        );
    }else{
        return(
            <Box align="center">
                <Typography variant="h4" color="error">
                    查無資料
                </Typography>
            </Box>
        )
    }
}

export default EconomicDataChart;