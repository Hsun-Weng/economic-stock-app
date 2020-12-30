import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { notificationAction } from '../../actions';

const DataSelect = ({ countryCode, dataCode, onDataChange }) => {
    const dispatch = useDispatch();
    const [ datas, setDatas ] = useState([]);

    useEffect(()=>{
        const fetchData = async() => {
        fetch(`/api/economic/${countryCode}/data`)
            .then(res=>{
                if(!res.ok){
                    throw res;
                }
                return res.json();
            })
            .then((data)=>setDatas(data))
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
    }, [ countryCode, dispatch ])
  
    return (
        <FormControl fullWidth margin="normal">
            <InputLabel>經濟數據</InputLabel>
            <Select
                value={dataCode}
                onChange={onDataChange}>
                {datas.map((prop, key)=><MenuItem key={key} value={prop.dataCode}>{prop.dataName}</MenuItem>)}
            </Select>
        </FormControl>
    );
}
  
export default DataSelect;