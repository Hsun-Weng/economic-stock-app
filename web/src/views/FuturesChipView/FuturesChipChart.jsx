import { Box, Card, CardContent, CardHeader, Divider, LinearProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import ReactEcharts from 'echarts-for-react';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { notificationAction } from '../../actions';

const useStyles = makeStyles(() => ({
    root: {}
}));

const MixedLineBarChart = ({ investorCode, chips }) => {
    const option = {
        xAxis: [
            {
                type: 'category',
                data: chips.map((chip)=>chip.date),
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: '佔全市場未平倉 %',
                min: -40,
                max: 40,
                interval: 10,
                axisLabel: {
                    formatter: '{value} ％'
                }
            },
            {
                type: 'value',
                name: '現貨指數',
                interval: 300,
            },
            {
                type: 'value',
                name: '未平倉口數',
                interval: 100,
            },
        ],
        legend: {
            data: ['未平倉佔比', '指數', '未平倉口數']
        },
        series: [
            {
                name: '未平倉佔比',
                data: chips.flatMap((chip)=>chip.investorChip)
                    .filter((investorChip)=>investorChip.investorCode===investorCode)
                    .map((investorChip)=>investorChip.percent),
                type: 'bar'
            },
            {
                name: '指數',
                data: chips.map((chip)=>chip.close),
                type: 'line',
                yAxisIndex: 1,
                smooth: true
            },
            {
                name: '未平倉口數',
                data: chips.flatMap((chip)=>chip.investorChip)
                    .filter((investorChip)=>investorChip.investorCode===investorCode)
                    .map((investorChip)=>investorChip.openInterestNetLot),
                type: 'line',
                yAxisIndex: 2,
                smooth: true
            },
        ],
        tooltip: {
            trigger: 'axis',
            // formatter: (params) => {
            //     console.log(params);
                // let param = params[0];
                // return param.name + ' : ' + param.value;
            // }
        }
    };
    return (<ReactEcharts option={option} />)
}

const FuturesChipChart = ({ className, investorCode, futuresCode, ...rest }) =>{
    const classes = useStyles();
    const dispatch = useDispatch();
    const [ chips, setChips ] = useState([]);
    const [ loading, setLoading ] = useState(false);

    const formatDate = date => date.toISOString().slice(0,10);

    useEffect(()=>{
        const fetchData = () => {
            setLoading(true);
            let startDate = new Date(Date.now() - 120 * 24 * 60 * 60 * 1000);
            let endDate = new Date();
            fetch(`/api/futures/${futuresCode}/chip?startDate=${formatDate(startDate)}&endDate=${formatDate(endDate)}`)
                .then(res=>{
                    if(!res.ok){
                        throw res;
                    }
                    return res.json();
                })
                .then((data)=>setChips(data))
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
        fetchData();
    }, [ futuresCode, dispatch ])

    return (
        <Card
            className={clsx(classes.root, className)}
            {...rest}>
            {loading?<LinearProgress/>:
            <>
                <CardHeader
                    title={`期貨指數以及籌碼`}>
                </CardHeader>
                <Divider />
                <CardContent>
                    <Box position="relative" height={400}>
                        <MixedLineBarChart investorCode={investorCode} chips={chips} />
                    </Box>
                </CardContent>
            </>}
        </Card>
    )
}


export default FuturesChipChart;