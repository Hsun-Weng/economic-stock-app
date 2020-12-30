import { Card, CardContent, CardHeader, Divider, LinearProgress, Box } from '@material-ui/core';
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
                        }
                    })
            }
        })

}

const Chart = ({ categoryProportions }) => {
    const levelOption = [
        {
            itemStyle: {
                borderWidth: 1,
                borderColor: '#333',
                gapWidth: 1
            }
        },
        {
            color: ['#942e38', '#aaa', '#269f3c'],
            colorMappingBy: 'changePercent',
            itemStyle: {
                gapWidth: 1
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
                visibleMin: -10,
                visibleMax: 10,
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
                itemStyle: {
                    borderColor: 'black'
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
    const [ loading, setLoading ] = useState(false);

    useEffect(()=>{
        const fetchData = () => {
            setLoading(true);
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
            }).finally(()=>setLoading(false));
        }
        fetchData();
    }, [ dispatch ])

    
    return (
        <Card
            className={clsx(classes.root, className)}
            {...rest}>
            {loading?(<LinearProgress />):
            <>
                <CardHeader
                    title={`上市公司`}>
                </CardHeader>
                <Divider />
                <CardContent>
                    <Box position="relative">
                        <Chart categoryProportions={formatTreeMapData(categoryProportions)} />
                    </Box>
                </CardContent>
            </>
            }
        </Card>
    );
}

export default TreeMap;