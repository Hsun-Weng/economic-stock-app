import React, { useState, useCallback } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper'

import { ResponsiveChoropleth } from '@nivo/geo';

import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid'

import sampleData from '../sample/worldeconomicdata.js';
import countries from '../data/world_countries.json';
import { useEffect } from 'react';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200
  },
  fixedHeight: {
    height: 400
  }
}));


export default function WorldEconomic() {
  const classes = useStyles();

  const [ dataId, setDataId ] = useState("");
  const [ economicData, setEconomicData ] = useState([]);

  const fetchEconomicData = useCallback(()=> {
      const fetchingEconomicData = async () => {
        const res = await fetch("/api/economic/data");
            res.json()
                .then(res=> res.data)
                .then(_data=> setEconomicData(_data))
                .catch(err=>console.log(err));
      }
      fetchingEconomicData();
  }, [])

  const handelChangeDataId = event =>{
    setDataId(event.target.value);
  }

  const economicDataSelect = () => {
    if(economicData.length > 0){
      return (
        <FormControl className={classes.formControl}>
          <InputLabel>Economic Data</InputLabel>
          <Select
            value={dataId}
            onChange={handelChangeDataId}>
              {economicData.map((prop, key)=><MenuItem key={key} value={prop.dataId}>{prop.dataName}</MenuItem>)}
          </Select>
        </FormControl>)
      }
  }

  useEffect(() =>{
      fetchEconomicData();
  }, [fetchEconomicData])

  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item md={12}>
          <Paper>
            {economicDataSelect()}
          </Paper>
        </Grid>
        <Grid item md={12}>
          <Paper className={classes.fixedHeight}>
            <ResponsiveChoropleth
                data={sampleData}
                colors="nivo"
                features={countries.features}
                unknownColor="#666666"
                label="properties.name"
                valueFormat=".2s"
                projectionTranslation={[0.5, 0.5]}
                domain={[ 0, 1000000 ]}
                enableGraticule={true}
                graticuleLineColor="#dddddd"
                borderWidth={0.5}
                borderColor="#152538"
                legends={[
                  {
                    anchor: "bottom-left",
                    direction: "column",
                    justify: true,
                    translateX: 20,
                    translateY: -100,
                    itemsSpacing: 0,
                    itemWidth: 94,
                    itemHeight: 18,
                    itemDirection: "left-to-right",
                    itemTextColor: "#444444",
                    itemOpacity: 0.85,
                    symbolSize: 18,
                    effects: [
                      {
                        on: "hover",
                        style: {
                          itemTextColor: "#000000",
                          itemOpacity: 1
                        }
                      }
                    ]
                  }
                ]}
              />
          </Paper>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}