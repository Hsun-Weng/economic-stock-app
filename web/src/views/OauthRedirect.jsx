import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { userAction, notificationAction } from '../actions';
  
const OauthReirect = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const { providerCode } = useParams();
    const navigate = useNavigate();

    useEffect(()=>{
        if(location.search){
            let urlParams = new URLSearchParams(location.search);
            let code = urlParams.get("code");
            if(code){
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ providerCode, code })
                };
            
                fetch(`/api/user/oauth`, requestOptions)
                    .then(res=>{
                        if(!res.ok){
                            throw Error(res.text());
                        }
                    })
                    .then(()=>{
                        dispatch(userAction.getUser());
                    }).catch(errText=>{
                        dispatch(notificationAction.enqueueError(errText));
                    }).finally(()=>{
                        navigate('/');
                    });
            }
        }
    }, [ dispatch, location, navigate, providerCode ])

    return (<div />)
}

export default OauthReirect;