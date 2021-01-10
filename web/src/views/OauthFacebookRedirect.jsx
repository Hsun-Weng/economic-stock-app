import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { notificationAction, userAction } from '../actions';
  
const OauthReirect = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(()=>{
        if(location.search){
            let urlParams = new URLSearchParams(location.search);
            let code = urlParams.get("code");
            if(code){
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ code })
                };
            
                fetch(`/api/oauth/facebook`, requestOptions)
                    .then(res=>{
                        if(!res.ok){
                            throw res;
                        }
                    })
                    .then(()=>{
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
                    }).finally(()=>{
                        navigate('/');
                    });
            }
        }
    }, [ dispatch, location, navigate ])

    return (<div />)
}

export default OauthReirect;