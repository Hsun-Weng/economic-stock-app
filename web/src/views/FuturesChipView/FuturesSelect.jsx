import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { notificationAction } from '../../actions';

const FuturesSelect = ({ futuresCode, onFuturesChange }) => {
    const dispatch = useDispatch();
    const [ futures, setFutures ] = useState([]);

    useEffect(()=>{
        const fetchData = () => {
            fetch(`/api/futures`)
                .then(res=>{
                    if(!res.ok){
                        throw res;
                    }
                    return res.json();
                })
                .then((data)=>setFutures(data))
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
        };
        fetchData();
    }, [ dispatch ])

    return (
        <FormControl fullWidth margin="normal">
            <InputLabel>期貨</InputLabel>
            <Select
                value={futuresCode}
                onChange={onFuturesChange}>
                {futures.map((prop, key) => <MenuItem key={key} value={prop.futuresCode}>{prop.futuresName}</MenuItem>)}
            </Select>
        </FormControl>
    )
}

export default FuturesSelect;