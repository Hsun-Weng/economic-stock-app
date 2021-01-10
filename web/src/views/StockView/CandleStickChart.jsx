import { LinearProgress } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { notificationAction } from '../../actions';
import Echart from '../../components/Echart';

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

const getOption = (prices) => {
    const data = splitData(prices);
    const dataMA5 = calculateMA(5, data.values);
    const dataMA10 = calculateMA(10, data.values);
    const dataMA20 = calculateMA(20, data.values);
    const labelFont = 'bold 12px Sans-serif';
    const upColor = '#00da3c';
    const downColor = '#ec0000';
    const upBorderColor = '#008F28';
    const downBorderColor = '#8A0000';

    return {
        animation: false,
        legend: {
            top: 30,
            data: ['日K', 'MA5', 'MA10', 'MA20', 'MA30']
        },
        tooltip: {
            triggerOn: 'none',
            transitionDuration: 0,
            confine: true,
            bordeRadius: 4,
            borderWidth: 1,
            borderColor: '#333',
            backgroundColor: 'rgba(255,255,255,0.9)',
            textStyle: {
                fontSize: 12,
                color: '#333'
            },
            position: function (pos, params, el, elRect, size) {
                let obj = {
                    top: 60
                };
                obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
                return obj;
            }
        },
        axisPointer: {
            link: [{
                xAxisIndex: [0, 1]
            }]
        },
        dataZoom: [{
            type: 'slider',
            xAxisIndex: [0, 1],
            realtime: false,
            start: 50,
            end: 100,
            top: 65,
            height: 20,
            handleIcon: 'M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
            handleSize: '120%'
        }, {
            type: 'inside',
            xAxisIndex: [0, 1],
            start: 40,
            end: 70,
            top: 30,
            height: 20
        }],
        xAxis: [{
            type: 'category',
            data: data.categoryData,
            boundaryGap : false,
            axisLine: { lineStyle: { color: '#777' } },
            min: 'dataMin',
            max: 'dataMax',
            axisPointer: {
                show: true
            }
        }, {
            type: 'category',
            gridIndex: 1,
            data: data.categoryData,
            scale: true,
            boundaryGap : false,
            splitLine: {show: false},
            axisLabel: {show: false},
            axisTick: {show: false},
            axisLine: { lineStyle: { color: '#777' } },
            splitNumber: 20,
            min: 'dataMin',
            max: 'dataMax',
            axisPointer: {
                type: 'shadow',
                label: {show: false},
                triggerTooltip: true,
                handle: {
                    show: true,
                    margin: 30,
                    color: '#B80C00'
                }
            }
        }],
        yAxis: [{
            scale: true,
            splitNumber: 2,
            axisLine: { lineStyle: { color: '#777' } },
            splitLine: { show: true },
            axisTick: { show: false },
            axisLabel: {
                inside: true,
                formatter: '{value}\n'
            }
        }, {
            scale: true,
            gridIndex: 1,
            splitNumber: 2,
            axisLabel: {show: false},
            axisLine: {show: false},
            axisTick: {show: false},
            splitLine: {show: false}
        }],
        visualMap: {
            show: false,
            seriesIndex: 0,
            dimension: 2,
            pieces: [{
                value: 1,
                color: upColor
            }, {
                value: -1,
                color: downColor
            }]
        },
        grid: [{
            left: 20,
            right: 20,
            top: 110,
            height: 150
        }, {
            left: 20,
            right: 20,
            height: 70,
            top: 270
        }],
        graphic: [{
            type: 'group',
            left: 'center',
            top: 70,
            width: 300,
            bounding: 'raw',
            children: [{
                id: 'MA5',
                type: 'text',
                style: {font: labelFont},
                left: 0
            }, {
                id: 'MA10',
                type: 'text',
                style: {font: labelFont},
                left: 'center'
            }, {
                id: 'MA20',
                type: 'text',
                style: {font: labelFont},
                right: 0
            }]
        }],
        series: [{
            name: 'Volume',
            type: 'bar',
            xAxisIndex: 1,
            yAxisIndex: 1,
            data: data.volumes
        }, {
            type: 'candlestick',
            name: '日K',
            data: data.values,
            itemStyle: {
                color: upColor,
                color0: downColor,
                borderColor: upBorderColor,
                borderColor0: downBorderColor
            },
            emphasis: {
                itemStyle: {
                    color: 'black',
                    color0: '#444',
                    borderColor: 'black',
                    borderColor0: '#444'
                }
            }
        }, {
            name: 'MA5',
            type: 'line',
            data: dataMA5,
            smooth: true,
            showSymbol: false,
            lineStyle: {
                width: 1
            }
        }, {
            name: 'MA10',
            type: 'line',
            data: dataMA10,
            smooth: true,
            showSymbol: false,
            lineStyle: {
                width: 1
            }
        }, {
            name: 'MA20',
            type: 'line',
            data: dataMA20,
            smooth: true,
            showSymbol: false,
            lineStyle: {
                width: 1
            }
        }]
    };
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
        <Echart style={{height: 400}} option={getOption(stockPrices)} />
    )
}

export default CandleStickChart;