import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import ReactEcharts from 'echarts-for-react';

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

const StockTreeMap = () => {
    const [ categoryProportions, setCategoryProportions ] = useState([]);

    useEffect(()=>{
        const fetchData = () => {
            fetch(`/api/categories/proportion`)
            .then((res)=>res.json())
            .then((res)=>res.data)
            .then((data)=>setCategoryProportions(data));
        }
        fetchData();
    }, [])

    return (
        <React.Fragment>
            <Chart categoryProportions={formatTreeMapData(categoryProportions)} />
        </React.Fragment>
    )
};

export default StockTreeMap;