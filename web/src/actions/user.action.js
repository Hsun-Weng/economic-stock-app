import userConstants from '../constants/user.constants';
import { userService } from '../services';
import { notificationActions, portfolioAction } from './';

export const userAction = {
    getUser,
    login,
    signUp,
    logout,
    oauthLogin
}
function getUser() {
    return dispatch => {
        dispatch(request());

        if(localStorage.getItem('token')){
            userService.getUser()
                .then(user=>{
                    dispatch(success(user));
                    dispatch(portfolioAction.getPortfolio());
                },
                error=>{
                    dispatch(failure(error));
                })
        }
    };

    function request() { return { type: userConstants.GET_USER_REQUEST } }
    function success(user) { return { type: userConstants.GET_USER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.GET_USER_FAILURE, error } }
}

function login(userName, password) {
    return dispatch => {
        dispatch(request());
        
        userService.login(userName, password)
            .then(() => {
                    dispatch(success());
                    dispatch(getUser());
                },
                error => {
                    dispatch(failure(error));
                }
            );
    }

    function request() {
        return {type: userConstants.LOGIN_REQUEST};
    }
    function success() {
        return {type: userConstants.LOGIN_SUCCESS};
    }
    function failure(error) {
        return {type: userConstants.LOGIN_FAILURE, error};
    }
}

function logout() {
    return dispatch =>{
        userService.logout();
        dispatch(_logout());
    }

    function _logout(){
        return {type: userConstants.LOGOUT};
    };
}

function signUp(user) {
    return dispatch => {
        dispatch(request(user));

        userService.signUp(user)
            .then(
                () => { 
                    dispatch(success());
                    dispatch(notificationActions.enqueueNotification({
                        message: `Sign Up Success, Now you can login as ${user.userName}`,
                        options: {
                            key: new Date().getTime() + Math.random(),
                            variant: 'success',
                        },
                    }))
                },
                error => {
                    dispatch(failure(error));
                }
            );
    };

    function request () { return { type: userConstants.SIGNUP_REQUEST } }
    function success () { return { type: userConstants.SIGNUP_SUCCESS } }
    function failure (error) { return { type: userConstants.SIGNUP_FAILURE, error } }
}

function oauthLogin(providerCode, code) {
    return dispatch => {
        dispatch(request());
        
        userService.oauthLogin(providerCode, code)
            .then(() => {
                    dispatch(success());
                    dispatch(getUser());
                },
                error => {
                    dispatch(failure(error));
                }
            );
    }

    function request() {
        return {type: userConstants.LOGIN_REQUEST};
    }
    function success() {
        return {type: userConstants.LOGIN_SUCCESS};
    }
    function failure(error) {
        return {type: userConstants.LOGIN_FAILURE, error};
    }
}