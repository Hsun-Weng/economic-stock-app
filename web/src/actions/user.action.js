import userConstants from '../constants/user.constants';
import { userService } from '../services';
import { notificationActions } from './';

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
                },
                error=>{
                    dispatch(failure());
                    dispatch(notificationActions.enqueueError(error.message));
                })
        }else{
            dispatch(failure());
        }
    };

    function request() { return { type: userConstants.GET_USER_REQUEST } }
    function success(user) { return { type: userConstants.GET_USER_SUCCESS, user } }
    function failure() { 
        localStorage.removeItem('token');
        return { 
            type: userConstants.GET_USER_FAILURE
        } 
    }
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
                    if(error){
                        dispatch(notificationActions.enqueueError(error.message));
                    }else{
                        console.log('no error body')
                    }
                }
            );
    }

    function request() {return {type: userConstants.LOGIN_REQUEST}}
    function success() {return {type: userConstants.LOGIN_SUCCESS}}
    function failure() {return {type: userConstants.LOGIN_FAILURE}}
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
                    dispatch(notificationActions.enqueueSuccess(`Sign Up Success, Now you can login as ${user.userName}`));
                },
                error => {
                    dispatch(failure());
                    dispatch(notificationActions.enqueueError(error));
                }
            );
    };

    function request () { return { type: userConstants.SIGNUP_REQUEST } }
    function success () { return { type: userConstants.SIGNUP_SUCCESS } }
    function failure () { return { type: userConstants.SIGNUP_FAILURE }}
}

function oauthLogin(providerCode, code) {
    return dispatch => {
        dispatch(request());
        
        userService.oauthLogin(providerCode, code)
            .then(() => {
                    dispatch(success());
                },
                error => {
                    dispatch(failure(error));
                }
            );
    }

    function request() {return {type: userConstants.OAUTH_LOGIN_REQUEST}}
    function success() {return {type: userConstants.OAUTH_LOGIN_SUCCESS}}
    function failure() {return {type: userConstants.OAUTH_LOGIN_FAILURE}}
}