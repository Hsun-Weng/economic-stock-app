import React from 'react';

import { Box } from '@material-ui/core';
import { ComposedChart, Line, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine } from 'recharts';

const FuturesChipChart = ({ data }) =>{

    const ChartTooltip = ({active, payload }) => {
        if(active){
            let d = payload[0].payload;
            return (
                <Box border={1} borderColor="grey.500">
                    <Box>{`Date: ${d.date}`}</Box>
                    {d.close?<Box>{`Index Close: ${d.close}`}</Box>:null}
                    {d.openInterestNetLot?<Box>{`Open Interest Net Lot: ${d.openInterestNetLot}`}</Box>:null}
                    {d.percent?<Box>{`Percent : ${d.percent}％`}</Box>:null}
                </Box>
            )
        }
        return null;
    };

    return (
        <Box display="flex" justifyContent="center" >
            <ComposedChart
                height={450}
                width={950}
                data={data}
                margin={{ top: 50, right: 50, bottom: 50, left: 60 }}>
                <CartesianGrid stroke="#f5f5f5" />
                <XAxis dataKey="date" padding={{ left: 30, right: 30}} />
                <Line yAxisId="left" dataKey="close" stroke="#ff7300" />
                <YAxis yAxisId="left" domain={['auto', 'auto']} />
                <YAxis yAxisId="right" orientation="right" domain={[-30, 30]}
                        tickFormatter={(tickValue)=>tickValue+"%"}/>
                <Tooltip content={<ChartTooltip />} />
                {/* <Legend /> */}
                <ReferenceLine yAxisId="right" y={0} stroke="black" />
                <Bar yAxisId="right" dataKey="percent" barSize={10} fill="#413ea0" >
                    {data.map((entry, key) => {
                        const color = entry.percent > 0 ? "green" : "red";
                        return <Cell key={key} fill={color} />;
                    })}
                </Bar>
            </ComposedChart>
        </Box>
    );
}


export default FuturesChipChart;