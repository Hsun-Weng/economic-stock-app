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

const getItemColor = (changePercent) => {
    let base = changePercent + 10;
    
    let fadeFraction = (base * 5) / 100;
    let minRgbColor = { red: 200, green: 0, blue: 0};
    let midRgbColor = { red: 200, green: 200, blue: 200};
    let maxRgbColor = { red: 0, green: 200, blue: 0};
    
    return colorGradient(fadeFraction, minRgbColor, midRgbColor, maxRgbColor);
}

const rgbToHex = (r, g, b) => {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

const colorGradient = (fadeFraction, rgbColor1, rgbColor2, rgbColor3) => {
    let color1 = rgbColor1;
    let color2 = rgbColor2;
    let fade = fadeFraction;

    // Do we have 3 colors for the gradient? Need to adjust the params.
    if (rgbColor3) {
      fade = fade * 2;

      // Find which interval to use and adjust the fade percentage
      if (fade >= 1) {
        fade -= 1;
        color1 = rgbColor2;
        color2 = rgbColor3;
      }
    }

    let diffRed = color2.red - color1.red;
    let diffGreen = color2.green - color1.green;
    let diffBlue = color2.blue - color1.blue;

    let gradient = {
      red: parseInt(Math.floor(color1.red + (diffRed * fade)), 10),
      green: parseInt(Math.floor(color1.green + (diffGreen * fade)), 10),
      blue: parseInt(Math.floor(color1.blue + (diffBlue * fade)), 10),
    };

    return rgbToHex(gradient.red, gradient.green, gradient.blue);
}

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
                            changePercent: stockProportion.changePercent,
                            itemStyle: {
                                color: getItemColor(stockProportion.changePercent)
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
                borderWidth: 0,
                borderColor: '#777',
                gapWidth: 1
            },
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
                name: '上市公司',
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
                upperLabel: {
                    show: true,
                    height: 20
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