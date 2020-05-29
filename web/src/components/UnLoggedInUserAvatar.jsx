import React, { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';
import { Dialog, DialogContent, Button } from '@material-ui/core';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';

const UnLoggedInUserAvatar = () => {
    const signUpResult = useSelector(state=>state.signUp.result);

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

    useEffect(()=>{
        if(signUpResult){
            handleSignupDialogClose();
        }
    }, [ signUpResult ]);

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

export default UnLoggedInUserAvatar;