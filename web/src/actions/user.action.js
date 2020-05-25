import userConstants from '../constants/user.constants';
import { userService } from '../services';
import { notificationActions } from './notification.action';

export const userAction = {
    getUser,
    login,
    signUp,
    logout
}
function getUser() {
    return dispatch => {
        dispatch(request());
        
        userService.getUser()
                .then(user=>{
                    dispatch(success(user));
                    dispatch(notificationActions.enqueueNotification({
                        message: 'Login Success',
                        options: {
                            key: new Date().getTime() + Math.random(),
                            variant: 'success',
                        },
                    }))
                },
                error=>{
                    dispatch(failure(error));
                })
    };

    function request() { return { type: userConstants.GET_USER_REQUEST } }
    function success(user) { return { type: userConstants.GET_USER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.GET_USER_FAILURE, error } }
}

function clearUser() {
    return { type: userConstants.CLEAR_USER };
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
        dispatch(_logout);
        dispatch(clearUser());
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
                },
                error => {
                    dispatch(failure(error));
                }
            );
    };

    function request (user) { return { type: userConstants.SIGNUP_REQUEST } }
    function success (user) { return { type: userConstants.SIGNUP_SUCCESS } }
    function failure (error) { return { type: userConstants.SIGNUP_FAILURE, error } }
}
