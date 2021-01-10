import React from 'react';
import ReactEcharts from 'echarts-for-react';
import { useSelector } from 'react-redux';

const Chart = ({...prop}) => {
    const darkMode = useSelector(state=>state.theme.darkMode);
    const theme = darkMode?'dark':'';
    return (
        <ReactEcharts {...prop}  theme={theme}/>
    )

}
export default Chart;