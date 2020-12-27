import { CircularProgress } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, useLocation, Navigate } from 'react-router-dom';

import { userAction } from '../actions';
  
const OauthReirect = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const { providerCode } = useParams();
    const [ loading, setLoading ] = useState(true);

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
                    .then(res=>res.json())
                    .then(setLoading(false));
            }
        }
    }, [])

    if(loading){
        return (<CircularProgress />)
    }else{
        return (<Navigate to="/" />)
    }
}

export default OauthReirect;