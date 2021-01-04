import { LinearProgress } from '@material-ui/core';
import Echart from '../../components/Echart';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { notificationAction } from '../../actions';

const upColor = '#00da3c';
const downColor = '#ec0000';

const calculateMA = (dayCount, data) => {
    let result = [];
    for (let i = 0, len = data.length; i < len; i++) {
        if (i < dayCount) {
            result.push('-');
            continue;
        }
        let sum = 0;
        for (let j = 0; j < dayCount; j++) {
            sum += data[i - j][1];
        }
        result.push(sum / dayCount);
    }
    return result;
}

const splitData = (rawData) => {
    let categoryData = [];
    let values = [];
    let volumes = [];
    let sortData = rawData.sort((p1, p2)=>{
        let date1 = new Date(p1.date);
        let date2 = new Date(p2.date);
        if(date1<date2) return -1;
        if(date1>date2) return 1;
        return 0;
    });
    let sortId = 0;
    sortData.forEach((data)=>{
        categoryData.push(data.date);
        values.push([ data.open, data.close, data.low, data.high ]);
        volumes.push([ sortId++, data.volume, data.open > data.close ? -1 : 1])
    });
    return {
        categoryData: categoryData,
        values: values,
        volumes: volumes
    };
}

const formatPrices = (prices) => {
    return prices.sort((p1, p2)=>{
        let date1 = new Date(p1.date);
        let date2 = new Date(p2.date);
        if(date1<date2) return -1;
        if(date1>date2) return 1;
        return 0;
    }).map((price)=>{
        return [ price.open, price.close, price.low, price.high ]
    });
}

const formatDates = (prices) => {
    return prices.sort((p1, p2)=>{
        let date1 = new Date(p1.date);
        let date2 = new Date(p2.date);
        if(date1<date2) return -1;
        if(date1>date2) return 1;
        return 0;
    }).map((price)=>price.date);
}

const getOption = (prices) => {
    const data = splitData(prices);
    console.log(data);
    const priceData = formatPrices(prices);
    return {
        backgroundColor: '#21202D',
        legend: {
            data: ['日K', 'MA5', 'MA10', 'MA20', 'MA30'],
            inactiveColor: '#777',
            textStyle: {
                color: '#fff'
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                animation: false,
                type: 'cross',
                lineStyle: {
                    color: '#376df4',
                    width: 2,
                    opacity: 1
                }
            }
        },
        xAxis: [
            {
                type: 'category',
                data: data.categoryData,
                boundaryGap: false,
                axisLine: { lineStyle: { color: '#8392A5' } },
            },
            {
                type: 'category',
                gridIndex: 1,
                data: data.categoryData,
                boundaryGap: false,
                axisLine: { lineStyle: { color: '#8392A5' } },
                splitNumber: 20,
                min: 'dataMin',
                max: 'dataMax'
            }
        ],
        dataZoom: [{
            type: 'slider',
            xAxisIndex: [0, 1],
            start: 40,
            end: 70,
            top: 30,
            height: 20
        }, {
            type: 'inside',
            xAxisIndex: [0, 1],
            realtime: false,
            start: 20,
            end: 70,
            top: 65,
            height: 20,
            handleIcon: 'M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
            handleSize: '80%'
        }],
        yAxis: [
            {
                scale: true,
                splitArea: {
                    show: true
                }
            },
            {
                scale: true,
                gridIndex: 1,
                splitNumber: 2,
                axisLabel: {show: false},
                axisLine: {show: false},
                axisTick: {show: false},
                splitLine: {show: false}
            }
        ],
        brush: {
            xAxisIndex: 'all',
            brushLink: 'all',
            outOfBrush: {
                colorAlpha: 0.1
            }
        },
        grid:  [{
            left: 20,
            right: 20,
            top: 110,
            height: 120
        }, {
            left: 20,
            right: 20,
            height: 40,
            top: 260
        }],
        animation: false,
        series: [
            {
                type: 'candlestick',
                name: '日K',
                data: data.values,
                itemStyle: {
                    color: '#FD1050',
                    color0: '#0CF49B',
                    borderColor: '#FD1050',
                    borderColor0: '#0CF49B'
                }
            },
            {
                name: 'MA5',
                type: 'line',
                data: calculateMA(5, data.values),
                smooth: true,
                showSymbol: false,
                lineStyle: {
                    width: 1
                }
            },
            {
                name: 'MA10',
                type: 'line',
                data: calculateMA(10, data.values),
                smooth: true,
                showSymbol: false,
                lineStyle: {
                    width: 1
                }
            },
            {
                name: 'MA20',
                type: 'line',
                data: calculateMA(20, data.values),
                smooth: true,
                showSymbol: false,
                lineStyle: {
                    width: 1
                }
            },
            {
                name: 'MA30',
                type: 'line',
                data: calculateMA(30, data),
                smooth: true,
                showSymbol: false,
                lineStyle: {
                    width: 1
                }
            },
            {
                name: 'Volume',
                type: 'bar',
                xAxisIndex: 1,
                yAxisIndex: 1,
                data: data.volumes
            }
        ]
    }
};

const CandleStickChart = ({ stockCode }) => {
    const dispatch = useDispatch();
    const [ stockPrices, setStockPrices ] = useState([]);
    const [ loading, setLoading ] = useState(false);

    const formatDate = date => date.toISOString().slice(0,10);

    useEffect(() => {
        const fetchData = () => {
            let startDate = new Date(Date.now() - 120 * 24 * 60 * 60 * 1000);
            let endDate = new Date();
            setLoading(true);
            fetch(`/api/stock/${stockCode}/prices?startDate=${formatDate(startDate)}&endDate=${formatDate(endDate)}`)
                .then(res=>{
                    if(!res.ok){
                        throw res;
                    }
                    return res.json();
                })
                .then((data)=> {
                    setStockPrices(data)
                })
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
    }, [ stockCode, dispatch ]);

    return (
        loading?<LinearProgress/>:
        <Echart option={getOption(stockPrices)} />
    )
}

export default CandleStickChart;