import { Box, Card, CardContent, CardHeader, Divider, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import ReactEcharts from 'echarts-for-react';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { notificationAction } from '../../actions';

const useStyles = makeStyles(() => ({
    root: {}
}));

const formatTreeMapData = ( categoryProportions ) => {
    return categoryProportions
        .map((categoryProportion)=>{
            return {
                name: categoryProportion.categoryName,
                value: categoryProportion.proportion,
                children: categoryProportion
                    .children
                    .map((stockProportion)=>{
                        return {
                            code: stockProportion.stockCode,
                            name: stockProportion.stockName,
                            value: stockProportion.proportion,
                            changePercent: stockProportion.changePercent
                            ,itemStyle: {
                                color: 'blue'
                              }
                        }
                    })
            }
        })

}

const Chart = ({ categoryProportions }) => {
    const levelOption = [
        {
            itemStyle: {
                borderColor: '#777',
                borderWidth: 0,
                gapWidth: 1
            },
            upperLabel: {
                show: false
            }
        },
        {
            itemStyle: {
                borderColor: '#555',
                borderWidth: 5,
                gapWidth: 1
            },
            emphasis: {
                itemStyle: {
                    borderColor: '#ddd'
                }
            }
        },
        {
            colorSaturation: [0.35, 0.5],
            itemStyle: {
                borderWidth: 5,
                gapWidth: 1,
                borderColorSaturation: 0.6
            }
        }
    ];
    
    const option = {
        title: {
            text: '上市公司股價指數',
            left: 'center'
        },
        tooltip: {
            formatter: function (params) {
                let data = params.data;
                if(data.changePercent){
                    return `${data.name}: ${data.changePercent}%`;
                }else{
                    return `${data.name}`;
                }
            }
        },

        series: [
            {
                name: '上市公司股價指數',
                type: 'treemap',
                visibleMin: 300,
                label: {
                    show: true,
                    formatter: function(params) {
                        let data = params.data;
                        if(data.code){
                            return `${data.code} ${data.name}: ${data.changePercent}%`;
                        }else{
                            return `${data.name}`;
                        }       
                    }
                },
                upperLabel: {
                    show: true,
                    height: 30
                },
                itemStyle: {
                    borderColor: '#fff'
                },
                levels: levelOption,
                data: categoryProportions
            }
        ]
    };

    return (<ReactEcharts option={option} />);
} 

const TreeMap = ({ className, countryCode, dataCode , ...rest}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [ categoryProportions, setCategoryProportions ] = useState([]);

    useEffect(()=>{
        const fetchData = () => {
            fetch(`/api/categories/proportion`)
            .then(res=>{
                if(!res.ok){
                    throw res;
                }
                return res.json();
            })
            .then((data)=> {
                setCategoryProportions(data)
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
            })
        }
        fetchData();
    }, [ dispatch ])

    if(categoryProportions.length>0){
        return (
            <Card
                className={clsx(classes.root, className)}
                {...rest}>
                <CardHeader
                    title={`上市公司`}>
                </CardHeader>
                <Divider />
                <CardContent>
                    <Chart categoryProportions={formatTreeMapData(categoryProportions)} />
                </CardContent>
            </Card>
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

export default TreeMap;