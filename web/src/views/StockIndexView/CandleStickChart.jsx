import ReactEcharts from 'echarts-for-react';
import React, { useEffect, useState } from 'react';

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
        xAxis: {
            type: 'category',
            data: formatDates(prices),
            axisLine: { lineStyle: { color: '#8392A5' } }
        },
        yAxis: {
            scale: true,
            axisLine: { lineStyle: { color: '#8392A5' } },
            splitLine: { show: false }
        },
        grid: {
            bottom: 80
        },
        dataZoom: [{
            textStyle: {
                color: '#8392A5'
            },
            handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
            handleSize: '80%',
            dataBackground: {
                areaStyle: {
                    color: '#8392A5'
                },
                lineStyle: {
                    opacity: 0.8,
                    color: '#8392A5'
                }
            },
            handleStyle: {
                color: '#fff',
                shadowBlur: 3,
                shadowColor: 'rgba(0, 0, 0, 0.6)',
                shadowOffsetX: 2,
                shadowOffsetY: 2
            }
        }, {
            type: 'inside'
        }],
        animation: false,
        series: [
            {
                type: 'candlestick',
                name: '日K',
                data: priceData,
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
                data: calculateMA(5, priceData),
                smooth: true,
                showSymbol: false,
                lineStyle: {
                    width: 1
                }
            },
            {
                name: 'MA10',
                type: 'line',
                data: calculateMA(10, priceData),
                smooth: true,
                showSymbol: false,
                lineStyle: {
                    width: 1
                }
            },
            {
                name: 'MA20',
                type: 'line',
                data: calculateMA(20, priceData),
                smooth: true,
                showSymbol: false,
                lineStyle: {
                    width: 1
                }
            },
            {
                name: 'MA30',
                type: 'line',
                data: calculateMA(30, priceData),
                smooth: true,
                showSymbol: false,
                lineStyle: {
                    width: 1
                }
            }
        ]
    }
};

const CandleStickChart = ({ indexCode }) => {
    const [ indexPrices, setIndexPrices ] = useState([]);

    const formatDate = date => date.toISOString().slice(0,10);

    useEffect(() => {
        const fetchData = () => {
            let startDate = new Date(Date.now() - 120 * 24 * 60 * 60 * 1000);
            let endDate = new Date();
            fetch(`/api/stock/index/${indexCode}/prices?startDate=${formatDate(startDate)}&endDate=${formatDate(endDate)}`)
                .then((res)=>res.json())
                .then((res)=>res.data)
                .then((data)=>setIndexPrices(data))
        }
        fetchData();
    }, [ indexCode ]);

    return (
        <ReactEcharts option={getOption(indexPrices)} />
    )
}

export default CandleStickChart;