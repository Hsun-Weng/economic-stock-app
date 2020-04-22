import React, { useState } from 'react';

import { Grid, FormControl, Select, InputLabel, MenuItem, Box} from '@material-ui/core'
import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Line, Brush } from 'recharts';

const EconomicDataChart = ({ units, data }) => {
    const [ unitCode, setUnitCode ] = useState(units[0].unit_code);

    const handleChangeUnitCode = event => {
        setUnitCode(event.target.value);
    }

    const UnitSelect = () => (
        <FormControl >
            <InputLabel>Unit</InputLabel>
            <Select
                value={unitCode}
                onChange={handleChangeUnitCode}>
                {units.map((prop, key)=><MenuItem key={key} value={prop.unit_code}>{prop.label}</MenuItem>)}
            </Select>
        </FormControl>
    )

    const ChartTooltip = ({ active, payload}) => {
        if(active){
            let data = payload[0].payload;
            return (<Box  border={1} borderColor="grey.500" p={1}>
                <Box>{`Date: ${data.date}`}</Box>
                <Box>{`Value: ${data.value[unitCode]}`}</Box>
            </Box>);
        }
        return null;
    }

    const Chart = () => (
        <LineChart
            height={400}
            width={950}
            data={data}
            margin={{ top: 50, right: 50, bottom: 50, left: 60 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip content={<ChartTooltip />}/>
            <Line dataKey={`value.${unitCode}`} stroke="red" dot={false} />
            <Brush dataKey="date" height={30} stroke="red" />
        </LineChart>
    )

    return (
        <Box>
            <Grid container spacing={3}>
                <Grid item md={12}>
                    <Box display="flex" justifyContent="center">
                        <UnitSelect />
                    </Box>
                </Grid>
            </Grid>
            <Box display="flex" justifyContent="center">
                <Box width={950} height={400}>
                    <Chart />
                </Box>
            </Box>
        </Box>
    );
}

export default EconomicDataChart;