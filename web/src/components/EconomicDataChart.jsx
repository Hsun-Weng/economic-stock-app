import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Grid, Box, Button, ButtonGroup, Typography } from '@material-ui/core'
import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Line, Brush } from 'recharts';
import ReactEcharts from 'echarts-for-react';

import { economicAction } from '../actions';

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

const EconomicDataChart = ({ countryCode, dataCode }) => {
    const dispatch = useDispatch();
    const chartData = useSelector(state=>state.economicValue.chartData);
    
    const [ unitCode, setUnitCode ] = useState("TOTAL");
    const [ values, setValues ] = useState([]);

    useEffect(()=>{
        const fetchValues = async() => {
            fetch(`/data/economic/${countryCode}/${dataCode}`)
              .then((res)=>res.json())
              .then((res)=>res.data)
              .then((data)=>setValues(data))
        }
        fetchValues();
    }, [ countryCode, dataCode ]);

    const ChartTooltip = ({ active, payload}) => {
        if(active){
            let data = payload[0].payload;
            return (<Box  border={1} borderColor="grey.500" p={1}>
                <Box>{`Date: ${data.date}`}</Box>
                <Box>{`Value: ${data.value}`}</Box>
            </Box>);
        }
        return null;
    }

    const Chart = () => (
        <LineChart
            height={400}
            width={950}
            data={chartData}
            margin={{ top: 50, right: 50, bottom: 50, left: 60 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip content={<ChartTooltip />}/>
            <Line dataKey={`value`} stroke="red" dot={false} />
            <Brush dataKey="date" height={30} stroke="red" />
        </LineChart>
    )
    
    if(values.length>0){
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
                        <Echart values={values}/>
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