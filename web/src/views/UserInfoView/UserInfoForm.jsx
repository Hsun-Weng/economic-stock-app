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
    const [ firstName, setFirstName ] = useState("");
    const [ lastName, setLastName ] = useState("");
    const [ updating, setUpdating ] = useState(false);

    useEffect(()=>{
        setFirstName(userInfo.firstName);
        setLastName(userInfo.lastName);
    }, [ userInfo ])

    const reset = () =>{
        setFirstName(userInfo.firstName);
        setLastName(userInfo.lastName);
    }

    const update = () => {
        const requestOptions = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                firstName: firstName,
                lastName: lastName
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
                    label="名字"
                    name="名字"
                    value={firstName}
                    onChange={event=>setFirstName(event.target.value)}
                    variant="outlined" />
                <TextField 
                    fullWidth
                    label="姓氏"
                    name="姓氏"
                    value={lastName}
                    onChange={event=>setLastName(event.target.value)}
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