import { Box, Button, ButtonGroup, Card, CardContent, CardHeader, Divider, LinearProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Echart from '../../components/Echart';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { notificationAction } from '../../actions';

const useStyles = makeStyles(() => ({
    root: {}
}));

const UnitButtonGroup = ({ setUnitCode }) => (
    <ButtonGroup variant="text" color="inherit" >
        <Button onClick={event=>setUnitCode('TOTAL')}>TOTAL</Button>
        <Button onClick={event=>setUnitCode('CHANGE')}>CHANGE</Button>
    </ButtonGroup>
)

const LineChart = ({ values }) => {
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
                let param = params[0];
                return param.name + ' : ' + param.value;
            }
        }
    };
    return (<Echart
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

const EconomicDataChart = ({ className, countryCode, dataCode , ...rest}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [ unitCode, setUnitCode ] = useState("TOTAL");
    const [ values, setValues ] = useState([]);
    const [ chartValues, setChartValues ] = useState([]);
    const [ loading, setLoading ] = useState(false);
    
    useEffect(()=>{
        const fetchValues = async() => {
            setLoading(true);
            fetch(`/api/economic/${countryCode}/${dataCode}/values`)
                .then(res=>{
                    if(!res.ok){
                        throw res;
                    }
                    return res.json();
                })
                .then((data)=>setValues(data))
                .catch((err)=>{
                    if (err.json) {
                      err.json()
                      .then(data=> {
                        dispatch(notificationAction.enqueueError(data.message))
                      })
                    } else {
                      dispatch(notificationAction.enqueueError("伺服器錯誤，請稍後再試。"))
                    }
                }).finally(()=>setLoading(false));
        }
        fetchValues();
    }, [ countryCode, dataCode, dispatch ]);

    useEffect(()=>{
        setChartValues(getDisplayValues(unitCode, values));
    }, [ unitCode, values ])

    return (
        <Card
            className={clsx(classes.root, className)}
            {...rest}>
            {loading?<LinearProgress/>:
            <>
            <CardHeader
                action={(<UnitButtonGroup setUnitCode={setUnitCode} />)}
                title={`${countryCode}: ${dataCode}`}>
            </CardHeader>
            <Divider />
            <CardContent>
                <Box position="relative" height={400}>
                    <LineChart values={chartValues}/>
                </Box>
            </CardContent>
            </>}
        </Card>
    );
}

export default EconomicDataChart;