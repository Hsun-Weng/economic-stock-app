import authConstants from '../constants/auth.constants';
import { authService } from '../services';

export const authActions = {
    login,
    logout,
    signUp
}

function login(userName, password) {
    return dispatch => {
        dispatch(request());
        
        authService.login(userName, password)
            .then(() => {
                    dispatch(success());
                },
                error => {
                    dispatch(failure(error));
                }
            );
    }

    function request() {
        return {type: authConstants.LOGIN_REQUEST};
    }
    function success() {
        return {type: authConstants.LOGIN_SUCCESS};
    }
    function failure(error) {
        return {type: authConstants.LOGIN_FAILURE, error};
    }
}

function logout() {
    authService.logout();
    return {type: authConstants.LOGOUT};
}

function signUp(user) {
    return dispatch => {
        dispatch(request(user));

        authService.signUp(user)
            .then(
                () => { 
                    dispatch(success());
                },
                error => {
                    dispatch(failure(error));
                }
            );
    };

    function request (user) { return { type: authConstants.SIGNUP_REQUEST } }
    function success (user) { return { type: authConstants.SIGNUP_SUCCESS } }
    function failure (error) { return { type: authConstants.SIGNUP_FAILURE, error } }
}
