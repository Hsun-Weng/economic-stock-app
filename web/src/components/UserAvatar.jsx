import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LoggedInUserAvatar from './LoggedInUserAvatar';
import UnLoggedInUserAvatar from './UnLoggedInUserAvatar';
import { userAction } from '../actions';

const UserAvatar = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.user);
    
    useEffect(()=>{
        dispatch(userAction.getUser())
    }, [ dispatch ]);

    return (
        <div>
            {user ? 
                <LoggedInUserAvatar />
                :<UnLoggedInUserAvatar />
            }
        </div>
    )
}

export default UserAvatar;