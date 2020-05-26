import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Dialog, DialogContent, Button } from '@material-ui/core';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import LoggedInUserAvatar from './LoggedInUserAvatar';
import { userAction } from '../actions';

const UnLoggedInUser = () => {
    const [ loginDialogOpen, setLoginDialogOpen] = useState(false);
    const [ signupDialogOpen, setSignupDialogOpen ] = useState(false);

    const handleLoginDialogOpen = () => {
        setLoginDialogOpen(true);
    }
    const handleLoginDialogClose = () => {
        setLoginDialogOpen(false);
    }
    const handleSignupDialogOpen = () => {
        setSignupDialogOpen(true);
    }
    const handleSignupDialogClose = () => {
        setSignupDialogOpen(false);
    }

    return (
        <div>
            <Button onClick={handleLoginDialogOpen} color="inherit">Login</Button>
            /
            <Button onClick={handleSignupDialogOpen} color="inherit">Sign Up</Button>
            <Dialog open={loginDialogOpen} onClose={handleLoginDialogClose} >
                <DialogContent>
                    <LoginForm />
                </DialogContent>
            </Dialog>
            <Dialog open={signupDialogOpen} onClose={handleSignupDialogClose} >
                <DialogContent>
                    <SignUpForm />
                </DialogContent>
            </Dialog>
        </div>
    )
}

const UserAvatar = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.user);
    
    useEffect(()=>{
        dispatch(userAction.getUser())
    }, []);

    return (
        <div>
            {user ? 
                <LoggedInUserAvatar />
                :<UnLoggedInUser />
            }
        </div>
    )
}

export default UserAvatar;