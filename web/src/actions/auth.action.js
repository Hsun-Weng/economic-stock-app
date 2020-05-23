import authConstants from '../constants/auth.constants';
import { authService } from '../services';

export const authActions = {
    login,
    logout,
    // regiseter,
    // getAll,
    // delete: _delet
}

function login(userName, password) {
    return dispatch => {
        dispatch(request({ userName }));
        
        authService.login(userName, password)
            .then(() => {
                    dispatch(success());
                },
                error => {
                    dispatch(failure(error));
                }
            );
    }

    function request(user) {
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

function register(user) {
    return dispatch => {
        dispatch(request(user));

        authService.register(user)
            .then(
                user => { 
                    dispatch(success());
                },
                error => {
                    dispatch(failure(error));
                }
            );
    };

    function request (user) { return { type: authConstants.REGISTER_REQUEST, user } }
    function success (user) { return { type: authConstants.REGISTER_SUCCESS, user } }
    function failure (error) { return { type: authConstants.REGISTER_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        authService.delete(id)
            .then(
                user => { 
                    dispatch(success(id));
                },
                error => {
                    dispatch(failure(id, error));
                }
            );
    };

    function request(id) { return { type: authConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: authConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: authConstants.DELETE_FAILURE, id, error } }
}