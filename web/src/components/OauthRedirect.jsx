import React from 'react';
import { useDispatch } from 'react-redux';
import { useParams, useLocation, Redirect } from 'react-router-dom';

import { userAction } from '../actions';

  
const OauthReirect = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const { providerCode } = useParams();

    if(location.search){
        let urlParams = new URLSearchParams(location.search);
        let code = urlParams.get("code");
        if(code){
            dispatch(userAction.oauthLogin(providerCode, code));
        }
    }

    return (<Redirect to="/" />)
}

export default OauthReirect;