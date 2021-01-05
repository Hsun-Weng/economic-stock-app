import { Box, Button, Card, CardContent, CardHeader, Divider, makeStyles, TextField } from '@material-ui/core';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { notificationAction, userAction } from '../../actions';

const useStyles = makeStyles(() => ({
  root: {}
}));
  
const UserInfoForm = ({ className, ...rest }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const userInfo = useSelector(state=>state.user.info);
    const [ nickName, setNickName ] = useState("");
    const [ updating, setUpdating ] = useState(false);

    useEffect(()=>{
        setNickName(userInfo.nickName);
    }, [ userInfo ])

    const reset = () =>{
        setNickName(userInfo.nickName);
    }

    const update = () => {
        const requestOptions = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                nickName: nickName
            })
        };
        setUpdating(true);
        fetch(`/api/user`, requestOptions)
            .then(res=>{
                if(!res.ok){
                    throw res;
                }
            })
            .then(()=>{
                dispatch(notificationAction.enqueueSuccess("變更成功"));
                dispatch(userAction.getUser());
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
                setUpdating(false)
            }).finally(()=>setUpdating(false));
    }

    return (
        <Card className={clsx(classes.root, className)}
            {...rest}>
            <CardHeader title="變更基本資料" />
            <CardContent>
                <TextField 
                    fullWidth
                    label="暱稱"
                    value={nickName}
                    onChange={event=>setNickName(event.target.value)}
                    variant="outlined" />
                <Divider />
                <Box my={2}>
                    <Button
                        color="primary"
                        disabled={updating}
                        onClick={e=>update()}
                        fullWidth
                        variant="contained">
                        變更
                    </Button>
                </Box>
                <Box my={2}>
                    <Button
                        color="default"
                        onClick={e=>reset()}
                        fullWidth
                        variant="contained">
                        恢復
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
}
  
export default UserInfoForm;